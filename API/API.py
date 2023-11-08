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
    response = {"username": username, "password": password}
    jsonify(response)
    return response, 200


@app.route("/addProject", methods=["POST"])
def add_project():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    username = info.get("username")
    projectname = info.get("projectIDJoin")
    description = info.get("description")
    # make this return projectID?
    db_management.addProject(projectname,description,100,100) #make capacity change later
    # db_management.addAccessProject(username, projectID) #would still need to be project ID

    # project, HW1A, HW2A, HW1C, HW2C = db_management.getProject(projectID)
    # response = {"ProjectID": project, "HWSet1A": HW1A, "HWSet2A": HW2A, "HWSet1C": HW1C, "HWSet2C": HW2C}
    response = {"username": username, "projectID": projectname}
    jsonify(response)
    return response, 200

@app.route("/joinProject", methods=["POST"])
def join_project():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    username = info.get('username')
    projectID = info.get("projectIDJoin")
    if db_management.hasProjectAccess(username, projectID):
        return jsonify({'message': 'You already have access to this project.'}), 401
    else:
        db_management.addAccessProject(username, projectID)
        return jsonify({'message': 'success'}), 200

@app.route("/getProject", methods=["POST"])
def get_project():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    username = info.get('username')
    projectID = info.get("projectID")
    if db_management.hasProjectAccess(username, projectID):
        project, HW1A, HW2A, HW1C, HW2C = db_management.getProject(projectID)
        response = {"ProjectID": project, "HWSet1A": HW1A, "HWSet2A": HW2A, "HWSet1C": HW1C, "HWSet2C": HW2C}
        return jsonify(response), 200
    else:
        response = {"message": "You do not have access to this project. Please request to join"}
        return jsonify(response), 401


@app.route("/checkOut", methods=["POST"])
def check_out():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    projectID = info.get('projectID')
    num = info.get('num')
    HWSet = info.get("HWSet")
    if HWSet == "HWSet1":
        output = db_management.checkOutHWSet1(projectID, int(num))
    else:
        output = db_management.checkOutHWSet2(projectID, int(num))
    if output != -1:
        print('here')
        response = {"capacity":db_management.queryHWSet1Capacity(projectID), "availability":db_management.queryHWSet1Availability(projectID)}
        return jsonify(response), 200
    else:
        response = {"message": "You do not have enough hardware to check out this many items"}
        return jsonify(response), 401

@app.route("/checkIn", methods=["POST"])
def check_in():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data received'}), 400

    projectID = info.get('projectID')
    num = info.get('num')
    HWSet = info.get("HWSet")

    if HWSet == "HWSet1":
        db_management.checkInHWSet1(projectID, int(num))
    else:
        db_management.checkInHWSet2(projectID, int(num))

    response = {"capacity": db_management.queryHWSet1Capacity(projectID), "availability": db_management.queryHWSet1Availability(projectID)}
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)
