---
title: "My Summer of Bitcoin 2023"
date: 2023-08-19T23:27:07-05:00
draft: false
---

## Intro

At the beginning of this year, 2023, I decided to take a chance and see if I could get started contributing to Bitcoin open-source. A gap semester and a summer later, here I am. It hasn’t been easy, but it’s been a great time.

The following are some of the big themes from my experience looking back on the past ~8 months.

For context, I’ve been contributing to LDK/rust-lightning.

## Why LDK?

https://www.youtube.com/watch?v=oOT78Bgy1Qw. ‘Nough said.

But for real:

1. Can we get a sequel?
2. I’m pretty sure this was actually my first exposure to LDK. I finished watching the video not only being extremely entertained, but also thinking, “hmm, I should remember this one as a project I may be interested in later.”

But actually for real:

I was interested in contributing to lightning, and I liked rust. At the time I had seen non-custodial lightning on mobile to be the dream for bitcoin acting as a medium of exchange, and LDK was especially fit to enable this. The modularity of LDK also seemed promising for adapting to the needs of whatever lightning becomes in the future. So it seemed like a good fit.

## Open source is a really cool thing

The following is basically an ad for open-source, but also my best attempt to express my actual experience:

As a young programmer, it’s always been a struggle to find something I can work on where I can

1. be useful
2. do something I like
3. learn the things I’m interested in

Usually side projects end up being a little bit of 2 and 3, almost never really 1. Part-time or internship work is typically a bit of 1, and maybe some of 2 and 3. I think contributing to open-source may be the best chance at hitting all through pretty well.

2 is pretty hard to figure out in general, but once you do find something you like, there are probably some open-source projects that have good-first-issues for you to work on! It doesn’t matter who you are, where you are, whatever. As long as you have a computer, can write and read code (..and english), you can get involved helping out (Not sure about the broader open-source space, but Bitcoin projects tend to be really welcoming to new contributors.)

---

As I got feedback and iterated on my contributions, and as I gave feedback on others’ PRs, it was really cool to see PRs evolve into something everyone’s created together. You put up a PR, a reviewer asks some questions, suggests some ideas, you use that feedback, come up with things yourself, and after some rounds back and forth you’ve got something that’s the best mix of everyone’s suggestions. Strangers talking on the internet are able to come together to make something greater than the sum of their individual ideas. It’s so cool.

---

I can only really speak for the people I’ve interacted with on rust-lightning, but these people have all been extremely kind and helpful! Special thanks to Wilmer for being my mentor, and all sorts of help throughout my entire process. I have been really grateful to get to work with everyone who contributes to this project.

Even when I was just starting out, and I was new to all the small customs that are normal for regular contributors, everyone was really nice. Just thinking about it, it makes sense: the people who contribute regularly care a lot about this project; as long as you’re respectful and give sincere effort, they’re probably going to appreciate it. For many of these people, they’re in the place they are today because of other kind contributors helping them when they were starting out, so they’d understand the difference it makes to others. At least that’s how I see it for myself now.

And again, you can just go on the internet, find a project like this, and as long as you’re nice you get to work with some of the best people in the space? That’s insane!

---

So what’s the catch?

It’s hard.

BUT! You can do it, and be a badass.

That’s to be expected with anything really worthwhile I think.

Some things I would keep in mind if I were getting into it now:

I came into contributing to rust-lightning with a little bit of background with rust, and lightning, which helped a lot. I still was really quite a noob in both, but I could at least speak the language, and understand enough to figure out what I needed to learn.

Would highly recommend the Chaincode Labs seminars.

It’s still going to be hard. Expect it to be. Don’t be discouraged by it. It’ll get easier—not right away, and sometimes it’ll get even harder because you started reviewing/making a PR you didn’t realize was going to be so difficult, but generally after a while, it’ll get easier.

Review will probably be especially difficult. At least for me it was. In the beginning, it took me so long to review a single PR. And at the end I feel dumb leaving just a couple questions or just a LGTM, when it feels like other people so easily have so much insight to give.

But hey, it’s all apart of the learning process. Keep on with it.

