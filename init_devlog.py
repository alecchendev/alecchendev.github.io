#!/usr/bin/env python3
"""
Initialize dev-log entries for a date range.
Creates files with proper frontmatter in content/dev-log/
"""

import argparse
from datetime import datetime, timedelta
from pathlib import Path
import sys


def parse_date(date_str: str) -> datetime:
    """Parse date string in YYYY-MM-DD format"""
    try:
        return datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        raise ValueError(f"Invalid date format: {date_str}. Expected YYYY-MM-DD")


def format_title(date: datetime) -> str:
    """Format date as 'YYYY Mon DD' for the title"""
    return date.strftime('%Y %b %d')


def format_timestamp(date: datetime) -> str:
    """Format date as timestamp with timezone in the format used by dev-log"""
    # Set time to noon for the given date
    dt = date.replace(hour=12, minute=0, second=0, microsecond=0)
    # Get local timezone offset
    utc_offset = datetime.now().astimezone().strftime('%z')
    # Format as ±HH:MM
    tz_formatted = f"{utc_offset[:3]}:{utc_offset[3:]}"
    # Return full timestamp
    return dt.strftime(f'%Y-%m-%d %H:%M:%S{tz_formatted}')


def create_devlog_entry(date: datetime, dev_log_dir: Path, skip_existing: bool = True) -> bool:
    """
    Create a dev-log entry file for the given date.
    Returns True if file was created, False if skipped.
    """
    filename = date.strftime('%Y-%m-%d.md')
    filepath = dev_log_dir / filename

    if filepath.exists():
        if skip_existing:
            print(f"  Skipped (exists): {filename}")
            return False
        else:
            print(f"  Overwriting: {filename}")

    title = format_title(date)
    timestamp = format_timestamp(date)

    content = f"""---
date: {timestamp}
title: {title}
---

"""

    filepath.write_text(content, encoding='utf-8')
    print(f"  Created: {filename}")
    return True


def main():
    parser = argparse.ArgumentParser(
        description='Initialize dev-log entries for a date range',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Create entries for a single week
  python init_devlog.py 2026-02-01 2026-02-07

  # Create entries for the current week
  python init_devlog.py 2026-02-01 2026-02-01

  # Overwrite existing entries
  python init_devlog.py 2026-02-01 2026-02-07 --overwrite
        """
    )

    parser.add_argument(
        'start_date',
        help='Start date in YYYY-MM-DD format'
    )
    parser.add_argument(
        'end_date',
        help='End date in YYYY-MM-DD format (inclusive)'
    )
    parser.add_argument(
        '--overwrite',
        action='store_true',
        help='Overwrite existing files instead of skipping them'
    )

    args = parser.parse_args()

    # Parse dates
    try:
        start_date = parse_date(args.start_date)
        end_date = parse_date(args.end_date)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if start_date > end_date:
        print("Error: start_date must be before or equal to end_date", file=sys.stderr)
        sys.exit(1)

    # Ensure dev-log directory exists
    dev_log_dir = Path('content/dev-log')
    if not dev_log_dir.exists():
        print(f"Error: Directory {dev_log_dir} does not exist", file=sys.stderr)
        sys.exit(1)

    # Create entries
    print(f"\nInitializing dev-log entries from {args.start_date} to {args.end_date}...\n")

    current_date = start_date
    created_count = 0
    skipped_count = 0

    while current_date <= end_date:
        if create_devlog_entry(current_date, dev_log_dir, skip_existing=not args.overwrite):
            created_count += 1
        else:
            skipped_count += 1
        current_date += timedelta(days=1)

    # Summary
    print(f"\nSummary:")
    print(f"  Created: {created_count} file(s)")
    if skipped_count > 0:
        print(f"  Skipped: {skipped_count} file(s) (already exist)")
    print(f"\nDone! Dev-log entries initialized in {dev_log_dir}/\n")


if __name__ == '__main__':
    main()
