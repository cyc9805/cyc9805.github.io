---
permalink: /archive/
title: "Archive"
toc: true
toc_sticky: true
toc_label: "MYSELF"
---


<ul>
  {% for post in site.posts %}
    <li>
      <a href=".{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
