---
layout: single
title:  "Lecture 4: Backpropagation and Neural Network"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


## What is Backpropagation?

역전파(Backpropagtion)는 원하는 값을 출력하는 최적의 모델을 만들기 위해서 가중치를 조정하는 방법이다. 역전파 과정을 쉽게 알아보기 위한 방법으로 computational graph 가 사용된다.


### Structure of Computational graph

![](/assets/image/lecture4-1.png)

위 그림을 보면 처음에 가중치 행렬 W 와 사진 데이터 x 를 곱한 후 정규화 행렬 R을 더한다. 이렇게 계산과정을 직접 그림으로 표현해 알아보기 쉽게 만든 것이 computational graph 이다.


### Example of Backpropagtion

다음과 같은 x=-2, y=5, z=-4 로 이루어진 간단한 함수가 있다고 하자.

$f(x,y,z)=(x+y)z$

이것을 computational graph 로 나타내면 다음과 같다.

![](/assets/image/lecture4-2.png)

여기서 최적의 가중치를 찾기 위해서는 f 함수를 x,y,z 로 각각 미분한 값을 찾아야 한다. 한번에 이 값을 찾을 수 없으므로 f를 q와 z로, q를 x와 y로 미분한 값을 차례로 찾는다.

![](/assets/image/lecture4-3.png){: width="60%" height="60%"}{: .align-center}
![](/assets/image/lecture4-4.png)

이 때, 연쇄법칙(chain rule)을 이용하여 원하는 미분 값을 얻을 수 있다. 즉, ***local gradient*** 와 ***upstream gradient*** 를 곱하는 것이다. 

$\frac{\partial f}{\partial x}=\frac{\partial f}{\partial q}\frac{\partial q}{\partial x}=z=-4$

$\frac{\partial f}{\partial y}=\frac{\partial f}{\partial q}\frac{\partial q}{\partial y}=z=-4$

이렇게 찾은 미분 값을 연쇄법칙을 이용해 차례로 곱하면 원하는 변수로 미분한 값을 쉽게 찾을 수 있다.

다음은 좀 더 복잡한 공식을 활용한 예시이다.

![](/assets/image/lecture4-5.png)

계산 과정에 대한 설명은 다소 길어지고 중복된 내용이 나올 수 있으므로 생략하도록 하겠다. ***local gradient*** 와 ***upstream gradient*** 를 곱하면서 차례로 게산해 나가면 $w_0$, $w_1$, $x_0$, $x_1$, $w_2$ 로 미분한 값을 찾을 수 있다는 것만 명심하면 되겠다. 그리고 위와 같은 예시의 경우 여러개의 계산과정을 하나로 묶어 계산 과정을 쉽게 만드는 것도 가능하다.

![](/assets/image/lecture4-7.png)
![](/assets/image/lecture4-6.png)


### Patterns in backward flow

역전파 과정에는 일정한 규칙이 있다. 이러한 규칙에는 크게 3가지가 있다.
  1. add gate: gradient distributor, 즉 local gradient 가 항상 1인 상태로 upstream gradient 만 존재한다. 
  2. max gate: gradient router, 즉 gradient가 단순히 통과하는 효과를 가진다.
  3. mul gate: gradient switcher, 즉 곱하는 다른 값의 변수를 갖는다.



### Vectorzied operations

앞서 살펴본 예시는 정말 간단한 예시이다. 이미지 데이터는 행과 열의 수가 100단위가 넘어가는 경우가 많으므로 위와 같이 computational graph를 일일히 그리는 것은 매우 오래걸리고 번거로운 일이다. 이때 간단하게 각각의 변수들을 편미분하여 이를 행렬의 형태로 나타낸 ***Jacobian Matrix*** 가 사용된다. 이 Jacobian Matrix의 몇가지 특징은 다음과 같다. 

  1. 4096차원(열) 을 가진 데이터가 입력되고 같은 차원의 데이터가 출력되면 Jacobian Matrix의 크기는 4096x4096이 된다.
  2. 입력 데이터의 각각의 차원은 출력 데이터의 일치하는 차원에만 영향을 준다.
  3. 대각행렬이다.
  
---
지금까지 배운 내용을 최종적으로 정리해보면 다음과 같다.

  - Foward pass(포워드 패스): 노드의 값을 구하기 위해 함수에 값을 넣어가며 계산하는 방법이다.
  - Backward pass (백워드 패스): 노드의 gradient를 구하기 위해 Forward pass를 통해 구한 값을 바탕으로 Jacobian Matrix를 구하는 과정이다. 역전파를 위해 사용되는 과정이다.



## Neural Networks

신경망(Neural Networks)이란 간단하게 입력 데이터에 여러개의 가중치 행렬이 차례로 적용함으로써 노드의 값을 구하는 것이다. 만약 다음과 같이 2개의 층을 가진 신경망이 있다고 하자.

![](/assets/image/lecture4-8.png)

위와 같은 모습의 신경망은 아래와 같은 공식으로 나타낼 수 있다.

$f(x)=W_2 max(0,W_1 x)$

이 신경망은 즉 3072의 차원을 $W_1$의 가중치를 가진 층을 거쳐 100차원으로 줄이고 이를 $W_2$의 가중치를 가진 층을 거쳐 10차원으로 줄인다. 층을 더 쌓을수록 High level(고차원)부터 Low level(저차원)적인 특징을 모두 고려하여 계산할 수 있게된다.



## Analogy between neurons and neural networks

인공 신경망의 걔념은 우리 몸안에 있는 뉴런세포로 부터 차용한 것이다. 우선 뉴런은 다음과 같은 구조로 이루어져 있다.

!['뉴런'](/assets/image/lecture4-9.png)

dendrite를 통해 cell body가 자극신호를 전달 받고 이를 다시 axon 으로 연결되있는 다른 cell body 에 전달을 하게 된다. 이 때 axon을 통해 전달할때 자극이 일정 기준치를 넘어야지 전달이 된다.
다음은 인경 신경망의 기본적인 구조이다.

![](/assets/image/lecture4-10.png)

인공신경망이 뉴런과 비슷한 원리로 작동하게 된다는 것을 알 수 있다. 여기서 ***activation function*** 이라는 개념이 나오는데, 이는 자극이 전달되도록 하기 위한 일정한 기준이 되는 함수이다. 활성화 함수(activation function)는 다양하게 존재하는데, 대표적인 함수는 다음과 같다.

![](/assets/image/lecture4-11.png)

여기서 ReLU 함수가 가장 자주 사용된다. 활성화 함수에 대한 자세한 내용은 추후 강의에 자세히 다룰 예정이다.
