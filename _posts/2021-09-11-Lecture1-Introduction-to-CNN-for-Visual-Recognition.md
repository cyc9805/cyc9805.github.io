---
layout: single
title:  "Lecture 1: Introduction to CNN for Visual Recognition"
comments: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
  - cs231n
---


## What is computer vision?

컴퓨터 비전은 기계가 받아들이는 시각적 데이터를 연구하는 학문이다.

![related studies to computer vision](/assets/image/lecture1-1.png)

위 그림과 같이 컴퓨터 비전에는 여러 학문이 복합적으로 작용함을 알 수 있다.


## History of computer vision

  1. biology vision
     - vision(시야)는 생물체가 살아가는데 있어 매우 중요한 요소이다.
     - 시야의 생성으로 생물체는 급속도로 진화하기 시작했다.
    
  2. computer vision
     - 1960년에 물질을 벡터 형식으로 나타내는 것으로 부터 시작 되었다.
     - ideal thinking process for vision: input image --> edge image --> 1/2D sketch --> 3D image
    ![related studies to computer vision](/assets/image/lecture1-2.png)<br>
     
     - object recognition 연구보다 object segmentation 연구가 선행해서 이루어 졌다.
     - 다음 사진은 제일 방대한 이미지 데이터셋인 ImageNET 을 이용한 object recognition 의 발전과정이다. 2015년에 CNN 모델의 개발로 기계가 인간보다 object recognition의 성능이 더 좋다는 것을 확인할 수 있다.
    ![growth of object recognition by ImageNET](/assets/image/lecture1-3.png)
  


## Complexity of computer vision

<br>![](/assets/image/lecture1-4.png)

위 사진을 한번 보자.
우리는 위 사진에서 다음과 같은 요소들을 확인할 수 있다.
  - 저울에 사람이 서있다.
  - 저울을 뒤의 다른 사람이 발로 누르고 있다.
  - 뒤의 사람은 버락 오바마다.
  - 또 뒤에는 웃고 있는 사람들이 있다.
  
  이렇듯 우리는 이 사진을 보고 단순히 '저기 여러명의 웃고 있는 사람이 있다' 라고 인식하는 것이 아닌 '미국 대통령이 격식에 맞지 않는 소탈한 행동을 보이고 있는 모습이 재밌네' 라고 생각한다. 이렇듯 사진에서 전달하는 표면적인 정보 뿐만 아니라 사진 속에 숨겨진 여러 문맥들을 이해하는 것이 컴퓨터 비전의 최종 목표라고 할 수 있다. 
