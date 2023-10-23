from flask import Flask, request, jsonify
from pymongo import MongoClient
import db_management

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route('/login', methods=["POST"])
def check_login():
    info = request.get_json()
    username = info.get("username")
    password = info.get("password")
    user = db_management.authenticateUser(username, password)
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
    db_management.addNewUser(username, password)


if __name__ == "__main__":
    app.run(debug=True)
