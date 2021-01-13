<script>
    export let data;
</script>

<style>
    div {
        font-size: 1rem;
    }
    img {
        width: 100%;
        height: auto;
    }
    ul {
        padding-left: 1.2rem;
    }
    li {
        font-size: 1.1rem;
    }
</style>

<div>
    <img alt={"Picture of Alec"} src={"images/" + data.image} />
    <h1>{data.header}</h1>
    <ul>
        {#each data.points as point}
            <li>{point}</li>
        {/each}
    </ul>
</div>