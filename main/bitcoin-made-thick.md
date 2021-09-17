---
title: "Bitcoin.pdf Made Thick"
description: "Bitcoin.pdf Made Thick"
date: "2021-09-16"
---

# Bitcoin.pdf Made Thick

The original bitcoin whitepaper is very readable and concise, but because of this it's very dense. It can be hard to grasp everything in the paper; this may help with that. I just wanted to write this to test/practice my understanding of bitcoin/cryptocurrency from the ground up and thought it could be a helpful resource as an alternative explanation for some of the concepts when being introduced to cryptocurrency.

- Outline
    - Currency
    - Digital currency
    - Decentralized currency
    - Cryptocurrency
        - Digital signatures
        - Proof of work
        - Blockchain
- What is currency? Something where there is general consensus on the value.
    - Economic definition: medium of exchange, medium of accounting, store of value. Does bitcoin fit these? yes.
    - The only thing we really need in order to use a currency is to know how much any person has of the currency -
        - How do we do this?
- The only thing we need for a functioning currency is to know how much any person has
    - Why? So that we know they have enough to pay us, to know they aren't creating fake money, etc.
    - Side note: This is easy with physical currency, you just pull up your bag of gold and we've got all we need. We'll see how this is more nuanced when it comes to digital currency.
- Digital currency: have computers keep track of who has how much
    - Nothing new here. This is how we have credit/debit, taxes, online purchases, etc. We leave it up to banks/bank software, venmo, paypal to keep track of how much we have.
    - Note: these computers are managed by a central organization.
        - JP Morgan chase could fuck shit up for me - the only thing holding them back is the law, consequences that would ensue (were they to break the law) enforced by the government.
    - Note: the government enforces the correct usage/management of the currency. They also can create as much as they want.
        - What if your government just kept printing money? Well they can. Enter hyperinflation, e.g. zimbabwe, venezuala - people in these countries are screwed, they can't buy toilet paper because the money they earned yesterday (in extreme cases) is a fraction of what it was worth yesterday. These people did nothing wrong, but their government screwed them over.
- Decentralized currency: purely digital currency where the correct usage/management of the currency is enforced by participating nodes on a network of computers
    - Through a set of protocols, manifested through software, strangers (computers) can cooperate to agree on certain things, i.e. transactions/data
        - In the case of currency these transactions are financial transfers of currency between different entities, but it can be generalized to be that computers can cooperate to agree on any form of data. Enter the topic of consensus in distributed systems.
        - Wdym protocol
            - High level: a set of terms agreed upon by participating entities for how they can interact.
            - Example in software: HTTP - hypertext transfer protocol - when your browser visits [google.com](http://google.com) it (among other things) sends a block of data in a certain format, a format that complies to the HTTP protocol, to a server that then responds with the right data, i.e. the html/css/js representing google's landing page.
            - If we just sent requests in any formats we liked, we'd have to write a lot of different software to make the internet work like it does today.
            - If we agree on how we want our software to work, i.e. the software we use abides by certain protocols, we can form systems that can accomplish unique things.
    - Instead of leaving it up to banks/fintech companies to have control/responsibility for keeping track of who has how much money, everybody/every computer participating in the network keeps track of who has how much money
- So how do these computers actually keep track of who has what?
    - Flow:
        1. Everyone keeps their own record, some might dare to call it a "ledger," of all transactions that ever occurred
        2. When someone gives you money/you give them money, check your ledger to ensure they/you have enough
        3. Tell everyone else about your transaction so they can update their ledger
    - Two main structures for transaction storage: UTXO, account-based
    - Bitcoin uses UTXO - unspent transaction output - each transaction is represented by the total remaining (unspent) currency left in each of the accounts that just transacted
        - Ex.
            - An example set of blocks
                - (imagine some allocation of currency prior to this to allow for example to be plausible, i.e. Account 0 has 40, Account 1 has 110, Account 3 has 110)
                - Block 0
                    - Account 10: 50
                    - Account 66: 100
                - Block 1
                    - Account 10: 70
                    - Account 256: 90
                - Block 2
                    - Account 66: 75
                    - Account 256: 115
            - From this we can deduce the transactions that occurred and the most recent totals for each account
                - Transactions
                    - Block 0: Account 66 gives 10 to Account 10
                    - Block 1: Account 256 gives 20 to Account 10
                    - Block 2: Account 66 gives 25 to Account 256
                - Final totals
                    - Account 10: 70
                    - Account 66: 75
                    - Account 256: 115
    - Note: with just this system alone, what stops me from telling everyone Jeff Bezos just gave me 50 million dollars?
- How do we verify the validity of a transaction?
    - Digital signatures. Have each person participating in the transaction contribute some unique credential towards the transaction that lets everyone know that Jeff actually paid me.
    - Requirements for this system to work:
        - It should be extremely hard (practically impossible) for someone to be able to forge/provide the signature of another person
        - We need a way to ensure the certain signature came from the certain account
    - How do you actually do this? Cryptography.
        - Everyone gets a public and private key pair.
            - A key is just a very long string of seemingly random characters.
            - The public key is generated using the private key through special mathematical properties/functions in a way that allows you to perform operations on data using the private key, and use the public key to verify the operation was performed using the private key.
            - If you care for technical details on a common way for how the pair is derived:
                - A (Relatively Easy To Understand) Primer on Elliptic Curve Cryptography - [https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/)
        - Everyone can see your public key, but only you know your private key. Using your private key, you can perform an operation (a signing function) on some data (e.g. the transaction itself) to produce a "signature" and your public key can be used by others perform a different operation (a verifying function) on your signature to output whether or not it actually came from your private key.
            - Ex.
                - Typically with public key cryptography, it would be used for encrypted communication. Bob would use Alice's public key to encrypt his message, send the incomprehensible string of characters to her, then only she could decrypt it because only her private key could decrypt a message encrypted by her public key (because of how they were generated together).
                - If you flip this system around (swap the public and private key), it can be used for a simple signature system. Broadcast an arbitrary message (or maybe a non-arbitrary message like the content of a transaction) to everyone, then provide a version of that message encrypted by your private key. Then if people can decrypt the message using your public key and it matches the original message, they know you actually have the correct private key specially linked to your public key.
- Sounds like a pretty solid system now, right?
    - One more problem: How do we ensure everyone has the same ledger?
    - In an ideal world, computers would communicate instantaneously with one another and with 100% accuracy and success rate and 0 latency and making a distributed system would be a trivial feat.
    - However when you have lots and lots of transactions being broadcasted from all over the world, it would be very easy for some computers to get certain transactions in an order different than what actually transpired.
    - If you get the wrong order, or miss some transactions, or just haven't gotten all the most recent transactions, you may allow someone to overspend or be vulnerable to impossible transactions made by possibly dishonest nodes. Most importantly you will not have consensus on how much money each person has, and your system will no longer be functional.
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