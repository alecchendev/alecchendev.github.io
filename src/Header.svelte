<script lang='ts'>
	import { Link } from "svelte-routing";
</script>

<style>
    .header {
        margin: auto;

        display: flex;
        justify-content: space-between;

        font-size: 1.1rem;
        line-height: 1.4;
    }
    .right {
        width: 40%;
        
        display: flex;
        justify-content: space-between;
    }
    @media screen and (max-width: 1080px) {
        .right {
            width: 70%;
        }
    }
</style>

<div class="header">
    <div class="left">
        <Link to='/'>Alec Chen</Link>
    </div>
    <div class="right">
        <Link to='/about'>About</Link>
        <Link to='projects'>Projects</Link>
        <Link to='writing'>Writing</Link>
    </div>
</div>