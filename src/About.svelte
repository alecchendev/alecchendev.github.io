<script lang='ts'>
    import SvelteMarkdown from 'svelte-markdown';
</script>

<SvelteMarkdown source={`
## Normal Text

<div style="height: 350px; display: flex; justify-content: space-between;">
    <p>Text!</p>
    <img style="width: 45%; object-fit: cover;" src="images/MyPhoto.jpg" />
</div>

`} />