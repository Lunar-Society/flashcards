---
slug: neural-network-fractals
title: Neural network training makes beautiful fractals
author: Jascha Sohl-Dickstein
kind: article
date: 2026-01-10
link: https://sohl-dickstein.github.io/2024/02/12/fractal.html
substack: https://www.dwarkesh.com/p/notes-jan-10-2026 | What I've been reading – Jan 10, 2026
---

Absolutely fascinating [blog post](https://sohl-dickstein.github.io/2024/02/12/fractal.html).

You want to train your model at the highest possible learning rate under which it still converges. But the boundary of convergence versus divergence is fractal, which makes these hyperparameters really hard to optimize for via gradient descent.

Now you can ask the question: evolution somehow found the right hyperparameters to train our brains. How did evolution solve this wicked problem? Presumably because gradient free optimization fares better against these kinds of fractal landscapes - if you optimize for the part of the region where the average speed of convergence is high (rather than just take the gradient from a specific point that’s bounded in an unpredictable way by fractals), seems like you could do much better.

Backing up, why is the meta-loss landscape fractal in the first place? Jascha’s explanation is that fractals often emerge when iteratively applying a function. Gradient descent on the parameters is one such function that you iterate across training steps. But then the follow up question is this. There’s lots of other iterative functions you could think of, even within the context of neural networks. Do they all lead to fractals? For example:

- In chain of thought, you apply a model to a string, which makes a new string, to which you apply the model, etc.
- RNNs keep applying the same parameters to the hidden state.

Over conversation, an AI researcher friend revealed that CoT and RNNs both have variance problems that could well be explained by these fractal like dynamics. Though I only understand this claim at a hand-wavy level.
