---
layout: single
title:  "Lecture 9: CNN Architectures"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


## CNN Architectures


CNN에는 다양한 구조가 존재한다. 유명한 구조에는 ***AlexNet, VGG, GoogLeNet, ResNet*** 가 있다. 이 구조들을 ImageNet classification 대회에서 우승한 연도 순서대로 설명하겠다. 

**<u>참고 사항</u>** 이 단원을 다루면서 레이어의 파라미터의 총 개수를 구하는 경우가 많을 것이다. 레이어의 파라미터 총 개수는 다음과 같이 구한다.
{: .notice--primary} 

$(total \, parmeter) = (filter \, size)^2\times (number \, of\, channels)\times(number\,  of\, filters)$

위 공식은 가중치 값을 가진 레이어에만 적용이 되고 Maxpooling 과 같이 가중치 값이 존재하지 않는 레이어는 파라미터의 총 개수는 무조건 0이다.
{: .notice--primary} 



### LeNet-5

LeNet은 CNN의 첫번째 구조이다. 첫번째 구조인 만큼 쌓인 층 수도 적고, 필터의 크기도 최적의 결과를 위해 정해지지 않은 상태이다.  

![](/assets/image/lecture9-1.png)


### AlexNet

AlexNet은 2012년 ImageNet classification 대회에서 우승한 대규모 구조이다. 이 구조로 인해 다소 덜 중요하게 생각되었던 CNN 연구가 다시 불붙게 되었다. 다음은 AlexNet 구조의 모습이다.

![](/assets/image/lecture9-2.png)

- 입력 이미지의 크기는 227x227x3 이다.
- 첫번째 레이어에는 96개의 11x11 필터가 적용되었다.
- 첫번째 레이어의 파라미터의 개수는 $(11\times 11 \times 3)*96 = 35000$(개) 이다.
- 두번째 레이어는 Maxpooling 레이어로, 파라미터의 개수는 0이다.
- 세번째 레이어는 정규화 레이어로, 파라미터의 개수는 마찬가지로 0이다.
- 다음은 필터, Maxpooling, 정규화 레이어를 반복적으로 적용시켜 나타낸 AlexNet의 전체 구조이다. 

![](/assets/image/lecture9-3.png){: width="70%" height="70%"}{: .align-center}

- 2012년에는 모델의 훈련을 위한 GPU의 성능이 좋지 못할 때이므로 모델의 크기를 2개로 나눈 후 각자 훈련시켰다.  
- AlexNet에서 일부 레이어의 필터의 개수를 변경한 ***ZFNet*** 이 있다. 



### VGGNet

VGGNet은 기본적인 CNN구조에서 필터의 크기를 작게하고 층을 더 깊게 쌓아 성능을 비약적으로 향상시킨 구조이다. 2014년 ImageNet classification 대회에서 우승한 구조이다.

![](/assets/image/lecture9-4.png){: width="70%" height="70%"}{: .align-center}

- **<u>필터의 크기를 작게 설정한 이유는 무엇일까?</u>** 3개의 $3\times3$ 필터 사이즈를 가진 레이어는 한개의 $7\times7$ 필터 사이즈를 가진 레이어와 같다. 따라서, 모델의 비선형성을 추가하면서 깊게 쌓을 수 있게된다.
- 이미지당 메모리의 96MB 를 차지하는 매우 무거운 모델이다.
- VGG16과 VGG19는 각각 16개, 19개의 레이어를 가지고 있다. VGG19의 층 수가 더 많지만 성능은 VGG16과 큰 차이가 없다.



### GoogLeNet

GoogLeNet은 기본적인 CNN구조에서 층을 더 깊게 쌓고 계산의 효율성을 증가시킨 모델이다. 성능은 VGGNet과 비슷하며, VGGNet과 마찬가지로 2014년 ImageNet classification 대회에서 우승한 구조이다.

![](/assets/image/lecture9-5.png){: width="70%" height="70%"}{: .align-center}

