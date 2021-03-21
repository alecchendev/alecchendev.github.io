<script lang='ts'>
    import SvelteMarkdown from 'svelte-markdown';
</script>

<SvelteMarkdown source={`
## About

<div style="height: 350px; display: flex; justify-content: space-between;">
    <div>
    <p>
        Hey! I'm Alec. I dabble in a lot of different things, but my main\
        pursuits include coding, exercising, and filmmaking.
        <br>
        <br>
        For coding, I'm mainly interested in backend web development with Node.js and \
        systems programming with C++.
        <br>
        <br>
        For exercising, I'm currently attend physical training for ROTC, but on \
        our off-days I like to lift weights.
        <br>
        <br>
        For filmmaking, I am in my very early stages of creating for myself, \
        but some movies I've enjoyed recently would include The Truman Show, Gone Girl, \
        The Dark Knight Trilogy, and Rain Man.
    </p>
    </div>
    <img style="width: 45%; object-fit: cover; margin-left: 15px;" src="images/MyPhoto.jpg" />
</div>

`} />