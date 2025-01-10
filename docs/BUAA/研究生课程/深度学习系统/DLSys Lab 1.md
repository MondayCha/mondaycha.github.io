## 作业要求

```ad-info
搭建简单的神经网络
- 全连接网络
- 不少于 3 层（至少包含一个隐藏层）
- 采用 BP 算法进行训练
- 手写字体识别功能（MNIST 数据集）
- 不限定编程语言（初学者推荐 Python）

作业形式
- 每人单独完成，个人电脑上即可完成
- 小批量训练，GPU 非必须
- SPOC 提交，截止时间见作业通知
```

## 笔记

最最经典的 MNIST 数据集，它来啦。课程组提供了 `load_mnist` 载入数据集，每个 `image` 为一个一维数组。在 Codeium 的帮助下，先把数据集打印看看：

```python
import matplotlib.pyplot as plt

if __name__ == "__main__":
    path = "./dataset/"
    train_images, _ = load_mnist(path, kind="train")
    # cmap='gray' displays the image in grayscale
    plt.imshow(train_images[1].reshape((28, 28)), cmap="Greys")
    plt.show()
```

课程组提供了 3 层神经网络的实现。

```python
import numpy as np

class LinearLayer:
    def __init__(self, input_nodes, output_nodes, bias=True):
        self.input_nodes = input_nodes
        self.output_nodes = output_nodes
        self.weight = np.random.normal(
            0.0, pow(self.input_nodes, -0.5), (self.output_nodes, self.input_nodes)
        )
        if bias:
            self.bias = np.zeros((self.output_nodes, 1))
        else:
            self.bias = None
        self.inputs = None  # input data
        self.outputs = None  # output data

        self.activation_function = lambda x: 1.0 / (1 + np.exp(-x))
        self.reverse_activation_function = lambda x: x * (1.0 - x)

    def forward(self, inputs):
        self.inputs = inputs
        wdi = np.dot(self.weight, self.inputs)
        if self.bias is not None:
            self.outputs = self.activation_function(wdi + self.bias)
        else:
            self.outputs = self.activation_function(wdi)
        return self.outputs

    def backpropagation(self, next_grad, learning_rate):
        delta_bias = next_grad * self.reverse_activation_function(self.outputs)
        delta_weight = np.dot(delta_bias, np.transpose(self.inputs))
        curr_grad = np.dot(self.weight.T, next_grad)

        self.weight += learning_rate * delta_weight
        if self.bias is not None:
            self.bias += learning_rate * delta_bias

        return curr_grad

    def __repr__(self):
        return "<LinearLayer: {}->{}>".format(self.input_nodes, self.output_nodes)

# neural network class
class neuralNetwork:
    # initialize the neural network
    def __init__(self, layers: tuple, learning_rate=0.1):
        """
        The network consists of three layers: input layer, hidden layer and output layer.
        Here defined these layers.
        :param input_nodes: dimension of input
        :param hidden_layers: tuple of dimension of hidden nodes
        :param output_nodes: dimension of output
        :param learning_rate: the learning rate of neural network
        """
        print("init neural network")
        self.input_nodes = layers[0]
        self.output_nodes = layers[-1]
        # Some parameters that will be used next
        self.lr = learning_rate  # learning rate

        # init layers
        self.layers: list[LinearLayer] = []
        for i in range(1, len(layers)):
            self.layers.append(LinearLayer(layers[i - 1], layers[i]))
        print(self.layers)

    def forward(self, input_feature):
        """
        Forward the neural network
        :param input_feature: single input image, flattened [784, ]
        """
        # convert inputs list to 2d array
        prev_output = np.array(input_feature, ndmin=2).T
        for layer in self.layers:
            prev_output = layer.forward(prev_output)
        self.final_outputs = prev_output

    def backpropagation(self, targets_list):
        """
        Propagate backwards
        :param targets_list: output onehot code of a single image, [10, ]
        """
        targets = np.array(targets_list, ndmin=2).T

        # loss
        loss = np.sum(np.square(self.final_outputs - targets)) / 2

        # output layer error is the (final_outputs - target)
        output_loss = targets - self.final_outputs

        # backpropagation through the output layer
        for i in range(len(self.layers) - 1, -1, -1):
            output_loss = self.layers[i].backpropagation(output_loss, self.lr)

        return np.sum((targets - self.final_outputs) ** 2)

```

[torch.nn.modules.linear — PyTorch 2.1 documentation](https://pytorch.org/docs/stable/_modules/torch/nn/modules/linear.html#Linear)
