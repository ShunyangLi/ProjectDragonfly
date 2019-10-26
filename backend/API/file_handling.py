"""
This is for handling the uploading files
"""
import os
import nltk
from APP import app
from util.PDFToText import get_text
from util.db_handling import *
from werkzeug.datastructures import FileStorage
from flask_restplus import Api, reqparse, abort, Resource
from flask import Flask, jsonify, make_response, request

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
        args = parser.parse_args()
        text = args.get('text')
        if text is None:
            abort(400, 'Missing text')
        token = nltk.word_tokenize(text)
        data = nltk.pos_tag(token)
        res = []
        for (word, word_type) in data:
            res.append({
                "word": word,
                "type": word_type
            })
        return make_response(jsonify({"res": res}), 200)

upload = api.namespace('upload', description="Upload files API")
@upload.route("/", strict_slashes=False)
class Upload(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('file', location='files', type=FileStorage, required=True, action='append')
        args = parser.parse_args()
        files = args.get('file')
        # check every files uploaded
        for file in files:
            if file and allowed_file(file.filename):
                text = get_text(file.read())
                id = generate_id()

                t = {
                    "_id": id,
                    "info": text
                }
                insert_tuple(t)
                return make_response(jsonify({"id": id}), 200)
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
        
        






