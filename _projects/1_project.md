---
layout: page
title: AI-based Service Development and Operations
description: 
img: assets/img/projects/synnote.png
importance: 6
category: work
related_publications: false
---

# Background
Developed a service that transcribes speech in real-time and automatically summarizes and answers questions based on the transcription.

# Key Features
- Provides a **domain-specific speech recognition model** to improve transcription performance.
- Enables **real-time speech transcription**.
- Provides a feature to **summarize transcription results using an LLM** and perform **Q&A based on RAG**.
- Also provides a feature to **extract keywords** from the transcribed audio and visualize them as a **knowledge graph**.

# Achievements
- Achieved **452 Monthly Active Users (MAU)**.
- **Selected as an outstanding project in the Software Maestro program**, leading to participation in CES, a tour of Silicon Valley companies, and mentoring with developers for about 5 weeks.
- The **technology used in the service was transferred** to a software solutions provider.

# My Role
- Built a **data collection pipeline** based on the YouTube API for domain-specific training of the speech recognition model.
- Trained a **domain-specific speech recognition model using QLoRA**.
- Served the speech recognition model **on-premise using Ray and Kubernetes** to reduce costs.
- Built an **RAG pipeline using LlamaIndex and Pinecone**.
  
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/synnote.png" title="Project Overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Architecture diagram of the service.
</div>