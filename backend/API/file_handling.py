"""
This is for handling the uploading files
"""
import os
import nltk
from APP import app, mail
from util.PDFToText import get_text
from util.db_handling import *
from werkzeug.datastructures import FileStorage
from flask_restplus import Api, reqparse, abort, Resource
from flask import Flask, jsonify, make_response, request
from flask_mail import Mail, Message
import base64
from treetagger import TreeTagger # to install this, read README
<<<<<<< HEAD
treetaggerPath = '/Users/lsy/Desktop/cs/cs4920/ProjectDragonfly/treetagger' # install and fill this in
=======
treetaggerPath = '/Users/lilihuan/Desktop/TreeTagger/'
# treetaggerPath = '/home/sam/Downloads/treetagger/' # install and fill this in
>>>>>>> 575ef72ec6236a82c9c76bda4d052bc79a51bac3

api = Api(app)

target = 'static/files'
if not os.path.isdir(target):
    if not os.path.isdir('static'):
        os.mkdir('static')
    os.mkdir('static/files')

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}

# check whether is correct type
def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# text area on home page 
textarea = api.namespace('textarea', description="upload text from textarea")
@textarea.route("/", strict_slashes=False)
class Textarea(Resource):
    @textarea.param('text', "The text")
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('text', type=str, required=True)
        parser.add_argument('language', type=str)
        args = parser.parse_args()
        text = args.get('text')
        language = args.get('language')
        #print(language)
        if text is None:
            abort(400, 'Missing text')
        if language == "english":
            token = nltk.word_tokenize(text)
            data = nltk.pos_tag(token)
            res = []
            for (word, word_type) in data:
                res.append({
                    "word": word,
                    "type": word_type
                })
            return make_response(jsonify({"res": res}), 200)
        else:
            tt = TreeTagger(path_to_treetagger=treetaggerPath, language=language)
            result = tt.tag(text)
            res = []
            for (word, word_type, x) in result:
                res.append({
                    "word": word,
                    "type": word_type
                })
            print(res)
            return make_response(jsonify({"res": res}), 200)
        


upload = api.namespace('upload', description="Upload files API")
@upload.route("/", strict_slashes=False)
class Upload(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('file', location='files', type=FileStorage, required=True, action='append')
        parser.add_argument('language', type=str)
        args = parser.parse_args()
        files = args.get('file')
        language = args.get('language')
        #print(language)
        # check every files uploaded
        for file in files:
            if file and allowed_file(file.filename):
                text = get_text(file.read())
                id = generate_id()
                t = {
                    "_id": id,
                    "info": text,
                    "language": language
                }
                insert_tuple(t)
                token = nltk.word_tokenize(text)
                data = nltk.pos_tag(token)
                res = []
                for (word, word_type) in data:
                    res.append({
                        "word": word,
                        "type": word_type
                    })
                return make_response(jsonify({"res": res}), 200)
            else:
                abort(400, "Files type not allow")
        abort(400, 'No files')


info = api.namespace('info', description="Get the info in db")
@info.route('/', strict_slashes=False)
class Info(Resource):
    @info.param('id', "The text id")
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True)
        args = parser.parse_args()
        id = args.get('id')
        if id is None:
            abort(400, 'Missing id')
        text = get_tuple(id)
        token = nltk.word_tokenize(text)
        data = nltk.pos_tag(token)
        res = []
        for (word, word_type) in data:
            res.append({
                "word": word,
                "type": word_type
            })
        return make_response(jsonify({"res": res}), 200)
        
email = api.namespace('email', description="Email api")
@email.route("/", strict_slashes=False)
class Email(Resource):
    def post(self):
        # receive the args: pdf file and target email
        parser = reqparse.RequestParser()
        parser.add_argument('pdf')
        parser.add_argument('email')
        args = parser.parse_args()
        pdf = args.get('pdf')
        email = args.get('email')
        pdf = base64.b64decode(pdf)
        #print(email)
        #print(pdf)     
        msg = Message("Here's your syntax highlighted file!", sender = 'comp6733@gmail.com', recipients = [email])
        msg.attach(filename="file.pdf", content_type='application/pdf', data=pdf)
        mail.send(msg)
        res = []
        return make_response(jsonify({"res": res}), 200)




