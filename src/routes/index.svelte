<script>
	let name = 'world';
</script>

<div class="wrapper">
	<div class="bio-box">
		<h1 class="header">Hey, I'm Alec.</h1>
		<p class="bio">
			Welcome to my website! This fall I'll be a third-year studying computer science at UIUC. I'm
			currently working at Palantir this summer as an intern in Washington D.C. I like Bitcoin, and
			watching Channel 5 with Andrew Callaghan. I also like to write, and occasionally I'll brave my
			small corner of the web and publish something.
		</p>
		<p class="links">
			Email: <a href="mailto:alecchendev@gmail.com" target="_blank">alecchendev@gmail.com</a>,
			<a href="mailto:alecchen1@protonmail.com" target="_blank">alecchen1@protonmail.com</a> (<a
				href="https://api.protonmail.ch/pks/lookup?op=get&search=user.email@protonmail.com"
				>PGP key</a
			>)
			<br />
			alecchendev on
			<a href="https://twitter.com/alecchendev" target="_blank">Twitter</a>,
			<a href="https://github.com/alecchendev" target="_blank">Github</a>, and
			<a href="https://alecchendev.medium.com/" target="_blank">Medium</a>
		</p>
	</div>

	<div>
		<div class="photo-box">
			<img src="/meChicago4.png" alt="Picture of me" class="photo" />
			<!-- <img src='/me.png' alt='Picture of me' class='photo' /> -->
		</div>
		<p class="photo-caption">Me in Chicago</p>
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
		width: 180%;
		margin: -200px 0px 0px -135px;
		/* height: 100%; */
	}
	.photo-caption {
		text-align: center;
		margin-top: 5px;
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
