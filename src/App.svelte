<script lang="ts">
	import Header from './Header.svelte';
	import Summary from './Summary.svelte';
	import Projects from './Projects.svelte';
	import Writing from './Writing.svelte';
	import Contact from './Contact.svelte';

	import type { SummaryData } from './Summary.svelte';
	import type { ProjectData } from './Projects.svelte';
	import type { ArticleData } from './Writing.svelte';
	import type { ContactData } from './Contact.svelte';
	
	interface SiteData {
		summary: SummaryData,
		projects: Array<ProjectData>,
		writing: Array<ArticleData>,
		contact: ContactData
	}
	
	const data: SiteData = {
		summary: {
			image: "MyPhoto.jpg",
			header: "👋 Hey! I'm Alec.",
			points: [
				"I'm a software developer, writer, AROTC cadet, and freshman at the University of Illinois at Urbana-Champaign.",
				"This spring and summer I'll be working for Procter & Gamble as a data\
				science/software development intern, and I've also worked on a lot of personal and group projects\
				that you check out on this website.",
				"Outside of work, I like to write, cook, and watch movies/tv shows. If you ever want to talk\
				or get in touch about anything from CS to fitness to tv shows, don't hesitate to reach out.",
			],
		},
		projects: [
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
		],
		writing: [
			{
				image: "3DEngine.gif",
				title: "How I Built a 3D Engine From Scratch",
				link: "https://medium.com/dev-genius/how-i-built-a-basic-3d-graphics-engine-from-scratch-a54df82031f3?source=friends_link&sk=8c0d8ceb7da3e19e73c0175d988befc5",
			},
			{
				image: "CrashCourse.png",
				title: "A Crash Course on Software Testing But Interesting",
				link: "https://medium.com/swlh/a-crash-course-on-software-testing-but-interesting-8cbe007e021b?source=friends_link&sk=f14fba221c26fef8c13ea25abd1ec12a",
			},
			{
				image: "SimpleKey.jpg",
				title: "The Simple Key to Living Healthier and Happier",
				link: "https://alecchendev.medium.com/the-simple-key-to-living-healthier-and-happier-529dbb7f0b9c?source=friends_link&sk=e86240a7ba734db4ee2a3afa3669e745",
			},
			{
				image: "WorthTelevision.png",
				title: "The Worth of Television",
				link: "https://alecchendev.medium.com/finding-solace-through-television-fe7392a40b11?sk=d10049e4c852838ced7328caf61e205e",
			},
			{
				image: "SocialNetwork.png",
				title: "Analyzing the Social Network of My High School",
				link: "https://alecchendev.medium.com/analyzing-the-social-network-of-my-high-school-7763df719363?source=friends_link&sk=62b4f16ac9c4786c71b801b226f7e289",
			},
			{
				image: "College.jpg",
				title: "Getting Rejected From All My Colleges",
				link: "https://alecchendev.medium.com/getting-rejected-from-all-my-colleges-eae0b39e3d72?sk=e7483fdbd458188b051de9fd0709207f",
			},
		],
		contact: {
			email: "mailto:alecchendev@gmail.com",
			github: "https://github.com/alecchendev",
			medium: "https://alecchendev.medium.com/",
			linkedin: "https://linkedin.com/in/alec-chen-450273182/",
		}
	};
	let menu = 0;
	const sectionKey = {
		"summary": 0,
		"projects": 1,
		"writing": 2, 
	};
	const navigate = (section) => {
		menu = sectionKey[section];
	};
	
</script>

<style>
	.wrapper {
		width: 950px;

		margin: auto;
		padding-top: 100px;
		padding-bottom: 100px;
	}
	.contentWrapper {
		margin-top: 100px;
	}
	@media screen and (max-width: 1080px) {
        .wrapper {
			width: 90%;
		}
    }
</style>

<div class="wrapper">
	<Header navigate={(section) => navigate(section)} />
	<div class="contentWrapper">
		{#if menu === 0}
			<Summary data={data.summary} />
		{:else if menu === 1}
			<Projects projects={data.projects} />
		{:else if menu === 2}
			<Writing data={data.writing} />
		{/if}
	</div>
	<Contact data={data.contact} />
</div>
