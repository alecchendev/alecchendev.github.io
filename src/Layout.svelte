
<script lang="ts">
    import Header from './Header.svelte';
	import Contact from './Contact.svelte';
	import MDTest from './Content.svelte';
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
	<Header/>
	<MDTest/>
	<div class="contentWrapper">
		<slot></slot>
	</div>
	<Contact />
</div>