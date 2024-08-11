from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import json

import members, products, custprofile
import members, oms, its, staff, analysis

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
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/member_login', methods=['POST'])
def member_login():
    request_payload = json.loads(request.form['data'])
    result =  members.member_login(connection, request_payload)
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

@app.route('/employee_login', methods=['POST'])
def employee_login():
    request_payload = json.loads(request.form['data'])
    result =  staff.employee_login(connection, request_payload)
    print(result)
    response = ""
    try:
        response = jsonify({
            'userid': result["employee_id"],
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
    result =  products.add_order(connection, request_payload)
    response = ""
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  
@app.route('/get_order', methods=['POST'])
def get_order():
    request_payload = json.loads(request.form['data'])
    result =  products.get_order(connection, request_payload)
    response = ""
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

# cust profile page apis
@app.route('/get_5_orders', methods=['POST'])
def get_5_orders():
    request_payload = json.loads(request.form['data'])
    response = custprofile.get_5_orders(connection, request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/cust_profile', methods=['POST'])
def cust_profile():
    request_payload = json.loads(request.form['data'])
    response = custprofile.cust_profile(connection, request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/reorderitems', methods=['POST'])
def reorderitems():
    request_payload = json.loads(request.form['data'])
    response = custprofile.reorderitems(connection, request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/update_cust_profile', methods=['POST'])
def update_cust_profile():
    request_payload = json.loads(request.form['data'])
    response = custprofile.update_cust_profile(connection, request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/get_points', methods=['POST'])
def get_points():
    request_payload = json.loads(request.form['data'])
    response = custprofile.get_points(connection, request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# staff sign up api

@app.route('/staff_signup', methods=['POST'])
def staff_signup():
    request_payload = json.loads(request.form['data'])
    member_id =  staff.staff_signup_new(connection, request_payload)
    response = jsonify({
        'member_id': member_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/staff_checkuser', methods=['POST'])
def staff_checkuser():
    request_payload = json.loads(request.form['data'])
    exist =  staff.check_staff_exist(connection, request_payload)
    response = jsonify({
        'exists': exist
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/staff_change_pw', methods=['POST'])
def staff_change_pw():
    request_payload = json.loads(request.form['data'])
    result =  staff.staff_change_password(connection, request_payload)
    response = ""
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/staff_profile', methods=['POST'])
def staff_profile():
    request_payload = json.loads(request.form['data'])
    response = staff.staff_profile(connection, request_payload)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    
# OMS page apis
@app.route('/get_all_orders', methods=['GET'])
def get_all_orders():
    response = oms.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/ready_order', methods=['POST'])
def ready_order():
    request_payload = json.loads(request.form['data'])
    print(request_payload)
    result =  oms.ready_order(connection, request_payload)
    result2 =  its.update_inventory(connection, request_payload)
    response = ""
    response = jsonify({'row_updated': result,'row_updated2': result2})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/complete_order', methods=['POST'])
def complete_order():
    request_payload = json.loads(request.form['data'])
    result =  oms.complete_order(connection, request_payload)
    response = ""
    response = jsonify({'row_updated': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getInventory', methods=['GET'])
def get_inventory():
    result =  its.get_all_inventory(connection)
    response = ""
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/update_stock', methods=['POST'])
def update_stock():
    request_payload = json.loads(request.form['data'])
    result =  its.update_stock(connection,request_payload)
    response = ""
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# sales analysis page apis
@app.route('/getSales', methods=['POST'])
def getSales():
    result =  analysis.getSales(connection)
    response = ""
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Sandwich Store Management System")
    app.run(port=5000)

