import json
import sys

def main():
    data = load_data()
    printFields(data)

def load_data():
    data = ""
    filename = sys.argv[1]
    with open(filename, "r") as read:
        data = json.load(read)
    if isinstance(data, list):
        data = data[0]
    return data

def printFields(data):
    fields = sys.argv[2:]
    for i in fields:
        print(data[i])

main()
