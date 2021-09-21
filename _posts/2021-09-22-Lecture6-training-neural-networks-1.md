---
layout: single
title:  "Lecture 6: Training Neural Networks 1"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


## Activation Functions

활성화 함수는 가중치와 입력 데이터를 곱한 값에 정규화를 한 값을 다음 레이어로 어떠한 값으로 전달할지 지정하는 함수이다. 대표적인 활성화 함수로 ***Sigmoid, tanh, ReLU, Leaky ReLU, Maxout, ELU*** 가 있다. 


### Sigmoid

시그모이드 함수의 모습은 다음과 같다.
    
![](/assets/image/lecture6-1.png)
$\sigma(x)=1/(1+e^{-x})$ 

이 함수는 입력 데이터를 0과 1사이로 변환한다. 그러나 이 함수에는 치명적인 단점 3개가 존재하기 때문에 잘 사용되지 않는데, 3가지 단점은 다음과 같다.

  1. 입력 데이터가 특정 값을 넘어가거나 넘지 못하면 gradient가 0으로 수렴한다. 즉, gradient descent를 하지 못하기 때문에 역전파를 하지 못한다.
  2. 시그모이드 함수의 출력값의 중심이 0이 되지 않는다. 출력값의 중심이 0이 되지 않으면 가중치 행렬의 gradient가 모두 양수이거나 음수의 형태를 띄게된다. 이 말인즉슨 역전파를 할때 가중치 값이 모두 증가하거나 감소하여 최적의 가중치 행렬을 찾기 어렵다는 말이 된다.
  3. 자연함수 $e$ 가 들어가는 계산이므로 계산과정이 오래 걸린다. 


### tanh

tanh 함수의 모습은 다음과 같다.

![](/assets/image/lecture6-2.png)

이 함수는 출력값의 중심이 0이 되지 않는다는 점만 제외하면 시그모이드 함수와 같은 단점을 가지고 있어 마찬가지로 자주 사용되지는 않는다.


### ReLU

ReLU의 모습은 다음과 같다.

![](/assets/image/lecture6-3.png)    
$f(x)=max(0,x)$

ReLU의 장점은 다음과 같다.

  1. 입력 데이터가 양수일때 gradient가 1로 수렴하지 않는다.
  2. 계산과정이 단순하고 빠르다.
  3. 실제 뉴런과 작동하는 방법이 비슷하다.

반면 단점은 다음과 같다.

  1. 입력 데이터가 음수일때 gradient가 0으로 수렴한다.
  2. 출력값의 중심이 0이 되지 않는다.
  3. 아래 사진과 같이 데이터들이 존재하는 지역 밖에 함수가 존재하면 dead ReLU, 즉 죽은 ReLU가 되어 더 이상 업데이트가 되지 않는 함수가 된다. 
  
  ![](/assets/image/lecture6-4.png) 


### Leaky ReLU, PreReLU

Leaky ReLU의 모습은 다음과 같다.

![](/assets/image/lecture6-5.png) 
$f(x)=max(0.01x,x)$

기본적인 형태는 ReLU와 비슷하나 ReLU에 비해 입력 데이터가 음수일때 gradient가 0으로 수렴하지 않는다는 장점을 가지고 있다. 

PreReLU도 다음과 같이 ReLU와 비슷한 함수이다.
$f(x)=max(\alpha x,x)$

여기서 $\alpha$는 역전파 과정을 통해 찾아나간다.


### ELU

ELU의 모습은 다음과 같다.

![](/assets/image/lecture6-6.png)

ReLU의 모든 장점을 공유하고 있으나 자연함수 $e$가 포함된 계산과정이 있기 때문에 계산하는 시간이 오래 걸린다는 단점이 있다.


### Maxout

Maxout의 모습은 다음과 같다.

$max(w_1^{T}x+b_1,w_2^{T}x+b_2)$

이 함수는 ReLU와 LeakyReLU를 일반화하여 ReLU의 단점을 모두 극복한 것에 의의가 있다. 그러나 기존 ReLU의 계산과정의 두배가 된다는 점이 단점이다.


### Choosing Activation Functions

