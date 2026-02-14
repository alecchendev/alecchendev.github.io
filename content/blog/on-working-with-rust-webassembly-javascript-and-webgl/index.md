---
title: "On Working With Rust, WebAssembly, Javascript, and WebGL"
date: 2021-01-07 03:47:22.254000+00:00
subtitle: "My experience learning and using Rust, WebAssembly, Javascript, and WebGL."

---
For a little over a month now, I’ve been working on a 3D platformer game in the browser using Rust, WebAssembly, Javascript, and WebGL. This article is just a bit about my experience working with this stack.

![The first level of my platform runner game. Feel free to check out more of my work on my personal website.](first-level-platform.gif)

### Why this stack?

Initially, I chose to use these technologies for a couple of reasons.

1.  I think Rust is cool.
2.  I think Rust and WebAssembly have a lot of potential for the future of web development, as inexperienced and uninformed my thoughts on the subject may be.
3.  For a game, something that has the potential to be pretty computationally taxing for both the CPU and GPU, wasm will significantly outperform just plain Javascript.
4.  I already have experience with Javascript.
5.  WebGL is the most basic form of graphics programming for the web.

I think these are pretty reasonable for choosing a stack for a personal project. And for the most part, they were.

I don’t think my game has ended up or will end up being computationally taxing enough for me to notice were I to have used just Javascript, but I got to learn Rust and how compiling to Wasm and using that in conjunction with Javascript all works.

### Why I’m glad I chose this stack

Rust is a very well designed language. Writing the majority of the game’s actual logic and physics system was really pleasant once I got used to the mechanics of Rust. Writing my own vector class, implementing operator overloading, interfacing for collisions, Rust made it always feel like I was writing very robust code, and that sort of feedback as you’re coding makes the overall experience more fun. I’d go on about Rust, but plenty of others have written extensively on why it’s so great.

During the process of fleshing out the game’s features, the structure of my project naturally separated into a sort of API for the game engine, as that’s one of the common ways to use WebAssembly in Javascript web apps. For game development on the web specifically, this made for a good structure, and having the stack sort of force you to use it in a way that benefits your organization was helpful in my experience. It was like the virtual world of the game existed in the Wasm code compiled from Rust, and through Javascript and WebGL, I visualized it and made it interactable.

At the current moment, WebGL is my only experience with graphics programming in the web. It is true that there is a bit of a learning curve, but I thought it did the job just fine and it taught me a lot about graphics programming. However, I understand why people would choose to go with alternative wrappers like three.js, as most people’s projects (including mine at least as of now) don’t require the control and customization that comes with WebGL’s manual graphics work.

### Why I might change things up next time

For game dev, Rust is just fine, but I might choose to use a game engine as the game becomes more complex. As far as I know right now, if you’re writing an online game in Rust, you have to do everything yourself. And although for me this was a great learning experience, if I were to focus more on the actual development and progression of creating a game, I’d prefer to use a game engine that makes a lot of things easier for me.

For other web apps, the speed that Rust offers is usually not necessary. A lot of speed is not hindered by computationally taxing things, but more from waiting for data to send back and forth between things like databases and servers. Unless I end up building a very computationally taxing web app, normal web tech stacks will work just fine.

### Resources for if you want to learn any of this stack

#### Rust

For Rust, I think the <a href="https://doc.rust-lang.org/book/" class="markup--anchor markup--p-anchor" data-href="https://doc.rust-lang.org/book/" rel="noopener" target="_blank">Rust Programming Language Textbook</a> is really awesome. After about the first 10 chapters you will know more than enough to do a lot with the language. It’s very well written, thorough, and it even has a few projects it walks you through. This is what I personally used, and in combination with playing around with some of its examples in my own environment and looking things up, I felt pretty well equipped by the start of my project.

#### WebAssembly

For Rust and WebAssembly, the Rust team also has another great resource written by them. I think their <a href="https://rustwasm.github.io/docs/book/introduction.html" class="markup--anchor markup--p-anchor" data-href="https://rustwasm.github.io/docs/book/introduction.html" rel="noopener" target="_blank">Rust/Wasm book</a>’s <a href="https://rustwasm.github.io/docs/book/game-of-life/introduction.html" class="markup--anchor markup--p-anchor" data-href="https://rustwasm.github.io/docs/book/game-of-life/introduction.html" rel="noopener" target="_blank">Conway’s Game of Life tutorial</a> covered everything I needed to know before jumping into making my game.

Rust generally has a lot of great resources that you can find just by exploring <a href="https://www.rust-lang.org/learn" class="markup--anchor markup--p-anchor" data-href="https://www.rust-lang.org/learn" rel="noopener" target="_blank">their website</a>.

#### Javascript

For Javascript, I initially learned it a long time ago from a hodgepodge of Coding Train tutorials, but this semester as I’ve gotten back into web development I enjoyed <a href="https://www.freecodecamp.org/" class="markup--anchor markup--p-anchor" data-href="https://www.freecodecamp.org/" rel="noopener" target="_blank">freeCodeCamp</a>’s <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/" class="markup--anchor markup--p-anchor" data-href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/" rel="noopener" target="_blank">Javascript course</a>.

#### WebGL

For WebGL there are two MVP resources: <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API" class="markup--anchor markup--p-anchor" data-href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API" rel="noopener" target="_blank">Mozilla</a>, and <a href="https://webglfundamentals.org/" class="markup--anchor markup--p-anchor" data-href="https://webglfundamentals.org/" rel="noopener" target="_blank">webglfundamentals.org</a>. For Mozilla, I recommend just doing their standard <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial" class="markup--anchor markup--p-anchor" data-href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial" rel="noopener" target="_blank">WebGL tutorial</a>, and the <a href="https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html" class="markup--anchor markup--p-anchor" data-href="https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html" rel="noopener" target="_blank">fundamentals walkthroughs</a> for webglfundamentals.org. Anything else you will probably ever wonder about WebGL is scattered throughout the rest of those two resources. It is quite a lot to take it, but committing to these tutorials will get you through much of the beginning friction of learning.
