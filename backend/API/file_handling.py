"""
This is for handling the uploading files
"""
import os
from werkzeug.datastructures import FileStorage
from run import app
from flask_restplus import Api, reqparse, abort, Resource
from flask import Flask, jsonify, make_response, request

api = Api(app)

target = 'static/files'
if not os.path.isdir(target):
    os.mkdir(target)


ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}


# check whether is correct type
def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
                filepath = "/".join([target, file.filename])
                file.save(filepath)
