from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()

# uri=os.getenv("MONGODB_URI")
# client=MongoClient(uri)
client=MongoClient("mongodb+srv://ypark0861:5BdavFIkQXih1OvQ@cluster0.buoyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


db = client.todo_db
collection_name = db["todo_collection"]

