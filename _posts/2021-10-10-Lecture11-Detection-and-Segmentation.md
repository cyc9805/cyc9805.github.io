---
layout: single
title:  "Lecture 10: Recurrent Neural Network"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


## Process Sequence of Recurrent Neural Network

일반 Neural Network 의 모습은 다음과 같다.

![](/assets/image/lecture10-1.png){: width="30%" height="30%"}{: .align-center}

일반 Neural Network 는 입력 데이터가 은닉층을 지나면 결과 값을 출력하는 형태로 되어있다. 그러나 이는 입력 데이터가 한가지 타입으로만 이루어져 있으면 제대로 된 처리를 할 수 없다는 단점이 있다. Recurrent Neural Network (줄여서 RNN) 은 다양한 타입으로 이루어진 데이터를 처리하고 출력할 수 있다.

![](/assets/image/lecture10-2.png)

다음은 각각의 경우에 대한 예시이다.

1. one to many: 이미지 -> 이미지를 묘사하는 문장 만들기
2. many to one: 자연어 문장 -> 주제 파악하기
3. many to many: 영어로 된 문장 -> 프랑스어로 된 문장
4. many to many: 프레임 레벨 단위로 이미지 분류


##  Architecture of Recurrent Neural Network

RNN은 다음과 같은 순서로 작동한다.

![](/assets/image/lecture10-3.png){: width="30%" height="30%"}{: .align-center}

1. Recurrent coil로 이루어진 RNN 레이어에 입력 데이터가 적용된다.
2. RNN의 은닉층의 파라미터가 새로운 입력 데이터를 입력 받을때마다 업데이트한다.
3. RNN 은닉층이 결과 값을 출력한다.

위 과정을 수식으로 표현하면 다음과 같다.

$h_t = f_w(h_{t-1},x_t)$

여기서 $h_t$는 새로운 은닉상태, $f_w$는 가중치 행렬로 이루어진 함수, $h_{t-1}$는 예전 은닉상태, $x_t$는 입력 데이터이다.

$x_t$는 시간 단위로 바뀌는 데이터로, $f_w$는 시간이 지나도 유지되는 함수이다.

아래 수식은 $h_t$의 변화 과정, $f_w$를 $tanh$ 로 설정하였을 때 모습이다.

![](/assets/image/lecture10-4.png)


### Computational Graph of Recurrent Neural Network

RNN이 작동하는 과정을 computational graph 로 다시 표현해보았다.

![](/assets/image/lecture10-5.png)

$h_0$은 주로 0으로만 이루어진 행렬이다. $h$가 시간이 갈수록 바뀌는 과정을 표현하고 있는데, 이때 사용되는 가중치 행렬은 그대로 유지된다. 
RNN의 one-to-many, many-to-one, many-to-many의 경우에 대해 각각 computaional graph로 나타내 보았다.

1. one-to-many

![](/assets/image/lecture10-6.png)

<br>2. many-to-one

![](/assets/image/lecture10-7.png)

<br>3. many-to-many

![](/assets/image/lecture10-8.png)

위 그림에서 RNN모델의 각 은닉상태에 대한 계산값과 손실값을 계산하였는데, 손실값을 이용하여 gradient flow를 할 수 있게된다.



### Character-level Language Model

RNN이 사용되는 대표적인 사례라고 하면 Character-level Language Model 이 있다. 이 모델은 다음에 나올 문자가 타겟 변수가 되어 다음에 나올 문자를 예측하는 식으로 작동한다.

![](/assets/image/lecture10-9.png)

다음에 나올 문자를 분류하여 예측하는 형태로 작동하므로 출력값에 softmax classifier 가 적용한다.



### Truncated Backpropagation through time

RNN은 시간이 지남에 따라 학습을 하므로 RNN의 역전파는 즉 시간을 거슬러가는 것으로 생각할 수 있다. 그러나 RNN은 각각의 손실 값에 대한 gradient를 모두 구하므로 역전파 과정이 상당히 복잡하고 오래 걸릴 수 있다. 이 문제를 해결하기 위해 고안된 방법이 바로 ***Truncated Backpropagation through time*** 이다. 

![](/assets/image/lecture10-10.png)

Truncated Backpropagation through time 은 계산과정을 간단하게 하기 위해 위 사진처럼 모든 과정을 분할한다. 



### Implementation of RNN

아래 사진과 같이 여러개의 셰익스피어 작품들을 RNN 모델에 훈련시켰더니 셰익스피어 문체와 상당히 비슷한 문장을 만들어내는 것을 볼 수 있다.

![](/assets/image/lecture10-11.png)

또한 algebraic geometry textbook을 학습시켰더니 다음과 같이 그럴싸한 textbook 페이지를 만들어 낸 것을 볼 수 있다.