- 위 그림을 통해 알 수 있듯이 GoogLeNet에는 ***Inception module*** 이라는 독특한 특징이 존재한다. Inception module 은 여러개의 다른 사이즈의 필터와 pooling 을 병행하여 기존 레이어에 적용하여 계산하고 계산한 값을 연결하여 출력하는 구조이다. 그러나 이렇게 계산을 병행할시 계산량이 엄청나게 늘어난다는 단점이 존재하기 때문에 기존 레이어의 차원을 줄여주는 ***bottleneck*** 레이어를 적용해야 한다. 이 레이어를 적용할시 계산량은 절반 이상으로 줄어든다. 아래 사진에서 왼쪽은 일반 Inception module, 오른쪽은 bottleneck 레이어를 적용한 Inception module이다. 

![](/assets/image/lecture9-6.png)

- 총 22개의 가중치 값을 가진 레이어가 존재한다.
- 마지막 레이어가 Fully Connected 레이어가 아니다.
- AlexNet보다 12배나 적은 파라미터를 가지고 있다.



### ResNet

ResNet은 2015년 ImageNet classification 대회에서 우승한 구조이다. 바로 전년도에 우승한 VGG, GoogleNet과 비교해 엄청난 성능의 향상을 불러온 모델이다

![](/assets/image/lecture9-7.png){: width="70%" height="70%"}{: .align-center}

위 그림을 보면 residual block 이라는 개념이 나온다. 한번 자세히 알아보자.



#### Residual block

모델의 층을 단순히 깊게만 쌓는다고 해서 모델의 성능이 좋아지는 것은 아니다. 아래의 그래프를 한번 참고해보자.

![](/assets/image/lecture9-8.png)

이처럼 훈련과 테스트 데이터 모두 56개의 층을 가진 모델이 20개의 층을 가진 레이어보다 좋지 않은 성능을 보이고 있음을 알 수 있다. 이러한 문제를 해결하기 위해 고안된 것이 Residual block 인데, 원리는 다음과 같다.

![](/assets/image/lecture9-9.png)

왼쪽 구조는 일반적인 plain 레이어이고, 오른쪽 구조는 residual block 이다. 두 레이어의 차이점은 한 가지인데, <u>계산하는 동안의 입력 값에 대한 정보가 주어지지 않는가(plain 레이어)</u> 아니면 <u>계산하는 동안의 입력 값에 대한 정보가 주어지는가(residual block)</u> 이다. 


<br>위의 그래프를 다시 한번 보자. $x$는 입력값, $H(x)$는 계산과정을 통해 얻은 최종 값이고 $F(x)$는 모든 레이어의 계산과정을 총칭한 함수이다. 
plain 레이어는 입력 값에 대한 정보가 주어지지 않으므로 $H(x)=F(x)$ 가 되지만 residual block은 입력 값에 대한 정보가 주어지므로 $H(x)=F(x)+x$ 가 된다. 즉, residual block은 ***기존에 학습한 정보를 보존하고, 거기에 추가적인 계산만을 실시하므로*** plain 레이어보다 연산량이 훨씬 더 줄어들게 된다. 



<br>위 과정을 이해하기 힘들다면 다음과 같은 비유를 한번 생각해보자.
<br><cite>참조: https://itrepo.tistory.com/36</cite>

1. 오픈북이 불가능한 시험
2. 오픈북이 가능한 시험

1의 경우에는 시험의 범위가 많아질수록(=층이 깊어지고 학습해야 할 양이 많아지면) 공부하기가 어려워질 것이다. 반면 2의 경우에는 이미 배웠던 내용($x$)가 주어지기 때문에 추가적으로 학습한 내용만을 공부할 것이다.

---

ResNet에 대한 설명을 마저 하도록 하겠다.

- 2개의 3x3 convolutional 레이어로 이루어진 residual block을 매우 깊게 쌓은 모델이다.
- 마지막에 1000개의 클래스로 분류하는 Fully Connected 레이어 외의 Fully Connected 레이어가 존재하지 않는다. 
- 레이어의 총 개수는 34, 50, 101, 152 개이다.
- 연산량을 더 줄이기 위해 GoogLeNet에 사용된 bottleneck 레이어를 사용하기도 한다.

![](/assets/image/lecture9-10.png)



## Comparing the models

다음은 지금까지 배운 구조를 그래프를 통해 비교한 것이다.

![](/assets/image/lecture9-11.png)

- 오른쪽 그래프에서 원의 크기는 모델의 메모리 사용량을 나타낸다.
- VGG16,19의 효율성이 가장 낮다 (원의 크기가 가장 크다).
- GoogLeNet의 효율성이 가장 높다 (원의 크기가 가장 작다).
- AlexNet의 정확도가 가장 떨어진다.
- ResNet은 적당한 효율성+가장 높은 정확도로 성능이 제일 좋은 모델이다.

