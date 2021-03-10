<script lang='ts'>
    export let projects: Array<ProjectData> = [];
</script>

<script lang='ts' context='module'>
    export interface ProjectData {
        image: string,
        title: string,
        stack: Array<string>,
        description: string
    }
</script>

<style>
    .project {
        display: flex;
        margin-bottom: 15px;
    }
    .projectImage {
        width: 400px;
        height: 100%;
        border: 1px solid black;
    }
    .projectInfo {
        margin-left: 10px;
    }
    .projectTitle {
        margin: 0;
        font-size: 1.75rem;
    }
    .projectStack {
        display: inline-block;
        margin: 0;
        margin-top: 5px;
        
        font-size: 1.25rem;
        font-weight: normal;

        opacity: 0.75;
    }
    .projectDescription {
        margin: 0;
        margin-top: 10px;
        font-size: 1.1rem;
        line-height: 1.5;
    }
    @media screen and (max-width: 1080px) {
        .project {
            flex-direction: column;
        }
        .projectImage {
            width: 100%;
            height: auto;
        }
        .projectInfo {
            margin-left: 0;
            margin-top: 10px;
            margin-bottom: 25px;
        }
    }
</style>

<div>
    <h1>🚀 Projects</h1>
    {#each projects as project}
        <div class="project">
            <img class="projectImage" alt={"project image"} src={"images/" + project.image}/>
            <div class="projectInfo">
                <h2 class="projectTitle">{project.title}</h2>
                <h3 class="projectStack">{project.stack.join(' ')}</h3>
                <p class="projectDescription">{project.description}</p>
            </div>
        </div>
    {/each}
</div>