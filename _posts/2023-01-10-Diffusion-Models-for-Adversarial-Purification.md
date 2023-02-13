---
layout: single
title:  "Diffusion Models for Adversarial Purification"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - Paper Review
---


## 1. Introduction

- Adversarial attack을 막는 방법에는 크게 두가지가 있다.

  1. Adversarial training: Adversarial sample을 학습시켜 해당 sample의 특징을 모델이 학습 하도록 만드는 방법이다.
    - 장점: 거의 대부분의 경우에 SOTA를 보이고 있는 모델이다
    - 장점: 학습에 사용된 adversarial example만 막을 수 있다. 또한 별도의 훈련과정이 필요하므로 computationlly expensive 하다.
    
  2. Adversarial purification: Adversarial example을 생성 모델이 한번 purify 해주고 purified된 sample을 분류한다.
    - 장점: plug-and-play manner으로 작동하므로 adversarial training과는 달리 별도의 훈련과정을 요구하지 않는다.
    - 단점: 생성모델이 가지고 있는 여러 문제(GAN의 경우에는 mode collapse) 때문에 adversarial training보다 성능이 좋지 않다.
    
- Diffusion model(이하 DM)은 likelihood based model로, GAN과 비교하여서 여러 장점을 가지고 있다. 이러한 장점 때문에 purification 성능이 더 좋을 것임이 기대된다.

- 해당 논문에서는 다음과 같은 contribution을 하고 있다.
  1. pretrained된 DM의 forward and reverse process를 통해 adversarial purification을 수행하는 DiffPure을 제시한다.
  2. DM의 forward and reverse process가 어떻게 효과적으로 adversarial perturbation을 제거하는 동시에 label semantics를 유지하는지 알아본다.
  3. Adaptive attack을 막기 위해 reverse process에서 효과적으로 full gradient를 구하는 방법을 제시한다.
  4. Adaptive attack 벤치마크에서 SOTA를 보이고 있음을 여러 실험을 통해 증명한다.
  

## 2. Background

  해당 섹션에서는 'Score-based generative modeling through stochastic differential equations.' 논문에서 제시하고 있는 continuous-time diffusion model에 대해서 간단하게 리뷰하고 있다.
  먼저 foward diffusion process는 다음과 같이 나타낸다.
  
![](/assets/image/diffpure-1.png){: width="30%" height="30%"}{: .center}

  DM에는 크게 두가지 종류가 있는데, VE-SDE와 VP-SDE 이다. 이 논문에서는 VP-SDE를 purification model로 사용한다.
   
  다음으로 sample generation은 다음과 같이 reverse-time SDE를 통하여 수행한다.
  
![](/assets/image/diffpure-2.png){: width="50%" height="50%"}{: .center}

  DM의 훈련은 다음과 같이 score function인 $s_\theta (\tilde{x}, t)$을 transition probability에 최대한 가까워 지도록 만드는 denosing score matching 방법을 이용한다.
  
![](/assets/image/diffpure-3.png){: width="50%" height="50%"}{: .center}

  
## 3. Method

### 3.1 Diffusion purification

  해당 섹션에서는 adversarial example인 $x_a$에 foward process를 통해 노이즈를 추가하고 다시 reverse process를 통해 노이즈를 제거하면 example이 가지고 있던 adversarial feature들이 사라지고 clean image로 변경된다고 주장하고 있다. 즉, 다음과 같은 정리를 내세웠다. (여기서 정리에 대한 증명은 길어서 생략하도록 하겠다.)
  
  <br> ***${x(t)}_{t\in[0,1]}$가 foward SDE, $p_t$가 clean data 분포, $q_t$가 adversarial sample 분포일 때 증명을 통해 다음과 같이 forward SDE가 일어날수록 $p_t$와 $q_t$는 서로 가까워진다.***
  
![](/assets/image/diffpure-4.png){: width="30%" height="30%"}{: .center}
  
  DM의 forward, reverse process를 통해 adversarial example이 clean image에 가까워진다는 것을 증명했으므로 forward, reverse process가 일어나는 과정에 대해서 살펴보면 각각 다음과 같다.
  
  1. Forward process: 이 논문에서는 DM으로 VP-SDE를 사용한다. VP-SDE는 다음과 같은 공식으로 timestep $t^{\ast}$에 노이즈가 추가된 이미지를 구할 수 있다.
  
![](/assets/image/diffpure-5.png){: width="40%" height="40%"}{: .center}

  2. Reverse process: Euler-Maruyama solver로 reverse-time SDE를 다음과 같이 풀 수 있다.
  
![](/assets/image/diffpure-6.png){: width="40%" height="40%"}{: .center}

  위 식에서 sdeint의 입력값은 차례대로 initial value, drift coefficient, diffusion coefficient, Wiener process, initial time, 와 end time 이다. $f_{rev}$와 $g_{rev}$는 다음과 같다.
  
![](/assets/image/diffpure-7.png){: width="40%" height="40%"}{: .center}

  여기서 핵심은 diffusion을 하는 timestep인 $t^{\ast}$를 정하는 것이다. 최적의 $t^{\ast}$은 다음과 같은 정리를 통해서 구할 수 있다.
  
***만약 score function이 $\lVert \tilde{x}(0)-x \rVert \leq \frac{1}{2}C_s$를 만족한다고 가정하면 clean data $x$와 purified data $\tilde{x}(0)$와의 L2 거리의 upper bound는 다음과 같이 구할 수 있다.***

![](/assets/image/diffpure-8.png){: width="40%" height="40%"}{: .center}

