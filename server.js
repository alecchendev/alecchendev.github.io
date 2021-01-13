const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
app.use(cors());

// API endpoint
app.get('/data', (req, res) => {
  console.log('Getting data for the page.');
  res.send({
		summary: {
			header: "Hey! I'm Alec.",
			points: [
				"I'm a software developer, writer, and freshman majoring in CS\
				and Stats at University of Illinois at Urbana-Champaign.",
				"I'm an incoming computer graphics software engineering intern\
				at Brunswick. I've also worked on a plethora of personal and\
				group projects that you can check out in the ~projects section~\
				of this website.",
				"When I'm not working, I like to write, cook, and watch movies.",
				"",
			],
		},
		projects: [
			{
				image: "RunnerGame3.gif",
				title: "Platform Runner Game",
				stack: [
					"Rust",
					"WebAssembly",
					"Javascript",
					"WebGL",
				],
				description: "Bla bla bla"
			},
		],
		writing: [
			{
				title: "Weekly 5: How I Approach Shifting My Mindset",
				link: "https://alecchendev.medium.com/weekly-5-how-i-approach-shifting-my-mindset-38ce6525ef44?sk=7807755664969fc209f138a113058c8c",
				category: "tech"
			},
			{
				title: "Weekly 5: How I Approach Shifting My Mindset",
				link: "https://alecchendev.medium.com/weekly-5-how-i-approach-shifting-my-mindset-38ce6525ef44?sk=7807755664969fc209f138a113058c8c",
				category: "tech"
			},
			{
				title: "Weekly 5: How I Approach Shifting My Mindset",
				link: "https://alecchendev.medium.com/weekly-5-how-i-approach-shifting-my-mindset-38ce6525ef44?sk=7807755664969fc209f138a113058c8c",
				category: "tech"
			},
			{
				title: "Weekly 5: How I Approach Shifting My Mindset",
				link: "https://alecchendev.medium.com/weekly-5-how-i-approach-shifting-my-mindset-38ce6525ef44?sk=7807755664969fc209f138a113058c8c",
				category: "other"
			},
			{
				title: "Weekly 5: How I Approach Shifting My Mindset",
				link: "https://alecchendev.medium.com/weekly-5-how-i-approach-shifting-my-mindset-38ce6525ef44?sk=7807755664969fc209f138a113058c8c",
				category: "other"
			},
		]
	});
})

// serve our actual files
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});