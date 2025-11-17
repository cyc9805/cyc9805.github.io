---
layout: page
title: Uncertainty Estimation
description: 
img: 
importance: 4
category: work
giscus_comments: false
---

# Background
Uncertainty Estimation is the task of **effectively measuring the uncertainty** a model exhibits.

# Problem Definition
Performing Uncertainty Estimation requires creating multiple models or multiple inference processes, making it **excessively costly**. Therefore, it is **difficult to perform Uncertainty Estimation on large pretrained models**.

# Solution
Evidential Deep Learning is a method that allows a model to efficiently estimate uncertainty. However, it requires a separate pretraining process, making it difficult to apply directly in our situation. In this research, we propose a **Variational AutoEncoder** that enables a pretrained model to perform **Evidential Deep Learning with minimal cost**.

# Achievements
- Made it possible to perform with the **same uncertainty estimation performance as existing methods but at a much lower cost**.
- Currently **under review for CVPR**.

# My Role
- As the **first author**, I was responsible for the **planning, experimentation, and writing** of the research paper.
- Implemented various **baselines for Uncertainty Estimation**.
- Implemented my methodology in **pretrained image classification models and LLMs**.