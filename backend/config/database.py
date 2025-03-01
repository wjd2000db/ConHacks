from pymongo import MongoClient

client = MongoClient("mongodb+srv://testuser:6JMnWZqA2zgj2Mwb@test.ysxou.mongodb.net/?retryWrites=true&w=majority&appName=Test")

db = client.conhacks_db

collection_name = db["conhacks_collection"]