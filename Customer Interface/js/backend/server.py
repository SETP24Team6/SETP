from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import json

import members, products
import members, orders

app = Flask(__name__)
connection = get_sql_connection()


# login page apis
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
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_all_members', methods=['GET'])
def get_members():
    response = members.get_all_members(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# ordering page apis
@app.route('/getProducts', methods=['GET'])
def get_products():
    response = products.get_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  
@app.route('/add_order', methods=['POST'])
def add_order():
    request_payload = json.loads(request.form['data'])
    # print(request_payload)
    result =  products.add_order(connection, request_payload)
    response = ""
    #print(result)
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  
@app.route('/get_order', methods=['POST'])
def get_order():
    request_payload = json.loads(request.form['data'])
    result =  products.get_order(connection, request_payload)
    response = ""
    # print(result)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/delete_item', methods=['POST'])
def delete_item():
    request_payload = json.loads(request.form['data'])
    result =  products.delete_item(connection, request_payload)
    response = ""
    print(result)
    response = jsonify(result)
    print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/cart_out', methods=['POST'])
def cart_out():
    request_payload = json.loads(request.form['data'])
    print(request_payload)
    result =  products.cart_out(connection, request_payload)
    response = ""
    # print(result)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/last_checkout', methods=['POST'])
def last_checkout():
    request_payload = json.loads(request.form['data'])
    result =  products.last_checkout(connection, request_payload)
    response = ""
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    
# OMS page apis
@app.route('/get_all_orders', methods=['GET'])
def get_all_orders():
    response = orders.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/ready_order', methods=['POST'])
def ready_order():
    request_payload = json.loads(request.form['data'])
    print(request_payload)
    result =  orders.ready_order(connection, request_payload)
    response = ""
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/complete_order', methods=['POST'])
def complete_order():
    request_payload = json.loads(request.form['data'])
    result =  orders.complete_order(connection, request_payload)
    response = ""
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Sandwich Store Management System")
    app.run(port=5000)

