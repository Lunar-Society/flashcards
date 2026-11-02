---
slug: symbolic-species
title: The Symbolic Species
author: Terrence W. Deacon
date: 2024-06-27
cover: symbolic-species.jpg
substack: https://www.dwarkesh.com/p/symbolic-species
---

*Janky, unedited, written to help myself retain and understand better.*

Buy on Amazon [here](https://www.amazon.com/Symbolic-Species-Co-evolution-Language-Brain/dp/0393317544).

[Trenton Bricken](https://x.com/trentonbricken) (good friend and [former podcast guest](https://youtu.be/UTuuTTnjxMQ?si=m21zXrVZldeqKel8)) was the one who recommended this book to me. Trenton found out the author lives right here in the Bay Area. So the two of us got a chance to go have lunch with the author, Terence Deacon, a couple weeks ago. Which was a really fun experience. Anyways, here’s the notes:

> They \[Chomsky and his followers\] assert that the source of prior support for language acquisition must originate from inside the brain, on the unstated assumption that there is no other possible source. But there is another alternative: that the extra support for language learning is vested neither in the brain of the child nor in the brains of parents or teachers, but outside brains, in language itself.

May explain why LLMs have been so productive - language has evolved specifically to nanny a growing mind! After all, a language which is too difficult for a child to learn or not valuable enough to pick up in the first place, will be outcompeted by other dialects. Language is like a wax which fit itself to the biases and abilities of the human mind. Our brains are the mold, language is the cast, and LLMs are the forged object made from the cast.

Since languages have evolved to be easy for children to learn, they might be far easier to model than other aspects of the world. And judging LLMs based on how good they are at modeling language means we may be overestimating how good they are at understanding other aspects of the world which have not evolved specifically for simple minds to grok (children have constrained associative learning and short term memory).

Does this suggests that LLM shoggoth minds will be similar to human minds, given how heavily language is shaped by the evolutionary pressures of the human mind, and how tightly LLMs are then made to fit onto manifold?

---

Children can better learn language because they can see the forest (the underlying grammatic logic of the language) while being too dumb to see the trees (semantic mappings, vocab, etc).

Childhood amnesia (where you can’t remember early parts of your life) is the result of the learning process kids use, where they prune and infer a lot more, allowing them to see the forrest for the trees.

On the opposite end of the spectrum are LLMs, which can remember entire passages of Wikipedia text verbatim but will flounder when you give them a new tic tac toe puzzle.

There's something super interesting here where humans learn best at a part of their lives (childhood) whose actual details they completely forget, adults still learn really well but have terrible memory about the particulars of the things they read or watch, and LLMs can memorize arbitrary details about text that no human could but are currently pretty bad at generalization. It’s really fascinating that this memorization-generalization spectrum exists.

> As in other distributed pattern-learning problems, the problem in symbol learning is to avoid getting attracted to learning potholes—tricked into focusing on the probabilities of individual sign-object associations and thereby missing the nonlocal marginal probabilities of symbol-symbol regularities. Learning even a simple symbol system demands an approach that postpones commitment to the most immediately obvious associations until after some of the less obvious distributed relationships are acquired. Only by shifting attention away from the details of word-object relationships is one likely to notice the existence of superordinate patterns of combinatorial relationships between symbols, and only if these are sufficiently salient is one likely to recognize the buried logic of indirect correlations and shift from a direct indexical mnemonic strategy to an indirect symbolic one.

---

Why does [grokking](https://pair.withgoogle.com/explorables/grokking/) happen? Why is there double descent in neural networks. Sometimes, a model first learns only a superficial representation which doesn’t generalize beyond the training distribution. Only after significantly more training (which should paradoxically cause even more overfitting) does it learn the more general representation:

![](/books/symbolic-species/figure.jpg)

I think there’s a natural way to explain this phenomenon using Deacon’s ideas. Here’s a quote from his book:

> The problem with symbol systems, then, is that there is both a lot of learning and unlearning that must take place before even a single symbolic relationship is available. **Symbols cannot be acquired one at a time, the way other learned associations can, except after a reference symbol system is established. A logically complete system of relationships among the set of symbol tokens must be learned before the symbolic association between any one symbol token and an object can even be determined.** The learning step occurs prior to recognizing the symbolic function, and this function only emerges from a system; it is not vested in any individual sign-object pairing. For this reason, it’s hard to get started. To learn a first symbolic relationship requires holding a lot of associations in mind at once while at the same time mentally sampling the potential combinatorial patterns hidden in their higher-order relationships. Even with a very small set of symbols the number of possible combinations is immense, and so **sorting out which combinations work and which don’t requires sampling and remembering a large number of possibilities.** \[emphasis mine\]

Here’s my attempt to translate in a way that makes sense of grokking. In order to understand some domain, you need to do a combinatorial search between all the underlying concepts to see how they are connected. But you can’t find this relation without first having all the concepts loaded into RAM. Then you can try out a bunch of different ways of connecting them, one of which happens to correspond to the compressed general representation of the whole idea.

It kinda sounds trivial when you put it like that - but the fact that a book in 1998 anticipated grokking is really interesting!

Also - this language helps explain why the model needs to be overparameterized (have more parameters than are needed to strictly fit the training data). You need space to store the memorization circuits, which are basically just storing all the input output labels in the training data. And you need extra space to do the combinatorial search to find the generalized solution. Once it’s found, the regularizer will push you from the memorization to generalization regime. Overparameterization allows the model to explore a much richer hypothesis space and try out different potential general solutions. This means that the model can represent more complex functions and, paradoxically, find simpler or more generalizable solutions within this larger space.

> The process of discovering the new symbolic association is a restructuring event, in which the previously learned associations are suddenly seen in a new light and must be reorganized with respect to one another. This reorganization requires mental effort to suppress one set of associative responses in favor of another derived from them.

And with Deacon’s explanation, we can also describe how human cognitibe abilities could arise out of simply scaling up chimp brains. Suppose you need have a brain at least as big as a humans to grok a language. As soon as you scale enough to hit that threshold, you’ve got this huge unhobbling of language.

---

> Even surgical removal of most of the left hemisphere, including regions that would later have become classic language areas of the brain, if done early in childhood, may not preclude reaching nearly normal levels of adult language comprehension and production. In contrast, even very small localized lesions of the left hemisphere language regions in older children and adults can produce massive and irrecoverable deficits.

Seems like good evidence for the connectionist perspective, or Ilya’s take that “the model just want to learn.”

---

 Does the power of a symbolic representation increase superlinearly with the amount of symbols because of the combinatorial explosion, or paradoxically does it increase sublinearly because of the tax on the ability to find relations that this combinatorial explosion implies?

---

Human genome is small enough and similar enough to other animals that it can’t encode for the actual brain connections that make us so intelligent. But given how axonal selection works, it’s not just that the genome says, “more scale”. Your genes coordinate the initial brain development which conditions which exonal connections are pruned (so your genome really is more like the hyperparameters and initializations of a model).

---

I didn’t realize how contingent speech as a method for communicating is. It just so happens that among the affordances pre-human apes had, it was easier to have them evolve more granular vocal cords to communicate symbolic relationships instead of faster hands to do sign language or something. Makes me more open to the possibility of galaxy brain level comms between AIs who can shoot representations in their latent space back and forth.
