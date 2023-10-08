from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

client = MongoClient("mongodb+srv://ramezhatab:JaA3hEhFLNPcU9c9@cluster0.x1jngyq.mongodb.net/?retryWrites=true&w=majority")
db = client.get_database("HardwareApplication")

collection = db.get_collection("UserInfo")


@app.route('/login', methods=["POST"])
def check_login():
    info = request.get_json()
    username = info.get("username")
    password = info.get("password")
    user = collection.find_one({"username": username, "password": password})
    print(user)
    if user:
        # User is authenticated
        response = {"message": "Login successful"}
        return jsonify(response), 200
    else:
        # User is not authenticated
        response = {"message": "Login failed"}
        return jsonify(response), 401


@app.route("/create", methods=["POST"])
def create_account():
    info = request.get_json()
    username = info.get("username")
    password = info.get("password")
    newUser = {
        "username": username,
        "password": password
    }
    collection.insert_one(newUser)


if __name__ == "__main__":
    app.run(debug=True)
