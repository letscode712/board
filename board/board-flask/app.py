import os, sys
from flask import Flask, request
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config/config.py")

    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

    CORS(app, resources={r'*': {'origins': '*'}})

    from api import board


    app.register_blueprint(board.bp)

    return app

app = create_app();