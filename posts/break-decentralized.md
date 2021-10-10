---
title: 'Breaking Down Decentralization'
date: '2021-09-29'
---

Some context behind the systems supporting blockchain, cryptocurrency.

- The foundation for all of blockchain, cryptocurrency, decentralized systems, etc. is just the combination of two fields in computer science: distributed systems and cryptography.
- The big topic that was revolutionized in these spaces was decentralized public consensus.
- Throughout history humans have tried to set some sort of documentation for very important things. For things like ownership of land, usable currency, constitutions, these things are so important that as civilizations we need to have a system that allows us to agree on a single truth about information regarding these topics.
    - If Johnny gets a piece of paper that says Joey gave him his land on 4th and peabody, Johnny should be able to show that to Jimmy to prevent him from setting up shop in the same place.
    - For most of history we have had government and legal systems enforce the integrity of something like notarized documents for housing, finances, justice, and other systems. I.e. Jimmy doesn't set up shop because he knows that if Johnny's document is legit, a third party—the government—will step in to make him leave.
    - This is centralized consensus. For society to function, we want to be able to collaborate with people we don't know. It would be quite a hassle to get to know them and build enough trust to interact on serious things, so we all agree to put our trust in a single entity, the government/laws, as a way of interfacing interaction between any two people under the same system. Our participation in a system dictated by a central organization allows for us to agree on information, such as the fact that Johnny does in fact own this land.
- Our legal systems are not always perfect. Sometimes things can be slow to take effect when timeliness is crucial. Often legal documentation is ambiguous or lacks coverage for different situations, and so unjust things slip through.
- Enter decentralized software. Through the use of the same software, we agree on the  protocols that are in place, and these are rigorously unambiguous. Through decentralization we achieve this consensus without a third party and the flaws that may accompany it.
- How does this relate to blockchain and cryptocurrency?
    - What is blockchain?
        - It is just a form of decentralized consensus.
        - A system in which **information is distributed amongst a network** in the form of cryptographically connected blocks of data in such a way that participants in the network can **come to agreement on the legitimacy of the data**.
        - When you really break it down, it is just the data structure of cryptographically chain blocks of data.
    - What is cryptocurrency?
        - Digital assets/tokens that people can use to store/transfer/account value where the assets are given legitimacy by software, i.e. the fact that people trust the software provides the source of truth about people's funds, transactions, etc.
- Context for conensus
    - Distributed systems and cryptography. Networking and math.
    - Distributed systems - consensus
        - I would say the more common/well known application of distributed systems is to scale up software systems to support a greater user base.
            - E.g. Google was getting a lot of users, so many that one server could not respond fast enough to everyone. So they bought more servers. But then they couldn't store all the information necessary to index the entire web on each of the servers. So they needed the servers to be able to talk to each other to transfer the necessary information in a timely, cost efficient, and consistent manner. So they wrote some software to do so. This software is distributed systems.
        - One aspect is data replication.
            - You want the same data on multiple computers, so that you can provide the client with the right information. With multiple computers, you can respond to more people at once, you can still respond to people when one computer is down, and you can recover the information is one computer loses it.
            - What happens when you edit, delete, or add data? What if someone sends a request right as you do that?
            - Enter the topic of consensus.
            - Most of the time, within a consensus system, there will be a single leader, often called a primary, that will be treated as a single source of truth and the other computers, called secondaries, will query the primary to update their own data. Maybe the primary crashes, then before it crashes it will elect one of the secondaries as a new primary and broadcast this fact to the other secondaries. Or maybe the computers will regularly take turns being the primary.
                - But what if one of these servers was from another company? What if it was advantageous for that server to broadcast inaccurate/incomplete data?
                - You definitely can't have just one primary now, and secondaries can't blindly trust the primary at any point.
                - With this new constraint, we have demand for a slightly more complex system. Cryptography enables the system that meets this need.
    - Cryptography - hashing
        - Hash function: one-way function that takes an input of any size and spits out an output of a fixed size.
            - One way function: given the output, you cannot easily derive the input.
            - How can hash functions be one way? Given they taken any input and have a fixed number of possible outputs, it means each output has multiple possible inputs. Also, because hashes are typically specially cryptographic functions, they map inputs to outputs in a certain way as to make the output appear to have no pattern associated with the input.
                - Isn't this a bad thing? Two inputs having the same output? Well, in the most commonly used hash functions, the output spaces are incredibly large, e.g. sha-256 having 2^256 possible outputs. With such a large output space, the odds of finding a collision (two inputs with the same output) is less likely than the universe imploding.
                - It is not proven that there is actually no way to find an inverse function to produce the input from output for modern day hash functions such as SHA-256, however the fact that no one has done it yet gives us (and all the software companies responsible for our tech) enough confidence to use it.
