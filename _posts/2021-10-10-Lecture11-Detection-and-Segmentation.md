---
layout: single
title:  "Lecture 11: Detection and Segementation"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


현재까진 이미지에 나타난 물체를 특정 카테고리로 분류하는 이미지 분류(image classification) 에 대해 집중적으로 배워보았다. 그러나 컴퓨터 비전은 분할 (segmentation), 탐지 (detection)도 수행할 수 있다. 각각의 역할에 대해 간단하게 
알아보자


## Semantic Segmentation(영상 분할)

영상 분할은 영상에 나타난 여러 물체를 픽셀 단위로 특정 카테고리로 분류하여 나타내는 작업이다. 다음 사진은 풀밭에 서있는 고양이 사진을 픽셀 단위로 카테고리로 분류한 모습이다. 

![](/assets/image/lecture11-1.png){: width="30%" height="30%"}{: .align-center}


## Classification + Localization

localization은 객체라고 판단되는 곳에 직사각형 박스를 그리고 classification 은그 박스 안에 있는 객체를 특정 카테고리로 분류하는 과정이다. 아래 사진은 고양이 주변에 박스를 그리고 고양이로 알맞게 분류한 모습이다. 

![](/assets/image/lecture11-2.png){: width="30%" height="30%"}{: .align-center}


## Object Detection(객체 탐지)

Classification + Localization 와 같은 걔념이다. 차이점이라고 하면 객체 탐지는 탐지 전에 몇 개의 물체가 사진에 나타나는지에 대한 정보가 주어지지 않는다는 것이다. 아래 사진은 개 2마리와 고양이 1마리 주변에 박스를 그려 올바른 카테고리로 알맞게 탐지한 모습이다.

![](/assets/image/lecture11-3.png){: width="30%" height="30%"}{: .align-center}


## Instance Segmentation(객체 분할)

영상 분할과 객체 탐지를 합친 개념이다. 즉, 사진에 나타나는 객체를 탐지하고 이에 해당되는 픽셀에 레이블을 붙힌다. 아래 사진은 위 사진에서 객체 분할을 실시한 모습이다.

![](/assets/image/lecture11-4.png){: width="30%" height="30%"}{: .align-center}


---

시험기간이여서 중요한 부분만 간단하게 정리하였다(...)