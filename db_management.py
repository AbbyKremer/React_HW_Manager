import pymongo
import certifi
import cipher

def addProject(project_id, description):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    if col.find_one({"ProjectID": project_id}):
        return "Project Already Exists"
    else:
        myProject = {"ProjectID": project_id, "Description":description, "CheckedOut1":0,"CheckedOut2":0}
        col.insert_one(myProject)
    client.close()

def queryHWSet1Availability():
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["HardwareSets"]
    project = col.find_one({"Name": "HWSet1"})
    availability = project["Availability"]
    client.close()
    return availability

def queryHWSet2Availability():
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["HardwareSets"]
    project = col.find_one({"Name": "HWSet2"})
    availability = project["Availability"]
    client.close()
    return availability

def queryHWSet1Capacity():
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["HardwareSets"]
    project = col.find_one({"Name": "HWSet1"})
    capacity = project["Capacity"]
    client.close()
    return capacity

def queryHWSet2Capacity():
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["HardwareSets"]
    project = col.find_one({"Name": "HWSet2"})
    capacity = project["Capacity"]
    client.close()
    return capacity

def queryCheckedOut1(projectID):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": projectID})
    checkedOut = project["CheckedOut1"]
    client.close()
    return checkedOut

def queryCheckedOut2(projectID):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": projectID})
    checkedOut = project["CheckedOut2"]
    client.close()
    return checkedOut


def checkOutHWSet1(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    hw = db["HardwareSets"]
    available = queryHWSet1Availability()
    dif = available - amount
    if dif >= 0:
        col.update_one({"ProjectID": project}, {"$inc": {"CheckedOut1": amount}})
        hw.update_one({"Name": "HWSet1"}, {"$set": {"Availability": dif}})
        return 1
    else:
        return -1
    client.close()

def checkOutHWSet2(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    hw = db["HardwareSets"]
    available = queryHWSet2Availability()
    dif = available - amount
    if dif >= 0:
        col.update_one({"ProjectID": project}, {"$inc": {"CheckedOut2": amount}})
        hw.update_one({"Name": "HWSet2"}, {"$set": {"Availability": dif}})
        client.close()
        return 1
    else:
        client.close()
        return -1

def checkInHWSet1(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    hw = db["HardwareSets"]
    available = queryHWSet1Availability()
    capacity = queryHWSet1Capacity()
    dif = available + amount
    if amount > queryCheckedOut1(project):
        client.close()
        return -1
    if dif <= capacity:
        col.update_one({"ProjectID": project}, {"$inc": {"CheckedOut1": -amount}})
        hw.update_one({"Name": "HWSet1"}, {"$set": {"Availability": dif}})
        client.close()
        return 1
    else:
        client.close()
        return -1

def checkInHWSet2(project, amount):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    hw = db["HardwareSets"]
    available = queryHWSet2Availability()
    capacity = queryHWSet2Capacity()
    dif = available + amount
    if amount > queryCheckedOut1(project):
        client.close()
        return -1
    if dif <= capacity:
        col.update_one({"ProjectID": project}, {"$inc": {"CheckedOut1": -amount}})
        hw.update_one({"Name": "HWSet2"}, {"$set": {"Availability": dif}})
        client.close()
        return 1
    else:
        client.close()
        return -1


def addNewUser(userid,password):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["UserInfo"]
    if col.find_one({"Username": userid}):
        client.close()
        return False

    else:
        password_encrypt = cipher.encrypt(password, 3, 1)
        myUser = {"Username": userid, "Password": password_encrypt, "ProjectAccess": []}
        col.insert_one(myUser)
        client.close()
        return True


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
            client.close()
            return False
        else:
            client.close()
            return True
    else:
        client.close()
        return False



def addAccessProject(userid, projectID):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["UserInfo"]
    col.update_one({"Username": userid}, {"$addToSet": {"ProjectAccess": projectID}})
    client.close()


def hasProjectAccess(userid, projectID):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["UserInfo"]
    account = col.find_one({"Username": userid})
    if projectID in account["ProjectAccess"]:
        client.close()
        return True
    else:
        client.close()
        return False

def getProject(projectID):
    file = certifi.where()
    client = pymongo.MongoClient("mongodb+srv://abbykremer:abbykremer@cluster0.x1jngyq.mongodb.net/?retryWrites=true"
                                 "&w=majority&ssl=true&tlsCAFile=" + file)
    db = client["HardwareApplication"]
    col = db["ProjectInfo"]
    project = col.find_one({"ProjectID": projectID})
    if project:
        client.close()
        return project["ProjectID"], project["CheckedOut1"], project["CheckedOut2"], project["Description"]





