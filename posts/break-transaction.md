---
title: 'Breaking Down Transaction Validation'
date: '2021-09-29'
---

Work in progress. This will only touch on the transaction validation aspect of cryptocurrency, not anything about consensus.

- Actually keeping track and making the ledger work
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