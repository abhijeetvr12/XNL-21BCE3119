from flask import Flask
from flask_cors import CORS  # Import CORS
import os

def create_app():
    app = Flask(__name__, static_folder='../../frontend/build/static', 
                template_folder='../../frontend/build')
    CORS(app)  # Enable CORS for all routes
    from .main import main_bp
    app.register_blueprint(main_bp)
    return app