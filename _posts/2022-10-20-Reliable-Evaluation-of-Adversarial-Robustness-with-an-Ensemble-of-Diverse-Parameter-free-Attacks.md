---
layout: single
title:  "Reliable Evaluation of Adversarial Robustness with an Ensemble of Diverse Parameter free Attacks"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - Paper Review
---

## 1. Introduction

- 지금까지 많은 adversarial defense 방법이 나타났지만 추후에 등장한 발전된 공격방법에 무너지는 모습들이 많이 나타났다.

- PGD는 모델의 adversarial robustness를 평가할 수 있는 좋은 공격방법이였지만 다음과 같은 면에서 여러가지 문제를 가지고 있다.

1. 고정된 step size
2. cross entropy loss

- 해당 논문에서는 위의 두가지 문제를 해결하는 Auto-PGD를 제시한다. Auto-PGD는 PGD와는 다음과 같은 면에서 차이를 보인다. 

1. step size가 adaptive하게 선택이 된다.
2. cross entropy loss와는 별도의 손실함수가 사용된다.
3. 조절 가능한 parameter로 gradient step upadte의 반복횟수만으로 설정하여 주어진 자원에 알맞게 adpative한 공격을 할 수 있도록 설정하였다.

- 또한 공격방법의 다양성 부족은 모델의 robustness를 과대평가 하도록 만들었다. 이러한 문제를 해결하기 위해 다양한 공격방법을 ensemble한 AutoAttack을 제시한다.


## 2. Adversarial example and PGD

Adversarial example은 다음과 같이 생성된다.

<br> $argmax_{k=1,...,K}\,g_k(z)\neq c$, $d(x_{orig}, z) \le \epsilon$

여기서 $z$는 adversarial sample, $c$는 perturb 되기 전에 분류되던 클래스이다.
<br> 최적의 $z$를 찾기 위해 다음과 같은 surrogate 함수가 사용된다.

<br> $max_{z \in D}L(g(z), c)$ such that $\gamma (x_{orig}, z) \le \epsilon, z \in D$

여기서 $x$ 와 $z$사이의 거리, 즉 $\lVert z-x \rVert_p$를 최대화하는 방향으로 x가 움직여야 하므로 다음과 같은 Projected Gradient Descent(PGD)가 사용된다.

<br> $k = 1,...,N_{iter}$ as $x^{(k+1)} = P_s(x^{(k)}+\eta^{(k)}\nabla f(x^{(k)}))$

여기서 $f:R^d \to R, S \subset R^d$이고 $P_s$는 $S$에 대한 사영, $L$로는 cross entroy loss가 사용된다.

## 3. Auto-PGD
  
  PGD는 **1. 고정된 step size**와 **2. 제공된 자원에 영향을 많이 받음** 면에서 여러 불안정함을 가지고 있다. 
  <br> 이러한 문제를 해결하기 위해 Auto-PGD는 $N_{iter}$을 **1. 좋은 시작 지점을 찾는 exploration phase**, **2. 지금까지 축적된 정보를 최대화 시키는 exploitation phase**로 나눈다. 여기서 exploration phase에서는 큰 step size으로 빠르게 시작 지점을 찾고 exploitation phase에서는 작은 step size로 $f$를 최대화 시킨다. 이렇게 step size의 크기를 다양하게 조절하는 것이 Auto-PGD의 핵심이라고 할 수 있다.
  먼저 Auto-PGD의 전체적인 알고리즘을 살펴보면 다음과 같다.
  
![](/assets/image/autoattack-1.png){: width="50%" height="50%"}{: .center}

  위 알고리즘을 자세히 하나씩 살펴보자. 
  
  **1. Gradient step**: 먼저 Auto-PGD의 gradient step은 PGD의 gradient step에 momentum term을 추가한다.
  
![](/assets/image/autoattack-2.png){: width="50%" height="50%"}{: .center}

  **2. Step size selection**: 다음과 같은 조건을 만족하면 step size를 반으로 나눈다. 그리고 step size에 해당하는 체크포인트를 $w_0 = 0, w_1,...,w_n$로 지정한다.
  
![](/assets/image/autoattack-3.png){: width="50%" height="50%"}{: .center}

  만약 체크포인트 $w_j$가 반으로 나누어지면 $x^{(w_j+1)}$를 $x_max$로 설정하고 $f_max$에서부터 다시 시작해 exploitation phase로 $f$를 최대화 시킨다. 이 때 체크포인트 $w_j$에서만 step size를 감소시키는 것 뿐만이 아닌 다음과 같은 지속적인 감소를 통해 localized search를 하게 만든다.  

![](/assets/image/autoattack-4.png){: width="50%" height="50%"}{: .center}

 $p_{j+1}-p_j$가 0.03만큼 감소하되, 최소 0.06가 되도록 만들었다.
  