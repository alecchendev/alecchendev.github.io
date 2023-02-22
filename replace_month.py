import os
import sys

# Get the directory from the command-line argument
directory = sys.argv[1]

# Loop through each markdown file in the directory
for filename in os.listdir(directory):
    if filename.endswith('.md'):
        filepath = os.path.join(directory, filename)
        lines = None
        with open(filepath, 'r') as f:
            lines = f.readlines()
        # Replace the month number on the second line with the corresponding month name
        tokens = lines[1].split()
        month_num = tokens[2]
        num_to_month = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec',
        }

        month_name = num_to_month.get(month_num)
        if month_name:
            lines[1] = ' '.join(tokens[:2] + [month_name] + tokens[3:])
        with open(filepath, 'w') as f:
            f.writelines(lines)
