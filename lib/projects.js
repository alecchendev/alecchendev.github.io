import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'data', 'projects');

export function getProjectsData() {
  const fileNames = fs.readdirSync(projectsDirectory)
  const projectsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id

    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      ...matterResult.data
    }
  });

	return projectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
	
}