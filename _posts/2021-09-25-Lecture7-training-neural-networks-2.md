---
layout: single
title:  "Lecture 7: Training Neural Networks 2"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - python
---


## Optimization

전에 최적화 과정에서 SGD(stochastic gradient descent)에 대해 배운적이 있다. SGD는 다른 알고리즘에 비해 가장 합리적이면서 효과가 좋은 알고리즘이나 많은 문제점을 가지고 있다. 다음과 같은 경우가 있다고 가정하자.

![](/assets/image/lecture7-1.png)

위 경우에서 빨간 점은 실선을 향하는 방향으로는 빠르게 이동하나 최적의 점(웃고 있는 점)을 향해서는 느리게 이동한다. 이럴때는 각 방향으로 이동하는 속도가 다르기 때문에 다음과 같이 지그재그로 움직여 최적의 점까지 도달하는데 매우 오래 걸린다.

![](/assets/image/lecture7-2.png)

또한 손실함수가 다음과 같은 모습을 가지고 있다고 생각해보자.

![](/assets/image/lecture7-3.png){: width="50%" height="50%"}{: .align-center}

빨간 점이 위치한 곳은 손실함수의 미분 값이 0이 되는 곳이므로 점이 더이상 이동하지 않고 그대로 위치하게 된다.

위와 같은 SGD의 문제를 해결하기 위해 고안된 것이 SGD+Momentum 이다.


### SGD+Momentum

SGD와 SGD+Momentum을 비교한 함수를 한번 보자.

![](/assets/image/lecture7-4.png)

SGD는 미분값만 고려하는 반면 SGD+Momentum은 미분값뿐만 아니라 점의 속도 또한 고려한다. 이렇게 진행 방향의 속도를 고려하게 되면 SGD가 가지고 있던 문제점을 완벽하게 보완할 수 있다.

![](/assets/image/lecture7-5.png)

Momentum에는 두가지 방법이 있다.

1. Momentum update

![](/assets/image/lecture7-6.png){: width="60%" height="60%"}{: .align-center}

일반 Momentum은 미분값이 가리키는 방향과 속도가 가리키는 방향을 합친 방향으로 이동한다.

<br>2. Nesterov Momentum

![](/assets/image/lecture7-7.png){: width="60%" height="60%"}{: .align-center}

Nesterov Momentum은 속도가 가리키는 방향으로 이동한뒤 그 곳에서의 미분값이 가리키는 방향으로 이동한다. 이렇게 되면 속도가 가리키는 방향이 약간의 오류가 생겨도 미분값으로 수정을 할 수 있게 된다.

그 밖의 최적화 알고리즘에 대해 알아보자.

### AdaGrad

AdaGrad는 이동할때마다 지나온 점들의 미분값들의 누적 곱을 구하고 이 값의 제곱근 값이 learning rate를 나눈다. 이렇게 되면 작은 미분값을 가지고 있는 차원으로는 작은 보폭을, 큰 미분값을 가지고 있는 차원으로는 큰 보폭을 가지게 된다. 

![](/assets/image/lecture7-8.png)

그러나 점이 이동할수록 보폭이 좁아진다는 단점떄문에 잘 사용되지 않는 알고리즘이다.

### RMSprop

RMSprop는 AdaGrad의 문제점을 보완해준다. 이동할때마다 지나온 점들의 미분값들의 누적 곱을 decay_rate라는 변수로 값의 크기를 조절해준다. 이렇게 함으로써 모든 차원에 대해 진행방향을 최적화하여 AdaGrad보다 높은 성능을 보인다.

![](/assets/image/lecture7-9.png)


### Adam

adam은 Mometum, AdaGrad/RMSProp 의 특징을 모두 합쳐논 형태이다. 하지만 첫번째 보폭이 매우 클 가능성이 있으므로 bias correction의 역할을 하는 수식이 추가된다. 

![](/assets/image/lecture7-10.png)

adam은 최적화 알고리즘 중 가장 좋은 성능을 보인다. 또한 이 강의에서는 adam의 파라미터를 ***beta1=0.9, beta2=0.999, learning_rate=1e-3 또는 5e-4*** 으로 설정할 것을 추천하고 있다! 

---


다음은 위 알고리즘들을 한번에 비교하여 나타내는 애니메이션이다.

![](https://cs231n.github.io/assets/nn3/opt2.gif){: width="70%" height="70%"}{: .align-center}
