<script lang='ts'>


    import Layout from './Layout.svelte';
    export let data: SummaryData;
</script>

<script lang='ts' context='module'>
    export interface SummaryData {
        image: string,
        header: string,
        points: Array<string>
    };

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
        line-height: 1.5;
    }
</style>

<Layout>
    <img alt={"Picture of Alec"} src={"images/" + data.image} />
    <h1>{data.header}</h1>
    <ul>
        {#each data.points as point}
            <li>{point}</li>
        {/each}
    </ul>
</Layout>