어떠한 활성화 함수를 써야되는지에 대한 간단한 팁이다.

  - 처음에는 ReLU 함수를 사용한다. 이때 learning rate를 잘 설정하는 것이 중요하다.
  - 다음으로 Leaky ReLU, Maxout, ELU를 사용해본다.
  - tanh는 한번쯤 시도해보나 결과에 대한 기대는 하지 않는 것이 좋다.
  - sigmoid는 절대 사용하지 않는다.
  
  

## Data Preprocessing

이미지를 훈련시키기 전에 전처리를 하는 것이 좋다. 추천되는 전처리 과정은 zero centering, 즉 데이터의 평균이 0이 되게 하는 것이다. 이때, 이미지 데이터의 분포와 크기를 보존하기 위해 정규화 과정은 잘 사용되지 않는다. 

![](/assets/image/lecture6-7.png)

zero centering 외의 추천하는 전처리는 이미지의 차원을 줄이는 PCA, 분산을 1로 만드는 whitening 등이 있다.

![](/assets/image/lecture6-8.png)

여기서 정규화를 위해 평균을 구하는 2가지의 다른 방법이 있다.

  1. 이미지의 차원은 생각하지 않고 각 픽셀의 평균을 구한다. (ex: AlexNet) 
  2. 차원별로 각 픽셀의 평균을 구한다. (ex: VGGNet)
  


## Weight initalization

정확한 훈련 모델을 만들기 위해 초기 가중치 값을 잘 설정하는 것은 매우 중요하다. 어떠한 값을 설정하는 것이 좋을지 여러가지 방법을 한번 살펴보자.

1. 작은 랜덤 숫자로 설정한다
  - 레이어가 중첩될수록 표준편차가 0에 가까워지므로 좋은 방법이 아니다. 
  
  ![](/assets/image/lecture6-9.png)

2. 큰 랜덤 숫자로 설정한다.
  - 레이어가 중첩될수록 표준편차가 -1 또는 1에 가까워지므로 좋은 방법이 아니다.
  
  ![](/assets/image/lecture6-10.png)
  
3. Xavier initalization

  - 입력 데이터의 분산과 출력 데이터의 분산을 같게 만드는 방법이다.
  - 가장 이상적인 방법으로, 레이어를 중첩할수록 표준편차가 감소하며 특정 값으로 수렴하는 형태이다.
  
  ![](/assets/image/lecture6-11.png)
  
  - ReLU를 사용할때는 입력 데이터를 2로 나누어야지 정상적으로 작동한다.
  
  ![](/assets/image/lecture6-12.png)
  


## Batch Normalization

***배치 정규화(Batch Normalization)*** 는 이미지를 학습하면서 데이터의 분포가 변형되지 않도록 하기 위한 방법이다. 일반 정규화와 다른 점은 차원별로 배치의 정규화를 한다는 것에 있다. 배치 정규화의 기본적인 공식은 다음과 같다.

$\hat{x}^{(k)}=\frac{x^{(k)}-E[x^{(k)}]}{\sqrt{Var[x^{(k)}]}}$
  
배치 정규화는 주로 fully connected layer, convolutional layer 바로 다음에 이루어진다.

그리고 배치 정규화된 데이터를 다시 정규화 되기 전의 데이터로 변경해야되는 경우가 많이 생긴다. 따라서 이전 데이터를 복구하기 위한 변수인 $\gamma$ 와 $\beta$ 또한 배치 정규화 과정에서 계산한다.

$y^{(k)}=\gamma^{(k)} \hat{x}^{(k)}+\beta^{(k)}$

배치 정규화의 장점은 다음과 같다.
1. gradient flow가 간단해진다.
2. 높은 learning rate의 사용이 가능해진다.
3. 초기 가중치 값 설정에 대한 부담을 덜어준다.
4. dropout 사용의 필요성이 다소 감소한다.

아래 사진에 배치 정규화에 대해 배운 내용을 간단하게 정리한 내용이 나와있다.

![](/assets/image/lecture6-13.png)



## Monitoring the training

이미지의 훈련은 다음과 같은 과정으로 이루어진다.

1. 이미지 데이터를 전처리한다.
2. 훈련 모델의 구조를 설계한다. 이때, 층의 개수, 노드의 개수등을 정한다.
3. 
