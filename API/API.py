from flask import Flask, request, render_template, url_for, jsonify
import db_management
from flask_cors import CORS

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/login', methods=["POST"])
def check_login():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    username = info.get("username")
    password = info.get("password")
    user = db_management.authenticateUser(username, password)
    if user:
        # User is authenticated
        response = {"username" : username, "password": password}
        return jsonify(response), 200
    else:
        # User is not authenticated
        response = {"message": "Login failed"}
        return jsonify(response), 401


@app.route("/addUser", methods=["POST"])
def create_account():
    info = request.get_json()
    username = info.get("username")
    password = info.get("password")
    db_management.addNewUser(username, password)


@app.route("/addProject", methods=["POST"])
def add_project():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    username = info.get("username")
    projectID = info.get("projectIDJoin")
    db_management.addAccessProject(username, projectID)
    project, HW1A, HW2A, HW1C, HW2C = db_management.getProject(projectID)
    response = {"ProjectID": project, "HWSet1A": HW1A, "HWSet2A": HW2A, "HWSet1C": HW1C, "HWSet2C": HW2C}
    jsonify(response)
    return response, 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)
