import * as React from "react"
import Layout from "../components/layout.js";
import * as styles from "../styles/utils.module.css";
import { StaticImage } from "gatsby-plugin-image";

const AboutPage = () => {
  return (
    <Layout pageTitle={"Alec Chen - About"} bgcolor={styles.bgyellow}>
        <div className={[styles.section, styles.card].join(' ')}>
            {/* <div className={styles.myface}>
                <StaticImage className={styles.indeximg} src="../images/profile.png" alt="butter dog" fadeIn={false}/>
            </div> */}
            <h1>
                About
            </h1>
            <p>
                A page to give a little more of a human dimension to my website/work.
            </p>
        </div>
        <div className={[styles.section, styles.card].join(' ')}>
            <h2>
              Stuff I do
            </h2>
            <p>
							A typical day in my life these days is composed of a combination of
							very random things and occasions, with the following few consistent activities:
            </p>
						<ul>
							<li>Exercise</li>
							<li>Coding/Writing</li>
							<li>Cooking</li>
						</ul>
        </div>
        <div className={[styles.section, styles.card].join(' ')}>
            <h2>
                Consumption
            </h2>
            <p>
                Some movies I like: Good Will Hunting, Whiplash, Sound of Metal
								<br/>
								Some shows I like: Bojack Horseman, Master of None, How I Met Your Mother, Fleabag
								<br/>
								Some books I like: The Conquest of Happiness, Flowers for Algernon, Catcher in the Rye
								<br/>
								Some artists I like: Joji, Aries, Tyler the Creator, Kendrick Lamar
            </p>
        </div>
    </Layout>
  )
}

export default AboutPage
