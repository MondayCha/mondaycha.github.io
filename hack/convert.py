import os
import re
import argparse
import shutil
from markdown_it import MarkdownIt
from markdown_it.token import Token
from mdit_py_plugins import front_matter
from mdit_py_plugins import footnote
from mdit_py_plugins import texmath
from mdformat.renderer import MDRenderer
import mdformat_tables
import mdformat_frontmatter
import mdformat_myst
import mdformat_footnote
from markdown_it.rules_inline import StateInline


def wiki_link_plugin(md: MarkdownIt) -> None:
    """A plugin to parse wiki links like `[[xxx xxx]]` or `![[xxx xxx]]`. Ignores code/fences/math."""

    def _parse_wiki_links(state: StateInline, silent: bool) -> bool:
        src = state.src
        pos = state.pos

        if not src[pos:].startswith("[[") and not src[pos:].startswith("![["):
            return False

        # 检查是否是「![[」还是「[[」
        is_preview = src[pos] == "!" if src[pos] == "!" else False
        if is_preview:
            pos += 1  # 跳过 '!'

        if not src[pos:].startswith("[["):
            return False

        # 找到结束位置
        close_index = src.find("]]", pos)
        if close_index == -1:
            return False

        # 提取中间内容
        link_content = src[pos + 2 : close_index].strip()
        if not link_content:
            return False

        # 在静默模式下只验证，不生成 Token
        if silent:
            return True

        # 生成 Token
        token = state.push("wiki_link" if not is_preview else "wiki_preview", "", 0)
        token.content = link_content
        token.markup = "![[" if is_preview else "[["
        token.block = False

        # 更新光标位置
        state.pos = close_index + 2
        return True

    md.inline.ruler.before("link", "wiki_link", _parse_wiki_links)


md = MarkdownIt().enable("table")
md.use(front_matter.front_matter_plugin)
md.use(texmath.texmath_plugin)
md.use(wiki_link_plugin)
md.use(footnote.footnote_plugin)


def collect_file_index(input_dir):
    file_index = {}
    duplicates = {}
    for root, _, files in os.walk(input_dir):
        for file in files:
            name, ext = os.path.splitext(file)
            # ignore .DS_Store
            if name == ".DS_Store":
                continue
            if ext != ".md":
                name = file
            file_path = os.path.join(root, file)
            if name in file_index:
                duplicates[name] = duplicates.get(name, []) + [file_path]
            else:
                file_index[name] = file_path
    for name, paths in duplicates.items():
        print(f"Warning: Duplicate filenames '{name}' found at:\n\t{paths}")
    return file_index, duplicates


def convert_wiki_to_link(token, file_index: dict, current_dir) -> Token:
    # if the link is a file in the index, convert it to a relative link
    # 动态规划#1143. 最长公共子序列 ->  [动态规划#1143. 最长公共子序列](./动态规划#1143. 最长公共子序列.md)
    filename, anchor = (
        token.content.split("#") if "#" in token.content else (token.content, None)
    )
    if filename in file_index:
        file_path = file_index[filename]
        relative_path = os.path.relpath(file_path, current_dir)
        # if relative path contains spaces, convert " " to "%20"
        relative_path = relative_path.replace(" ", "%20")
        relative_path = relative_path.replace("\\", "/")
        # if there is an anchor, add it to the relative path
        if anchor:
            relative_path += f"#{anchor}"
        # if token.type == "wiki_preview", but the filename does not contain ext, should not preview
        should_not_preview = token.type == "wiki_link" or "." not in filename
        new_markdown_str = (
            f"[{token.content}]({relative_path})"
            if should_not_preview
            else f"![{token.content}]({relative_path})"
        )
        new_tokens = md.parse(new_markdown_str)
    else:
        new_markdown_str = token.content
        new_tokens = md.parse(new_markdown_str)

    if len(new_tokens) < 2:
        print(f"Error: Unexpected token count when converting '{token.content}'.")
        return token

    new_token = new_tokens[1]
    if token.type == "wiki_link":
        print(f"Converted [[{token.content}]] to {new_token.content}")
    else:
        print(f"Converted ![[{token.content}]] to {new_token.content}")
    return new_token


