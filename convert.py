import os
import re
import argparse
import shutil
from markdown_it import MarkdownIt
from mdformat.renderer import MDRenderer


def collect_file_index(input_dir):
    file_index = {}
    duplicates = {}
    for root, _, files in os.walk(input_dir):
        for file in files:
            name, ext = os.path.splitext(file)
            file_path = os.path.join(root, file)
            if name in file_index:
                duplicates[name] = duplicates.get(name, []) + [file_path]
            else:
                file_index[name] = file_path
    for name, paths in duplicates.items():
        print(f"Warning: Duplicate filenames '{name}' found at:\n\t{paths}")
    return file_index, duplicates


def replace_wiki_links(text, file_index, current_dir):
    pattern = re.compile(r"(!?)\[\[([^#\]]*)(?:#(.*?))?\]\]")

    def replace(match):
        is_image = match.group(1) == "!"
        filename = match.group(2)
        anchor = match.group(3)
        if filename in file_index:
            target_path = file_index[filename]
            relative_path = os.path.relpath(target_path, current_dir)
            if is_image:
                if anchor:
                    return f"![{filename}]({relative_path}#{anchor})"
                else:
                    return f"![{filename}]({relative_path})"
            else:
                if anchor:
                    return f"[{filename}]({relative_path}#{anchor})"
                else:
                    return f"[{filename}]({relative_path})"
        else:
            print(f"Warning: File '{filename}' not found in index. Link not replaced.")
            return match.group(0)

    new_text = pattern.sub(replace, text)
    return new_text


def traverse_tokens(tokens, file_index, current_dir, in_code=False):
    for token in tokens:
        if token.type == "code":
            traverse_tokens(token.children, file_index, current_dir, in_code=True)
        elif token.type in ["paragraph", "list", "list_item", "blockquote"]:
            traverse_tokens(token.children, file_index, current_dir, in_code)
        elif token.type == "text":
            if not in_code:
                new_content = replace_wiki_links(token.content, file_index, current_dir)
                token.content = new_content


def process_file(input_path, output_path, file_index, current_dir):
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()
    md = MarkdownIt()
    tokens = md.parse(content)
    traverse_tokens(tokens, file_index, current_dir)
    renderer = MDRenderer()
    options = {}
    env = {}

    output_markdown = renderer.render(tokens, options, env)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output_markdown)


def process_files(input_dir, output_dir, file_index):
    for root, _, files in os.walk(input_dir):
        for file in files:
            input_path = os.path.join(root, file)
            relative_path = os.path.relpath(input_path, input_dir)
            output_path = os.path.join(output_dir, relative_path)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            if file.endswith(".md"):
                process_file(input_path, output_path, file_index, root)
            else:
                shutil.copy2(input_path, output_path)


def main():
    parser = argparse.ArgumentParser(
        description="Process Markdown files with Wiki links."
    )
    parser.add_argument(
        "input_dir", help="Path to the input folder containing original Markdown files."
    )
    parser.add_argument(
        "output_dir", help="Path to the output folder to save processed files."
    )
    args = parser.parse_args()
    input_dir = os.path.abspath(args.input_dir)
    output_dir = os.path.abspath(args.output_dir)
    if not os.path.isdir(input_dir):
        print(f"Error: Input directory '{input_dir}' does not exist.")
        return
    if os.path.exists(output_dir):
        print(
            f"Warning: Output directory '{output_dir}' already exists. Clearing contents."
        )
        shutil.rmtree(output_dir)
    else:
        os.makedirs(output_dir)
    file_index, duplicates = collect_file_index(input_dir)
    process_files(input_dir, output_dir, file_index)


if __name__ == "__main__":
    main()
