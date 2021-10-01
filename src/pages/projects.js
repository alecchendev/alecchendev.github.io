import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";

const ProjectsPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - Projects"}>
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

            <div className={[styles.project, styles.card].join(' ')}>
                <h2>
                    Spotify Social
                </h2>
                <StaticImage className={styles.projectImg} src="../images/spotifySocial.gif" />
                <p>
                    I've made this site as a place for me to put any writing/notes I put together
                    as well as somewhere for people to learn a bit about me if they're curious.
                </p>
                
            </div>
            <div className={[styles.project, styles.card].join(' ')}>
                <h2>
                    Nutrition
                </h2>
                <p>
                    I've made this site as a place for me to put any writing/notes I put together
                    as well as somewhere for people to learn a bit about me if they're curious.
                </p>
            </div>
            <div className={[styles.project, styles.card].join(' ')}>
                <h2>
                    Nutrition
                </h2>
                <p>
                    I've made this site as a place for me to put any writing/notes I put together
                    as well as somewhere for people to learn a bit about me if they're curious.
                </p>
            </div>

        </div>
    </Layout>
  )
}

export default ProjectsPage
