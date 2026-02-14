---
title: "Solana Programming Primer"
date: 2022-04-01 04:49:25.896000+00:00
subtitle: "Solana meets Rust (without Anchor)"

---
![Photo by Shubham Dhage on Unsplash](shubham-dhage-unsplash.jpeg)

I wrote this in February 2022 sort of last minute to provide additional guidance/resources during Illini Blockchain’s Solana Onboarding.

It accompanied the <a href="https://github.com/IlliniBlockchain/solana-onboarding/tree/master/echo-skeleton" class="markup--anchor markup--p-anchor" data-href="https://github.com/IlliniBlockchain/solana-onboarding/tree/master/echo-skeleton" rel="noopener" target="_blank">echo project</a> from the Jump Crypto x Solana Labs x Pyth Bootcamp I attended in January 2022.

Figured I’d put this out there as a public record. This outlines the basics of Solana program development written in Rust, without the popular framework Anchor.

### Prerequisites

Basic understanding of the <a href="https://docs.solana.com/developing/programming-model/overview" class="markup--anchor markup--p-anchor" data-href="https://docs.solana.com/developing/programming-model/overview" rel="noopener" target="_blank">Solana Programming Model</a>.  
Basic <a href="https://doc.rust-lang.org/book/" class="markup--anchor markup--p-anchor" data-href="https://doc.rust-lang.org/book/" rel="noopener" target="_blank">Rust</a> (<a href="https://doc.rust-lang.org/rust-by-example/" class="markup--anchor markup--p-anchor" data-href="https://doc.rust-lang.org/rust-by-example/" rel="noopener" target="_blank">by example</a>).

### Project File Structure

This is a basic example of what a Solana project would include.

``` graf
project/
  js/
  program/
    src/
      entrypoint.rs
      error.rs
      instruction.rs
      lib.rs
      processor.rs
      state.rs
    tests/
    Cargo.toml
```

To briefly explain the main elements:

-   `js/` — client scripts for testing.
-   `entrypoint.rs` — wrapper on `processor.rs` providing an access point on the blockchain.
-   `error.rs` — custom error definitions.
-   `instruction.rs` — enum definitions denoting different instructions and their parameters.
-   `lib.rs` — exports modules for easy access in other crates.
-   `processor.rs` — definition of actual running code.
-   `state.rs` — struct definitions for account data serialization.
-   `Cargo.toml` — define crate metadata and dependencies.

### Development Flow

1.  Modify program and deploy.

``` graf
cargo build-bpf // builds your program - make sure you're in your program's root directory
```

``` graf
solana program deploy [PATH_TO_DOT_SO_FILE]
```

``` graf
// example: solana program deploy /Users/alecchen/Documents/Code/solana-onboarding/echo-skeleton/program/target/deploy/echo.so
```

2\. Run client script to test.

``` graf
// javascript
node [SCRIPT_FILENAME]
// example: node index.js
```

3\. Client will either succeed and print a link to the transaction on a block explorer, or it will spit out the hash of the failed transaction and you copy and paste it into a block explorer.

``` graf
// example success output:
<https://explorer.solana.com/tx/85CVVw4CrmNbzqCXEmRDF3LEUFEymc4s1pUtDK1urcV6R3jbRjdJNWGjb24Trbt8bZjN5fJkqA55GjNvoBLubfE?cluster=devnet>
Echo Buffer Text: asdfff
Success

// example fail output:
Error: Transaction 4MDQWBNkuRAf59gjqgoFBDLq76UPVS73LUktTP1TJ8op1Qtvw2UsxcRw6tMHKo5mjsWEaZWC5CLePtV44YTFsUA3 failed ({"err":{"InstructionError":[1,"InvalidInstructionData"]}})
    at sendAndConfirmTransaction (/Users/alecchen/Documents/Code/solana-onboarding/echo-skeleton/js/node_modules/@solana/web3.js/lib/index.cjs.js:2981:11)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async main (/Users/alecchen/Documents/Code/solana-onboarding/echo-skeleton/js/index.js:75:14)
// copy 4MDQWBNkuRAf59gjqgoFBDLq76UPVS73LUktTP1TJ8op1Qtvw2UsxcRw6t into a block explorer (make sure you're on devnet!)
```

Solana’s block explorers are incredibly helpful for debugging! Spend some time exploring everything that’s outputted. It will show a lot of helpful information, including account inputs, their writable/signer flags, SOL and `spl-token` balance changes, instructions, and sub-instructions called, as well as program logs where you’ll find print statements and error messages.

4\. Repeat steps 1–3.

### Program Code

When you implement Solana program instructions, you’re code will typically compose of 3 main parts:

1.  Getting accounts and deserialization
2.  Account validation
3.  Logic and functionality

### Getting accounts and deserialization

Accounts are passed in as an array of `AccountInfo`s. To work with these you’ll define an iterator and retrieve references to the accounts.

