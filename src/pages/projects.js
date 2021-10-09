import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";
import spotifySocialGif from '../images/spotifySocial.gif'
import runnerGameGif from '../images/runnerGame.gif'
import threeDEngineGif from '../images/3dEngine.gif'
import socialNetworkPng from '../images/socialNetwork.png'

const ProjectsPage = () => {

	const projects = [
		{
			title: "Spotify Social",
			image: spotifySocialGif,
			description: "A simple web app to share and connect with friends on data pulled \
			from the Spotify API.",
		},
		{
			title: "Runner Game",
			image: runnerGameGif,
			description: "A simple 3D platformer game where you traverse levels as fast as \
			you can using a spiderman-esque grappling hook ability.",
		},
		{
			title: "3D Engine From Scratch",
			image: threeDEngineGif,
			description: "Right-hand rule on steriods.",
		},
		{
			title: "Social Network Analysis",
			image: socialNetworkPng,
			description: "Collected friendship data from my high school senior class and \
			wrote a data article sharing insights on our social environment.",
		},
	];

  return (
    <Layout pageTitle={"Alec Chen - Projects"} bgcolor={styles.bgorange}>
        <div className={[styles.section, styles.card].join(' ')}>
            <h1>
                Projects
            </h1>
            <p>
                I've made this site as a place for me to put any writing/notes I put together
                as well as somewhere for people to learn a bit about me if they're curious.
            </p>
        </div>
        <div className={styles.projectsWrapper}>

            {projects.map((project) => {
							return (
								<div className={[styles.project, styles.card].join(' ')}>
										<h2>
												{project.title}
										</h2>
										<img className={styles.projectImg} src={project.image} alt="Spotify Social gif" />
										<p>
												{project.description}
										</p>
								</div>
							);
						})}
        </div>
    </Layout>
  )
}

export default ProjectsPage
