from flask import Flask
from flask_mail import Mail, Message
from flask_cors import CORS

app = Flask(__name__)
# mail stuff 
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'comp6733asdf@gmail.com'
app.config['MAIL_PASSWORD'] = 'comp6733uytgb'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail=Mail(app)
app.config['SECRET_KEY'] = 'WHATEVER'
# RequestEntityTooLarge if size too large
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024
CORS(app)