But how do you know which accounts are which? You need to specify somewhere what accounts you expect, and then 1) it’s up to the client to pass in the correct amount and order of accounts and 2) it’s up to you as the program developer to ensure that your program only runs if you receive the correct accounts (this part is the account validation portion). You should notice in the echo skeleton that the accounts passed in during the instruction definition on the client match those expected/outlined in `instruction.rs`.

Anyway, onto deserialization. By default, account data is just an array of bytes. If you expect an account’s data to arrive in a certain structure, you can deserialize it to access that data in an organized way. You will need to define that structure beforehand, and include some way of deserializing bytes into it (these methods are usually defined as traits in Rust). SPL programs often have deserialization methods using the `Pack` trait. If you are defining your own structs, <a href="https://github.com/near/borsh" class="markup--anchor markup--p-anchor" data-href="https://github.com/near/borsh" rel="noopener" target="_blank">Borsh</a> is a library that has predefined methods for common data types.

Example with an `spl-token` program mint account:

Example with our own defined struct:

### Account validation

As mentioned previously, you are relying on clients to pass in accounts matching what you expect. This opens the opportunity for clients to pass in accounts that might mess up the functionality of your code.

For example, let’s say you have a basic swap program, where the program expects these 4 accounts (among others): your vault for token a, your vault for token b, the swap program’s vault for token a, and the swap program’s vault for token b. It takes some amount of token a from your vault, deposits in its own vault, then takes some amount of token b from its own vault and deposits it into your vault. Now, what if you provided your own token a vault again in place of the swap program’s vault? If it didn’t validate the accounts, then it would deposit token a into your vault, and you’d get token b for free! An example in real Solana programs: the Wormhole exploit in early February was caused by the use of a deprecated helper function that did not validate accounts properly.

The most common situations where you’ll be validating accounts is invalidating accounts including certain data, ensuring an account is a certain PDA and checking that a program is a certain program.

#### **Validating account data**

For validating data, there are two parts:

1.  making sure an account can be deserialized properly
2.  ensuring that data matches certain constraints.

An example of this would be making sure the user sending the transaction is actually the owner of a token account that they want to transfer tokens from.

From here on out I’ll omit the imports and getting accounts sections to make things less cluttered.

#### **Validating PDAs**

Another common way to validate accounts is with PDAs. If an account is a PDA, you can ensure it’s the right account by finding the PDA yourself and checking if the keys match. You can do this in two ways: 1) if you only have the seeds and not the bump, `find_program_address` and 2) if you have both the bump and the seeds, `create_program_address`.

#### **Checking program ids**

All programs are accounts, and as you know, if you’re program is interacting with a certain account, it must be passed into the instruction. So if your program calls another program, clients have to pass that program account in.

This opens up a security issue. Now a client can pass in a program that implements the same instruction that your program is trying to access, but instead appends some malicious behavior. For this reason, we have to check that the program accounts passed in are the correct ones.

Often you’ll be working with well-known programs, and they will have public Rust crates that expose some sort of `id()` function that lets you easily check, i.e. Solana native programs, SPL programs. Other times you may just have to hard code the program id.

#### **assert_msg helper**

A nice helper function I was introduced to at the bootcamp is `assert_msg`. When you throw an error, it’ll only print out the message associated with that type of error. You might use the same error in different contexts, in which an additional message would be helpful for debugging. `assert_msg` does exactly that.

### Logic and functionality

After you’ve ensured your accounts are all correct, you can actually write code that does stuff. Here you can do anything your heart desires, but one way or another you’ll likely be doing either/both of the following two things:

1.  Modifying account data
2.  Calling other programs

#### **Modifying account data**

Two ways to modify an accounts data: 1) modify the bytes directly, and 2) define a struct and serialize the data into the accounts array of bytes.

Modifying directly:

Serializing data (with Borsh):

#### **Cross-program invocations**

Often in programs, you write you’ll have to call other programs on the blockchain. For these you’ll primarily use two functions: `[invoke](<https://docs.rs/solana-program/1.6.4/solana_program/program/fn.invoke.html>)` for regular cross-program calls, and `[invoke_signed](<https://docs.rs/solana-program/1.6.4/solana_program/program/fn.invoke_signed.html>)` for cross-program calls where PDAs need to sign.

They are essentially the same except for `invoke_signed` you pass in the seeds (with the bump appended) for the PDA.

Examples of the two are available <a href="https://gist.github.com/alecchendev/c872ed76541b339ce3d71c72783c7d7b" class="markup--anchor markup--p-anchor" data-href="https://gist.github.com/alecchendev/c872ed76541b339ce3d71c72783c7d7b" rel="noopener" target="_blank">here</a>.

You’ll notice the first argument takes an `Instruction` type. Like all instructions, it includes accounts, a program id, and input data.

However, as you see in the examples, often programs will have wrapper functions for creating instructions which makes it much easier for us to do so. You can see how to create a raw instructions by inspecting their source code.