P.S. you don’t always need other contributors to double-check every single logical step you took to reach something, and sometimes you actually may understand things better than you think :)

## Leveling up as an engineer

Contributing to open-source has probably taught me the most about developing software, and especially working with other people, asynchronously over the internet, on a big codebase.

---

Everything I’ve worked on so far in my programming career has been either a side project I’d built from scratch on my own or with a couple friends, a school assignment, or internship work. I never really had to absorb that much context to be able to contribute. Even in internships I had contributed to large-ish codebases, but not on this level, and not for nearly as long, and I only cared about finishing whatever my task was, not necessarily really understanding things and sticking around.

And maybe I could go a long time in my career just building smaller things, but a lot of things that are worth working on are things that are built to last, that are not necessarily small, and that even if they’re well-designed are still fairly complex.

Understanding bitcoin and lightning was hard enough, but I had never worked on something this large before so I was honestly pretty uncertain if I would be able to figure it out enough to do anything meaningful.

I think what made the biggest difference in me being able to contribute eventually was my ability to navigate code.

Both while making PRs, and especially while reviewing, I had never had so many questions about a code base and known so little of the answers to them. The other contributors would be helpful when I asked for help, but I wouldn’t be able to get anything done if I had to ask them everything. And unfortunately, GitHub Copilot Chat/X thingy is still not usable enough to make much of a difference in my experience.

This forced me to learn how to navigate code more effectively, and led to me exploring different editors to help me do this. I’m sure it’s probably not that hard in VS Code now that I know what features to look for, but I ended up learning navigation much easier in Helix/Neovim. Jumping through files, going back, seeing references to a function or struct/field, navigating symbols, seeing where a variable/field is used, etc. I was able to do all these things faster and easier, and it led to me being able to answer my questions about the codebase faster, and ultmately it made me confident enough to be able to get through review or making a PR now that I could do something when I felt lost.

Nowadays I feel really well equipped to answer most questions I have about the codebase. I might not have been here writing this blog post if I hadn’t figured this out!

---

From my exposure through school and side projects, git served only a couple primitive functions:

1. Pull code from remote + push changes to remote
2. Commit: Save a checkpoint, mainly so it can be sent to remote (up to here, you could get through all of college with just these two functions)
3. Make a PR if you’re working with other people

In school and side projects, it doesn’t really matter what your commits look like; no one is ever really reviewing code beyond checking that it works, and that you didn’t push `node_modules`.

But in open-source (and I guess any non-trivial project with more than a couple collaborators for that matter), code review is really important. It makes a big difference that you structure your changes so that they’re easy to review. This one requirement made me learn git on another level.

It really wasn’t all that much stuff, but for how often I use all of these things now, it feels like it changed my whole workflow.

Things I didn’t know before (some of these are semi-embarrassing):

- Rebasing, why, when, how
- Changing my PR’s commit history, making fixup commits, squashing
- Adding/committing/restoring parts of changes instead of only using `git add --all`
- Fetch vs pull, adding new remotes repos
- Viewing my/others’ commits and PRs
- Diff and show, seeing stats, comparing branches
- Worktrees
- Seeing when/who/what context in which something was last changed
- I don’t think I ever had written an actual commit description before (I honestly didn’t realize people used them lol, but I soon found them really helpful)

Now I feel like a pro!

---

I like programming quite a bit, and I’d like to be as good at it as I can. But that’s not really an end goal you can just work towards on its own (for the most part). It’s something that comes as a byproduct of trying to build software to do something.

I think out of all my side projects and school assignments, I’ve learned so much as an engineer contributing to open-source because contributing to LDK and Bitcoin more generally is something I actually care about. And to contribute effectively means getting better at programming.

Similarly, I wanted to know more about Bitcoin and Lightning before I started contributing. And I’ve learned and understood more about it by contributing this year than I had in the ~8 months prior that’d I’d been really interested in it. Meaningful context is a powerful thing for learning it seems.

---

## Conclusion

There’s much more I’d like to say more specifically on Bitcoin and Lightning, but this post is already quite long so, that’s all for now. It’s getting late, and I need to pack before moving back to campus tomorrow. And I really ought to get my laundry out of the dryer.

