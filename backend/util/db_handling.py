import pymongo
from random import randint

# using the default port and host
myclient = pymongo.MongoClient("mongodb://localhost:27017/")

dblist = myclient.list_database_names()

# firstly we need check whether have database
mydb = myclient["mydatabase"]

# create table
mycol = mydb["text"]

# fix the defalut text, and add language type
# default_text = {
#     "_id": 1,
#     "info": "Welcome to use this web"
# }

# res = mycol.find(default_text)

# just insert the default value of database
# if res is None:
#     res = mycol.insert_one(default_text)

# get information of file uploaded and save as a tuple.
def get_info(id, text, language='english'):
    info = { "_id": id, "text": text, "language": language }
    return info



# get the tuple according to id
def get_tuple(id):
    tuple = mycol.find_one({"_id": int(id)})
    return tuple['info']


# insert tuple with id and info
def insert_tuple(t):
    mycol.insert_one(t)


# delete the tuple according to id
def delete_tuple(id):
    t = {
        "_id": id
    }
    mycol.delete_one(t)

# generate sequential id.
def generate_id():
    length = mycol.count_documents({})
    return length

# update the information of a uploaded file.
def update_doc(id, id1, text, language):
    t = mycol.find_one({"_id": int(id)})
    newValue = { "$set": { "_id": id1, "text": text, "language": language } }
    mycol.update_one(t, newValue)
