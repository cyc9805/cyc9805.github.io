---
layout: page
title: Representation Learning
description: 
img: assets/img/projects/ramp_lesion.png
importance: 3
category: work
giscus_comments: false
---

# Background
Ramp lesions are a **common condition**, but they are **difficult to detect**.

# Problem Definition
Previous studies performed binary classification of ramp lesions using **only tabular data** with machine learning techniques, not deep learning. However, this approach showed **limitations in accuracy**. We aim to improve accuracy by **combining image data as an additional feature**.

# Solution
We proposed a three-stage training method:
1.  **First stage**: Train an image encoder through **contrastive learning** between image and tabular data.
2.  **Second stage**: Train a table encoder through **self-supervised learning**.
3.  **Third stage**: Train a **fusion network** that combines the image and table encoders.

# Achievements
- Improved classification performance by **approximately 20%** compared to existing machine learning methods.
- Scheduled for submission to **The American Journal of Sports Medicine (Impact Factor: 4.5)**.

# My Role
- As the **first author**, I designed the methodology, implemented it, and conducted the experiments.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/ramp_lesion.png" title="Project Overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Method overview.
</div>