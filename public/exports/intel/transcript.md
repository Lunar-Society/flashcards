## Timestamps

(00:00:00) – Intro

(00:00:47) – How Intel brings up a new process node

(00:03:22) – What Intel learned from 10nm

(00:06:28) – From planar transistors to gate-all-around

(00:13:13) – Why High-NA EUV pays off for Intel but not TSMC

(00:19:20) – Could chips have evolved completely differently?

(00:23:33) – Inside Intel’s “Hot Topics” meeting

(00:29:30) – Replacing copper wires with ruthenium

(00:32:41) – Why stacked transistors take a decade to ship

(00:39:45) – Hybrid bonding and the chip-to-chip bottleneck

(00:48:00) – There aren’t enough tools to 10x chip production

(00:53:14) – Can Intel catch up to TSMC?

(01:01:02) – Terafab, and rethinking the fab from scratch

## Transcript

### 00:00:00 – The AI demand shock

**Dwarkesh Patel**

There’s never been as big a shock to the semiconductor industry as the current surge in demand from AI.

***Gary Dickerson***

*AI is driving incredible computing demand.*

***Peter Wennink***

*Easily 40-50% above our maximum capacity, which I’ve never seen before.*

**Dwarkesh Patel**

Progress in AI has been driven by [exponentially increasing compute](https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-to-5x-per-year). To sustain that progress, [foundries](https://en.wikipedia.org/wiki/Foundry_model) like Intel will need to manufacture far more leading-edge compute, both by producing more chips and by improving what each chip can do.

But the production of these chips is bottlenecked by tools that Intel buys from their suppliers. Most famously, [ASML](https://en.wikipedia.org/wiki/ASML_Holding)’s [EUV machines](https://en.wikipedia.org/wiki/Extreme_ultraviolet_lithography).

***CNBC***

*If they don’t have the equipment, they can’t make the chips here.*

**Dwarkesh Patel**

I spent two days touring Intel’s [fabs](https://en.wikipedia.org/wiki/Semiconductor_fabrication_plant) to prepare for these interviews with its leadership. I wanted to understand what it takes to manufacture the world’s most advanced chips and how hardware is shaping the future of AI.

### 00:00:47 – Bringing up a new node

**Dwarkesh Patel**

I’m joined by [Chris Auth](https://www.linkedin.com/in/chrisauth/), who leads development of all the processes that are currently under manufacturing. The thing I want to understand in more concrete detail is how the development of a new process actually happens. If [14A](https://www.intel.com/content/www/us/en/foundry/process.html) is going to come out in three years or two years from now, what is happening from now till then?

I want you to walk me through as much detail as you can, everything from the level of “how is the [yield](https://en.wikipedia.org/wiki/Yield_\(metric\)) improving?” to what kind of [telemetry](https://en.wikipedia.org/wiki/Telemetry) you guys look at? What kind of experiments do you guys run? I want to understand what is going to happen over the next two years as concretely as possible.

**Chris Auth**

14A has been in development for about three-plus years at this stage, so quite a bit of pre-work has been done to get it to the stage that it’s at right now. Right now, we’re getting very close to where we’re finalizing the process. We’re finalizing the tool sets that it will be manufactured on, and we’re working on the fine-tuning of each of the process steps.

There are about 2,000 steps in the factory that you have to go do. You need to do really intricate work at each one of those to make sure it’s fine-tuned, it can go into manufacturing, it can run thousands of wafers a week on this process, and it can be repeatable every single time.

**Dwarkesh Patel**

Right now, you might have a certain yield. Walk me through how that increases month over month. There’s a line running at 14A. What happens from now till next month that will result in the yield changing? How do you identify where the defects are? How do you fix that?

**Chris Auth**

There’s a constant process that we go through in identifying defects. There are two main ways that we’ll identify them. One is we have [inline metrology](https://semiengineering.com/metrology-options-increase-as-device-needs-shift/). We have tools that will look at the wafers and say, “Ah, there’s a defect there, there’s a defect there, there’s a defect there.” Then also at the end of line, either [electrical test](https://en.wikipedia.org/wiki/Wafer_testing) or we sort and see where the fails are. We will identify failures, and then we will get analysis on those failures. We’ll cross-section it.

You were in the [TEM lab](https://en.wikipedia.org/wiki/Transmission_electron_microscopy) yesterday, and you saw how you can get cross-sections. You’ll get a cross-section of a defect, and from that, you’ll be able to say, “Oh, that defect is between these layers, so it must have come from this section of the flow. Oh, we have inline metrology in that section, which has identified defects. Those are the defects we need to go after.”

What we’ve learned is that you don’t want to do too much innovation in one node, because the more innovation that you do, the more complex it becomes.

While you’ll be able to get that to work, you need to hit a certain schedule, and that’s the schedule that your customer ultimately wants. Having that predictable schedule is a key piece. You’ve got to figure out how much innovation you can put in in order to meet the customer’s requirements in the timeline that they need it.

### 00:03:22 – Lessons from 10 nanometer

**Dwarkesh Patel**

Intel learned how costly that tradeoff can be with delays to its [10 nanometer node](https://en.wikipedia.org/wiki/10_nm_process), whose original target launch date was 2016, but which didn’t begin manufacturing until 2018.

**Vivek Arya**

Usually Intel has been the keeper of [Moore’s Law](https://en.wikipedia.org/wiki/Moore%27s_law), a new cadence of manufacturing every two years, but their last set of products slipped almost four years.

**Yahoo Finance**

Intel today having its worst day in four months, [the stock now down more than 15%](https://www.fool.com/investing/2020/07/24/dow-jones-slumps-as-intel-stock-gutted-by-7nm-dela.aspx). I also want to point out [Taiwan Semiconductor up 13% off of Intel’s bad news](https://www.cnbc.com/2020/07/27/tsmc-shares-jump-as-intel-faces-next-generation-chip-delays.html).

**Dwarkesh Patel**

Walk me through what lessons you think Intel has learned from 10 nanometer.

**Chris Auth**

Ten nanometer was a good example of where we had very aggressive targets. We were doing what was called hyperscaling at the time, so we were scaling much faster than what had been historically done. In order to do that, we came up with all sorts of innovative ideas on how we could achieve that without new tools, because the tools weren’t ready. That put a lot of burden on the process and a lot of burden on the engineers.

Now, at the end of the day, 10 nanometer is a great technology. It has world-class yield, it has world-class performance, it has world-class cost, but it took us longer to do that than what we would have liked. So we’ve tried to take that learning into future technology nodes and say, “Hey, we need to limit the amount of innovation we put in there to make sure that we keep it on schedule.”

**Dwarkesh Patel**

What do you think was the main technology that should’ve been saved for a future version?

**Chris Auth**

EUV was probably the big thing. When we started to define 10 nanometer, the conclusion was EUV was not ready.

**Dwarkesh Patel**

EUV is extreme ultraviolet [lithography](https://en.wikipedia.org/wiki/Photolithography). It prints chip patterns with light at a wavelength of 13.5 nanometers, about 14 times shorter than that emitted by [previous tools](https://www.asml.com/en/products/duv-lithography-systems) that chipmakers had relied on. The shorter the wavelength, the finer the features that a single exposure can print.

But Intel decided this technology wasn’t going to be ready in time.

[TSMC](https://en.wikipedia.org/wiki/TSMC) transitioned to EUV much sooner. It [put EUV into volume manufacturing in 2019](https://pr.tsmc.com/english/news/2010) and ramped it up further on its [5nm node](https://en.wikipedia.org/wiki/5_nm_process) in 2020. [Intel’s first EUV process](https://intel.com/content/www/us/en/newsroom/resources/high-volume-euv-intel-4-europe.html) did not reach products until 2023, so TSMC had about four more years of experience with these machines.

**Dwarkesh Patel**

Yesterday, we were at the research lab getting a preview of 2D materials and [CFET](https://www.imec-int.com/en/articles/imec-puts-complementary-fet-cfet-logic-technology-roadmap) and [ruthenium interconnects](https://www.intel.com/content/www/us/en/newsroom/news/intel-foundry-unveils-technology-advancements-iedm-2024.html). I’m curious about how you decide whether that technology is mature enough for the next node.

**Chris Auth**

One thing that did also come out of 10 nanometer is we started to define a set of maturity metrics. We use those maturity metrics in a process which we call [phase gate](https://en.wikipedia.org/wiki/Phase-gate_process), where we would say, “To go from pathfinding into development, these are the criteria that we need to go hit.” There are yield criteria, defect criteria, performance criteria, and we need to hit those in order to move to the next set of the flow.

If there’s something that doesn’t make that, then it misses that, and it goes on to the next technology. We focus on the items that are ready and we can run and put into a process, because one of the key things is staying on schedule.

### 00:06:28 – From planar to gate-all-around

**Dwarkesh Patel**

Staying on schedule is hard partly because new [transistor](https://en.wikipedia.org/wiki/Transistor) designs take decades to mature. Modern chip transistors evolved from the [planar MOS transistor](https://en.wikipedia.org/wiki/MOSFET), demonstrated in 1960. The history of transistors since has been the progression from two dimensions into three. Each development that Chris goes on to describe, from [FinFET](https://en.wikipedia.org/wiki/Fin_field-effect_transistor) to [gate-all-around](https://semiengineering.com/knowledge_centers/integrated-circuit/transistors/3d/gate-all-around-fet/), is a step in that progression. So it’ll help to first look at a basic transistor and how its parts have changed over time.

A transistor is basically a switch. When it’s turned on, it allows current to flow between its two ends, which are called the source and the drain. A piece called a gate sits on top of the silicon between the source and the drain. Applying a positive voltage to the gate turns the switch on, because the positive voltage pulls negatively charged electrons in the silicon beneath up toward the gate. However, a thin layer of insulation stops them from actually reaching the gate. So the electrons collect just beneath that insulation and form a thin conducting path from the source to the drain. This is called the channel. Remove the voltage and the electrons disperse, the channel disappears, and the switch turns off.

As transistors shrank, the source and the drain got so close together that current could flow through the channel even when the switch was supposed to be off. We needed a better way to control the channel and prevent current from leaking through.

The fix was to give the gate a tighter grip on the channel by touching it from more sides. In the original planar transistor, the gate only touches the channel from the top. The FinFET transistor squeezes the channel into a thin vertical fin of silicon. The gate drapes over the fin, so it controls the channel from three sides.

The next progression from there was to cover not only the top and the sides of the channel, but also the bottom. This technology is called gate-all-around, and it slices the channel into thin ribbons, each of which gets completely wrapped around by the gate.

But getting gate-all-around to work required new materials and new manufacturing steps. To build these floating ribbons of silicon, you first sandwich them between alternating layers of a [temporary placeholder material](https://www.patsnap.com/resources/blog/articles/gate-first-vs-gate-last-high-k-metal-gate-integration/), which holds the space where the gate will eventually go. We use a placeholder because the materials in the real gate wouldn’t survive the processing that comes after, which involves baking the wafer at around 1,000 degrees Celsius. Once these hot steps are done, chipmakers etch away the placeholder, leaving the ribbons suspended. Then they fill the gaps around every ribbon with a thin coat of a special insulator called a [high-k material](https://en.wikipedia.org/wiki/High-%CE%BA_dielectric), whose purpose is to let the gate pull more strongly on the channel. And then on top of this material, they put the metal of the gate itself.

FinFET was demonstrated in a lab in 1989 and [reached volume production at Intel in 2011](https://hothardware.com/News/Intel-Announces-New-22nm-3D-Trigate-Transistors/). A gate-all-around transistor had been demonstrated a year earlier, in 1988, but [Samsung didn’t begin producing gate-all-around chips until 2022](https://news.samsung.com/us/samsung-begins-chip-production-3nm-process-gaa-architecture/). So these ideas, FinFET and gate-all-around, were developed around the same time, but they reached production a decade apart. I wanted to ask Chris why it took so long to get to this current gate-all-around technology.

**Dwarkesh Patel**

Maybe you can walk me through the process of getting into high-volume manufacturing. I want to understand concretely, once you have an idea that, “Hey, we’re going to make the channel smaller, we’re going to surround it…” All the other problems of material science, figuring out how to not destroy the gate, how do they actually get figured out? Why does it take so long?

**Chris Auth**

Gate-all-around’s a good example, because back in the ’90s we knew of this idea. But we knew there were going to be these problems on how you put this into high-volume manufacturing. At the same time, there are other things like high-K metal gate. There’s [strained silicon](https://en.wikipedia.org/wiki/Strained_silicon), there’s FinFETs that are out there. It’s a question of when’s the right time to go and tackle those?

Well, you don’t want to tackle something before you have to. If you have these other things that can drive performance, you would go and do that. So we went through this path. We did strained silicon, high-K metal gate, we did FinFETs, and then it became, “Well, we need to do things further. How do we get there?” Well, gate-all-around’s really the ultimate transistor out there. Maybe it’s time to go and start tackling some of those issues that you have. You’re right, now you have to look at how do you put high-K metal gate in with gate-all-around.

It’s that innovation that takes time. Sometimes you need new materials. Sometimes you need a different tool in order to be able to do some of the things that you need to go do, and that requires invention from the tool vendors. You have to go to the tool vendor and say, “Hey, I need a tool that can do XYZ. I need a gas that can deposit this particular material that goes into that. I need a heating chuck that has this characteristic to it.”

All those things take time. Some of it’s iterative, where you have to run a gate-all-around transistor and say, “Oh, well, that didn’t work. Let me figure out what was wrong with my hypothesis and try it again with some different structure.”

**Dwarkesh Patel**

How has the nature of R&D changed from the era of just making planar transistors smaller and smaller and getting the benefits of [Dennard scaling](https://en.wikipedia.org/wiki/Dennard_scaling), to the world we’re in today? Is it just a totally different kind of R&D process? Previously it was, “Let’s make things smaller, smaller, smaller.” Now you look at all these other facets of performance at the same time, and improvements in size don’t come as easily. Walk me through whether there was some crucial change in the R&D process at that point.

**Chris Auth**

If you look at the ’80s and ’90s, yes, it was driven really by Dennard scaling, lithography. We just made things smaller, transistors got faster, they got more reliable, and it was a very predictable cadence. When we started to hit the 2000s, we saw, “That’s not good enough anymore. We need to do something different.”

To me, it became this golden age of innovation. For each technology node, how are you going to provide more scaling? How are you going to provide more performance? It drove things like strained silicon. It drove high-K metal gate. It drove FinFETs. It drove gate-all-around. It drove [backside power](https://semiengineering.com/knowledge_centers/low-power/backside-power-delivery-network/). These are things that in the ’80s and ’90s you would be like, “Oh no, we’re not touching any of that,” because we just continued to have the same process flow. We just scaled it, scaled it, scaled it.

But for somebody like me who’s a transistor junkie, it’s awesome, because now the playbook’s open. You can do all sorts of things out there. You can bring in new materials. Just look at the number of materials we used to use in the ’90s versus the materials today. It’s probably gone up 10X. There’s a lot of innovation. There’s [atomic layer deposition](https://en.wikipedia.org/wiki/Atomic_layer_deposition). You’re controlling this stuff atom by atom. So it’s changed a lot how you approach the process. Before, it was, “Try to not change anything.” Now it’s, “Take the sledgehammer and start tearing the thing up and come up with some new idea.”

### 00:13:13 – High-NA EUV and the PDK

**Dwarkesh Patel**

For 14A, Intel is using a new kind of lithography machine: [High-NA EUV](https://www.asml.com/en/news/stories/2024/5-things-high-na-euv). It uses the same extreme ultraviolet light as today’s EUV machines, but changes the optics. NA, or [numerical aperture](https://en.wikipedia.org/wiki/Numerical_aperture), is a measure of how wide a cone of light the machine’s mirrors can focus onto the wafer. The wider the cone you can focus, the smaller the spot that your light can carve. Standard EUV machines have an NA of 0.33. High-NA widens it to 0.55. So High-NA can print features about 1.7 times smaller in a single pass.

When features are smaller than the lithography machine can print, chipmakers have to split the pattern across several passes, each printing a different set of features. The most tightly packed patterns can require two, three, or even four passes.

Each additional pass takes up valuable time on a machine that costs around \$200 million, and it introduces another opportunity for defects. High-NA machines cost about twice as much, but they can reduce the number of passes that are needed. So the question which determines whether they justify their higher price is how much more time they save and how much they reduce the risk of defects.

**Dwarkesh Patel**

Now you guys are using High-NA EUV tools for 14A, whereas [TSMC has said that they don’t make economic sense yet for them](https://www.yahoo.com/tech/tsmc-says-asml-high-na-111156769.html). How do you decide whether the next litho tool is the one that is ready to adopt or not?

**Chris Auth**

High-NA’s a good example of where, because of the architecture of our technology versus TSMC’s, we make different conclusions off of the same tool set. We use backside power. That means that you actually alleviate some of the pitch requirements you have on the front side. That allows you to print that directly with High-NA. TSMC has to run tighter pitches because they don’t have backside power, and they can’t do that with High-NA, so they have to use double patterning EUV.

So for them, it’s not very helpful. For us, it is very helpful. Now at 14A, we’ve left it as an option, and it’s something that we’ll have a discussion with the customer on, because there’s some value proposition to it, and there’s some complexity that it adds.

**Dwarkesh Patel**

Chris is referring to a feature called backside power. A chip has two different kinds of wiring. Power lines deliver electricity to the transistors, and they need to be thick. Signal lines let the transistors talk to each other. They’re much thinner, but they need to be spaced apart so that the signal from one wire doesn’t interfere with the signal from another. In the past, all of these power lines and signal lines had to be crammed together on top of the transistors.

Intel’s newest process [moves these power lines below the transistors, to the back of the wafer](https://newsroom.intel.com/client-computing/powervia-intel-achieves-chipmaking-breakthrough). This frees up space on top, so the signal lines don’t have to be packed as tightly.

This change makes High-NA worth it for Intel. Without backside power, the wiring is so tight that it would require multiple passes to print, even with High-NA. With backside power, a single High-NA pass is enough.

Outside companies can now commission Intel to manufacture chips that they’ve designed. They follow Intel’s [process design kit](https://en.wikipedia.org/wiki/Process_design_kit), or PDK: the menu of what a given process can build, and the rules for building it.

**Dwarkesh Patel**

Do you need to lock that into your PDK right now for customers who are planning on developing on 14A?

**Chris Auth**

It’s an option in the PDK today, and we’re handling it as a customer-by-customer discussion as to whether or not they want to go down that path or not.

**Dwarkesh Patel**

For [18A](https://www.intel.com/content/www/us/en/foundry/process/18a.html), there was [public reporting that there were delays in or issues with the PDK](https://www.datacenterdynamics.com/en/news/intel-reportedly-suffers-18a-manufacturing-setback-shelves-20a-process-node-for-arrow-lake-processors), such that some instructions didn’t work, and it was difficult for people to use your foundry to build their chips. Tell me about the process of Intel becoming a foundry and then having a PDK that other customers can use to make whatever chip they’re making as well.

**Chris Auth**

There’s definitely a learning curve to how you become a foundry. That’s something that our competitors have gone through as well. PDK is a good example of that. For decades, we’ve been an [IDM](https://en.wikipedia.org/wiki/Integrated_device_manufacturer). We’ve gone to our product teams and shown them our transistor data, and we share that data back and forth, and we haven’t had a formal PDK-type process. So that’s a new process that we’ve had to implement on 18A. 18A started out not having a PDK.

There’s definitely a lot of feedback we’ve gotten from the customers as to what they expect for quality and maturity of the PDK and what sort of information they want to see in there. We’ve tried to incorporate that into making sure that we have a PDK that meets our customers’ requirements. That’s where we’ve ended up. We’re starting to get PDKs that have this, and 14A will have that from the get-go. It has very high quality PDKs.

Again, there are maturity metrics for what is a PDK 0.5 versus a 0.9 versus a 1.0. We’re constantly going through and taking customer feedback and incorporating that into the quality of our PDK.

**Dwarkesh Patel**

For most of its history, Intel’s fabs made only Intel’s chips. That could be part of what allowed TSMC to gain an edge. Serving many customers gave TSMC more wafers to learn from, more revenue to reinvest, and more pressure to hit deadlines.

### 00:19:20 – A different tech tree

**Dwarkesh Patel**

If a butterfly flapped its wings in the ’60s, could you imagine a world where gate-all-around is not even a word people have heard of, an idea people are familiar with, but people are thinking of an extremely different branch of the [tech tree](https://en.wikipedia.org/wiki/Technology_tree)? How far down the tech tree do you think things could be totally different? Could it be that we’re not even [using copper](https://en.wikipedia.org/wiki/Copper_interconnects)?

**Chris Auth**

If you look at, say, [transistors and interconnects](https://en.wikipedia.org/wiki/Interconnect_\(integrated_circuits\)), where we’ve gotten to, as far as the transistor and gate-all-around and it being the ideal transistor structure, was somewhat inevitable. As I said, in the ’90s we were already talking about these types of things.

Backside power, that one’s pretty out there. Even in the ’90s, the idea that you’re going to strip off the entire silicon substrate and put lines on the backside, that one is probably something that’s a little bit out there. Copper, of course copper wires are the best, so I don’t know how you would end up somewhere else besides copper.

**Dwarkesh Patel**

But you guys are exploring other—

**Chris Auth**

For some of the very tightest pitches, it’s inevitable that you will replace copper. That’s a good example of where you will have another material that will come in there. But for the larger lines, I think copper is about where it’s at.

Once you start to do gate-all-around transistors and you do backside power, now you start to enter a very different regime. Now you see it’s not, “Hey, there’s just some substrate and you stack everything on top.” Now you’ve got a transistor which is floating in interconnect, and you’re like, “Okay, well, why don’t I have transistors, interconnect, a little more transistors, more interconnect?”

This whole [3D stacking](https://en.wikipedia.org/wiki/Three-dimensional_integrated_circuit) that we now do with just discrete chips that we stack on top of each other. Now you’re like, “Why can’t I just build an entire structure like this?” You see it with [memory](https://en.wikipedia.org/wiki/Semiconductor_memory), [NAND](https://en.wikipedia.org/wiki/Flash_memory), [DRAM](https://en.wikipedia.org/wiki/Dynamic_random-access_memory). They have some incredible 3D structures. NAND already does it, DRAM talks about it, but I think that DRAM inevitably is going to go there too.

A lot of people say, “Oh no, we’re not going to do this because we can’t do it in the next five years.” Well, come on, let’s put a larger timescale on this. Let’s put 10 years, 20 years. In 2045, do you think you could do it? Now you start to say, “Oh yeah, I could see us having some pretty exotic structures at that point.”

We limit ourselves by what we see as possible in the next four years. As I’ve always said, when people say, “How do you see technology scaling going?”, we have visibility for about four years. Then you get out to the four years, and you go, “Yeah, I think there’s something we can do another four years out of that.” And you get to that four years, and you’re like, “Yeah, I think you can do something.” But if you start to talk about 10 years, it becomes hard to say what it’s going to be.

**Dwarkesh Patel**

Chris’s idea of building upward could start with the transistors themselves. Chips use two types of transistor, called [n-type and p-type](https://en.wikipedia.org/wiki/CMOS), which work the same way, but with the charges reversed. Nearly every circuit is built by pairing them up. Today, chipmakers build them side by side. The next step is to stack them directly on top of each other in order to save space. In principle, that fits twice as many transistors into the same area. This design is called a CFET, short for complementary [field-effect transistor](https://en.wikipedia.org/wiki/Field-effect_transistor). But every extra layer adds manufacturing steps and cost, and also leads to heat building up that doesn’t have a clear way to escape.

**Dwarkesh Patel**

Because logic consumes more power than memory, you can’t do stacks of DRAM that make [HBM](https://en.wikipedia.org/wiki/High_Bandwidth_Memory) or 3D NAND as easily with logic, because of the heat issue. Is that the fundamental issue over the long run? How you—

**Chris Auth**

[Thermals](https://en.wikipedia.org/wiki/Thermal_management_\(electronics\)). There are three things you have when you try to say, “Hey, what limits compute?” It’s how fast can you do the switch, so [the frequency of the device](https://en.wikipedia.org/wiki/Clock_rate). How much power does it take in order to do that switch, so the power efficiency of it. The third one is, how do you dissipate the heat that was generated by doing that switch? That’s the thermals piece of it.

These are not new problems. You can go back 20 years and you can see articles on these three things. The question is, thermals… how do you deal with that, particularly when you start to talk about these 3D-type devices?

There is a need for that sort of system-level analysis and simulation tools. I think we’re in its infancy because we’ve just started to look at this. It is a limiter, and it will be a limiter, but again, these are problems that we can go solve.

### 00:23:33 – The Hot Topics meeting

**Dwarkesh Patel**

The problems respond to work, but engineering time is finite, and so are the wafers for experiments. Deciding where they go across thousands of problems is itself one of the hardest parts of bringing up a node. I sat in on one of Intel’s Hot Topics meetings, where those decisions get made.

I’m here with [Kevin Fischer](https://investor.appliedmaterials.com/static-files/aeb4174d-e72f-46e1-8411-36aa15e2704f), who was laying down the law this morning at the Hot Topics meeting, where you guys were discussing how you’re improving 18A and [18A-P](https://newsroom.intel.com/intel-foundry/intel-foundry-details-process-milestones-future-innovation-at-vlsi-symposium) technologies. People would come to you with different experiments they were running, different ideas they had for improving yield and performance, and then you and your integration engineers would tell them what data you needed, how they should proceed, how you think they could move things faster.

I want people to have a sense of the culture at these meetings. One thing I found striking is that this is bottlenecking your most advanced node. You want progress to happen fast, so you kind of lay down the hammer.

**Kevin Fischer**

I would say the average engineer doesn’t understand the stakes or the urgency of how this is going to impact Intel’s bottom line, how it’s going to impact our customer. They just have no visibility into those issues. They will typically have a certain set of criteria that they want to go capture. They’ll hit boundaries of, “I asked for something and someone said no, and I’m done. I guess I can’t have this thing that I asked for.”

One thing you learn in this industry is that you will never have a complete data set. If you want to wait for a complete data set, you’ve waited too long. It’s already too late. A lot of what I end up doing in those meetings is deciding how much risk we’re going to take on a certain decision or not take on a certain decision. You need to say, “Look, do we go now? Do we start risking production?” Because you’re risking the bottom line. You’re risking revenue.

I’m worried you’re going to put me in the light of being an ogre because I’m putting the hammer down on people.

**Dwarkesh Patel**

That’s a great reputation to have.

**Kevin Fischer**

It’s really conveying urgency. Every day counts.

**Dwarkesh Patel**

Can you walk me through a particular issue that might come up?

**Kevin Fischer**

One of the examples you saw this morning is epi nodules.

**Dwarkesh Patel**

Epi is short for [epitaxy](https://en.wikipedia.org/wiki/Epitaxy), which means growing new material on top of an existing one. [Chipmakers flow gases over a heated wafer](https://en.wikipedia.org/wiki/Chemical_vapor_deposition), and the gases leave atoms on its surface. The crystal structure of the material underneath acts as a template. Each new atom lines up with the atoms below it, and the new layer continues the same crystal. Chipmakers use epitaxy at several stages of making a chip. In the step Kevin describes, they use it to grow [the source and the drain](https://toshiba.semicon-storage.com/ap-en/semiconductor/knowledge/e-learning/discrete/chap3/chap3-7.html) as small crystals on either side of the gate.

**Kevin Fischer**

During the deposition of our epitaxy, we get abnormal growth, a little thing like a tumor. It’s growing super fast. That causes problems, because one epi will short to the wrong epi and you get transistors not working.

Then you’ve got to narrow it down to how you’re going to fix it.

### 00:27:45 – The Hot Topics meeting, continued

**Kevin Fischer**

One of the pieces that you observed this morning was a special clean that we were looking at, which would eliminate the nodule. The nodule would deposit, and then we’d get rid of it. Some of the other discussion was about the source of the nodule. Get rid of the source of the nodule.

**Dwarkesh Patel**

There’s some issue. How do you decide what the source of it is?

**Kevin Fischer**

For the most part, we work highly parallel. How do you decide? It’s not always evident what the easiest way to fix the problem is, so you work on all the potential fixes. Sometimes it’s not the one you expect first.

Once we’ve identified it as a primary problem for the technology, that’s where this Hot Topics meeting gets involved. That’s how we align the resources into those engineering teams so that we can accelerate the work.

**Dwarkesh Patel**

You said that there’s some fast-track process where wafers can move through faster if they’re bottlenecking some experiment.

**Kevin Fischer**

We have a tiered system of what we call hot boxes in the factory. Every grade of hot box goes a little bit faster. It’s just how the factory prioritizes that particular lot, that block of silicon that’s running through the factory. Our highest grade of hot box, HotBox 1, races through the factory. It gets priority at every single tool, but it’s a drag on the entire factory. If you had a factory person in here, they don’t like playing that card, because you end up using the tools inefficiently so that you can go super fast.

Think of it as a highway, and you set aside that one lane for the carpool, which everyone could use, but you’re saying, “Okay, it’s just the carpool.” That’s our HotBox 1. Everyone clear out of that lane except for that one experiment, and that one experiment races down the highway.

### 00:29:30 – Ruthenium interconnects

**Dwarkesh Patel**

Kevin’s job is deciding what goes onto the production line now, but the day before, I went to Intel’s research lab with [Jack Kavalieros](https://www.intel.com/content/www/us/en/newsroom/news/2021-inventor-year.html) to see ideas that aren’t ready for the node yet. We started with wiring. A transistor is only useful once it’s connected to others, and on a modern chip that takes more than a dozen layers of metal wire stacked above the transistors, called interconnect. Those wires are made of copper, and as they shrink, copper starts to run into trouble. Intel is exploring a replacement: [ruthenium.](https://en.wikipedia.org/wiki/Ruthenium)

**Dwarkesh Patel**

Ruthenium has [higher resistivity](https://en.wikipedia.org/wiki/Electrical_resistivity_and_conductivity), so why are you guys exploring ruthenium for the future?

**Jack Kavalieros**

Interestingly enough, as you scale the dimensions of those copper wires, you run into challenges. For example, [copper typically requires a liner](https://semiengineering.com/ruthenium-liners-give-way-to-ruthenium-lines) in order to deposit the copper to fill those lines. Ruthenium is very different in that regard because it’s a material that we can actually etch. As such, by etching it, we don’t need that liner.

Now you scale those very fine dimensions, and if you can trade off that resistive liner with no liner, ruthenium starts to win. [There is a crossover point](https://semiengineering.com/the-end-of-copper-interconnects/) where ruthenium will have much better conductivity, better resistivity than copper. That’s roughly in the 20-nanometer pitch range, which means, if you can imagine, half of the pitch is your metal line, and the other half is [the dielectric that isolates them](https://en.wikipedia.org/wiki/Dielectric).

**Dwarkesh Patel**

So what is the liner?

**Jack Kavalieros**

Think of it almost like a glue layer or transition layer that we need in order to deposit the copper and have it stick, and have it make that connection to the copper lines below it. These are all interlocking copper lines that interconnect to each other.

But every time you deposit copper, you’ve always had a liner underneath it. In the past, that liner may have been a significant portion of the entirety of that conduction path. But over time, we’ve scaled it, made it thinner, and so copper comes back into play as a contender.

**Dwarkesh Patel**

One thing I’d be curious to know is how you decide that a technology is mature and ready for high-volume manufacturing. With 10 nanometer, you were mentioning you guys [moved on from copper to cobalt](https://semiengineering.com/big-changes-in-tiny-interconnects), and there were potential issues with that. How do you decide that this technology is going to work at scale?

**Jack Kavalieros**

The integration of these materials into such a complex system as the transistor ecosystem involves many, many different components. The scalability is one part, but its ability to integrate is another.

At the time we made a decision for cobalt, it was the forerunner. The results were stronger at the time. But as we work with our ecosystem externally, the vendor ecosystem that provides these materials and the tools that we integrate them with, we find solutions down the road that may bring copper back in line as being the stronger of the two. That’s exactly what happens.

Every technology that we go through, we will evaluate multiple options. As we get closer to our time horizon for delivering a manufacturing-worthy product, we have to make a decision. The leading option at the time was cobalt. Now it’s copper again, and perhaps in the future it’ll be ruthenium.

### 00:32:41 – Stacking transistors

**Dwarkesh Patel**

I’d love to get your thoughts on CFET, basically stacking the transistors on top of each other. What is progress like there? Can you keep making more and more layers? Is it just two? Can you go three, four? How high can you get?

**Jack Kavalieros**

That evaluation of CFET is currently underway. Not just by us, by our competition. Labs externally are looking at it. It is the ultimate in stackability. We’re taking transistors that had to be compressed more and more, and we’re relaxing that in some ways because we’re going to stack them on top of each other.

But the act of stacking does not mean that they’re not interconnected. What used to be connections on the top or even on the bottom, [as we’ve seen from our press release](https://newsroom.intel.com/new-technologies/research-advancements-extend-moore-law), now has to go vertically in between the transistors. That’s a new challenge because the aspect ratio of creating trenches and filling those trenches becomes more and more difficult. It’s not as straightforward as stacking the transistors, because you still have to think about interconnecting them.

**Dwarkesh Patel**

Is the issue there the etch to get that deep hole?

**Jack Kavalieros**

Aspect ratio for the etches is a big part of it. We’re working with our vendors to evolve on that and to improve that, but it’s also what you fill those very tiny spaces with. Because filling can sometimes leave air gaps or holes that are never really filled, and that’s not ideal.

**Dwarkesh Patel**

I assume there’s a version of CFET that works inside this lab. What is the kind of wafer or process that is working right now? Then what’s the next step? What’s the next step after that, until it’s inside the full high-volume process?

**Jack Kavalieros**

Part of the process of evolving these technologies, especially something more complex like an architecture — not just a basic chemistry or a material, but a full architecture like CFET — is that [we have to make short-loop vehicles](https://opticalengineering.spiedigitallibrary.org/conference-proceedings-of-spie/PC12958/0000/Innovations-in-design-of-backend-interconnect-short-loop-test-chips/10.1117/12.3012302.full) that can give us faster turnaround. The normal manufacturing process can take a month or longer to complete the thousands of steps that it goes through. Our goal here is to take unit cells of that process and qualify them.

We take advantage of short-loop vehicles that can give us electrical parameters, chemical parameters that can resolve some of those challenges, those speed bumps. Once we’ve resolved them, then we combine them into a more complex test vehicle. What you would find in here is something very simple. You might be making a [diode](https://en.wikipedia.org/wiki/Diode), you might be making a [capacitor](https://en.wikipedia.org/wiki/Capacitor), which are components of the transistor. As those evolve and become stronger, better performing, you combine them to make the next stage, which might be the transistor itself.

In the CFET example, you might not choose to do four ribbons on top of four ribbons. You might just choose to do one on one, because naturally the aspect ratio of dealing with something that much taller becomes more and more challenging. So we would have a simplified version of a CFET, which has only one wire for the [NMOS](https://en.wikipedia.org/wiki/NMOS_logic) and one wire for the [PMOS](https://en.wikipedia.org/wiki/PMOS_logic). That simplifies our job, but it still helps us evaluate the stacking of devices and how they will interconnect.

**Dwarkesh Patel**

But are the feature sizes here as small as they will be eventually? Or are the feature sizes bigger?

**Jack Kavalieros**

Oh, absolutely. In some cases, at least as small. For example, you’ve heard of [2D materials](https://en.wikipedia.org/wiki/Single-layer_materials), these [transition layer dichalcogenides](https://en.wikipedia.org/wiki/Transition_metal_dichalcogenide_monolayers), as they’re called. They’re very, very thin materials. They’re essentially one monolayer of atoms that we deal with.

Those depositions can happen in this lab. We can evaluate those films in terms of conductivity, our ability to contact them, our ability to modulate that conductivity, which is what the transistor does. So yes, we do have the ability to not only deposit films that are very small and thin to the atomic scale, but also print very small features. We have EUV technology, or [E-beam technology](https://en.wikipedia.org/wiki/Electron-beam_lithography), that can allow us to print very small features similar to what we will eventually make in production.

**Dwarkesh Patel**

I guess I don’t understand intuitively, lacking the context in this process, if you have the features that are as small for a working CFET right now. Why will it take 10 years for it to be in my phone? I understand that there’s a process, but why is it such a long process?

**Jack Kavalieros**

The answer is slightly different when you’re dealing with an architecture like CFET versus a novel material. Materials have, of course, the challenges of being deposited, etched, removed. Their compatibility with other layers above and below, all those things have to be researched first before you put them in a production line.

An architecture may seem like a simple evolution. “Oh, you’re making nanoribbon transistors next to each other. What’s wrong with just stacking them?” But the act of stacking them, of course, increases the aspect ratio for etches, depositions, cleans, and the technology may simply not be ready yet.

**Dwarkesh Patel**

But if you’ve already made it here, there’s a version of the technology that’s ready, right?

**Jack Kavalieros**

Correct. We’ve made a simplified version that may not be an advantage over our current side-by-side technology of nanoribbons, but we need to evolve it to make it maybe two nanoribbons, or to add the right type of metals and dielectrics, in order to extract the maximum performance out of that device.

**Dwarkesh Patel**

Got it. So it’s like a long tail of—

**Jack Kavalieros**

There’s a thousand different steps that all have to come together in a very unique way to make the performance compatible or actually supersede the prior technology.

**Dwarkesh Patel**

Where do the ideas tend to fail? You have 20 ideas like 2D materials. What is the way in which you decide this is actually not worth pursuing further?

**Jack Kavalieros**

Sometimes we discover fundamentals about the material that will be incompatible with the rest of the processing that we do. The first level of experiments may simply be very simple depositions. You say, “Okay, I can deposit the film, I can look at it, I can measure it. But the moment I try to make a contact to it, nothing sticks.” It could be something as fundamental as the adhesion. The next step in the process simply has no way to adhere to the material. So you may rule out a material because of something as simple as that.

More complex challenges might be that the subsequent processing may have gaseous interactions with downstream steps. For example, I’ve deposited the film, I’ve capped it with other materials, but they’re not hermetic. So my third or fourth or fifth step in the process may actually still interact with it and change its properties. That makes it unstable, and now we have to find better [hermetic sealing](https://en.wikipedia.org/wiki/Hermetic_seal) for that process. If we don’t find a way to control it, then it’s a dead end for us.

### 00:39:45 – Hybrid bonding

**Dwarkesh Patel**

Stacking transistors is still in the research lab. Stacking whole chips is already in production, and it tackles a different problem: how separate chips communicate with each other.

Modern computers are divided into multiple parts, each optimized for a different task. For example, Nvidia’s [Blackwell](https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/) data-center [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit) joins two huge processor chips and surrounds them with eight stacks of high-bandwidth memory. These chips have to constantly send data back and forth with each other. And in AI, [the speed of that traffic](https://arxiv.org/abs/2403.14123), not the raw computation itself, is often what limits how fast the workload finishes.

Imagine two chips side by side, communicating through their facing edges. If you double each chip’s width and length, you’ll have four times the area for circuitry, but only twice the edge length for connections. This is the area-versus-perimeter problem. As transistors become denser, a chip’s ability to do computations increases faster than its ability to move data around. The industry has known about this problem for years, so multiple technologies have been invented to address it.

**Video narrator**

The completed circuits must undergo two last operations: [bonding and packaging](https://en.wikipedia.org/wiki/Integrated_circuit_packaging).

**Dwarkesh Patel**

Once a chip is made, it still has to be connected to other chips and to the rest of the computer. That step is called packaging, and it has changed a lot in the last few decades. At a high level, you can think of the evolution of packaging like this: initially, chips were laid out side by side. Wires connecting them went out the side of one chip to another.

To allow for more communication density, the industry introduced a shared piece of silicon, [called an interposer](https://en.wikipedia.org/wiki/Interposer), for multiple chips to sit on. A chip can talk to other chips through the wiring that runs directly through the interposer. This type of packaging is often called “[2.5D](https://anysilicon.com/2-5d-vs-3d-packaging-what-is-the-difference/)”.

Another way to increase connection density is to bond chips directly to one another. This allows for shorter connections between chips, but the early versions of this idea [used solder bumps](https://en.wikipedia.org/wiki/Flip_chip), which are bulky and increased resistance. It would be better to skip the solder and fuse the signal wire connections of the two chips directly to each other.

[This is called hybrid bonding](https://semiengineering.com/knowledge_centers/packaging/advanced-packaging/hybrid-bonding/), and it is one of the technologies the semiconductor industry is investing in the most. Hybrid bonding works by aligning the copper interconnects of one chip with those of another. Then these chips are pushed together and heated so their interconnects expand and bridge the gap between the chips. This process makes the insulating surfaces around the copper bond as well. And so by removing the solder bumps, you end up with much denser connections. But the reason this technology is only now entering volume manufacturing is because it took a while to iron out the alignment and defect challenges that it introduced.

In the packaging lab, I asked [Tyler Osborn](https://www.linkedin.com/in/tyler-osborn-b25296a/), a director in [Intel’s advanced packaging](https://newsroom.intel.com/intel-foundry/intels-us-advanced-packaging-enables-next-generation-ai-semiconductors) technology development group, how they put this into practice.

### 00:43:53 – Hybrid bonding, continued

**Dwarkesh Patel**

Two different ways you could do hybrid bonding: [die](https://en.wikipedia.org/wiki/Die_\(integrated_circuit\)) to die and die to wafer. Maybe you can talk about the advantages of both and which one actually practically works better.

**Tyler Osborn**

Sure. Around Intel, what I think you’re referring to as die to die, [we typically call wafer to wafer](https://en.wikipedia.org/wiki/Wafer_bonding). We actually take a full wafer and another wafer and bond them together. That’s an approach that’s really popular right now in the [CMOS image sensor](https://en.wikipedia.org/wiki/Active-pixel_sensor) industry. In fact, it basically dominates it. It’s being looked at for other things like memory stacking. People have published ideas about all kinds of stuff.

One of the challenges with that, though, is that you need dies that perfectly match each other, and are perfectly left-handed and right-handed, so you have to be able to bond exactly one to the other. One-to-one die size is a challenge. If they’re not the exact same design device on top and bottom, that’s a problem.

With wafer to wafer, it’s challenging to make sure that you have wafers that match really well in terms of the sort. So sort good array here versus sort good array here. If they match exactly — good die and bad die all match — I can get 100% yield of that operation of the good dies. But the chances of that are very low. There’s going to be some randomization of the two, and whatever that randomization is, will be loss of good bonding to bad.

Whereas with chip to wafer, I can dictate the terms. [I can singulate](https://en.wikipedia.org/wiki/Die_singulation) and have [known good dies](https://semiengineering.com/welcome-to-the-probably-good-die-era/) that I’ve tested at the chip level, and then only bond known good to a known good base position.

**Dwarkesh Patel**

Do you think then chip to wafer is the way that you’ll do hybrid bonding in the future?

**Tyler Osborn**

I think we’re going to do both. We definitely have the capability to do both. It’s really customer and architecture driven, but certainly chip to wafer in the logic-to-logic space makes a lot of sense.

**Dwarkesh Patel**

You were explaining that going from advanced packaging to hybrid bonding, the size of the pitches is decreasing. How much further could that go?

**Tyler Osborn**

That’s a wonderful question. Historically, like we were saying, 15 years ago first-level interconnect was 130-150 micrometer pitch. Today in HVM, we’re doing 25 micrometer pitch in [Foveros](https://www.intel.com/content/dam/www/central-libraries/us/en/documents/2025-07/foveros-25d-product-brief.pdf). Here we’re doing sub-10, but there’s already been literature out there.

In fact, the biggest conference every year in packaging is the [IEEE ECTC conference](https://www.ectc.net/) that happens in May. [There was a paper there this year showing reliability data on a 0.45 micron pitch hybrid bonded device](https://www.atlaspcb.com/news/news-ectc-2026-hybrid-bonding-ai-memory-packaging/). So you can imagine that’s a whole other order of magnitude in density again from where we are right now in HVM. That scalability has already been proven. So I see a long runway there.

**Dwarkesh Patel**

Within interconnect, within a single wafer, how far separated are they usually?

**Tyler Osborn**

[In the back end of the fab](https://en.wikipedia.org/wiki/Back_end_of_line), you can imagine the few layers below packaging are typically around one micron to a half micron in size. So if you can push packaging down to 0.5 microns or below, you can almost think about taking layers off the top of the die and connecting a lower layer within the silicon to another lower layer within the silicon. That’s really where the beauty of hybrid bonding happens.

You could think someday about even having reduced interconnect layers on both sides that we can bond together and have less total [IR drop](https://en.wikipedia.org/wiki/Voltage_drop) between the two transistor layers. It’s really cool to think about where that could go once we get into those regimes.

**Dwarkesh Patel**

Actually, I am very curious about… For AI, it makes sense why hybrid bonding is so powerful, because then you can get higher bandwidth to the memory. But you were saying there are issues with heat and everything. What is the advantage for non-AI applications of hybrid bonding?

**Tyler Osborn**

Excellent question. There are companies out there that are looking at it for non-AI applications, even in client devices. One of the big things I think it can help with there is, number one, obviously the same raw interconnect density, especially between something like a [CPU](https://en.wikipedia.org/wiki/Central_processing_unit) and a GPU.

But the other one is around power. Like we talked about before, as you get to finer and finer interconnects, you can reduce the total power consumption, in [picojoules per bit](https://arxiv.org/abs/1609.05510), for that interface. With hybrid bonding in those applications, you could think about that as another way that packaging can help reduce the total system power budget. That gives you lots of benefits: lower power, less heat, for the same benefit in terms of actual electrical performance.

### 00:48:00 – The limits of capacity

**Dwarkesh Patel**

So far, this has been about making better chips. The other half of the question is how many chips the industry can make if AI labs are willing to pay for far more of them.

**Dwarkesh Patel**

I’m getting a chance to talk to [Pushkar Ranade](https://www.intel.com/content/www/us/en/corporate/biography/pushkar-ranade.html), who is the CTO of Intel. I’m very interested in understanding how the fact that the entire industry has to rely on the same suppliers bottlenecks your ability to ramp up production.

For this EUV tool, [ASML produces fewer than 100 of them a year](https://techinsights.com/blog/asml-provides-updated-view-demand-outlook-capacity-plans-and-business-model-investor-day). They don’t plan to produce more than 100 a year, or significantly more, even by the end of the decade. That has to be split between you, between TSMC, between all the memory makers who are ramping up production, like [SK Hynix](https://en.wikipedia.org/wiki/SK_Hynix). How does that limit your ability to scale up to all this demand?

**Pushkar Ranade**

It is a limiter. We have to make the most of the capacity that we already have installed. We’ll try to increase the output from our existing fleet of tools. But EUV or ASML is not the only bottleneck. It is definitely a bigger bottleneck than some of the other tools, but to a large extent, we’re seeing all equipment seeing tremendous supply shortage.

Even though there are multiple providers of other tools, once you lock into a process flow — let’s say 18A, which is a mature process now — we need a specific tool. We can’t just go and get a different tool for the same process. So we’re locked into that one tool, one supplier, and we rely on that.

**Dwarkesh Patel**

What lessons does this give for 14A in terms of how you structure it? By 2028, it’s going to be such a crazy world. How do you structure things in such a way that you have flexibility in ramping?

**Pushkar Ranade**

The way to do it — and we’ve been doing it, and generally everybody does it — is you try to maintain as much fungibility as possible going from one node to the next node. Going from 18A to 14A, maybe you would say 80% of the tool set can be reused. Then, of course, 14A would require some new capabilities because it’s a denser geometry, so it would require some unique tools.

**Dwarkesh Patel**

Do you have a sense of what the ultimate bottleneck is on how many wafers you guys could produce a month, even if you were to decide to invest infinity money into doing [CapEx](https://en.wikipedia.org/wiki/Capital_expenditure)?

**Pushkar Ranade**

Given the existing constraints, let’s say we had to maximize the output from a given footprint of tools, then I think it’s incremental, because the process today is already yielding pretty high. If your yield is already pretty high, getting every 1% extra yield is extremely hard because it’s already a finely tuned process.

**Dwarkesh Patel**

Are there enough tools in the world so you could 10X the amount of wafers you’re producing at the leading edge?

**Pushkar Ranade**

Not 10X, but probably 2X, yes.

**Dwarkesh Patel**

That’s quite interesting, because the AI industry for a decade has been 3Xing compute year over year. You’re saying that just can’t continue.

**Pushkar Ranade**

Unless the entire supply chain — starting from the equipment suppliers, their suppliers, their sub-suppliers — unless everybody produces more, you can’t increase the output.

**Dwarkesh Patel**

Just to give the audience a sense of how big the AI demand is and how well it monetizes the products you guys are producing: you can crunch the numbers, and the numbers seem to suggest that just a couple billion dollars of CapEx on Intel’s account results in enough chips — or the logic for enough chips — to produce, say, \$100 billion of revenue for the AI model companies.

Of course, there are so many other players within that stack. There’s also memory and other things. But it’s crazy that a couple billion dollars of CapEx, which can be amortized over many different years, produces \$100 billion of revenue every single year. That seems to suggest that at some point that should percolate down. At some point, the AI labs could just say, “We’ll just buy everything. Produce as much as you can. We’ll guarantee future income streams.”

**Pushkar Ranade**

There are early signs that could actually be happening already. The demand signals are just so high. But I think you were alluding to how the value is accumulating at the top of the technology stack. What is essentially happening is we moved from a fully vertically integrated industry 30-40 years ago, maybe longer, to a very horizontal industry, where you have foundries, you have equipment makers, you have their suppliers.

Today, every [hyperscaler](https://en.wikipedia.org/wiki/Hyperscale_computing) is [designing their own chips](https://www.cnbc.com/2025/11/21/nvidia-gpus-google-tpus-aws-trainium-comparing-the-top-ai-chips.html), and the scale of the hyperscalers is so large. Some of the model companies, for example, their demand is so high they could easily consume an entire fab’s worth of silicon on their own, or multiple fabs’ worth, and they definitely have the capital to fund that.

So in some sense, we are moving from a horizontal world again to a pseudo-vertical world. It’s not monolithically vertically integrated, but it’s kind of virtually vertically integrated.

### 00:53:14 – Catching up to TSMC

**Dwarkesh Patel**

What is the nature of economies of scale in this business? If you look at how many wafers at the leading edge TSMC versus Intel is shipping, it’s upwards of 3X for TSMC. What kinds of advantages do you get at this point from economies of scale? Or is it that once you reach a certain point, the economies of scale get weaker?

**Pushkar Ranade**

That’s a very important question. This entire business just relies on economies of scale. If you look at all the advanced manufacturing companies out there, in semiconductor foundries the scale economics is probably the purest. The reason for that is the fixed cost is just so incredibly high. Once you build a fab, like 80% of your cost structure is fixed. What that means is every extra percentage of utilization is adding far more in revenue.

So it’s extremely important. We’ll fight for every extra percent of fab utilization, but also every extra percentage of fab output. Let’s say I’m making some wafers today and the yield is 60%. If I improve the process and the die yield becomes 65% or 70%, it’s not a linear advantage. I’m getting way more output for the given footprint. So there’s always room to improve the economies of scale.

That’s one of the reasons why you’re seeing so much [consolidation](https://en.wikipedia.org/wiki/Semiconductor_consolidation) in this business. [There are only three foundries left at the advanced node](https://cacm.acm.org/news/and-then-there-were-three) for that exact reason. Along the way, many companies just stopped manufacturing. I don’t know if you’ve seen… There’s a chart where 40 years ago there were like 20 foundries. Over time the number of foundries kept diminishing until today there are only three.

**Dwarkesh Patel**

What is then the concrete master plan to catch up to TSMC? Even though TSMC is ahead, there’s so much overflow demand at their leading edge, where [N3](https://en.wikipedia.org/wiki/3_nm_process) is now majority [AI accelerators](https://en.wikipedia.org/wiki/AI_accelerator) and maybe [majority Nvidia alone](https://newsletter.semianalysis.com/p/the-great-ai-silicon-shortage). There’s all this demand for CPUs, for other things, which are also, by the way, needed for AI. There’s this [humongous influx in demand for CPUs because of AI](https://qz.com/ai-cpu-shortage-2026).

How do you see this opportunity right now, where Intel’s a few years behind, while TSMC is just way oversaturated?

**Pushkar Ranade**

Catching up to TSMC has multiple facets. The catch-up that we need to do is in scale. Like you said, they’re just a much larger wafer manufacturer today than we are, and even bigger than what Samsung is. Catching up in scale will be a gradual process.

If you meant catching up in terms of just the technology, I think we’re already there. We might be a few percent off on [performance or power or area](https://www.synopsys.com/glossary/what-is-power-performance-area-ppa.html) density. But this sort of benchmarking, where one foundry is ahead or one foundry is behind, makes sense when you’re a whole generation behind or two generations behind or ahead. That’s when it makes a meaningful difference in your die output or your die area or functionality like power. But if you’re within a few percent, you’re splitting hairs at that point in time, because it’s not very unidimensional. It’s not just about density, it’s not just about raw performance. Different applications require different vectors.

You can be off by a few percent, but you need to be on time. Your execution needs to be such that your yields are very high to support very large and very rapid ramps. That actually is more important than catching up on a few percent in performance or area.

**Dwarkesh Patel**

I was looking at some [SemiAnalysis](https://semianalysis.com/) numbers that seem to suggest that in terms of transistor density, 14A — which will come out in 2028 — would be comparable to [N2](https://en.wikipedia.org/wiki/2_nm_process).

**Pushkar Ranade**

First of all, I would dispute your benchmarking. But like I said, it’s important to be generally in the right ballpark and be very predictable. Also, it’s not unidimensional. We don’t build one type of transistor, let’s say 14A or 18A. You build a few different types of transistors. There’s a [low-leakage transistor](https://en.wikipedia.org/wiki/Subthreshold_conduction), there’s a high-performance, high drive current transistor.

You’re building [SRAMs](https://en.wikipedia.org/wiki/Static_random-access_memory). There’s a high-density SRAM, there’s a high-performance SRAM. There are many other functionalities like analog circuits, [RF circuits](https://en.wikipedia.org/wiki/RFIC). It’s the sum of all of those that makes a technology competitive.

**Dwarkesh Patel**

I guess that makes the CapEx you do right now even more important. [TSMC is on track to do around \$50 billion in CapEx this year](https://www.datacenterdynamics.com/en/news/tsmc-announces-2026-capex-spend-of-56bn-after-posting-eighth-consecutive-quarter-of-growth/). You’re [on track to do around \$20 billion](https://www.cnbc.com/2026/07/23/intel-intc-earnings-report-q2-2026.html). If the tools you’re buying right now will determine who can service all this crazy AI demand that’s coming up, it makes the difference in CapEx right now even more important, or for the US versus other countries.

**Pushkar Ranade**

Yes, very much. It’s a little bit of an unfair comparison between us and TSMC today, just because today they’re a foundry for basically everybody and we’re largely a foundry for Intel. We’ll become a foundry for others. In due course, our CapEx will also grow.

**Dwarkesh Patel**

[Intel started as a DRAM business in the late ’60s](https://en.wikipedia.org/wiki/Intel_1103). You guys were producing DRAM, [which you sold off](https://www.npr.org/2012/04/06/150057676/intel-legends-moore-and-grove-making-it-last). A couple years ago, [you sold off your flash business](https://www.intc.com/news-events/press-releases/detail/1513/intel-sells-ssd-business-and-dalian-facility-to-sk-hynix). Thoughts on that? For context for the audience, these are now multi-trillion-dollar industries because they’ve just exploded as a result of AI demand.

**Pushkar Ranade**

Clearly, in hindsight, probably not the smartest time to sell off a flash memory business. There were good reasons why we did that when we did. Clearly, nobody could see this enormous demand.

But today, the world will eat up as much compute as can possibly be made, and it’ll eat up as much memory as can possibly be made. I would argue that [the supply crunch is larger for memory](https://en.wikipedia.org/wiki/2025%E2%80%93present_global_memory_supply_shortage) today than it is for compute.

**Dwarkesh Patel**

Can I summarize what seems to me the takeaways from your projections? You can tell me if that’s correct. That marginal production can increase actually very fast — on the scale of 12 months — but the amount of increase up till the end of the decade is extremely limited. Production could be higher next year than what people are forecasting, but production in 2030 is not going to be significantly higher than what people are forecasting.

**Pushkar Ranade**

Unless the entire supply chain ramps up production very quickly. We’re already in the middle of ’26, so there’s not that many years until the end of the decade. Given the [lead times](https://www.trendforce.com/news/2026/08/19/news-chip-equipment-crunch-reportedly-pushes-lead-times-to-24-months-giving-chinas-toolmakers-a-boost/)… Let’s say you place an enormous order for tools today, and you’re looking at 18 months to get those tools. You’re already into basically ’28. From that point on, if you have to build a new shell, build a new fab, you’re basically looking at the end of the decade.

### 01:01:02 – Terafab and rethinking the fab

**Dwarkesh Patel**

I think it’ll be interesting to discuss [the partnership you guys have](https://www.tomshardware.com/tech-industry/semiconductors/intel-joins-elon-musks-terafab-project-intel-is-proud-to-join-the-terafab-project-with-spacex-xai-and-tesla-to-help-refactor-silicon-fab-technology) with [Elon](https://www.dwarkesh.com/p/elon-musk) on [Terafab](https://en.wikipedia.org/wiki/Terafab). What’s going on there?

**Pushkar Ranade**

Well, Elon’s publicly talked about his desire to build a fab.

**Elon Musk**

We either build the Terafab or we don’t have the chips. And we need the chips, so we’re going to build the Terafab.

**Pushkar Ranade**

Sort of the same thinking. He’s seeing just an enormous increase in demand for silicon, for compute and for memory. I think he came to the conclusion that his own businesses are going to require a lot of silicon.

He thought maybe he should just do it all on his own. But unlike building a car, for example, this is such an intricate and complicated process that we thought we could work together to help accelerate his bringing up his fab.

**Dwarkesh Patel**

But because of the bottleneck at the tool level, it seems like the net amount of silicon in the world won’t increase. It’s just that maybe if somebody were to start a new fab, they would get access to guaranteed supply in a way that they wouldn’t have if they’re working with another person’s foundry.

**Pushkar Ranade**

It’s not just tools. A fab does require a lot of power, [a lot of water](https://semiengineering.com/how-semiconductor-fabs-use-water/), a lot of consumables. There are many other input variables as well.

**Dwarkesh Patel**

But those can be scaled in the way that tools cannot.

**Pushkar Ranade**

Some more than others, but yes. In one sense, yes, we need a lot more equipment. But it is true, we also just need a lot more raw fab space, raw [clean room](https://en.wikipedia.org/wiki/Cleanroom) capacity.

**Dwarkesh Patel**

If you think of a foundry like Intel, which has to build these expensive facilities and buy expensive tools, I wonder what you think the economics of that fundamentally could look like, whether it could get more economical, whether it could scale faster.

**Pushkar Ranade**

Like I described earlier, this is an extremely capital-heavy business. If you just plot how much it costs to build a fab over the last 20, 30, 40 years, I think it’s [doubling every 4-5 years](https://en.wikipedia.org/wiki/Moore%27s_second_law). Even inside the fab, if you look at the cost to do lithography, which is the most expensive module — just patterning — that itself is doubling at more than that rate. Today, [a High-NA EUV scanner and all its associated equipment costs like \$400 million](https://www.cnbc.com/2025/05/22/exclusive-look-at-high-na-asmls-new-400-million-chipmaking-colossus.html).

So what does that mean? If that rate were to continue, if you just draw the line, does that mean four years from now the cost of patterning is going to be like \$800 million? It doesn’t really make sense.

A very interesting thought exercise is to ask, are there things that could be just very radically different that we could do today that we perhaps couldn’t do 20 years ago? This is a very risk-averse industry for very good reason, for exactly that reason. You put in tens of billions of dollars, and you really don’t want to take any risks. You want to keep doing things the way they’ve been done for literally decades.

This is not just true of semiconductors, but everything really. If you’ve just kept on doing that for decade upon decade, you just become indoctrinated. There are engineers who probably work at Intel who are new, who come in and they’re taught, “This is how the fab works, this is the process flow.” They just take that as gospel. That’s just how it is done. But is that really the best way to build a chip today? It’s a really valid question.

**Dwarkesh Patel**

I’m very curious what you’re hinting at, because it could be anything from figuring out ways to use fewer litho passes and economize on this expensive component, to maybe we need to rethink the transistor. What is the level of—

**Pushkar Ranade**

All of the above. Transistor architecture is evolving. Just the silicon transistor has continued to evolve over 30, 40 years, and that will continue. You’ve seen the evolution from the planar transistor to FinFETs to now gate-all-around transistors. There’ll be more. That roadmap exists, it’s pretty well defined, with a lot of people working on it.

But there are things like… Do you really need a clean room today? Do you need the infrastructure to be as sophisticated, as complex as it is today?

**Dwarkesh Patel**

Surely one can run an experiment where you have people eating hamburgers and smoking cigars in the research fab and see what happens to yield.

**Pushkar Ranade**

That would be a great experiment to run, but no incumbent — Intel or TSMC or Samsung — would want to willingly do that. That’s what I meant by this. It’s a very risk-averse business, for good reason. Every one day lost in productivity is… I don’t know how many dollars.

**Dwarkesh Patel**

But you save so much money in not having to build clean rooms in the future.

**Pushkar Ranade**

But it’s really the risk, the fear of the unknown. Nobody is going to willingly take that risk. That’s why I think sometimes it’s good to just start with a clean slate and rethink everything.

The same thing applies to chip design, by the way. Many of the ways we do CPU design were probably locked in 30 years ago. Does that mean it’s smart to still do it the same way? Probably not. But this is a very complex problem. In chip design, I guess the capacity to take risk is maybe higher. This one, less so. But given where the economics is today, I think it’s a very valid question to ask. Maybe there’s a smarter way to do this.

**Dwarkesh Patel**

To close out, maybe we’ll start off at the same question we began the interview with, which is, how does Intel respond to this crazy AI demand that’s incoming and has already arrived?

It sounds like what Intel ought to do — if the ultimate bottleneck is that you guys already have these foundries, you already have the ability to expand these foundries, but what you will eventually lack is the tools from upstream in the supply chain — is to just raise as much capital as possible right now. The same way that [Nvidia has locked down memory and other components for reportedly hundreds of billions of dollars worth of commitments](https://www.trendforce.com/news/2026/08/27/news-nvidias-supply-commitments-soar-to-279b-as-memory-costs-surge-new-nvhbm-boosts-bandwidth-30-cuts-power-15/) that it’s made, Intel should maybe do the same thing: make all these commitments so that over the coming years, the US is in good position to have the bulk of semiconductor manufacturing at the most advanced levels happening here.

**Pushkar Ranade**

You’re suggesting we should be buying a lot more tools, right?

**Dwarkesh Patel**

Yeah, because it sounds like otherwise in a couple years you’d just be in a position where you’re like, “Oh man, we could be making trillions of dollars right now, but all the tools are in [Taiwan](https://en.wikipedia.org/wiki/Semiconductor_industry_in_Taiwan).”

**Pushkar Ranade**

Yes, that’s a very valid question. Had we known what we know today, we would have invested more like a year ago. Knowing what we know now, I think we’ll be investing more.

