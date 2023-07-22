---
title: "Pay to inform discovery"
date: 2023-07-22T15:31:36-05:00
draft: false
---

I initially posted this idea briefly on [nostr](https://nostr.com/nevent1qqsd4l44e8qt3mmh4wjt659lx3w0ftgr5el8324dneyymt38fuycaycpz4mhxue69uhhyetvv9ujumn0wd68ytnzvuhs7rmkyk) and [twitter](https://twitter.com/alecchendev/status/1682615734231347200), but I’ve been thinking about it more and wanted to elaborate here. Maybe a lot of this is common knowledge already, I don’t know. At the least this is a sort of summary of my thoughts on discovery and monetization.

I had watched Lex Fridman’s interview with George Hotz, and it resonated with me a lot when George Hotz said he supported twitter’s new business model because once you start making people pay for a product, they become the customer, and once that happens your business can be all about making the best product for your customer, as opposed to pleasing advertisers.

Separately I had been thinking about what new things micropayments on the internet could lead to. After some time, I had this idea.

## What is it?

You can read my initial description at the links mentioned above, but briefly this is what I mean by “pay-to-inform discovery”:

Imagine you have some internet service whose product is to solve discovery, i.e. offer a user a really good recommendation algorithm for some data source like twitter or nostr relays.

The user informs the service that they like a piece of content by pressing some button on that post and paying the service some amount proportional to how much they liked it. If you’ve heard of zaps on nostr, it’s the same thing, but you’re zapping the service not the creator.

The payment says “thanks for showing me this, I would like to see more like it.” Then the service goes out and tries to find more stuff that the user is willing to pay to see more of.

The service makes the most money by showing you the content that you are willing to pay for, and in doing so, shows you content you really like—otherwise there’s no way you would pay to see more of it.

## Cool things about this

The more I think about this, the more I realize some interesting things about it.

There are two big things that stand out to me here:

1. The incentives of the company are aligned with the user.
2. Payment is the best signal of “unregretted user minutes.”

### Incentives

Enough has been said about the poor incentives of an ads-based model, so I won’t say much about it here. All I’ll say is this: if you make your money by getting users to buy *stuff*, you have powerful forces shaping your product to get your users to see more *stuff* and make them feel like they want more *stuff*.

For pay-to-inform discovery, the incentives seem quite good. I think the only way to make the most money in a system like this really would be to show a user content they really like. Otherwise the user just won’t pay. But I think a lot of people would pay. Maybe that’s where I’m wrong, who knows. Maybe there’s a way to get you hooked to keep consuming *and* paying, but I doubt that’d be optimal.

I’m speculating a bit here, but it could even lead to people using social media less. I wouldn’t be surprised if a company found that people ultimately paid more for content when they spent less time consuming content, but the quality of content was really great.

I also think this could be more profitable than the existing ads-based model. I don’t have a ton of evidence to back that up besides the fact that I think it would provide more value, and the monetization model is pretty strongly correlated to the value it creates (maybe ads still make more at the expense of the user, but I doubt it). Also, many people have exited any sort of curated feed because they feel like it’s taking more than it’s giving, and I think this could have a chance at changing that.

### Signal

Currently we don’t have a great way to signal “unregretted user minutes.” If we did, I’d imagine it’d be a lot easier to optimize for that, and that doesn’t seem to have happened yet.

Here are the options for me to tell twitter that I really like a piece of content and want to see more:

- Engagement
    - Like, comment, retweet, bookmark, follow
    - Use the app for longer, spend more time looking at the tweet?
- Pay for exclusive content from a creator

There’s probably many more nuanced things they track but these are the main categories from what I can gather.

Engagement has proved to be a fairly decent metric to find what people “like.” Except that “like” here doesn’t really mean they *liked* it, more that it made them interact with a piece of content or continue using the app. Sometimes that may be because they actually *liked* it, but it could also be because it just triggered something primal in their monkey brain—made them angry, insecure, etc. Even if the content didn’t go as extreme to subtly emotionally manipulate me, a simple like or retweet doesn’t really communicate “I’m glad I saw this,” it just means that I wanted to share it directly or indirectly.

Paying for exclusive content from a creator I would say is pretty great signal, and for $1/month it actually shares a lot of benefits that this pay-to-inform idea has. The caveat is that the content is exclusive, and even $1/month is large enough to deter many people from paying. You also lose the granularity of communicating how much you like individual pieces of content as opposed to a creator, which I imagine could make a big difference to a recommendation engine.

Paying small amounts on individual posts seems to fill a gap that is left in today’s interfaces. At the moment, there’s no way to directly communicate the value of individual posts to a discovery service, which when said out loud, seems like a really important form of feedback.

And what better way is there to make the best experience for your user than to get the best feedback? I think this could lead to a product that is significantly better than what we see today.

**Additional note on nostr/zaps**

On nostr it’s common for people to pay a small amount to the creator of a note, mostly as a tip (called a zap). This is pretty cool. I imagine it’s great feedback for the creator as to what people value, but at the end of the day it’s still mostly just a donation. Donations are great, but it feels like it’s missing something. And even if a discovery service uses zaps to inform it’s recommendations, it still needs a way to monetize.

Nostr (and centralized social media with open APIs to some extent) has a lot promise in letting users be more in control of discovery. With anyone being able to create a filter on the same selection of data sources, it becomes easier to create tools like [this](https://nostr.com/note18fv9jq0e4nmlcp6gp788lckk9c6e794tprv0mcg9gsdgulqw09zsxyya7y). But although the systems-programming do-what-I-say tools are great, discovery broadly feels like more of a machine-learning I-want-this-figure-it-out type of problem. And this pay-to-inform idea seems like not only an amazing feature in the model, but also aligns maximizing profit with maximizing value as the loss function.

### Where does it fit

I don’t think this would replace all existing social media. There’s still many cases where you may want to just keep up to date with certain accounts for example, and that’s fairly agnostic of any sort of improvements to recommendation. But for all the time spent on a “for you” feed, I think it could make a big difference.

## Micropayments

There is probably some way to get micropayments for this service to work well on the current payment rails. Even if you can’t natively transact smaller denominations than a cent, the sum of payments may add up to an amount that can settle fine in cents at the end of the month or something.

But things will probably get a lot harder if you want to: split payments with creators, offer the service internationally (or anywhere with internet access beyond select countries supported by these rails), use more than one discovery service, avoid lock-in to any single platform, settle the payment sooner than the end of the month, etc.

What speaks more to the limitations is that—maybe this is just not that great of an idea, but—it seems sort of obvious, yet hasn’t been done (as far as I know).

So, the best bet here is probably using Bitcoin/Lightning. The existence of zaps on nostr are a pretty good indication of the capability of Bitcoin/Lightning to make a service like this work well.
