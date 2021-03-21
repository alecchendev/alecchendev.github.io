<script lang='ts'>
    import SvelteMarkdown from 'svelte-markdown';
	import Projects from './Projects.svelte';
</script>

<div>
<SvelteMarkdown source={`

# Welcome! I'm Alec.
#### I'm a software developer, ROTC cadet, and amateur filmmaker. \
Here on my personal website you can get a glimpse into how I like \
to live my life.

<br>
<br>
<br>
<br>
<br>

`} />

<!-- <Projects projects={[
			{
				image: "RunnerGame.gif",
				title: "Platform Runner Game",
				stack: [
					"Rust",
					"WebAssembly",
					"Javascript",
					"WebGL",
				],
				description: "A simple 3D platformer game where you traverse levels as fast as you can using a spiderman-esque grappling hook ability. I didn't use a game engine, so I had to work with the graphics directly, and craft my own physics/collision system. It was difficult, but I learned a lot, and I think it turned out pretty well.",
			},
			{
				image: "3DEngine.gif",
				title: "3D Graphics Engine From Scratch",
				stack: [
					"C++",
					"Cinder",
				],
				description: "Given 3-4 weeks to make something using C++ and the graphics API Cinder, I set out to build the systems behind transforming 3D perspective to a 2D screen. After a lot of pacing around my dorm room, I developed a system with simple lighting that could render a first person perspective moving around inside of a room.",
			},
			{
				image: "Nutribuddy.gif",
				title: "Nutribuddy",
				stack: [
					"Javascript",
					"React",
					"Python",
					"Flask",
				],
				description: "Here I served as the frontend developer on a nutrition recommendation web app my team called Nutribuddy. Working together we cranked out a pretty sleek MVP that takes in a user's dietary preferences and restrictions, and outputs a week's worth of curated meals.",
			},
			{
				image: "SocialNetwork.png",
				title: "Social Network Analysis",
				stack: [
					"Python",
					"Matplotlib",
					"Networkx",
				],
				description: "Getting into network analysis through research during high school, I collected friendship data through survey responses and wrote an article with my analysis and visualization of the social network of those around me. I tried really hard to break down the raw statistics into more digestible insights, and it was really cool to get responses from classmates that'd read my piece.",
			},
		]}/> -->

<SvelteMarkdown source={`

<br>
<br>
<br>

## Explore
[About](/projects)

[Projects](/projects)

[Writing](/writing)

<br>

### Coming Soon...

[My Hobbies](/)

[My Minimalist Notion Setup](/)

[What Am I Listening To?](/)

[The Making of this Website](/)

[Mantras/Themes I live by](/)
`}/>

</div>