![](/assets/image/diffpure-9.png){: width="40%" height="40%"}{: .center}

  purified image가 최대한 clean image와 유사한 label semantics를 가져야 하므로 $\lVert \tilde{x}(0)-x \rVert$를 작게 하는 $t^{\ast}$를 찾아야 한다. 그러기 위해서는 $\gamma(t^{\ast})$가 작아야 하고, 이는 곧 $t^{\ast}$가 작아야 한다는 의미이므로 $t^{\ast}$를 최대한 작게 설정해야 한다.
  
  첫번째와 두번째 정리를 통해 $t^{\ast}$값에 따라 adversarial sample에서 perturbation을 purify하는 정도와 purified image가 가지는 label semantics간에는 trade-off가 있다는 것을 알 수 있다. 따라서 최적의 $t^{\ast}$를 잘 선택하는 것이 중요하다. 이 논문에서는 perturbation이 작은 경우가 많다고 하였기 때문에 $t^{\ast}$값을 작게 설정하였다.
  
### 3.2 Adaptive attack to diffusion purification

  강한 adaptive attack 같은 경우는 SDE solver의 full gradient를 계산한다. 그러나 이러한 과정은 매우 computationally expensive하므로 해당 논문에서는 adjoint method를 이용하여 $O(1)$의 공간 복잡도로 연산을 수행하였다. 해당 방법의 자세한 내용은 다음과 같다.
  
![](/assets/image/diffpure-10.png){: width="50%" height="50%"}{: .center}

  Adjoint method에 대해서는 'scalable gradients for stochastic differential equations'논문에 자세하게 나와있다.  

## 4. Experiments
  
  모델의 robustness를 평가하는 대표적인 벤치마크인 RobustBench의 SOTA모델들과 비교를 하였다. 
  
### Experimental settings
  
  1. Dataset은 CIFAR-10, CelebA-HQ, ImageNet을 사용하였다.
  2. Classifier은 ResNet, WideResNet, ViT를 사용하였다.
  3. Adversarial attack 방법에는 AutoAttack의 $l_\infty $, $l_2$와 StAdv, BPDA+EOT를 사용하였다.
  4. Evaluation metric으로는 clean data에 대한 평가인 standard accuracy, purified data에 대한 평가인 robust accuracy를 사용하였다.
  
### Comparision with the sate-of-the-art

  먼저 AutoAttack $l_\infty (\epsilon = 8/255) $를 CIFAR-10에 적용했을 때 결과이다. DiffPure이 SOTA를 모든 평가지표에서 달성하고 있다는 사실을 알 수 있다.
  
![](/assets/image/diffpure-11.png){: width="50%" height="50%"}{: .center}
  
  다음은 CIFAR-10에 $l_2 (\epsilon = 0.5)$ AutoAttack을 각기 다른 classifier을 적용했을 때 결과이다. 추가적인 데이터의 학습이 없이도 SOTA모델과 성능이 비슷하거나 더 좋다는 것을 알 수 있다.
  
![](/assets/image/diffpure-12.png){: width="50%" height="50%"}{: .center}

  마지막은 AutoAttack $l_\infty (\epsilon = 4/255) $을 ImageNet에 적용했을 때 결과이다. 마찬가지로 모든 classifier에서 SOTA임을 확인할 수 있다.

![](/assets/image/diffpure-13.png){: width="50%" height="50%"}{: .center}

### Defense against unseen threats

Adversarial training의 주요 단점이라고 한다면 훈련되지 않은 공격방법에는 취약하다는 것이다. 아래 표는 CIFAR-10에 adversarial training한 모델과의 성능을 비교한 표인데, 회색글자는 모델이 훈련된 공격 방법이다. 비교 결과 모든 공격방법에 대하여 diffpure이 높은 정확도를 보이고 있음을 알 수 있다.

![](/assets/image/diffpure-14.png){: width="90%" height="90%"}{: .center}

### Comparison with other purfication model

Diffpure을 GAN을 사용한 다른 purification 방법과의 비교 또한 시행하였다. 여기서 AutoAttack과 같은 white-box adaptive attack을 가하면 최적화 또는 sampling loop 문제가 나타났기 떄문에 BPDA+EOT 공격 방법을 사용하였다. 데이터셋은 CelebA-HQ와 CIFAR-10을 사용하였고, 비교에 대한 결과는 아래표에 나와있다.

![](/assets/image/diffpure-15.png){: width="100%" height="100%"}{: .center}

여기서 ENC와 OPT는 GAN의 optimization-based, encoder-based inversion을 지칭한다. 두 데이터셋에서 Robust accuracy가 모두 SOTA 성능을 보이는 것을 알 수 있다.

## Conclusion 

- Adversarial example을 한번 분류기로 분류하기 전에 정화시키는 Diffpure 방법을 새롭게 제시하였다.

- White-box adaptive attack에 대한 robustness를 평가하기 위해서는 full gradient를 구하는 작업이 필요한데, 이러한 작업에 adjoint method를 사용하였다.

- Diffpure을 다른 SOTA 방법들과 비교하기 위해 실험을 진행하였다. 데이터셋은 CIFAR-10, ImageNet, CelebA-HQ를 사용하였고 classifier는 ResNet, WideResNet, ViT 를 사용하였다. 실험 결과 robust accuracy에서 이들을 모두 뛰어넘었다.

- 그러나 다음과 같은 두 가지 한계점을 내포하고 있다. 

  1. Purification을 하는 시간이 너무 오래 소요된다.
  2. Diffusion model은 이미지의 색에 굉장히 민감하므로 색에 대한 공격은 효과적으로 방어하지 못한다.


  
