import styles from '../styles/projects.module.css'
import Image from 'next/image'

export default function Projects({ content }) {
    const data = [
        {
            title: "Runner Game",
            imagePath: "runnerGame.gif",
            stack: "Rust Wasm Javascript WebGL",
            description: "Description placeholder."
        }
    ]
    return <div>
        {data.map(item => {
            return (
                <div key={item.title}>
                    <img
                        src={"../images/" + item.imagePath}
                        alt={item.title}
                    />
                    <div>

                        <h2>{item.title}</h2>
                        <h3>{item.stack}</h3>
                        <p>{item.description}</p>

                    </div>
                </div>
            )
        })
        }
    </div>
}