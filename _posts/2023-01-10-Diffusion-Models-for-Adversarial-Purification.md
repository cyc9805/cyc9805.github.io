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

  DM의 훈련은 다음과 같이 score function인 $s_\theta (\tilde{x}, t)$을 transition probability 인 $\bigtriangledown_{\tilde{x}} log_{p_{0t}}(\tilde{x}\mid x)$에 최대한 가까워 지도록 만드는 denosing score matching 방법을 이용한다.
  
![](/assets/image/diffpure-3.png){: width="50%" height="50%"}{: .center}

  
## 3. Method

### 3.1 Diffusion purification

해당 섹션에서는 adversarial example인 $x_a$에 foward process를 통해 노이즈를 추가하고 다시 reverse process를 통해 노이즈를 제거하면 example이 가지고 있던 adversarial feature들이 사라지고 clean image로 변경된다고 주장하고 있다. 즉, 다음과 같은 정리를 내세웠다. (여기서 정리에 대한 증명은 길어서 생략하도록 하겠다.)
  
***${x(t)}_{t\in[0,1]}$가 foward SDE, $p_t$가 clean data 분포, $q_t$가 adversarial sample 분포일 때 증명을 통해 다음과 같이 forward SDE가 일어날수록 $p_t$와 $q_t$는 서로 가까워진다.***
  
![](/assets/image/diffpure-4.png){: width="20%" height="20%"}{: .center}
  
DM의 forward, reverse process를 통해 adversarial example이 clean image에 가까워진다는 것을 증명했으므로 forward, reverse process가 일어나는 과정에 대해서 살펴보면 각각 다음과 같다.
  
  1. Forward process: 이 논문에서는 DM으로 VP-SDE를 사용한다. VP-SDE는 다음과 같은 공식으로 timestep $t^{\ast}$에 노이즈가 추가된 이미지를 구할 수 있다.
  
![](/assets/image/diffpure-5.png){: width="40%" height="40%"}{: .center}

  <br>&nbsp;&nbsp; 2. Reverse process: Euler-Maruyama solver로 reverse-time SDE를 다음과 같이 풀 수 있다.
  
![](/assets/image/diffpure-6.png){: width="40%" height="40%"}{: .center}

  위 식에서 $sdeint$의 입력값은 차례대로 initial value, drift coefficient, diffusion coefficient, Wiener process, initial time, 와 end time 이다. $f_{rev}$와 $g_{rev}$는 다음과 같다.
  
![](/assets/image/diffpure-7.png){: width="40%" height="40%"}{: .center}

  여기서 핵심은 diffusion을 하는 timestep인 $t^{\ast}$를 정하는 것이다. 최적의 $t^{\ast}$은 다음과 같은 정리를 통해서 구할 수 있다.
  
***만약 score function이 $\lvert \tilde{x}(0)-x \rvert \leq \frac{1}{2}C_s$를 만족한다고 가정하면 clean data $x$와 purified data $\tilde{x}(0)$와의 L2 거리의 upper bound는 다음과 같이 구할 수 있다.***

![](/assets/image/diffpure-8.png){: width="45%" height="45%"}{: .center}

![](/assets/image/diffpure-9.png){: width="40%" height="40%"}{: .center}

  purified image가 최대한 clean image와 유사한 label semantics를 가져야 하므로 $\lvert \tilde{x}(0)-x \rvert$를 작게 하는 $t^{\ast}$를 찾아야 한다. 그러기 위해서는 $\gamma(t^{\ast})$가 작아야 하고, 이는 곧 $t^{\ast}$가 작아야 한다는 의미이므로 $t^{\ast}$를 최대한 작게 설정해야 한다.
  
  첫번째와 두번째 정리를 통해 $t^{\ast}$ 값에 따라 adversarial sample에서 perturbation을 purify하는 정도와 purified image가 가지는 label semantics간에는 trade-off가 있다는 것을 알 수 있다. 따라서 최적의 $t^{\ast}$를 잘 선택하는 것이 중요하다. 이 논문에서는 perturbation이 작은 경우가 많다고 하였기 때문에 $t^{\ast}$값을 작게 설정하였다.
  
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

  마지막은 AutoAttack $l_\infty (\epsilon = 4/255)$을 ImageNet에 적용했을 때 결과이다. 마찬가지로 모든 classifier에서 SOTA임을 확인할 수 있다.

![](/assets/image/diffpure-13.png){: width="50%" height="50%"}{: .center}

### Defense against unseen threats

  Adversarial training의 주요한 단점은 훈련되지 않은 adversarial attack에 대해서는 잘 대처하지 못한다는 것이다. 따라서 훈련되지 않은 attack을 가했을 때 adversarial training과 DiffPure의 결과를 비교해 보았다. 아래 표에서 회색으로 칠해진 숫자는 해당 모델이 훈련된 attack이다.

![](/assets/image/diffpure-14.png){: width="80%" height="80%"}{: .center}

  결과표를 보면 알 수 있듯이 adversarial training은 훈련되지 않은 attack에 대해서는 매우 낮은 robust accuracy를 보이고 있음을 알 수 있다. 반면 DiffPure은 standard accuracy, robust accuracy 모두 월등하게 높은 것을 알 수 있다.

### Comparision with other purification methods

  다음은 다른 purification methods들과 $l_\infty$ BPOT+EOT attack을 가했을 때의 결과를 비교한 표이다. 데이터셋은 Celeb-A-HQ, CIFAR-10을 사용하였다.
 
![](/assets/image/diffpure-15.png){: width="90%" height="90%"}{: .center}

  standard accuracy에 대해서는 다시 아쉬운 결과지만 robust accuracy가 다른 방법들보다 매우 높게 나타났다는 사실을 알 수 있다.

## Limitations

  이 논문에서는 DiffPure에 대해서 다음과 같은 한계점 또한 제시하고 있다.

  1. Purification process가 diffusion timestep에 비례해서 나타나므로 매우 시간이 오래 걸려서 실제 상황에 적용하기가 어렵다.
  2. DM은 이미지 색상에 매우 민감하므로 색상에 대한 attack은 막기가 힘들다.




