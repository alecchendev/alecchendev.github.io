
<script lang='ts'>
    import SvelteMarkdown from 'svelte-markdown';
</script>

<SvelteMarkdown source={`
# Test Markdown Component
Hello

### Description
So this is what it's like to write some beautifully formatted text.

<details>
    <summary>Test toggle button</summary>
    Toggle text

</details>

`} />