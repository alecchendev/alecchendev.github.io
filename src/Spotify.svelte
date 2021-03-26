<script lang='ts'>
    import axios from 'axios';
    import { onMount } from 'svelte';

	let data: any = {};
    let tracks = ['Getting top tracks...'];
    let artists = ['Getting top artists...'];
    let recents = ['Getting recently played...'];

	onMount(async () => {
        const res = await axios.get(`/.netlify/functions/server/spotifyData`);
        data = res.data;		
        if (data.status === 200) {
            tracks = data.topTracks;
            artists = data.topArtists;
            recents = data.recents;
        }
	});

</script>

<style>
    .spotify-flex {
        display: flex;
    }
    .top {
        width: 50%;
    }
</style>

<div>
    <h2>My Recent Listening History</h2>
    <div>
        <h3>Recently Played</h3>
        {#each recents as recent}
            <div>{recent}</div>
        {/each}
    </div>
    <div class='spotify-flex'>
        <div class='top'>
            <h3>Top Tracks (Last 4 Weeks)</h3>
            {#each tracks as track}
                <div>{track}</div>
            {/each}
        </div>
        <div class='top'>
            <h3>Top Artists (Last 6 Months)</h3>
            {#each artists as artist}
                <div>{artist}</div>
            {/each}
        </div>
    </div>
</div>