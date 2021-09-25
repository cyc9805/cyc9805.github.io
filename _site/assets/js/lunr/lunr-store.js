var store = [{
        "title": "Chapter 2: 경진대회의 평가지표",
        "excerpt":"2.1 경진 대회의 종류 경진 대회에는 크게 두 가지 요소가 있는데, 데이터와 평가지표이다. 평가지표는 대회에서 순위를 결정하는 중요한 요소로, 어떠한 평가 기준에 따라 모델의 성능을 파악하느냐에 따라 결과가 천차만별로 달라진다. 데이터는 다음과 같은 문제들로 구분된다. 2.1.1 회귀 문제 회귀문제의 평가 지표는 RMSE, MAE 가 있다. 2.1.2 분류 문제 이진 분류는...","categories": ["data analysis","python"],
        "tags": [],
        "url": "/data%20analysis/python/Chapter-2-%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C%EC%9D%98-%ED%8F%89%EA%B0%80%EC%A7%80%ED%91%9C/",
        "teaser": null
      },{
        "title": "Lecture 1: Introduction to CNN for Visual Recognition",
        "excerpt":"What is computer vision? 컴퓨터 비전은 기계가 받아들이는 시각적 데이터를 연구하는 학문이다. 위 그림과 같이 컴퓨터 비전에는 여러 학문이 복합적으로 작용함을 알 수 있다. History of computer vision biology vision vision(시야)는 생물체가 살아가는데 있어 매우 중요한 요소이다. 시야의 생성으로 생물체는 급속도로 진화하기 시작했다. computer vision 1960년에 물질을 벡터 형식으로 나타내는...","categories": ["computer vision","python"],
        "tags": [],
        "url": "/computer%20vision/python/Lecture1-Introduction-to-CNN-for-Visual-Recognition/",
        "teaser": null
      },{
        "title": "Lecture 2: Image Classification pipeline",
        "excerpt":"원래는 Lecture 3를 정리하기 전에 Lecture 2를 정리했어야 했는데 밀린 Lecture을 듣다가 이제서야 정리를 한다. Challenges of Computer vision 다음과 같은 고양이 사진을 컴퓨터가 알맞는 레이블로 분류해야 한다고 해보자. 이미지를 분류하는데는 다음과 같은 난관이 존재한다. Viewpoint variation 고양이를 보는 카메라의 시점이 달라지면 고양이를 못알아볼 가능성이 생긴다. Deformation 고양이가 위 사진처럼...","categories": ["computer vision","python"],
        "tags": [],
        "url": "/computer%20vision/python/Lecture2-Image-Classification-pipeline/",
        "teaser": null
      },{
        "title": "마크다운(Markdown) 문법",
        "excerpt":"티스토리에서 깃허브 블로그로 바꾸면서 마크다운에 대해 처음 접하게 되었다. 원할한 블로그 정리를 위해 마크다운 문법에 대해 배울 필요성이 있다고 생각하여 이렇게 정리를 진행 중이다. reference: https://ansohxxn.github.io/blog/markdown/ 줄바꿈 줄바꿈을 하는 방법은 다음과 같이 2가지가 있다. 스페이스바를 두번+엔터 를 해준다. &lt;br&gt; 또한 줄바꿈을 해주는 HTML 태그이다. 문단 나누기 한 줄의 공백을 두고...","categories": ["markdown"],
        "tags": [],
        "url": "/markdown/Markdown-grammar/",
        "teaser": null
      },{
        "title": "Lecture 3: Loss Function and Optimization",
        "excerpt":"What is Loss Function? 손실함수(loss function) 은 분류기 (classifier)가 얼마나 잘 작동하는지 알려주는 중요한 지표이다. 손실함수의 공식은 다음과 같다. $L=\\frac{1}{N}\\sum_i L_i(f(x_i,w),y_i)$ 여기서 $x_i$는 이미지, $y_i$는 레이블이다. Multiclass SVM(Support Vector Machine) loss Multiclass SVM loss 는 예측한 레이블의 점수 와 카테고리별 점수 의 차를 계산하여 만약 0보다 작으면 0이, 0보다 크면...","categories": ["computer vision","python"],
        "tags": [],
        "url": "/computer%20vision/python/Lecture3-Loss-Function-and-Optimization/",
        "teaser": null
      },{
        "title": "Chapter 3: 특징 생성 part1",
        "excerpt":"챕터 3는 내용이 이전 챕터보다 많으므로 2개의 파트로 나누어서 작성하였다. 첫번째 파트에서는 모델의 성능을 높이기 위해서 새로운 특징을 만드는 방법에 대해 다루고 있다. 3.2 모델과 특징 3.2.1 모델과 특징의 관계 특징을 만들 때는 어떤 모델의 입력값으로써 해당 특징을 사용할 것인지 미리 알아두면 좋다. 대표적으로 사용되는 모델은 다음과 같이 두가지의 모델이...","categories": ["data analysis","python"],
        "tags": [],
        "url": "/data%20analysis/python/Chapter-3-%ED%8A%B9%EC%A7%95%EC%83%9D%EC%84%B1-part1/",
        "teaser": null
      },{
        "title": "Chapter 3: 특징 생성 part2",
        "excerpt":"챕터 2의 두번째 파트는 시간과 관련된 데이터를 처리하는 방법, 비지도 학습 알고리즘을 이용하여 특징을 생성하는 방법에 대해 다루고 있다. 3.10 시계열 데이터 처리 3.10.1 시계열 데이터란? 시계열 데이터 에는 특유의 성질이나 주의점이 있다. 그래서 시간적 정보를 적절히 다루지 않을 경우 본래대로라면 예측에 사용이불가능한 정보를 이용해 특징을 만들 때도 있다. 시계열...","categories": ["data analysis","python"],
        "tags": [],
        "url": "/data%20analysis/python/Chapter-3-%ED%8A%B9%EC%A7%95%EC%83%9D%EC%84%B1-part2/",
        "teaser": null
      },{
        "title": "Lecture 4: Backpropagation and Neural Network",
        "excerpt":"What is Backpropagation? 역전파(Backpropagtion)는 원하는 값을 출력하는 최적의 모델을 만들기 위해서 가중치를 조정하는 방법이다. 역전파 과정을 쉽게 알아보기 위한 방법으로 computational graph 가 사용된다. Structure of Computational graph 위 그림을 보면 처음에 가중치 행렬 W 와 사진 데이터 x 를 곱한 후 정규화 행렬 R을 더한다. 이렇게 계산과정을 직접 그림으로...","categories": ["computer vision","python"],
        "tags": [],
        "url": "/computer%20vision/python/Lecture4-Backpropagation-and-Neural-Network/",
        "teaser": null
      },{
        "title": "Lecture 5: Convolutional Neural Networks",
        "excerpt":"History of Neural Networks 인공 신경망의 본격적인 연구가 이루어진 것은 비교적 최근이다. 컴퓨터가 개발되기 전에 사람들은 다음과 같은 이론은 내놓았다. 1957년에 Frank Rosenblatt는 알파벳을 인식하는 기계를 고안했다. 1986년에 역전파를 통해 최적의 가중치를 찾는 연구가 활발히 이루어졌다. 1998년에 LeCun, Bottou, Bengio, Haffner가 경사 하강법(gradient descent)를 처음으로 글자 인식에 적용해 보았다. 2012년에...","categories": ["computer vision","python"],
        "tags": [],
        "url": "/computer%20vision/python/Lecture5-Convolutional-Neural-Networks/",
        "teaser": null
      },{
        "title": "Chapter 4: 모델 구축 part1",
        "excerpt":"챕터4는 데이터의 생성된 특징을 바탕으로 모델을 구축하는 방법에 대해 설명하고 있다. 이 장 또한 양이 상당히 많고 중요한 내용을 담고 있기 때문에 두 개의 파트로 나눠서 정리하기로 하였다. 4.1 모델의 기본 이해 4.1.1 모델이란? 모델이란 특징을 입력 데이터로 사용해 예측값을 만들어 내는 것이다. 경진대회의 대부분은 지도학습에 해당 되므로 이 장에서는...","categories": ["data analysis","python"],
        "tags": [],
        "url": "/data%20analysis/python/Chapter-4-%EB%AA%A8%EB%8D%B8-%EA%B5%AC%EC%B6%95-part1/",
        "teaser": null
      },{
        "title": "Lecture 6: Training Neural Networks 1",
        "excerpt":"Activation Functions 활성화 함수는 가중치와 입력 데이터를 곱한 값에 정규화를 한 값을 다음 레이어로 어떠한 값으로 전달할지 지정하는 함수이다. 대표적인 활성화 함수로 Sigmoid, tanh, ReLU, Leaky ReLU, Maxout, ELU 가 있다. Sigmoid 시그모이드 함수의 모습은 다음과 같다. $\\sigma(x)=1/(1+e^{-x})$ 이 함수는 입력 데이터를 0과 1사이로 변환한다. 그러나 이 함수에는 치명적인 단점...","categories": ["computer vision","python"],
        "tags": [],
        "url": "/computer%20vision/python/Lecture6-training-neural-networks-1/",
        "teaser": null
      },{
        "title": "Chapter 4: 모델 구축 part2",
        "excerpt":"본 챕터의 두 번째 파트는 신경망, 선형 모델, 랜덤 포레스트와 기타 모델등에 대해 다루고 있다. 4.4 신경망 4.4.1 신겅망의 개요 신경망의 형태는 다음과 같이 다층 퍼셉트론(MLP) 와 같은 모양을 가진다. 다층 퍼셉트론 모델의 특징은 다음과 같다. 입력층에는 특징이 입력으로 주어진다. 은닉 계층에서는 앞 층의 값을 가중치로 부가한 합을 구하여 결합한...","categories": ["data analysis","python"],
        "tags": [],
        "url": "/data%20analysis/python/Chapter-4-%EB%AA%A8%EB%8D%B8-%EA%B5%AC%EC%B6%95-part2/",
        "teaser": null
      },{
        "title": "Lecture 7: Training Neural Networks 2",
        "excerpt":"Optimization 전에 최적화 과정에서 SGD(stochastic gradient descent)에 대해 배운적이 있다. SGD는 다른 알고리즘에 비해 가장 합리적이면서 효과가 좋은 알고리즘이나 많은 문제점을 가지고 있다. 다음과 같은 경우가 있다고 가정하자. 위 경우에서 빨간 점은 실선을 향하는 방향으로는 빠르게 이동하나 최적의 점(웃고 있는 점)을 향해서는 느리게 이동한다. 이럴때는 각 방향으로 이동하는 속도가 다르기...","categories": ["computer vision","python"],
        "tags": [],
        "url": "/computer%20vision/python/Lecture7-training-neural-networks-2/",
        "teaser": null
      }]
