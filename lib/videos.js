import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const videosDirectory = path.join(process.cwd(), 'data', 'videos');

export function getVideosData() {
  const fileNames = fs.readdirSync(videosDirectory)
  const videosData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id

    // Read markdown file as string
    const fullPath = path.join(videosDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      ...matterResult.data
    }
  });

	return videosData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  });
	
}