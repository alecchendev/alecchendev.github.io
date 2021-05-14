---
title: "Sapiens and the Permanent Web"
date: "2021-05-10"
---

I've been reading the book *Sapiens* by Yuval Noah Harari recently, and although I'm less than halfway through it has taught me so much. This is not a comprehensive view of my notes from the book, but a highlight and a connection that I've realized from my time reading.

Probably the most central claim from the book, or at least what I've read of it, is that the key to humans success and survival has been our ability to cooperate and large numbers, enabled by our ability to collectively believe in the same fictional ideas.

Some of these fictional ideas include...

- Hierarchy
- Religion
- Companies
- Nations/tribes
- Value of currency
- Equality
- Happiness

All of these things are sort of abstract ideas that don't *really* have any objective foundation. Nevertheless, they are ultimately key factors in allowing our societies to function on such large scales.

### The Arrival of the Internet

The internet takes it the next level. It allows us to transfer information, and so our imagined ideas, much more quickly, which allows culture and people's beliefs to change more rapidly. It allows us to collaborate on a global scale agnostic to geography, as we've seen with things like the open source community or even just remote work. Nowadays it even is allowing us to perform transactions and transfer value, but more on that later.

### The Current State of the Internet

Right now, the vast majority of applications and information run on/through *the cloud*. What is the cloud? In one word/acronym: AWS. More generally, in the current system, many of the most widely used platforms today rely on the compute power of servers hosted mainly by a few large tech companies, namely Amazon Web Services, Microsoft Azure, and Google Cloud Platform. We open our browser, we visit a website, we retrieve the location of the data from a series of DNS requests, mostly likely with the location being a server amongst one of these platforms, and the web page/data is sent back to us.

Because many of these things are only accessible through the web, and thereby through these servers, our ability to use these services is in full control of a select few companies. In a way, this kind of makes sense. They offer the services, they have the power to take it away. But when it comes to something as increasingly fundamental to our daily lives like the internet, it begs the question, wouldn't it be better if our ability to simply find information on the web wasn't at the mercy of a single company?

We've already seen an example of this centralized power when Twitter banned/flagged accounts/tweets.

There are other problems with the current system such as privacy, safety, speed, and permanence. I won't get into them here, but I highly suggest checking out the links at the bottom for more information.

In the past, our societies themselves have had distinct hierarchies and centralized power. A lot of civilization has moved from monarchs and oligarchies to different systems giving more power to the general public in hopes of mitigating the risk of abuse from power being too centralized.

What's exciting is how the internet may be trending this way as well.

### Up Ahead

With all the hype around cryptocurrencies right now, it's got me reading all about this whole decentralized revolution. More broadly, my reading has led me to explore several interesting projects from an open-source research and development group called Protocol Labs. Among many, IPFS, or the Inter-Planetary File System, is a protocol/p2p network supporting what they call the permanent web, also known as the distributed web, or merkle web.

You can go read more on their website, but briefly, in the distributed web, data is transferred from computer to computer through a peer-to-peer network, and content is addressed through CIDs, which are just cryptographic hashes of the data itself. So instead of looking up a domain name, and waiting for the data from that specific domain's server to get back to you, you would request the CID, and you would get pieces of the data you're looking for through the computers hosting the content most closely accessible to you within the network. IPFS is this plus other protocols that essentially provide a thin layer within our wireless communication to improve the infrastructure of the internet.

I'm really glossing over the technical details of this protocol, but this is truly a fundamental innovation in how the internet works. It's picking up traction recently because of the hype of decentralization with cryptocurrency, not to mention Ethereum actually uses IPFS. It has a lot of implications for the future of the web and technology in general, but these were just some things I've been learning about recently, and it's been getting me excited thinking about how our species' most unique trait is getting an upgrade to its most powerful tool.

...

I'm considering doing a more in-depth look at IPFS and other related topics, so stay tuned! For now, here are some resources that inspired me to write this post.

### Links

- [Stanford IPFS talk](https://www.youtube.com/watch?v=HUVmypx9HGI) - more extensive look at IPFS and the problems with the current internet
- [IPFS Course](https://proto.school/course/ipfs) - set of quick tutorials to introduce you to the inner-workings of IPFS made by its creators
- [The Web Is Broken: how DNS breaks almost every design principle of the internet](https://recompilermag.com/issues/issue-1/the-web-is-broken-how-dns-breaks-almost-every-design-principle-of-the-internet/) - overview of man in the middle attacks, slow speeds, and other problems with how content is addressed today through DNS