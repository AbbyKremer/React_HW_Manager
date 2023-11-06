import pymongo
import certifi
import cipher
from flask import jsonify

def addProject(project_name, HWSet1_Capacity, HWSet2_Capacity):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    if col.find_one({"ProjectID": project_name}):
        client.close()
        return "Project Already Exists"
    else:
        myProject = {"ProjectID": project_name, "HWSet1_Availability": HWSet1_Capacity, "HWSet2_Availability": HWSet2_Capacity, "HWSet1_Capacity": HWSet1_Capacity, "HWSet2_Capacity": HWSet2_Capacity}
        col.insert_one(myProject)
        client.close()

def queryHWSet1Availability(project_name):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": project_name})
    availability = project["HWSet1_Availability"]
    client.close()
    return availability

def queryHWSet2Availability(project_name):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": project_name})
    availability = project["HWSet2_Availability"]
    client.close()
    return availability

def queryHWSet1Capacity(project_name):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": project_name})
    availability = project["HWSet1_Capacity"]
    client.close()
    return availability

def queryHWSet2Capacity(project_name):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": project_name})
    availability = project["HWSet2_Capacity"]
    client.close()
    return availability

def checkOutHWSet1(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    col.update_one({"ProjectID" : project}, {"HWSet1_Availability" : (queryHWSet1Availability(project)-amount)})
    client.close()

def checkOutHWSet2(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    col.update_one({"ProjectID": project}, {"HWSet2_Availability": (queryHWSet2Availability(project) - amount)})
    client.close()

def checkInHWSet1(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    col.update_one({"ProjectID": project}, {"HWSet1_Availability": (queryHWSet1Availability(project) + amount)})
    client.close()

def checkInHWSet2(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    col.update_one({"ProjectID": project}, {"HWSet2_Availability": (queryHWSet2Availability(project) + amount)})
    client.close()


def addNewUser(userid,password):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["UserInfo"]
    if col.find_one({"Username": userid}):
        client.close()
        return "Error"
    else:
        password_encrypt = cipher.encrypt(password, 3, 1)
        myUser = {"Username": userid, "Password": password_encrypt, "ProjectAccess": []}
        col.insert_one(myUser)
        client.close()


def authenticateUser(userid, password1):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["UserInfo"]
    user = col.find_one({"Username": userid})
    if user:
        password = cipher.decrypt(user["Password"], 3, 1)
        if password1 != password:
            return False
        else:
            return True
    else:
        return False
    client.close()



def addAccessProject(userid, projectName):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["UserInfo"]
    col.update_one({"Username": userid}, {"$addToSet": {"ProjectAccess": projectName}})
    client.close()


def hasProjectAccess(userid, projectID):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["UserInfo"]
    account = col.find_one({"Username": userid})
    if projectID in account["ProjectAccess"]:
        return True
    else:
        return False
    client.close()

def getProject(projectID):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": projectID})
    return project["ProjectID"], project["HWSet1_Availability"], project["HWSet2_Availability"], project["HWSet1_Capacity"], project["HWSet2_Capacity"]
    client.close()



