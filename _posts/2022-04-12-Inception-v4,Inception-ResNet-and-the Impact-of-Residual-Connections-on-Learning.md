---
layout: single
title:  "Inception-v4, Inception-ResNet and the Impact of Residual Connections on Learning"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - Paper Review
---


## Abstract

- Inception and residual network have yielded outbreaking performace in the 2015 ILSVRC challenge.
- This paper proves that applying residual connection to inception networks accelerates the training process significantly.


## Introduction

- Since inception network tend to get very deep, replacing filter concatenation with inception architecture is very effective.
- In this paper, they commpared two pure Inception variants, Inception-v3 and v4, with two other variants with similarly expensive Inception-ResNet variants.
- Inception-v4 and Inception-ResNet-v2 both show state-of-the art performance, while ensembling them does not translate to expected performace boost.


## Architectural Choices

### 1. Pure Inception blocks

#### General look

Large scale of Inception-v4 looks as follows:

![](/assets/image/paper-review2-1.png){: width="30%" height="30%"}{: .center}

- Previous inception networks tend to be very conservative about changing the architectural choices, and had 
- Inception-v4 tackled the problems that previous inception networks had by making uniform choices for the inception blocks.

#### Stem

![](/assets/image/paper-review2-2.png){: width="30%" height="30%"}{: .center}

- 'V' in the figures indicates valid padding, which input grid size and output grid size differ.
- figures not marked with 'V' indicates same padding, which input grid size matches output grid size.
- ***Stem*** sturcture is used for input part of Inception-v4 and Inception-ResNet-v2 networks.
- Input size is 299x299x3, and output size is 35x35x384


#### Inception-A 

![](/assets/image/paper-review2-3.png){: width="50%" height="50%"}{: .center}


#### Inception-B

![](/assets/image/paper-review2-4.png){: width="50%" height="50%"}{: .center}


#### Inception-C

![](/assets/image/paper-review2-5.png){: width="50%" height="50%"}{: .center}

- k, l, m, n indicated varying filter sizes

#### Reduction-A

![](/assets/image/paper-review2-6.png){: width="50%" height="50%"}{: .center}

#### Reduction-B

![](/assets/image/paper-review2-7.png){: width="50%" height="50%"}{: .center}


### 2. Residual Inception Blocks

Inception-ResNet-v1 and Inception-ResNet-v2 networks looks as follows:

![](/assets/image/paper-review2-8-2.png){: width="30%" height="30%"}{: .center}

- Each Inception block starts with 1x1 convolution layer, which is used for scaling up the dimensionality of the filter banks. This later compensates to dimensionality reduction caused by inception block.

- Batch normalization is applied only on traditional layers, not on top on summations. This has significantly less GPU memory usage compared to model with BN applied to all layers.

#### Inception-resnet-A

![](/assets/image/paper-review2-8.png){: width="50%" height="50%"}{: .center}


#### Reduction-A

![](/assets/image/paper-review2-9.png){: width="50%" height="50%"}{: .center}


#### Inception-resnet-B

![](/assets/image/paper-review2-10.png){: width="50%" height="50%"}{: .center}


#### Reduction-B

![](/assets/image/paper-review2-11.png){: width="50%" height="50%"}{: .center}


#### Inception-resnet-C

![](/assets/image/paper-review2-12.png){: width="30%" height="30%"}{: .center}


### Scaling of the residuals

- If number of filters exceed 1000, networks die, meaning last layer before average pooling starts to produce only zeros.
- This problem is solved by scaling down residuals before being added to the accumulated layer activations.

![](/assets/image/paper-review2-13.png){: width="40%" height="40%"}{: .center}


## Training Methodology

- Best models were achieved using RMSProp with a learning rate of 0.045.


## Experimental Results

- The graph below shows the top-5 error evaluations of all four models. Inception with residual block converges much faster than pure Inception networks, while having similar performance.

![](/assets/image/paper-review2-14.png){: width="50%" height="50%"}{: .center}

- Test on 144 crop images were also conducted. Ensembled Model, which consists of one pure Inception-v4 model and three Inception-ResNet-v2 models, was used for evalution. Table on the left refers to the error rate of single model while the right refers to error rate of ensembled model. Ensembled model showed slightly better performance than single model.

![](/assets/image/paper-review2-15.png){: width="90%" height="90%"}{: .center}

## Conclusions

- Inception networks with residual connections, inception-resnet-v2, showed fastest training speed, while having similar performance with pure counterparts.
- Residual connections contribute heavily to improving training speed of inception networks.