![](/assets/image/lecture10-12.png)

c언어로 된 코드를 학습시켰더니 다음과 같이 c언어로 된 코드를 만들어낸 것도 확인할 수 있다.

![](/assets/image/lecture10-13.png)

그러나 위의 모든 경우에서 내용을 자세히 보면 상당히 말이 안되고 이해가 전혀 되지 않는 문장이라는 것을 볼 수 있다. 결국 인간이 완전히 이해할 수 있을 정도의 문장을 만들어 내는것이 RNN 모델의 최종목표이다. 



### Image Captioning

컴퓨터 비전에서 RNN은 CNN과 함께 image captioning에 활용된다. 
다음과 같은 사진이 있다.

![](/assets/image/lecture10-14.png){: width="50%" height="50%"}{: .align-center}

이 사진은 다음과 같은 과정을 통해 image captioning 이 이루어진다.

1. 이미지가 CNN 모델에 입력이 되어 1차원 데이터로 출력을 한다.

![](/assets/image/lecture10-15.png){: width="70%" height="70%"}{: .align-center}
<br>2. 출력된 데이터가 RNN 모델에 입력이 되어 사진에 대한 묘사를 하는 문장을 출력한다. 이때, 문장을 만들기 위해서는 시작신호와 종료신호가 필요하다.

![](/assets/image/lecture10-16.png){: width="70%" height="70%"}{: .align-center}



### Image Captioning with Attention

image captioning을 사진의 모든 부분이 아닌 일부분만 선정하여 그 부분만 학습할 수 있게 할 수 있다. 이렇게 하면 CNN의 출력값은 1차원이 아닌 L(지역에 대한 정보값) x D(특징값)인 2차원 데이터가 된다.

![](/assets/image/lecture10-17.png){: width="70%" height="70%"}{: .align-center}

각 은닉층에 대한 결과로 지역에 대한 정보값과 사진의 일부분을 묘사한 단어가 나온다.
이러한 과정을 모든 지역에 대해 반복하여 다음과 같이 사진 전체를 묘사한 문장을 생성할 수 있다.

![](/assets/image/lecture10-18.png)



### Multilayer RNNs

기존 RNN모델에 은닉 레이어를 더 쌓아서 모델을 더 깊게 만들 수 있다. 단, 레이어를 5개 이상으로 쌓는 것은 좋지 않다.

![](/assets/image/lecture10-19.png)



### RNN gradient flow

일반 RNN모델에서 gradient flow는 다음과 같이 이루어진다. 

![](/assets/image/lecture10-20.png)

$h_t$, $tanh$, $W$, $h_(t-1)$순으로 역전파가 이루어진다. 즉, 역전파를 할때마다 $W$의 전치행렬을 곱하게 된다. 따라서 RNN의 구조가 더 깊어질수록 이러한 계산은 매우 복잡하게 변하고 $W$의 전치행렬의 값에 따라 gradient값이 달라진다.

1. 전치행렬의 가장 큰 값이 1보다 크다 -> gradient가 발산한다.
2. 전치행렬의 가장 큰 값이 1보다 작다 -> gradient가 0으로 수렴한다.

이렇게 역전파를 할때 생기는 문제를 해결하기 위해 고안된 방법이 Long Short Term Memory(LSTM)이다. 



### Long Short Term Memory(LSTM)

LSTM의 기본적인 공식은 다음과 같다.

![](/assets/image/lecture10-21.png)

여기서 $\sigma$는 시그모이드 함수를 의미하고 $f, i, g, o$는 다음을 의미한다.

1. $f$: forget gate - 셀을 지울지 말지를 결정한다.
2. $i$: input gate - 셀에 입력을 할지 말지를 결정한다.
3. $g$: gate gate(?) - 셀에 얼마만큼 입력할지 결정한다. 
4. $o$: output gate - 셀을 얼마만큼 보여줄지 결정한다.

LSTM은 아래와 같은 과정으로 작동한다.

![](/assets/image/lecture10-22.png)

$f, i, g, o$의 값에 따라 다음$c_t$의 값이 결정된다. 이때 $h_t$값은 별도의 입력이나 출력되는 것 없이 $c_t$값에만 영향을 받으므로 gradient flow를 할때 다음과 같이 $c_t$ 값만 고려하면 된다. 

![](/assets/image/lecture10-23.png){: width="100%" height="150"%"}{: .align-center}



## Summary

- 일반 RNN 구조는 간단하나 gradient flow의 어려움 때문에 잘 사용되지 않는다.
- gradient flow 문제를 해결한 LSTM을 사용하는 것을 추천한다.
- 더 간단하지만 좋은 성능을 보이는 RNN 구조를 만드는 방향으로 현재 연구가 진행되고 있다.
