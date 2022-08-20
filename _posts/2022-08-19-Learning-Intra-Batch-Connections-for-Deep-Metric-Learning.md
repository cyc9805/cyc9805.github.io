---
layout: single
title:  "Learning Intra-Batch Connections for Deep Metric Learning"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - Paper Review
---


## 1. Introduction

- Metric learning is a techinque which takes the input image and scale it down to more compact, embedding space. In that embedding space, samples with same class should be closer than the ones with different clasess.

- Various loss functions were used to map the input data into embedding space. ***Contrastive loss*** minimizes the distance between positive pair while maximizing the distance otherwise. ***Triplet loss*** takes the triplet of images and pushes the anchor to be closer to the positive sample than the negative one.

- The problem around contrastive loss and triplet loss is that ***the vast majority of pairs (or triplets) are not important enough to contribute to the loss***. In other words, it is important for loss functions to consider the global structure of the dataset and upadate the loss regarding that matter. Contextual classification loss functions and Group loss are the recent works that addresses this problem, but the global structure is captured using a handcrafted rule instead of learning. 

- The model proposed in this paper utilizes MPN(Message Passing Network) to allow the samples in a mini-batch to communicate with each other. More specifically, the input samples are the results of the images passed into CNN(Convolutional Neural Network).


## 2. Related Work

1. Metric Learning Losses: Metric learning loss includes contrastive loss and triplet loss. N-pair loss is the recent work where an anchor and a positive samples are compared to N-1 negative samples at the same time.

2. Sampling and Ensembles: Since not all data are informative, ***intelligent sampling*** is introduced to better sample the necessary data. At the same time, ensembling technique was applied to metric learning, and showed better result than the single network trained on the same loss.

3. Global Metric Learning Losses: Global metric learning losses utilizes proxy data points, which approximates original data points so that a triplet loss over the proxies is a tight upper bound of the loss over original samples. 

4. Classification Losses for Metric Learning: It is shown that a carefully designed classification loss function can outperform triplet-based functions in metric learning. One exmaple, SoftTriple loss develops a classification loss where each class is represented by K centers. Other example, Group Loss replaces softmax function with other contextual module, considering all the samples in the mini batch at the same time.

5. Message Passing Networks: The main idea of this network is that not only the embeded nodes and edges are considered, but also those of the neighbors in the graph, as well as the overall graph topology. This network have revolutionized the field of NLP(Neural Language Processing) and Computer Vision, especially object detection.


### 3. Methodology

#### 3.1 Overview

The proposed method works as following step:

1. Embed the image into higher dimension using CNN and fully connected graph. 
2. Pass through message passing network to refine the initial embedding feature vectors by using dot-prodcut self attention.
3. Perform classification and optimize both the MPN and backbone CNN using cross entropy loss.

#### 3.2 Feature Initialization and Graph Construction

The global structure of the embedding space is formulated by following graph:

\gamma = $(V, E)$

- $V$ represents the nodes. In other words, they are the images passed to the network
- $E$ represents edges, which connects nodes showing the importance of each edges to others.
- Since considering all the data into account takes huge amount of resource computationally, mini-batches consisting of $n$ randomly sampled class with $p$ randomly chosen samples per class is considered. 
- Then the MPN is structed to make relations between mini-batches.

#### 3.3 Message Passing Network

Message Passing Network is applied to 

#### Depth($d$)

- Pros: Deeper network can capture richer and more complex features, and works generally well for new tasks.
- Cons: Accuracy gain decreases due to vanishing gradient problem.
- Solution: skip connection, batch normalization

#### Width($w$)

- Pros: Wider network tends to capture more fine-grained features and easier to train, due to small size of the model. 
- Cons: Wide but shallow networks tends to have difficulties in finding higher level features.

#### Resolution($r$)

- Pros: With higher resolution input image, ConvNet can capture more fine-grained patterns. 
- Cons: Accuracy gain diminishes for very high resolutions.


Conclusion: Scaling one of these dimensions improves accuracy, but its gain decreases as the model gets bigger.


### 3.3 Compound Scaling

- Scaling dimensions are not independent to each other. For example, when image resolution gets higher, network should be wider to capture more fine-grained patterns. Therefore, 
multiple dimensions should be scaled simultaneously rather than conventional single dimension scaling.

- This paper proposes compound scaling method, which use a compound coefficient $\phi$ to uniformly scale all dimensions:

depth: $d = \alpha^\phi$
width: $w = \beta^\phi$
resolution: $r = \gamma^\phi$

- $\phi$ denotes user-specified coefficient which is  controlled by avaliable resources. 

- $\alpha, \beta, \gamma$ denotes constants that can be determined by grid search.

- Total FLOPS is increased by ($\alpha * \beta^2 * \gamma^2$)


## 4. EfficientNet Architecture

- Since model scaling does not change the overall architecture $F_i$, having a good baseline network is crucial. 

- Neural architecture search is utilized to optimize both accuracy and FLOPS. The search result is named EfficientNet-B0 and the architecture looks as follows:

![](/assets/image/paper-review3-3.png){: width="50%" height="50%"}{: .center}

- Starting from the baseline network EfficientNet-B0, compound scaling method is divided into two steps:

 Step 1: Fix $\phi = 1$, and do the grid search to find best values for $\alpha, \beta, \gamma$. The results are $\alpha = 1.2, \beta = 1.1, \gamma = 1.15$, under the constraint of $\alpha * \beta^2 * \gamma^2 \approx 2$


 Step 2: Fix $\alpha, \beta, \gamma$ as constant, and adjust $\phi$ with different values to make EfficientNet-B1 to B7.
 
## 5. Experiments

### 5.1 Scaling Up MobileNets and ResNets

- Compound scaling method is first applied to widely-used MobileNets and ResNet. Scaled models both show significant accuracy improvement compared to previous models.

![](/assets/image/paper-review3-4.png){: width="50%" height="50%"}{: .center}


### 5.2 ImageNet Results for EfficientNet

- Scaling method is then applied to EfficientNet models. Number of parameters and FLOPs are both significantly lower than existing ConvNets, while accuracy is either similar or higher. 

![](/assets/image/paper-review3-5.png){: width="50%" height="50%"}{: .center}

- Latency is also measuered for EfficientNet-B1 and EfficeintNet-B7, and both run about 6 times faster than ResNet-152 and GPipe. This implies that EfficientNets are fast on real hardware.


### 5.3 Transfer Learning Results for EfficientNet

- EfficientNet is also evaluated on transfer learning dataset. Compared to other models with similar accuracy, EfficientNet show significantly less parameters.


## 6. Discussion

- To discover the effect of compound scaling, ImageNet performance of different scaling method for the same EfficientNet-B0 has been compared. All scaling methods improve accuracy with the cost of more FLOPS, but compound scaling can further improve accuracy by up to 2.5%.


## 7. Conclusion

- Compound model scaling, which scales the dimension of depth, width and resolution by constant ratio, highly saves resources while maintaining its performance.