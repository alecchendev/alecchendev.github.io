<script lang="ts">
	import Layout from './Layout.svelte';
    import SvelteMarkdown from 'svelte-markdown';
    export let docName: string;
    let content = `
# Placeholder content
---
Here is some placeholder content.
    `;

    
</script>

<Layout>
    <SvelteMarkdown source={content}/>
</Layout>