- How do you actually accomplish decentralized consensus through software?
    - Main problem: How do we ensure everyone has the same ledger?
        - In an ideal world, computers would communicate instantaneously with one another and with 100% accuracy and success rate and 0 latency and making a distributed system would be a trivial feat.
        - However when you have lots and lots of transactions being broadcasted from all over the world, it would be very easy for some computers to get certain transactions in an order different than what actually transpired.
        - If you get the wrong order, or miss some transactions, or just haven't gotten all the most recent transactions, you will not have consensus on how much money each person has, and your system will not be functional.
    - Consensus and blockchain
        - 3Blue1Brown explains this better than me: [https://www.youtube.com/watch?v=bBC-nXj3Ng4](https://www.youtube.com/watch?v=bBC-nXj3Ng4)
        - Main consensus algorithms for public networks: Proof of Work (PoW), Proof of Stake (PoS)
        - Both consensus algorithms work in a fundamentally similar way (high level): a random node is selected to contribute a block of (verified) transactions that will be considered true, each node enters this random selection by providing some sort of resource
        - Bitcoin uses proof of work
        - How does proof of work work?
            - A block of transactions is considered valid if the node contributing the block provides a number (nonce) that when combined with the transaction data and passed through a hash function it produces an output with a certain number of zeroes at the beginning.
                - Hash function: one-way function that produces an output of a fixed size.
            - Because this is a seemingly random function, the only way for a node to find the nonce to make the block valid is for it to brute force compute different numbers and check the output. This means for a node to contribute a valid block, they must expend a certain amount of computation time.
            - We link the blocks together by making the hash of the previous block another input for the hash in the current block. This means that as more blocks are added to the chain, for a dishonest node to propose an edit to a previous block or a competing chain, they would have to redo all the work for every successive block. This is really what a *blockchain* is.
            - Because a longer chain shows proof of more computational work, and because computational work is the resource agreed upon as the source of validity, nodes can decide that should they have to pick between different chains to follow, the longer chain is most likely the truth.
            - Overall, this structure and protocol provides a system that allows for decentralized consensus with the security guarantee that it is probabilistically infeasible for a network of majority honest nodes to be overtaken by an adversary (byzantine fault tolerance).
        - Updated flow:
            1. Nodes make and broadcast transactions.
            2. Nodes hear and verify transactions (checking signatures and amounts) and put them in a block.
            3. Nodes brute force numbers to find the nonce that will make the hash of the nonce, transaction content, plus the hash of the previous node have a certain number of leading zeroes. The node then broadcasts the block.
            4. Other nodes listen for the block, verify the hash, then record it in their own copy of the ledger.
- How does this process actually solve decentralized consensus?
    - The main problem being solved by consensus is double spending. The purpose of proof of work is to have a system you can trust for this consensus.
    - You will never get impossible transactions. But even so, if you cannot trust that the ledger you have is the correct ledger, i.e. there is not consensus on the order of transactions/current balances, even if your ledger is a possible option (which it is), if you don't know it's the one that everyone else has, how can you use it as a reliable way to transfer value? More generally, you just don't have consensus.
    - With proof of work, the longest chain is proof that the most people agree on this version of the blockchain.
        - The chain with the most consensus is the *right* one.
        - Given a system operates on proof of work, it means the longest chain is the one with the most consensus, because for a chain to be longer, it *must* have more people contributing to it, because it is probabilistically infeasible otherwise.
        - Let's say if people wanted, they could choose to agree on a different chain, and if big enough, if they convinced enough others to join their chain, they could have an independent network operating on a different history of transactions. BUT given the assumption that the network is majority honest nodes, that they want to choose/contribute to the chain with the most consensus, the longer chain will be the one that represents the majority consensus, and therefore the *right* one. And if you are an honest node yourself looking for the right one, you can trust that the longer one is the one you are looking for.
    - How do you know if you have the longest, that there isn't some longer one out there?
        - Blocks are broadcasted to everyone. Assuming everyone will get the block *eventually*, any node will have the knowledge at a point to get the longer chain.
        - Each block a node gets, it can request previous block if it's missing. So even if you miss a fair amount of blocks, as long as you get the latest one(s) eventually, you'll find the longer chain.
    - How do you get a copy of the chain? What about when first joining the network?