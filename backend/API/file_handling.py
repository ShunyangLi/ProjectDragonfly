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
import docx # pip install python-docx
from nltk.tokenize import LineTokenizer
api = Api(app)
#treetaggerPath = '/Users/lilihuan/Desktop/TreeTagger/'
treetaggerPath = '/home/sam/Downloads/tree-tagger/' # install and fill this in

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

def insert_into_db(text, language):
    id = generate_id()
    db_data = get_info(id, text, language=language)
    insert_tuple(db_data)
    return id


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
        # make the tuple, and store it into database
        id = insert_into_db(text, language)
        # highlight the textarea
        res = highlight(text, language)
        return make_response(jsonify(res=res, id=id), 200)


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
            #print(file.filename.rsplit('.', 1)[1].lower())
            # convert the file to text
            extension = file.filename.rsplit('.', 1)[1].lower()
            text = ""
            if (extension == 'docx'):
                doc = docx.Document(file)
                t = []
                for el in doc.paragraphs:
                    if el.text:
                        t.append(el.text)
                for el in t:
                    text += str(el)
            elif allowed_file(file.filename):
                text = get_text(file.read())
            else:
                abort(400, "Files type not allow")
            # store the info, and then get the id
            id = insert_into_db(text, language)
            # highlight the text
            res = highlight(text, language)
            return make_response(jsonify(res=res,id=id), 200)
        abort(400, 'No files')


def highlight(text, language):
    text = LineTokenizer(blanklines='keep').tokenize(text)
    #print(text)
    if (language == "english"):
        arr = []
        count = 1
        for el in text:
            first = 0
            res = []
            token = nltk.word_tokenize(el)
            data = nltk.pos_tag(token)
            for (word, word_type) in data:
                #print(word)
                #print(word_type)
                res.append({
                    "word": word,
                    "type": word_type,
                    "space": first
                })
                first = 1
            first = 1
            # add the newline if it's not last line
            if count != len(text):
                res.append({
                    "word": "NEWLINE",
                    "type": "NEWLINE",
                    "space": 1
                })
            count += 1
            arr.append(res)
        return arr
    elif language == "spanish":
        arr = []
        count = 1
        for el in text:
            first = 0
            res = []
            tt = TreeTagger(path_to_treetagger=treetaggerPath, language=language)
            result = tt.tag(el)
            if result[0][0] == '':
                break
            for (word, word_type, x) in result:
                # map from their tagging syntax to treetag syntax
                # so frontend displays colors correctly
                if word_type == "ADV":
                    word_type = "RB"
                elif word_type == "NC" or word_type == "NMEA" or word_type == "NP":
                    word_type = "NN"
                elif word_type == "ITJN":
                    word_type = "UH"
                elif word_type == "SE":
                    word_type = "RP"
                elif word_type == "FS":
                    word_type = "PUNCTUATION"
                elif word_type[0] == "V":
                    word_type = "VB" 
                elif word_type[:2] == "CC":
                    word_type = "CC" 
                elif word_type[:2] == "CS":
                    word_type = "CC"
                elif word_type == "ADJ":
                    word_type = "JJ"
                else:
                    word_type = "UNKNOWN"
                res.append({
                    "word": word,
                    "type": word_type,
                    "space": first
                })
                first = 1
            first = 1
            # add the newline if it's not last line
            if count != len(text):
                res.append({
                    "word": "NEWLINE",
                    "type": "NEWLINE",
                    "space": 1
                })
            count += 1
            arr.append(res)
        return arr
    else: #french
        arr = []
        count = 1
        for el in text:
            first = 0
            res = []
            tt = TreeTagger(path_to_treetagger=treetaggerPath, language=language)
            result = tt.tag(el)
            #print(result)
            if result[0][0] == '':
                break
            for (word, word_type, x) in result:
                # map from their tagging syntax to treetag syntax
                # so frontend displays colors correctly
                #print(word)
                #print(word_type)
                if word_type == "ADV":
                    word_type = "RB"
                elif word_type == "NOM" or word_type == "NP" or word_type[:3] == "PRO":
                    word_type = "NN"
                elif word_type == "INT":
                    word_type = "UH"
                elif word_type == "PUN" or word_type == "SENT":
                    word_type = "PUNCTUATION"
                elif word_type[:3] == "VER":
                    word_type = "VB" 
                elif word_type == "KON":
                    word_type = "CC" 
                elif word_type == "ADJ":
                    word_type = "JJ"
                else:
                    word_type = "UNKNOWN"
                res.append({
                    "word": word,
                    "type": word_type,
                    "space": first
                })
                first = 1
            first = 1
            # add the newline if it's not last line
            if count != len(text):
                res.append({
                    "word": "NEWLINE",
                    "type": "NEWLINE",
                    "space": 1
                })
            count += 1
            arr.append(res)
        return arr

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
        tuple = get_tuple(id)
        #print(tuple['text'])
        res = highlight(tuple['text'], tuple['language'])
        #print(res)
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

        msg = Message("Here's your syntax highlighted file!", sender = 'comp6733asdf@gmail.com', recipients = [email])
        msg.attach(filename="file.pdf", content_type='application/pdf', data=pdf)
        mail.send(msg)
        res = []
        return make_response(jsonify({"res": res}), 200)


bugreport = api.namespace('bugreport', description="bugreport api")
@bugreport.route("/", strict_slashes=False)
class Bugreport(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('text')
        args = parser.parse_args()
        text = args.get('text')
        email = 'comp6733asdf@gmail.com'
        msg = Message("Bug report", sender = 'comp6733asdf@gmail.com', recipients = [email])
        msg.body = text
        mail.send(msg)
        res = []
        return make_response(jsonify({"res": res}), 200)


