def shiftRight(inputText, N):
    return_string = ""
    for char in inputText:
        charVal = ord(char) - N
        if charVal < 34:
            charVal = 127 - charVal
        return_string += chr(charVal)
    return return_string


def shiftLeft(inputText, N):
    return_string = ""
    for char in inputText:
        charVal = ord(char) + N
        if charVal > 126:
            charVal = 33 + (charVal - 126)
        return_string += chr(charVal)
    return return_string


def encrypt(inputText, N, D):
    reverse_text = inputText[::-1]
    if D == -1:
        return shiftRight(reverse_text, N)
    elif D == 1:
        return shiftLeft(reverse_text, N)


def decrypt(inputText, N, D):
    if D == 1:
        return_string = shiftRight(inputText, N)
    elif D == -1:
        return_string = shiftLeft(inputText, N)
    return return_string[::-1]



def decryptFile(fileName):
    database_data = open(fileName)
    actual_names=""
    for line in database_data:
        for word in line.split():
            decrypted_name = decrypt(word, 3, 1)
            actual_names += decrypted_name
            actual_names += " "
        actual_names += "\n"
    database_data.close()
    return actual_names

word = encrypt("pass", 3, 1)
print(decrypt(word, 3, 1))


