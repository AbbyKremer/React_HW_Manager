# Homework 2
# By: Ramez Hatab


def encrypt(text, s, d):
    if "!" in text or " " in text:
        print("Invalid input, try again")
        return
    text = text[::-1]
    if d != -1 and d != 1:
        return
    if s < 1:
        return
    encryptedText = ""
    # now we have reversed string, do the ASCII shifting
    for c in text:
        newChar = ord(c)
        if d == 1:
            if newChar + s > 126:
                newChar = newChar + s - 93
            else:
                newChar = newChar + s
        else:
            if newChar - s < 34:
                newChar = newChar - s + 93
            else:
                newChar = newChar - s

        encryptedText += chr(newChar)

    return encryptedText


def decrypt(text, s, d):
    if d != -1 and d != 1:
        return
    if s < 1:
        return
    encryptedText = ""
    # now we have reversed string, do the ASCII shifting
    for c in text:
        newChar = ord(c)
        if d == 1:
            if newChar - s > 126:
                newChar = newChar - s + 93
            else:
                newChar = newChar - s
        else:
            if newChar + s < 34:
                newChar = newChar + s - 93
            else:
                newChar = newChar + s

        encryptedText += chr(newChar)

    encryptedText = encryptedText[::-1]
    return encryptedText


def readFile():
    file = open("database.txt", "r")
    for line in file:
        if "\n" in line:
            line = line.removesuffix("\n")
        words = line.split(" ")
        print(decrypt(words[0], 3, 1) + " " + decrypt(words[1], 3, 1))
    file.close()


"""

"""
