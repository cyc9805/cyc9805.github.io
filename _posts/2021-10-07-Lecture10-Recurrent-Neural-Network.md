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

![](/assets/image/lecture10-1.png)

일반 Neural Network 는 입력 데이터가 은닉층을 지나면 결과 값을 출력하는 형태로 되어있다. 그러나 이는 입력 데이터가 한가지 타입으로만 이루어져 있으면 제대로 된 처리를 할 수 없다는 단점이 있다. Recurrent Neural Network (줄여서 RNN) 은 다양한 타입으로 이루어진 데이터를 처리하고 출력할 수 있다.

![](/assets/image/lecture10-2.png)

다음은 각각의 경우에 대한 예시이다.

1. one to many: 이미지 -> 이미지를 묘사하는 문장 만들기
2. many to one: 자연어 문장 -> 주제 파악하기
3. many to many: 영어로 된 문장 -> 프랑스어로 된 문장
4. many to many: 프레임 레벨 단위로 이미지 분류


##  

RNN은 다음과 같은 순서로 작동한다.

![](/assets/image/lecture10-3.png)

1. Recurrent coil로 이루어진 RNN 레이어에 입력 데이터가 적용된다.
2. RNN의 은닉층의 파라미터가 새로운 입력 데이터를 입력 받을때마다 업데이트한다.
3. RNN 은닉층이 결과 값을 출력한다.

위 과정을 수식으로 표현하면 다음과 같다.

$h_t = f_w(h_t-1,x_t)$

여기서 $h_t$는 새로운 상태, $f_w$는 가중치 행렬로 이루어진 함수, $h_t-1$는 예전 상태, $x_t$는 입력 데이터이다.

$x_t$는 시간 단위로 바뀌는 데이터로, 
GPU를 만드는 대표적인 회사가 두 군대 있는데, 바로 NVIDIA 와 AMD 이다. NVIDIA가 AMD보다 딥러닝을 위한 GPU를 만드는데 더 투자를 많이 해왔기 때문에 AMD보다 NVIDIA를 사용하는 것이 추천된다.




## Deep Learning Software

기업들은 상업적인 목적으로 딥러닝 소프트웨어을 만들었다. 여기서 딥러닝 프레임워크라는 개념이 나온다.
