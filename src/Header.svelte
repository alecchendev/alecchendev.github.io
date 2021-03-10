<script lang='ts'>
	import { Link } from "svelte-routing";
</script>

<style>
    .header {
        margin: auto;

        display: flex;
        justify-content: space-between;

        font-size: 1.1rem;
    }
    .right {
        width: 40%;
        
        display: flex;
        justify-content: space-between;
    }
    .navLink {
        transition: 0.8s ease background-image;
    }
    .navLink:hover {
        cursor: pointer;
        background-image: linear-gradient(180deg,transparent 90%, var(--link-color) 0);
    }
    @media screen and (max-width: 1080px) {
        .right {
            width: 70%;
        }
    }
</style>

<div class="header">
    <div class="left"><Link to='/'><div class="navLink" >Alec Chen</div></Link></div>
    <div class="right">
        <Link to='/'><div class="navLink" >🏠 Home/About</div></Link>
        <Link to='projects'><div class="navLink" >🚀 Projects</div></Link>
        <Link to='writing'><div class="navLink" >✒️ Writing</div></Link>
    </div>
</div>