from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY'] = 'WHATEVER'
# RequestEntityTooLarge if size too large
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
CORS(app)