---
title: "Update | 2025 Nov 15"
date: 2025-11-15T15:00:00-06:00
draft: false
---

I've been meaning to write something for a while. The further I went without writing, the more things I wanted to share in the next post, which led to it being more daunting than necessary and me never actually posting anything.

![alt text](drafts.png)

So this is not "everything I've been up to over the last X months." This is more, "what's on my mind recently-ish."

## Noobular

Around the end of September I started working on Noobular again. It's been fun! And it comes in a new form now. Quoting [this thread](https://x.com/alecchendev/status/1974379676996173995):

> I am working on noobular again. It used to be "a math academy where anyone can upload content", but I'm now pivoting to focus more on my personal goal of learning chemistry, physics, and other topics.
>
> It ideally serves 2 functions:
>
> topic -> course
>
> effort -> learning (at max efficiency)
>
> Here a course is a knowledge graph with a pool of problems for each atomic unit of knowledge, which boils down to just a big yaml file.

Most recently I've been working on automating course creation. I'd previously been copy pasting a massive prompt with a bunch of files into an AI, then copy pasting outputs in a sequence of instructions I'd written for myself to produce the best results. Now I have a script to do that for me. This then makes it easier to run parts of this script as a job on the web app version so anyone can make these. And I've just released a bare bones version of that today on the [alpha site](https://alpha.noobular.com).

Since sharing the alpha site publicly, I've been trying to narrow in on a single subject, and make something solid, even if it doesn't generalize super well yet. I've personally wanted to learn physics from a more bottom-up theoretical approach for a little while, and had this textbook laying around that I bought a year ago. Using a textbook as source material is helpful for narrowing my scope for working out course creation, and is an interesting use case in itself.

So now, each day I'll try and do a subchapter from Young and Freedman's University Physics book, but using Noobular. This then gives me feedback on what's good/bad, and I can go and improve things little by little.

I'll start by generating an outline with my script, then generate a single lesson at a time. Within a lesson, the script will create content for the knowledge points in the lesson, then for each knowledge point, generate a big set of questions, then go through each question, validate it makes sense, solve it with a step by step solution, then generate choices and an explanation from the solution. It sounds like a lot of steps but the result is I can run a command or two, and get a pretty solid course using the cheapest grok 4 model. Right now a subchapter, with about 3 lessons, each with 3 knowledge points, 10 questions each, costs around 40-50 cents, and takes 5-10 minutes to generate. The course creation time is dominated by question creation/validation, which is embarrassingly parallel, so the generation time can definitely come down a lot. The cost might be a little more difficult.

It's come a long way, but there are still some straggler mistakes here and there. I can put up with it for now, but I'm not sure if others will. I sort of wonder if I just use more expensive models, will these stragglers disappear? The expensive models do get quite a bit more expensive...but still cheaper than an actual PhD student!

This specific textbook use case is interesting. Throughout this process, I've done a mix of using the textbook on its own, vs. using a Noobular generated course with the textbook as source material. I enjoy the feedback from something a bit more interactive, and even with the naive form of mastery learning, active recall, scaffolding, etc. implemented in Noobular today, I can feel a qualitative difference, albeit small, compared to just reading the chapter and trying some problems at the end. Though at the same time, this textbook is really great. Clearly the authors had put a ton of time into the pedagogy of teaching skills in this content. And in turn, this makes the Noobular course better, since it has great material to pull from. There's still lots to do in terms of improving the actual learning techniques implemented here, but it's interesting to get a sense for the value vs. a high quality textbook even at this stage. I think there's an argument to be made that maybe this is overkill or something, but whatever. It's fun to work on, and it seems like there's some faint glimmers of magic in here waiting to unfold. Lots to come.

## 3d printer

I bought a 3d printer! I printed some random stuff, and then took a stab at designing something myself when I saw some small improvements I could make to a phone stand I'd printed.

Couple details I wanted to improve upon from the off-the-shelf stand:

- The bottom section gets in the way - in vertical mode it's hard to swipe from the bottom (which is a very common gesture), in horizontal mode it's difficult to access volume buttons.
- Pitch angle slightly too high
- When I move the holder the phone falls off easily
- Charging cable has to bend a little too much (phone is too low to surface)
- Magnets are rad

![Old stand](old_stand.jpeg)

![3d model](3d.png)

![New stand](new_stand.jpeg)

I use this new stand everyday and it works great! I shared it with my family and from popular demand I'm going to replicate these in some different colors to give to them as gifts.

## Solar

Some months ago I made [this CLI](https://github.com/alecchendev/solar) to reproduce the results from Casey Handmer's solar + battery simulations and I got [a retweet from him](https://x.com/CJHandmer/status/1964910920242794931)! Here was one of the primary outputs:

![solar cost](solar.png)

Reproducing these results helped me grok them a bit more, which just increased my
existing urges to participate somehow in the impending proliferation of solar.
It really feels like centennial step change. Ideally I'd love to participate
by building hardware, but I've got some skills to gain before I can contribute
meaningfully.

![Physics problems](work.jpeg)

We're working on it. Small steps every day.
