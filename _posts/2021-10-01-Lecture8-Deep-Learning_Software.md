---
layout: single
title:  "Lecture 8: Deep Learning Software"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


## CPU vs GPU

이 부분은 사실 별로 중요한 내용이 아닌것 같아서 간단하게 설명하고 넘어가도록 하겠다. 

- CPU는 적은 코어 수를 가지고 있으나 각각의 코어의 속도가 빠르고 성능이 훨씬 더 좋다. 따라서 연속적인 작업을 할 떄 유리하다.
- 많은 코어 수를 가지고 있으나 각각의 코어의 속도는 느리고 성능이 좋지 않다. 병행 작업을 할 때 유리하다.

다음은 CPU와 GPU를 딥러닝 작업에 사용할 때 걸리는 시간을 비교한 그래프이다.

![](/assets/image/lecture8-1.png)

위 그래프에서 알 수 있다시피 CPU보다 GPU가 훨씬 더 좋은 성능을 보이고 있음을 알 수 있다. 이처럼 딥러닝 작업에는 GPU를 이용해 연산을 진행하는 것이 좋다.



### NVIDIA vs AMD

GPU를 만드는 대표적인 회사가 두 군대 있는데, 바로 NVIDIA 와 AMD 이다. NVIDIA가 AMD보다 딥러닝을 위한 GPU를 만드는데 더 투자를 많이 해왔기 때문에 AMD보다 NVIDIA를 사용하는 것이 추천된다.




## Deep Learning Software

기업들은 상업적인 목적으로 딥러닝 소프트웨어을 만들었다. 여기서 딥러닝 프레임워크라는 개념이 나온다.
