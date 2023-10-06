from pymongo import MongoClient

# Use Cluster0
client = MongoClient("mongodb+srv://abbykremer:4v0SOFtnvU4c4XPX@cluster0.x1jngyq.mongodb.net/?retryWrites"
                             "=true&w=majority")
db = client.HardwareApplication

users = db.userInfo

userDocument = {
    "username": "user",
    "password": "pass"}

users.insert_one(userDocument)