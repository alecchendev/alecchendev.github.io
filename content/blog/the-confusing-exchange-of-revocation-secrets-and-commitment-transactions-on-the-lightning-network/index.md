---
title: "The Confusing Exchange of Revocation Secrets and Commitment Transactions on the Lightning Network"
date: 2022-10-10 19:57:36.609000+00:00
---

I recently attended the first session of the <a href="https://chaincode.gitbook.io/seminars/lightning-protocol-development" class="markup--anchor markup--p-anchor" data-href="https://chaincode.gitbook.io/seminars/lightning-protocol-development" rel="noopener" target="_blank">Lightning Network seminar hosted by Chaincode Labs</a>.

The concept of this exchange in the Lightning Network protocol has personally confused me a lot, so I wrote this to challenge my own understanding and hopefully help others.

This post assumes you have some general understanding of the Lightning Network protocol.

In an ideal world people will always just follow a protocol as intended, however when designing protocols, we must take on an adversarial mindset to ensure it’s robust in cases where things don’t go to plan.

Ideally, when one channel partner pays the other, they both exchange signed commitment transactions, and then exchange revocation secrets, and all is well. But when channel partners don’t trust each other, who’s to say one will cooperate at all times?

First, let’s get something straight. Commitment transactions are asymmetric, i.e. channel partners Alice and Bob each hold different commitment transactions for each new channel state. When they agree to a new balance, they “commit” to that new balance by signing *the other’s* commitment transaction and sending it to them, so that *the other* partner can sign and broadcast it on-chain whenever they would like. This is a pretty confusing concept that is important to understand for the following discussion. Others have explained this better than I can right now, such as <a href="https://ellemouton.com/posts/updating-state/" class="markup--anchor markup--p-anchor" data-href="https://ellemouton.com/posts/updating-state/" rel="noopener" target="_blank">here</a> and <a href="https://www.derpturkey.com/revocable-transactions-with-ln-penalty/" class="markup--anchor markup--p-anchor" data-href="https://www.derpturkey.com/revocable-transactions-with-ln-penalty/" rel="noopener" target="_blank">here</a>.

**Main question**: What is the order of exchange regarding commitment transactions and revocation secrets?

A helpful approach is to consider the incentives of each channel partner, and see what the protocol allows.

Let’s consider an example of when someone is actually paying someone else, e.g. some coffee-drinking person Alice is paying some cafe owner Bob for coffee. Generally, we can assume that Alice needs to pay Bob before he gives her the coffee.

Note: We are assuming Alice and Bob are generally rational. Both people would like to transact, and neither of them want to giveaway their money or coffee without the other following through.

Both of them have some (at least 1% of the channel funds) funds locked up in the payment channel. If either of them were to give away the revocation secret for their latest transaction without getting a new commitment transaction, they would lose control of their funds. They wouldn’t be able to broadcast the latest commitment transaction on-chain without their funds being stolen, and their channel partner could disappear (or force them to pay up if they want to get any of their funds out). From this, we can imagine that each partner makes sure to get a signed commitment transaction *before* they revoke their previous transaction.

But who goes first? Let’s think back to the incentives of each person.

**Bob** wants to ensure he is getting paid before he hands over the coffee. “Getting paid” in the protocol means two things need to happen:

1.  Bob has a signed commitment transaction from Alice that allows him to broadcast the latest state where he’s been paid
2.  Alice can no longer broadcast the previous transaction where Bob has not been paid, i.e. she’s revoked it.

As for **Alice**, she would like to get her coffee, but she would be alright if the previous transaction — where she hadn’t paid for the coffee yet — is broadcasted.\*

It took me a while to realize this, but it actually works if either person goes first. Let’s see how.

Let’s say Alice signs Bob’s commitment transaction first. Now that Bob has the latest state to broadcast, he happily shares the revocation secret of his previous commitment transaction with Alice.\* Bob needs Alice to revoke her previous transaction in order to give her the coffee, so he signs her new commitment transaction and sends it over. Alice shares her revocation secret as the final requirement to get her coffee, and the transaction is complete.

Let’s say Bob signs Alice’s commitment transaction first. At some point Alice will need to share her previous transaction’s revocation secret in order to get her coffee, so she just does it now. Bob still needs his commitment transaction signed, and Alice wants her coffee, so she signs his. Bob can now safely revoke his previous transaction.

\*Note: You might notice that in our example, Alice (the payer) doesn’t actually care if Bob revokes his previous transaction because it would benefit her if he were to broadcast it. So what if he doesn’t revoke it? At the end of this transaction, it wouldn’t matter. But let’s say at some point in the future Bob pays Alice, and now her latest transaction balance is higher than the previous one that Bob hadn’t revoked, she would need him to revoke that previous transaction for Alice to make sure he couldn’t cheat her by broadcasting it. It would be annoying to have to keep track of this specific edge case far into the future, so Bob (the payee) will revoke his previous transaction for this latest update to be considered complete.

### Recap

-   Each person’s latest commitment transaction must be signed by their partner before that same person revokes their previous transaction, otherwise they won’t be able to close the channel without their partner.
-   In a buyer-seller scenario — which is generally representative of payments — each channel partner’s incentives drive them to cooperate.
-   The seller’s incentive is to get paid, which means the buyer must revoke their previous transaction, and sign the seller’s latest commitment transaction.
-   The buyer’s incentive is to get whatever they are buying, and so they must cooperate to pay the seller.
-   It doesn’t matter who signs the other’s commitment transaction first, because no matter what, for the seller to hand over their product/service, the buyer must fulfill all the requirements to pay the seller.
-   The buyer doesn’t care if the seller revokes their old transaction for this single payment, but they will need them to revoke in future transactions where it would allow the seller to cheat.

Hopefully this helps! If I’ve gotten something wrong, or you have any other feedback, <a href="mailto:alecchendev@gmail.com" class="markup--anchor markup--p-anchor" data-href="mailto:alecchendev@gmail.com" target="_blank">please let me know</a>!
