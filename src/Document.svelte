<script lang="ts">
	import Layout from './Layout.svelte';
    import SvelteMarkdown from 'svelte-markdown';
    export let docName: string;
    let content = `
# Placeholder content
---
Here is some placeholder content.
    `;

    if (docName === 'Home')
        content = `
<style>img { width: 100px; }</style>
<div style='display: flex; flex-direction: row-reverse;'>

![alt text](images/MyPhoto.jpg)

# Welcome! I'm Alec.
This is my personal website. It's a place
for me to share a bit about myself, and mark
my corner of the internet.
        `;

    
</script>


<style>

</style>

<SvelteMarkdown source={content}/>