다음은 구조를 훈련 시간과 훈련에 필요한 전력의 양을 비교한 그래프이다.

![](/assets/image/lecture9-12.png)



## Extra architectures

ImageNet classification 대회에서 우승한 구조외에 다양한 논문 등에서 연구한 구조에 대해 간단하게 설명하도록 하겠다.



### Network in Network (NiN)

기본적인 convolutional layer 안에 micronetwork를 추가해 더 자세한 특징을 학습할 수 있게 만든 모델이다. bottleneck 레이어의 선구자격이 되는 모델이다.  

![](/assets/image/lecture9-13.png)



### Improving ResNet

ResNet이 가장 최근에 우승한 구조인만큼 ResNet의 성능을 발전하기 위한 많은 연구가 시도 되었다. 

1. Identity Mappings in Deep Residual Networks

residual block에서 계산할때 더 직접적으로 기존 정보에 대해 알려준다. 

![](/assets/image/lecture9-14.png){: width="60%" height="60%"}{: .align-center}

<br>2. Wide Residual Networks

ResNet에서 레이어의 수보다 residual block가 더 중요하다고 생각해 F개의 필터가 아닌 F x k 개의 필터를 사용해 residual block을 더 넓게 만든 모델이다. 
이렇게 해서 만든 50개의 레이어를 가진 모델이 기존의 152개의 레이어를 가진 모델보다 더 좋은 성능을 보인다.

![](/assets/image/lecture9-15.png){: width="70%" height="70%"}{: .align-center}

<br>3. Aggregated Residual Transformations for Deep Neural Networks (ResNeXt)

Inception module과 비슷하게 residual block에 여러개의 필터를 병행하여 적용하여 residual block을 더 넓게 만든 모델이다.

![](/assets/image/lecture9-16.png){: width="60%" height="60%"}{: .align-center}

<br>4. Deep Networks with Stochastic Depth

계산할수록 gradient 값이 줄어드는 것을 막기 위해 훈련시 랜덤하게 레이어를 드롭하여 레이어 수를 줄인 모델이다. 단, 테스트 할때는 레이어를 드롭하지 않은 모델을 이용한다.

![](/assets/image/lecture9-17.png){: width="40%" height="40%"}{: .align-center}



### Beyond ResNet

다음 설명하는 모델들은 ResNet의 중요한 요소인 residual block을 사용하지 않았다.


1. FractalNet: Ultra-Deep Neural Networks without Residuals

얉은 층과 깊은 층이 병행하여 존재해 훈련시에 랜덤하게 레이어를 드롭하여 레이어 수를 줄인다. 단, 테스트 할때는 레이어를 드롭하지 않은 모델을 이용한다. 

![](/assets/image/lecture9-18.png){: width="60%" height="60%"}{: .align-center}

<br>2. Densely Connected Convolutional Networks (DenseNet)

레이어 사이에 Dense block이라는 별도의 block이 존재하는데, 이 block 안에 있는 레이어들은 다음 레이어들과 연결되어 있다. 이렇게 함으로써 계산할수록 gradient 값이 줄어드는 현상을 방지할 수 있고, 더 자세한 특징을 학습할 수 있다.

![](/assets/image/lecture9-19.png){: width="30%" height="30%"}{: .align-center}

<br>3. SqueezeNet

squeezeNet은 AlexNet과 비슷한 수준의 정확도를 가지고 있으나 50배나 적은 수의 파라미터를 요구하고 0.5MB의 용량을 가지고 있다. 1x1의 크기인 필터를 가진 squeeze 레이어와 더 큰 필터 크기를 가진 expand 레이어로 구성되어 있다.

![](/assets/image/lecture9-20.png){: width="60%" height="60%"}{: .align-center}

---
## Summary
- VGG, GoogLeNet, ResNet 모두 널리 쓰이는 모델이다.
- 이중 ResNet이 가장 좋은 성능을 보인다.
- 더 깊게 모델을 쌓으면서 성능을 높이는 방향으로 연구가 진행되고 있다.
- 레이어를 어떻게 디자인하고 gradient flow를 어떻게 향상시킬지에 대해 연구가 진행되고 있다.
