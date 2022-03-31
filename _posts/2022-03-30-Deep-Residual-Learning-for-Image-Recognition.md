---
layout: single
title:  "Deep Residual Learning for Image Recognition"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


## introduction

- Network depth is of crucial importance for making better models.
- Graph below shows that stacking more layers doesn't make model better. Rather, it increases error for both train and test data.

![](/assets/image/paper-review1-1.png)

- Vanishing/exploding gradient is the cause for such problem.
- In this paper, they proposed deep residual learning framework to address degradation problem.


## Deep Residual Learing

### Residual Learning

- The goal of this techinque is to construct layers with identity mapping, which is to make the input and output identical.
- Rather than directly fitting input data to output data, resiudal learning focuses on fitting input data to residual function, which is the residue of output and input data.

#### How does Residual Learning work?

- Let us consider the equation below, which $H(x)$ stands for output data, $x$ for input data and $F(x)$ for residual function.

  $H(x) = F(x) + x$
  
- To make identity mapping possible, $F(x)$ should become 0.
- $F(x)$ is expressed as $F(x) = H(x) -x$
- Now, the training process involves making $F(x)$ 0. 
- Dimensions of both input and ouput data should be identical to train residual function. 

### identity Mapping by Shortcuts

- In this paper, blocks with residual learning is defined as follows:

$y = F(x, {W_i}) + x$

- function $F(x, {W_i})$ represents residual mapping to be learned
- With 2-layer model, residual block is defined as:
$F = W_2\sigma(W_1x)$
- The equation above is interpreted as having shortcut connection to output $y$.
- Shortcut connection resolves the previous issues of identity mapping by introducing neither extra parameters nor computational complexity.
- When dimensions of $F$ and $x$ are different, adding linear projection $W_s$ is one option to make these two dimensions identical.
- Above notations are about fully connected layers, but this is applicable to convolutional layers as well.


### Network Architectures

- This section introduces models that are used for evaluating the performace of residual network.
- VGGNet with 34 weighted layers is used as plain network and VGGNet with shortcut connection inserted is used as resiudal network.
- Following 2 options were used to prevent the problem of dimension increase.

 1. Extra zero entries are padded for increasing dimension.
 2. Projection techinque, which is adding $W_s$ to residual function, is used to match dimension.

 
## Experiments

### ImageNet Classification

- Two networks are evaluated on the ImageNet 2012 classification dataset that consists of 1000 classes.
- Plain network with 34 layer shows higher training error rate than that with 18 layer. This paper conjectures that this is not due to vanishing gradient, but it is due to having exponentially low convergence rates.

![](/assets/image/paper-review1-2.png)

- However, the situation is reveresed for residual networks. Residual networks with 34 layer shows lower training error rate than that with 18 layer.

![](/assets/image/paper-review1-3.png)

- Additionally, 3 options 