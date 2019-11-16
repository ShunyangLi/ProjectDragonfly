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

#treetaggerPath = '/Users/lilihuan/Desktop/TreeTagger/'
treetaggerPath = '/home/sam/Downloads/treetagger/' # install and fill this in


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
	if (language == "english"):
		token = nltk.word_tokenize(text)
		data = nltk.pos_tag(token)
		res = []
		for (word, word_type) in data:
			res.append({
				"word": word,
				"type": word_type
			})
		return res
	else:
		tt = TreeTagger(path_to_treetagger=treetaggerPath, language=language)
		result = tt.tag(text)
		res = []
		for (word, word_type, x) in result:
			res.append({
				"word": word,
				"type": word_type
			})
		return res

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
		res = highlight(tuple['text'], tuple['language'])
		return make_response(jsonify(res=res,id=tuple['_id']), 200)
		
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


