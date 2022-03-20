<script>
	let name = 'world';
</script>

<div class='wrapper'>

	<div class='bio-box'>
		<h1 class='header'>Hey, I'm Alec.</h1>
		<p class='bio'>
			Welcome to my website! I'm a second-year studying computer science and statistics at UIUC. I'll be working at Palantir this summer (2022) as an FDE intern in Washington D.C. I'm interested in cryptocurrency, currently co-founding Illini Blockchain, building on Solana. I like to write, and occasionally I'll brave my small corner of the web and publish something.
		</p>
		<p class='links'>
			Email: <a href="mailto:alecchendev@gmail.com" target="_blank">alecchendev@gmail.com</a>
			<br>
			alecchendev on
			<a href="https://twitter.com/alecchendev" target="_blank">Twitter</a>,
			<a href="https://github.com/alecchendev" target="_blank">Github</a>, and
			<a href="https://alecchendev.medium.com/" target="_blank">Medium</a>
		</p>
	</div>

	<div class='photo-box'>
		<img src='/meChicago3.jpg' alt='Picture of me' class='photo' />
		<!-- <img src='/me.png' alt='Picture of me' class='photo' /> -->
		<p class='photo-caption'>Me in Chicago</p>
	</div>

	<div class='link-box'>

	</div>

</div>


<style>
	.wrapper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 100px auto;
		padding-bottom: 50px;
		width: 700px;
	}
	.header {
		margin: 0;
	}
	.bio-box {
		width: 350px;
	}
	.bio {

	}

	.photo-box {
		width: 300px;
		height: 375px;
		overflow: hidden;
	}
	.photo {
		/* object-fit: cover; */
		width: 150%;
		margin: -225px 0px 0px -75px;
		/* height: 100%; */
	}
	.photo-caption {
		text-align: center;
		margin-top: 5px;
	}

	a {
		text-decoration: none;
		color: #45a0c3;
		transition: 0.1s;
	}
	a:hover {
		/* opacity: 0.5; */
		text-decoration: underline;
	}

	@media (max-width: 778px) {
		.wrapper {
			width: 90%;
			flex-direction: column;
		}
		.bio-box {
			width: 100%;
		}
		.photo-box {
			margin: auto;
		}
	}
</style>
