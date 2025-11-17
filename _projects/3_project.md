---
layout: page
title: Knowledge Editing & Representation Learning
description: 
img: assets/img/projects/KoLEG.png
importance: 2
category: work
giscus_comments: false
---

# Background
Knowledge editing is the task of modifying the knowledge a model possesses with **minimal intervention**.

# Problem Definition
- Korean laws and regulations change frequently, so there is a need for **continuous knowledge editing**.
- The meaning of laws can change significantly with minor differences in articles, clauses, and items, so it is necessary to **effectively and fine-grainedly change only the desired statutes**.

# Solution
We constructed a **knowledge book** to enable real-time knowledge editing and trained a **retriever** to fetch information from it effectively. Additionally, we separately trained an LLM to effectively incorporate the retrieved knowledge.

# Achievements
- Achieved a **performance improvement of about 15%** in knowledge editing compared to existing methods.
- **Accepted to EMNLP 2025 Findings**.

# My Role
- As a co-author, I implemented and experimented with **baseline methods for knowledge editing**.
- I proposed and implemented a **hard negative data mining method** by subtly changing legal content by altering articles, clauses, and items one by one.
- I trained the **BGE-m3 and E5 embedding models** with the constructed hard negative samples using the BGE-m3 loss function.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/KoLEG.png" title="Project Overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Method overview.
</div>