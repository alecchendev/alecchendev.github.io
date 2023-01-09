# Written by ChatGPT

import sys
import os

# Get the directory from the command-line argument
try:
    directory = sys.argv[1]
except IndexError:
    print("Error: Please provide a directory path as a command-line argument")
    sys.exit(1)

# Loop through each markdown file in the directory
for filename in os.listdir(directory):
    if filename.endswith(".md"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r") as f:
            # Read the file's content
            content = f.read()

        # Replace the first instance of "draft: true" with "draft: false"
        content = content.replace("draft: true", "draft: false", 1)

        with open(filepath, "w") as f:
            # Write the modified content back to the file
            f.write(content)
