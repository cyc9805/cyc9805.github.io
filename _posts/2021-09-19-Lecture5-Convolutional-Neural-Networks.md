---
layout: single
title:  "Lecture 5: Convolutional Neural Networks"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
  - cs231n
---


## History of Neural Networks

인공 신경망의 본격적인 연구가 이루어진 것은 비교적 최근이다. 컴퓨터가 개발되기 전에 사람들은 다음과 같은 이론은 내놓았다.

 1. 1957년에 Frank Rosenblatt는 알파벳을 인식하는 기계를 고안했다.
 2. 1986년에 역전파를 통해 최적의 가중치를 찾는 연구가 활발히 이루어졌다.
 3. 1998년에 LeCun, Bottou, Bengio, Haffner가 경사 하강법(gradient descent)를 처음으로 글자 인식에 적용해 보았다.
 4. 2012년에 Alex Krizhevsky가 AlexNet을 개발하였다. 이는 현대 CNN 모델의 근간이 된 중요한 모델이다.
 5, 2021년 현재, CNN은 컴퓨터 비전 분야의 모든 곳에서 사용되고 있다.
 
 

## Convolutional Neural Networks
 
Convolutional Neural Networks (이하 CNN) 은 다음과 같은 방법으로 작동한다.
  1. 다음과 같은 ***이미지 데이터*** 와 ***필터*** 가 존재한다.
  
  ![](/assets/image/lecture5-1.png)
   <br> 2. 아래 사진과 같이 필터가 입력 이미지 데이터를 특정한 순서대로 하나씩 훑어나간다. 그리고 필터에 입력된 숫자와 해당되는 입력 이미지 픽셀의 숫자와 내적한 값을 출력한다. 
  
  ![](/assets/image/lecture5-2.png)   
   
  <br> 3. 이러한 과정을 한번 끝내게 되면 깊이가 1인 출력 이미지 데이터가 생성이 된다. 필터가 입력 이미지 데이터를 훑는 과정은 여러개의 필터에 의해서 연속적으로 이루어진다. 만약 필터의 개수가 6개라고 가정하면 최종적으로 출력되는 이미지 데이터의 깊이는 6이 된다.
  
  ![](/assets/image/lecture5-3.png)
   
  <br> 4. CNN의 마지막 층은 항상 fully connected layer, 즉 최종 출력 데이터를 1차원으로 만드는 레이어가 적용이 된다. 
   
  <br> 5. 여러개의 층(필터)를 많이 쌓을수록 모델은 이미지 데이터의 복잡한 디테일을 학습할 수 있게된다. 아래 사진에서는 층을 1개, 3개, 5개를 쌓았을때 모델이 학습하는 정도를 비교하고 있다.
  
  ![](/assets/image/lecture5-4.png)
   

### Parameters of CNN

다음은 CNN 모델을 만들기 위해서 지정해야 하는 파라미터이다.

1. Stride: 필터가 이미지 데이터를 훑고 지나갈때 몇 칸만큼 이동하는지 지정하는 인수이다.
2. Pad: 입력 이미지 데이터의 모서리에 얼마만큼의 픽셀을 추가할지를 지정하는 인수이다. 이때, 추가된 픽셀은 출력 이미지 데이터의 값에 영향을 주지 않도록 하기위해 값이 0으로 설정된다.

![](/assets/image/lecture5-5.png)

다음 식은 ***입력 이미지 데이터의 크기*** 를 N, ***필터의 크기*** 를 F, ***stride*** 를 S, ***pad*** 를 P 라고 할 때 출력되는 이미지 데이터의 크기 M을 알기 위해 사용되는 공식이다.

$ M = {(N+2P-F)/S}+1 $



### Other layers

convolutional layer은 앞서 설명했다시피 필터에 입력된 숫자와 해당되는 입력 이미지 픽셀의 숫자와 내적한 값을 출력하는 방법으로 계산을 진행한다. convolutional layer외에도 다음과 같은 두가지의 layer 이 존재한다.

1. Pooling layer: 이미지 데이터에서 이루어지는 계산을 단순화 시키기 위해서 이미지의 크기를 줄이는 레이어이다.

![](/assets/image/lecture5-6.png)

<br> 2. Maxpooling layer: 이미지 데이터와 필터의 일치하는 픽셀의 내적 값을 구하는 대신 필터 안에 나타나는 이미지 데이터의 가장 큰 픽셀 값을 저장하는 레이어이다.

![](/assets/image/lecture5-7.png)

다음은 차 사진에 앞서 설명한 레이어들을 모두 적용했을때의 모습이다.

![](/assets/image/lecture5-8.png)



### Trends of CNN
 
  - 필터의 크기를 줄이고 최대한 층을 많이 쌓는다.
  - Maxpooling layer과 fully connected layer을 빼고 오직 convolutional layer만 적용한다.
  
