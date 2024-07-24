from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import json

import members

app = Flask(__name__)
connection = get_sql_connection()

@app.route('/signup', methods=['POST'])
def signup():
    request_payload = json.loads(request.form['data'])
    member_id =  members.signup_new(connection, request_payload)
    response = jsonify({
        'member_id': member_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/checkuser', methods=['POST'])
def checkuser():
    request_payload = json.loads(request.form['data'])
    exist =  members.check_member_exist(connection, request_payload)
    response = jsonify({
        'exists': exist
    })
    print(type(response))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/login', methods=['POST'])
def login():
    request_payload = json.loads(request.form['data'])
    result =  members.login(connection, request_payload)
    response = ""
    try:
        response = jsonify({
            'userid': result["member_id"],
            'name': result["firstname"]
        })
    except:
        response = jsonify({

        })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/change_pw', methods=['POST'])
def change_pw():
    request_payload = json.loads(request.form['data'])
    result =  members.change_password(connection, request_payload)
    response = ""
    print(result)
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_all_members', methods=['GET'])
def get_members():
    response = members.get_all_members(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Sandwich Store Management System")
    app.run(port=5000)

