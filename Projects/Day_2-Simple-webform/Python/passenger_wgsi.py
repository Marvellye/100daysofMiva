import sys
import os

# Add the current directory to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Import the Flask app (assuming app.py contains your Flask app)
from app import app as application