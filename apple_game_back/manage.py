#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.db import connections

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apple_game_back.settings')
    
    # Check DB connections
    for conn in connections.all():
        conn.ensure_connection()
        print(f"Connected to database. Database name: 🍎{conn.settings_dict['NAME']} ✅")
    
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
