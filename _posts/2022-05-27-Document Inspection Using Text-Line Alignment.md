---
layout: single
title:  "Document Inspection Using Text-Line Alignment"
comments: true
use_math: true
toc: true
toc_sticky: true
categories:
  - computer vision
  - Paper Review
---


## 1. Abstract

- It has become extremely easy to forge printed document, due to wide avaliability of good printer and scanner.

- This paper presents a new aspect in the examination of intrinsic document: the goal is to ***automatically detect text-lines that have been manipulated or additionally inserted in a document*** by inspecting their alignment (left, right or center) with respect to the other text-lines in the document.


## 2. Description of the approach

- Assume that someone wants to forge document. These are the possibilities that fradulent person can take: 

  1. Scan the document, then edit the image using some image manipulation software, add the new line to       the document and print it out again
  
  2. Take the original document and print the line or the paragraph in a second pass on the empty space      of the original document.
  
  3. Print the modified text on an empty sheet, cut it out and paste it over the original document. The      pasted part of the document would no longer be visible when forged document is printed again.
  
- Detecting forged document using text-line alignment works as follows:
  
  1. Text- lines are extracted. 
  2. Left, center and right alignment lines are computed. 
  3. Distances of the text–lines to the alignment lines are computed.
  
![](/assets/image/paper-review4-1.png){: width="60%" height="60%"}{: .center}
*-> Alignment line*

![](/assets/image/paper-review4-2.png){: width="60%" height="60%"}{: .center}
*-> Text-lines*


## 3. Text-line finding

This section explains the process of finding text-line.

1. Overall idea is to ***search the parameter space given by the text-line parameterization for parameters that best describe the text-lines given a quality function***.

2. Text–line parameterization model is illustrated as follows:

![](/assets/image/paper-review4-3.png){: width="60%" height="60%"}{: .center}

 - $r$ is y - intercept.
 - <br> $\theta$ is rotation of the line.
 - <br> $d$ is the distance of the base line to the line of descenders.

3. Feature points are required for quality function. Feature point is defined as the center of the lower line of the bounding box.

![](/assets/image/paper-review4-4.png){: width="60%" height="60%"}{: .center}

red dots are feature points.
 - $\in$ is the parameter that decides the number of red dots within dotted lines.

4. The goal of the quality function is to guide the parameter search to find good solutions that represent text-lines.

5. Quality function basically finds the parameter which includes most number of feature points within 2*\in range. Consider feature points as ${x_1, x_2, ... , x_n}$, then quality function is defined as follows: 

![](/assets/image/paper-review4-5.png){: width="60%" height="60%"}{: .center}


## 4. Alignment detection

This section explains the process of finding alignment lines.

1. Left, center and right alignment line are looked for. Each lines are defined as follows:

 - left alignment line: vertical line where left–aligned and justified text–lines have their starting point
 - right alignment line: vertical line where right–aligned and justified text–lines have their end point.
 - center alignment line: vertical line that contains the center points of text-lines.

 
2. Alignment line is defined as follows:

![](/assets/image/paper-review4-6.png){: width="50%" height="50%"}{: .center}

 - $\left| \overrightarrow{n}\right|$ is norm of the vector
 - $\alpha$ is the rotation angle of $\left| \overrightarrow{n}\right|$

3. Alignment line is defined using quality function. Parameters are decided for alignment line that include most amounts of feature points.


## 5. Decision making

- Since distribution of the distances of the forged lines cannot be precisely measured due to lack of real-world data. However, the following reasonable assumption can be made: forging person tends to get the forged lines as accurately aligned to the others as possible. Therefore, we can model ***the distribution of the distances of the forged lines as normally distributed with the mean equal to zero and a standard deviation of about 10pix***, which corresponds to about approximately half the width of the x character for normal text sizes.

- Using Bayes theorm, formulation of the problem is made as follows:

![](/assets/image/paper-review4-7.png){: width="50%" height="50%"}{: .center}

 - $P(f|d)$ is the probability of having a forged line given a distance $d$ between the line's point to each respective alignment line.
 - $p(d|f)$ is the likelihood of observing a distance $d$ given the information that the line is forged.
 - $P(f)$ is sensitivity parameter that is set manually.
 
- For each text-line, 3 decisions are made. ***Line is considered as forged if at least one of the three decides that the line is forged.***