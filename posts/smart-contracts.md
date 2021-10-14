---
title: "Breaking Down Smart Contracts"
date: "2021-10-14"
---

For most of this you don't need much background in blockchain.

## What is a contract?

A set of promises. Typically between two entities.

Usually it entails some sort of transaction, like party 1 will do X, and party 2 will do Y.

## What is a smart contract?

A smart contract, as first defined by Nick Szabo in 1996 is "a set of promises, specified in digital form, including protocols within which the parties perform on these promises."

"A set of promises" covers the **contract** portion.

"specified in digital form" - somewhat contract/smart contract agnostic

"including protocols within which the parties perform on these promises" entails what makes it **smart**. I see this phrase to mean that the contract itself is self-executing, i.e. it automates and/or ensures the execution of the promises. [1]

A great example, also from Nick Szabo 1996, is a vending machine.

Vending machine as a contract: if person (party 1) puts money in, party 2 (vending machine) will give potato chips.

The contract of the vending machine is not specified digitally, but more implicitly by the trust in the mechanisms of the machine.

The mechanical system behind the vending machine automates the execution of the promises.

You may take note a difference here between the typical legal contract we think of and the vending machine contract - instead of an agreement of terms upfront before the execution of promises, the vending machine presents a system of self-executing promises that will activate upon fulfillment of a condition, the condition being the input of money. This model of thinking will be helpful when extrapolating to blockchain.

*Normal idea of contract in our heads*: two people sign document, then go to work and don't break the contract (keep their promises).

*New model for smart contract*: system of self-executing promises is exposed to public use, then anyone can trigger the execution by providing proper inputs.

## What is a smart contract in the context of blockchain?

At a high-level, smart contracts on a blockchain are not much more than our established definition. In this case the system that automates/ensures the execution of promises is code, and the promises are expressed/specified also in code.

They are similar to the vending machine, as when you fulfill given conditions, i.e. provide money, you can then trigger the execution of said promises, i.e. blocks of code.

We can extrapolate this metaphor even further.

You provide a vending machine with money which pays not only for the asset you might obtain as a result of execution, but for the service of execution as well, i.e. you pay for the chips themselves, as well as the machine itself for its convenience and its labor of swirling the little metal spiral to pop out your chips. This is the same for smart contracts. You pay what's called a gas fee for triggering the execution of a smart contract, with the fee being generally proportional to the computational resources expended to execute its code.

When you put your money into a vending machine, you choose which item you want it to spit out. If you abstract away the bag of chips or candy bar, you're really choosing which function to run, that being the F2 function with your fritos, or the E6 function with your snickers. Like a vending machine, a smart contract specifies different functions, i.e. blocks of code, it can run, and when you call a smart contract, you specify which function you want it to run.

## How is that possible to do that on a blockchain?

Well, it's only possible on a blockchain network that supports this capability.

Take away any relation to money. Let's first just think about how there can be code execution on a blockchain.

First, blockchain, if you don't have previous context, is just a software system that allows a network of computers to agree on arbitrary data without any central authority, in other words, "decentralized consensus." [2]

You can think about a blockchain network as a bunch of computers updating each other on some data, and all the computers cooperate together through clever protocols to ensure that they all have the same data and updates all in the same order. You can think of these updates as pushing new data or editing data.

We can think of this data as the "state" of the network. "In computer science, a state machine refers to something that will read a series of inputs and, based on those inputs, will transition to a new state." (figured no need to rephrase - Preethi Kasireddy). It is reasonable to think of a blockchain network as one big state machine, where the data is the state, and the updates are transitions to the states.

Now imagine that one of these updates was pushing some new data, but that data was a block of code. Now everyone has this code.

Imagine another update was pushing some new data, this data being the output of that code. In this update, it would just include the instruction to get the output of the code, not the actual output itself. Given that everyone has the code, to make this update, they would run this code. Now you code execution on the blockchain.

Imagine the code was unlimited in the kinds of things it could do. It could make updates, so it could push new data, edit data, push new code, and trigger the execution of other code. Imagine you could call this code from other software. Now you have a development ecosystem that can leverage code execution on this network of computers.

## So is this how it works on real blockchains?

What we've established so far is not far off from how smart contracts work on Ethereum.

If we combine this concept of code execution on a network of computers plus our idea of vending machines as smart contracts, we get Ethereum smart contracts.

On Ethereum, a smart contract specifies a set of functions, arbitrary blocks of code, that a user can trigger buy providing some money—to pay for the gas fee as well as any output—and specifying which function to run. Just like a vending machine.

How does code receive money? When a contract is deployed, an account is created that is binded to that contract. Ethereum at its core supports the transaction of it's native currency, ether, and so smart contracts hold accounts that users can send ether to.

Before any code execution can happen, someone needs to write a contract, and put it on the blockchain, i.e. push data to the network of computers.

Then when the code runs, it changes the state on the blockchain, i.e. updating data, adding new data, moving money from one account to another, allocating assets to accounts, etc. And instead of the state being totally arbitrary data, at its core it's a bunch of accounts with balances of ether, with the addition of totally arbitrary data.

This all happens through transactions. Transactions are not only their literal meaning of exchanging assets/services, but they're arbitrary changes to the state. Sending money from my account to another account is a transaction. Inputting money into a smart contract vending machine is a transaction.

...

## Notes

[1] Typically a contract would be legally binding, giving parties involved great confidence that the other would fulfill their promises, as otherwise the law would enforce the execution of some consequence. In smart contract, a system is provided that automates this fulfillment of promises. It gives you 100% confidence the promises will be fulfilled.

[2] The actual word "blockchain" refers to a particular aspect of the original blockchain's (bitcoin) implementation. This can make things confusing when you try to connect the word to what it means without understanding the technical aspects behind it. That is okay.