def format_front_matter(text):
    # if title is a wiki link, remove the brackets
    text = re.sub(r"title: \"\[\[(.*?)\]\]\"", r"title: '\1'", text)
    # if 'tags:' is the last line, remove it
    text = re.sub(r"\ntags:.*$", "", text)
    return text


def format_callout(text):
    # # GitHub (Only 5)
    # [!NOTE]
    # [!TIP]
    # [!WARNING]
    # [!IMPORTANT]
    # [!CAUTION]

    # convert obsidian style callouts to github style alerts
    text = re.sub(r"\[!note\]", r"[!NOTE]", text)
    text = re.sub(r"\[!abstract\]", r"[!NOTE]", text)
    text = re.sub(r"\[!info\]", r"[!NOTE]", text)
    text = re.sub(r"\[!todo\]", r"[!NOTE]", text)
    text = re.sub(r"\[!quote\]", r"[!NOTE]", text)
    text = re.sub(r"\[!cite\]", r"[!NOTE]", text)
    text = re.sub(r"\[!tip\]", r"[!TIP]", text)
    text = re.sub(r"\[!success\]", r"[!TIP]", text)
    text = re.sub(r"\[!question\]", r"[!TIP]", text)
    text = re.sub(r"\[!example\]", r"[!TIP]", text)
    text = re.sub(r"\[!warning\]", r"[!WARNING]", text)
    text = re.sub(r"\[!failure\]", r"[!WARNING]", text)
    text = re.sub(r"\[!danger\]", r"[!CAUTION]", text)
    text = re.sub(r"\[!bug\]", r"[!CAUTION]", text)
    return text


def traverse_tokens(tokens: list[Token], file_index, current_dir, depth=0):
    if tokens is None:
        return
    for token in tokens:
        # print("  " * depth, token.type, " | ", token.content)
        if token.type == "front_matter":
            token.content = format_front_matter(token.content)
        elif token.type == "wiki_link" or token.type == "wiki_preview":
            new_token = convert_wiki_to_link(token, file_index, current_dir)
            token.type = new_token.type
            token.tag = new_token.tag
            token.attrs = new_token.attrs
            token.map = new_token.map
            token.nesting = new_token.nesting
            token.level = new_token.level
            token.children = new_token.children
            token.content = new_token.content
            token.markup = new_token.markup
            token.info = new_token.info
            token.meta = new_token.meta
            token.block = new_token.block
            token.hidden = new_token.hidden
        elif token.type == "text":
            token.content = format_callout(token.content)
        elif token.type == "math_single":
            token.type = "math_inline"
        else:
            traverse_tokens(token.children, file_index, current_dir, depth + 1)


def process_file(input_path, output_path, file_index: dict, current_dir):
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()
    tokens = md.parse(content)
    traverse_tokens(tokens, file_index, current_dir)
    renderer = MDRenderer()
    options = {
        "parser_extension": [
            mdformat_tables.plugin,
            mdformat_frontmatter.plugin,
            mdformat_myst.plugin,
            mdformat_footnote.plugin,
        ],
    }
    env = {}

    output_markdown = renderer.render(tokens, options, env)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output_markdown)


def process_files(input_dir, output_dir, file_index: dict):
    for root, _, files in os.walk(input_dir):
        for file in files:
            input_path = os.path.join(root, file)
            relative_path = os.path.relpath(input_path, input_dir)
            output_path = os.path.join(output_dir, relative_path)
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            # ignore excalidraw files
            if file.endswith(".excalidraw.md"):
                continue
            # ignore .DS_Store
            if file == ".DS_Store":
                continue
            # ignore .pdf or .html files
            if file.endswith(".pdf") or file.endswith(".html"):
                continue
            # include markdown files
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
    file_index, _ = collect_file_index(input_dir)
    process_files(input_dir, output_dir, file_index)


if __name__ == "__main__":
    main()
