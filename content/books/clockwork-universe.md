---
slug: clockwork-universe
title: The Clockwork Universe
author: Edward Dolnick
subtitle: Kepler was a high temperature LLM
date: 2026-03-25
cover: clockwork-universe.jpg
link: https://www.amazon.com/dp/006171951X
---

<!-- Imported from the Google Doc "Kepler was a high temperature LLM". The
rough outline at the top of the doc and the struck-through passages were
left out. TODO from the doc: Refine shows that maybe verification and peer
review will be pretty good for the AIs, and even better than for humans,
and we won't be lost to slop. -->

I recently read [*The Clockwork Universe: Isaac Newton, the Royal Society, and the Birth of the Modern World*](https://www.amazon.com/Clockwork-Universe-Newton-Society-Modern/dp/006171951X) by Edward Dolnick. It’s about people and culture which gave us our modern understanding of the solar system. The stories are way wackier than I expected. I think there's something to learn here about what value all these AI-for-science efforts could bring, but more about that later.

My favorite story from the book is how Johannes Kepler discovers the laws of planetary motion. In fact, I think that story has something to tell us about what kinds of scientific progress current AIs could help drive.

In 1595, 24 year old Kepler was trying to figure out why the orbits of different planets have the specific radii that they have. Kepler then notices that if you draw a triangle inscribed inside the orbit of Saturn, the circle which that triangle circumscribes seems to fit the orbit of Jupiter. And the logical geometric continuation of this pattern is that the orbit of the next planet should be circumscribed inside a square inside Jupiter’s orbit, and then a pentagon, and then a hexagon. He wrote afterwards, “The delight I took in my discovery, I shall never be able to describe in words.”

Only one problem. The rest of the orbits didn’t fit. Back to the drawing board. “And now I pressed forward again. Why look for two-dimensional forms to fit orbits in space? One has to look for three-dimensional forms—and, behold dear reader, now you have my discovery in your hands!”

In Kepler’s time, people were aware of six planets. You know what Kepler found very interesting? That there’s exactly five platonic solids (three dimensional objects where each face is symmetrical and all the faces are identical).

Eureka! God had built the solar system around the five Platonic solids — Saturn's orbit circumscribes a cube, which inscribes Jupiter's orbit, which circumscribes a tetrahedron, then a dodecahedron, then an icosahedron, then an octahedron, nesting all the way down to Mercury. How could it be otherwise? "Now I no longer regretted the lost time. I no longer tired of my work; I shied from no computation, however difficult."

Important context, by the way, is that during this time, there wasn’t a clear separation between astronomy and astrology - just as the early chemists are half doing alchemy. The stars represented numerological puzzles which delighted God, not impartial laws of physics. So why wouldn’t God choose platonic objects as his organizing principle? Kepler wrote in a letter, “For a long time I wanted to become a theologian. For a long time I was restless. Now, however, behold how through my effort God is being celebrated through astronomy.”

At age 25, Kepler publishes this platonic objects theory in a book titled [*The Cosmographic Mystery*](https://en.wikipedia.org/wiki/Mysterium_Cosmographicum). He sends a copy to Tycho Brahe. Brahe had turned an island he had been granted by the king of Prussia into an observatory, and over the course of the previous 20 years, he had assembled the most accurate and detailed astronomical data in the world. Brahe takes Kepler on as a pupil. When Brahe dies in 1601, Kepler basically steals all this observational data.

### Brahe

Kepler already knew by the time he published *The Cosmographic Mystery* that the platonic objects theory didn’t fit the data. But the theory was quite the tease. It was only off by 5-10%, and too pretty not to be true. He was hoping that Brahe’s more accurate measurement would eliminate the discrepancies. They didn't. Worse yet, Kepler realizes he can’t get *any* circular orbit to fit the data; the best circular model of Mars’s observed position is still off by 8 arcminutes, and Kepler knows that Brahe's data is accurate to about 1-2 arcminutes.

3Blue1Brown produced a [beautiful video](https://youtu.be/YdOXS_9_P4U?si=_KuIMbH3PRQpNLZ1&t=1107) in collaboration with Terence Tao showing how Kepler ingeniously converted Brahe’s raw observations — just angles from Earth to the planets and the Sun — into maps of the orbits of the planets. And from these maps, Kepler identifies his first two laws of planetary motion: that planets move in ellipses with the Sun at one focus, and that they sweep out equal areas in equal times.

These first two laws took Kepler from 1601 to 1609. During this time Kepler was making ends meet as the imperial mathematician to the Habsburg emperor - which basically meant his job was to make horoscopes about battles and weather. The counter reformation is kicking off, and in 1612, Kepler gets excommunicated for his Lutheran faith and his mom gets tried for witchcraft. He continues with his astro~~logy~~nomy. His first two laws explained properties of planets’ orbits considered one at a time. But what was the relationship between these orbits? It was clear that the further a planet is from the sun, the slower its orbit. But what’s the relationship exactly? For over a decade, he’s just trying random shit - again, think numerology, not physics.

And then, in 1619, he writes down an equation that actually works. This becomes Kepler’s third law, and it’s buried in a book titled [*Harmonies of the World*](http://en.wikipedia.org/wiki/Harmonice_Mundi), which is mainly centered around long digressions on astrology and the melodies of different planets: “The Earth sings Mi, Fa, Mi: you may infer even from the syllables that in this our home misery and famine hold sway.”

[Kepler’s third law](https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion#Third_law) shows that the orbital period of a planet squared is proportional to its distance from the sun cubed. And why should that be? Why among the countless different equations Kepler kept trying over the decades should this one be the one that works? It would take till Newton’s law of gravitation (published in 1687) to figure out why. But you can see how ex ante this equation is no less strange than the idea that orbits are organized inside platonic objects.

### Newton

Here’s how Kepler’s third law helps inspire Newton’s famous inverse square force law.

Just from Newton's second law (F = ma) and the formula for centripetal acceleration, you can work out an equation for how much force is needed to keep a planet in its orbit. The problem is that the answer depends on two things — how far the planet is from the Sun, and how long its orbit takes — and every planet has different values for both. So you're stuck: you can describe each planet's orbit individually, but you can't extract a universal law of gravity from it. Kepler's Third Law is what breaks the logjam. It tells you exactly how period and distance relate to each other (T² ∝ r³), which lets you eliminate one variable. Do some algebra, and you get F ∝ 1/r² — the inverse-square law.

Newton really earned his keep in the [*Principia*](https://en.wikipedia.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica) by proving the reverse: starting from an inverse-square force law, he showed that orbits must be ellipses (Kepler's First Law), and that any central force necessarily produces equal-area sweeping (Kepler's Second Law).

Most importantly, he made the big conceptual leap that the same force which kept planets in their orbits around the sun explains how things fall on ground.

But it was Kepler's brute-force pattern-matching — trying equation after equation against Brahe's data, with no underlying theory to guide him — that surfaced the empirical regularity which then posed a mystery Newton could decipher with an actual explanatory theory.

## AI for science

Okay, the whole point of this post is to talk about whether AI could help the process of scientific discovery.

I’ve been bearish on the idea that we’ll have human level AIs within the next 1-3 years. I find that AIs are especially bad at coming up with new ideas in a way that someone with deep conceptual understanding of a domain is able to. There’s always ways to diminish these discoveries as monkeys on a keyboard. Terry Tao [wrote](https://mathstodon.xyz/@tao/115722360006034040) a post which was in this flavor on December 2025:

> I doubt that anything resembling genuine 'artificial general intelligence' is within reach of current AI tools. However, I think a weaker, but still quite valuable, type of 'artificial general cleverness' is becoming a reality in various ways. By 'general cleverness', I mean the ability to solve broad classes of complex problems via somewhat ad hoc means.

(It’s unclear whether he still believes this - he [said](https://mathstodon.xyz/@tao/115855840223258103) of AI solution of Erdos Problem #728, “the first Erdős problem to be essentially autonomously solved by AI in the original spirit of the problem, and in a way not documented in the literature.”)

But to the extent that AI stays stuck at around this level, how valuable would it be? Something feels unsatisfying about an “automated scientist” that can only apply techniques analogous to those in its training data.

Well let’s go back to Kepler. Because the whole point of the Kepler story is that brute-force unmotivated cleverness which you can test against precise data, without any understanding of *why* — turned out to be enormously, world-changingly valuable. Kepler had no physical insight into why orbits should be ellipses or why T² should be proportional to r³. He just tried candidate relationships against Brahe's data until something fit. And what survived turned out to be exactly the empirical regularities that Newton needed to build and then validate the ideas in *Principia*.

Don’t get me wrong - the insights which allowed Kepler to convert Brahe’s data into their specific elliptical shape of different orbits were absolutely genius - again, I really recommend the Terry Tao/3B1B video where they cover this. But once he had the shapes, he was largely just throwing darts at the board for two decades in order to land on the laws of planetary motion.

Of course you still need Newton at the end to figure out how the pieces fit together — to show that a single inverse-square force law *explains* all three of Kepler's laws, and furthermore that it describes not just orbits but terrestrial gravity. And current AI feels quite far from that kind of insight.

This raises a question which I don't know the answer to: how big is the deductive overhang in current science? That is — if AI handed us a thousand new Kepler's-Third-Law-type relationships tomorrow, would existing scientists be able to make a burst of *Principia* conceptual leaps? Or are we already swimming in unexplained but deep patterns, and the actual bottleneck is that we don't have enough Newtons to make sense of them? The answer probably varies by field.

Given the pace of AI progress, we'll probably even get automated Newtons soon enough. And if that's the case, by the time AI can do Newton-type theory-building, the automated Keplers will have spent years piling up unexplained empirical regularities across every field of science. Meaning the first automated Newton arrives to find a backlog of patterns out of which it can immediately start churning out deep general theories.

## Darwin vs Newton and the verification gap

In a short aside in *The Clockwork Universe*, Dolnick asks a very interesting question:

> Two centuries passed between Newton’s theory of gravity and Darwin’s theory of evolution. How could that be? Newton’s work bristled with mathematics and focused on remote, unfamiliar objects like planets and comets. Darwin’s theory of evolution dealt in ordinary words with ordinary things like pigeons and barnacles. “How extremely stupid not to have thought of that!” Thomas Huxley famously grumbled after first reading Darwin’s *Origin of Species*. No one ever scolded himself for not beating Newton to the *Principia*.

Dolnick’s answer is that evolution required abandoning religion. A point he stresses throughout the book is that these great scientists were genuinely devout, and they were interested in astronomy in large part to decipher God’s mathematical enigmas. But whereas a belief in an intelligent designer is exactly the motivation the Keplers and Newtons needed to trudge through astronomical puzzles (surely God has chosen an elegant, intelligible principle for the stars), it was inimical to understanding the principles of natural selection.

> The Bible put creation at a mere six thousand years in the past. Even if someone had conceived of an evolving natural world, that tiny span of time would not have offered enough elbow room. Small changes could only transform one-celled creatures into daffodils and dinosaurs if nature had eons to work with. Instead, seventeenth-century scientists took for granted that trees and fish, men and women, dogs and flowers all appeared full-blown, in precisely the form they have today.

The religious explanation is a good one. But I want to propose a different one. While Darwin’s theory is conceptually simpler, it cannot be decisively tested. There’s no equivalent of running the numbers, and lo, your equation for planetary motion around the sun also exactly predicts the moon’s orbit around Earth.

Of course the circumstantial evidence for natural selection is extremely strong - as the saying goes, nothing in biology makes sense except in light of evolution. But the evidence is retrospective and cumulative. Darwin could never say "if my theory is correct, then in exactly 12 generations this finch's beak should be 2.3mm longer."

In fact, nearly two thousand years before Darwin, the Roman poet Lucretius argued in [*De Rerum Natura*](https://en.wikipedia.org/wiki/De_rerum_natura) that organisms suited to their environment survive while ill-adapted ones perish. But nobody built a science on it. Without a tight verification loop, the idea just floated by.

Kepler’s *Harmonices Mundi* contains the third law of planetary motion — one of the most important empirical discoveries in the history of science. But a lot more of it is devoted to which planets embody which musical harmonies, the Platonic solids cosmology he never gave up on, and other random tangents. Kepler himself didn't know which of these hot takes was the important one. Now imagine you couldn't test any of them — imagine there was no Brahe dataset to check against. You'd just have a book full of beautiful, plausible-sounding patterns with no way to tell which ones correspond to reality.

I wonder if we'll find ourselves in an even more extreme version of this situation — millions of ASI scientists producing what look to us like plausible magnum opuses. Eventually the AIs will figure out the best way to do proxy experiments and peer review at scale. But until then, the limiter on scientific progress will be what the AIs can test, not what they can think. Future civilizations will find the resulting timeline baffling: how did they solve quantum gravity by 2030 but not find drugs that extend human lifespan by ten years until 2050?

But the big update for me from reading this book is that the people who first helped us understand the stars were no less fallible, no less prone to hallucination and idiosyncratic bias, no less reliant on unprincipled brute force, than we accuse today's AIs of being.
