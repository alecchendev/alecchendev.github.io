---
title: 'Block Verification'
date: '2021-10-05'
---

At this point, nodes are just listening for transactions. We can verify transactions are valid--that money is truthfully coming from the wallet they say it’s coming from, and that that wallet has the money to send--but this hasn’t yet solved the problem of disagreement on the order of transactions.

For our system to work, we need everyone to be on the same page on how much money everyone has. Because of this, transactions are not just accepted instantly, meaning I can create two different valid transactions and broadcast them both to the network. Let’s say I have 1 BTC in my wallet, and I broadcast a transaction saying I pay Dave 1 BTC, as well as one saying I pay Kenny 1 BTC. Because it is a distributed network, the two transactions may arrive in one order for one node, and another order for another node. In the Bitcoin protocol, we don’t have a way of verifying that the timestamp of the transaction is truthful, so without some system of consensus, some nodes would say Dave has 1 BTC and other say he doesn’t. If we were to continue to operate, I’ll have effectively spent the same coin twice. This is what people typically refer to when they talk about *double spending*.

So, to have our system of decentralized currency actually work, we need a system/protocol to make sure everyone is on the same page in terms of the order of transactions. The following is said system:

1. People broadcast transactions.
2. Nodes hear transactions.

Albeit at different times according to how transaction data is distributed throughout the network.

3. Nodes place ~1500 transactions in a block, as well as an extra transaction rewarding themselves with a small amount of Bitcoin for if they end up contributing this block.
4. Nodes look for a valid nonce for their block. This takes about 10 minutes.

*What makes a nonce valid? What is a nonce?*

A nonce is just a number, usually a number that’s used for a one-off occasion.

A nonce is considered valid if the output of the protocol’s selected hashing function--given the input of: the nonce, the node’s block’s transaction data, and the previous block’s hash--has *n* 0 bits in the beginning.

sha-256(Prev blocks hash + transaction data + nonce) = n zero bits in beginning

There’s a bit to unpack here.

*Wait what is a hash?*

A hash function is a one way function that spits out fixed bit output. One way meaning given an output, it is seemingly impossible to find the input other than to brute force guess and check inputs, i.e. the output is seemingly random with regards to the input. Fixed bit output meaning when you represent the output in binary, it will always come out to be the same number of total 1s/0s. Although it is possible to have collisions, i.e. multiple inputs with the same output, given hash functions that are most commonly used in these contexts like SHA-256, where the output space is 2^256 unique outputs, the likelihood of a collision is pretty slim to say the least.

*Why does it take 10 minutes?*

Because the only way to find a valid nonce is brute force, 10 minutes represents the amount of time it takes for a network of computers all grinding inputs to find the right nonce. You might be thinking that with more computers in the network, this time must diminish...and it does. But the Bitcoin protocol accounts for this, and adjusts *n* (the number of 0 bits required in the output for a nonce to be valid) to increase or decrease, changing the difficulty of finding the nonce so that as the network scales, the time it takes to find a block is still approximately 10 minutes.

*Dissecting the input to the hash*

Input: previous blocks hash, transaction data, nonce

Output: 256 1s/0s

Desired output: 256 1s/0s with n 0s in the beginning

Because the transaction data is part of the input, it means that the nonce we find is going to be specific to our block of transactions.

Because the previous blocks hash is part of the input, it means the nonce we find is going to be specific to the previous block. Extending this logic, each block is tied to the previous block, and so to change any block, it would require finding new nonces for all blocks that come after.

This is why it’s called a *blockchain*. All blocks are chained together through their hashes.

5. Only with the right nonce will others accept the node

Given this protocol, it means that the longest known chain is bound to be the one with the most people and therefore consensus. As time goes on, the odds that a group smaller than another could contribute blocks at the same rate decreases exponentially.

At all times, there can be multiple competing chains. As nodes hear new blocks broadcasted, they may request from other nodes to send them copies of their chains so that they are up to date with the latest data. As honest nodes, we want to accept and work off of the chain with the most consensus. Given what we know, when confronted by conflicting chains, we can choose the longest, and if they’re about the same length, all we have to do is listen for blocks, and when one significantly usurps the other, we can be confident it is the chain with the most people on it.

This protocol is called *Proof of Work.* You may have heard of it.