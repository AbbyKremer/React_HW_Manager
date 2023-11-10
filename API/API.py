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
        response = {"username": username, "password": password}
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
    user = db_management.addNewUser(username, password)
    if user:
        # User is authenticated
        response = {"username": username, "password": password}
        return jsonify(response), 200
    else:
        # User is not authenticated
        response = {"message": "Account creation failed"}
        return jsonify(response), 401


@app.route("/addProject", methods=["POST"])
def add_project():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    username = info.get("username")
    projectID = info.get("projectID")
    description = info.get("description")

    added = db_management.addProject(projectID, description)  # make capacity change later
    if added == "Project Already Exists":
        return jsonify({'message': 'Project Already Exists'}), 401

    db_management.addAccessProject(username, projectID)  # would still need to be project ID

    availability1 = db_management.queryHWSet1Availability()
    availability2 = db_management.queryHWSet2Availability()
    capacity1 = db_management.queryHWSet1Capacity()
    capacity2 = db_management.queryHWSet2Capacity()
    projectID, checkedOut1, checkedOut2, description = db_management.getProject(projectID)
    response = {
        "ProjectID": projectID,
        "CheckedOut1": checkedOut1,
        "CheckedOut2": checkedOut2,
        "Description": description,
        "HWSet1A": availability1,
        "HWSet2A": availability2,
        "HWSet1C": capacity1,
        "HWSet2C": capacity2}
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

    if(db_management.checkExists(projectID)):
        if db_management.hasProjectAccess(username, projectID):
            availability1 = db_management.queryHWSet1Availability()
            availability2 = db_management.queryHWSet2Availability()
            capacity1 = db_management.queryHWSet1Capacity()
            capacity2 = db_management.queryHWSet2Capacity()
            projectID, checkedOut1, checkedOut2, description = db_management.getProject(projectID)
            response = {
                "ProjectID": projectID,
                "CheckedOut1": checkedOut1,
                "CheckedOut2": checkedOut2,
                "Description": description,
                "HWSet1A": availability1,
                "HWSet2A": availability2,
                "HWSet1C": capacity1,
                "HWSet2C": capacity2}
            return jsonify(response), 200
        else:
            response = {"message": "You do not have access to this project. Please request to join."}
            return jsonify(response), 401

    else:
        response = {"message": "This project does not exist. Please create a new project or sign into a different one."}
        return jsonify(response), 401


@app.route("/checkOut", methods=["POST"])
def check_out():
    info = request.get_json()
    if not info:
        return jsonify({'message': 'No JSON data receieved'}), 400
    projectID = info.get('projectID')
    num = info.get('num')
    HWSet = info.get("HWSet")
    checkedOut = info.get('checkedOut')
    response = {}
    if HWSet == "HWSet1":
        output = db_management.checkOutHWSet1(projectID, int(num))
        response = {"capacity": db_management.queryHWSet1Capacity(),
                    "availability": db_management.queryHWSet1Availability(),
                    "checkedOut": db_management.queryCheckedOut1(projectID)
                    }
    else:
        output = db_management.checkOutHWSet2(projectID, int(num))
        response = {"capacity": db_management.queryHWSet2Capacity(),
                    "availability": db_management.queryHWSet2Availability(),
                    "checkedOut": db_management.queryCheckedOut2(projectID)}
    if output != -1:
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
    checkedOut = info.get('checkedOut')
    response = {}
    if HWSet == "HWSet1":
        output = db_management.checkInHWSet1(projectID, int(num))
        response = {"capacity": db_management.queryHWSet1Capacity(),
                    "availability": db_management.queryHWSet1Availability(),
                    "checkedOut": db_management.queryCheckedOut1(projectID)}
    else:
        output = db_management.checkInHWSet2(projectID, int(num))
        response = {"capacity": db_management.queryHWSet2Capacity(),
                    "availability": db_management.queryHWSet2Availability(),
                    "checkedOut": db_management.queryCheckedOut2(projectID)}
    if output!= -1:
        return jsonify(response), 200
    else:
        return jsonify({"message": "Not enough checked out"}), 401



if __name__ == "__main__":
    app.run(port=5000, debug=True)
