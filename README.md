# README Template

## Description

## Technologies Used
* Flask
 ```
  pip install Flask
  ```
* Database 
Download [Postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
Install [PostgreSQL extension](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres)
Follow instructions to link your database to VCS.
Populate the database with the pgsql file included in the code.


## Tutorial for backend
* Flask Server
Written in server.py, this contains the APIs you need to 'GET' or 'POST' data from the database. 

taken in part from server.py:
```
@app.route('/get_all_members', methods=['GET'])
def get_members():
    response = members.get_all_members(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
  ```
/get_all_members refers to the API to be accessed, eg in this case 'http://127.0.0.1:5000/get_all_members'
members.get_all_members(connection) refers to an function in members.py
You can play around with this, there is an example for both GET and POST methods in server.py

* Python code to connect to database
taken in part from members.py:
```
def get_all_members(conn):
    cursor = conn.cursor()
    query = ("select * from member")
    cursor.execute(query)
    response = []
    for (member_id, lastname, firstname, email, phone, birthday, passwordhash) in cursor:
        response.append({
            'id': member_id,
            'last_name': lastname,
            'first_name': firstname,
            'email': email,
            'phone': phone,
            'birthday': birthday,
            'password': passwordhash
        })
        print(response)
    return response
  ```
  You write your query in.. well, 'query'
  The following code pushes the data it got from the query into a dictionary and prints it out for the user to see. 
  You can play around with this as well, this example serves no purpose currently and is intended for messing around with until you can get a better understanding of how it works.

  * The linkage from JS to Flask
  taken in part from scripts.js:
```
signupForm.onsubmit = function (event) {
        event.preventDefault();
        var requestPayload = {
            lastname: document.getElementById('last-name').value,
            firstname: document.getElementById('first-name').value,
            email: document.getElementById('email-signup').value,
            phone: document.getElementById('phone').value,
            birthday: document.getElementById('birthday').value,
            passwordhash: document.getElementById('password-signup').value
        };
        callApi("POST", 'http://127.0.0.1:5000/signup', {
            'data': JSON.stringify(requestPayload)
        });
        alert('Account created successfully!');
        // alert(requestPayload.lastname);
        window.location.href = 'create-sandwich.html';
    };
  ```
  requestPayload contains the data to be pushed into Flask to be processed.
  callApi is the function to make the connection over to Flask.
  It contains whether if you wanna GET or POST data to the database, the API itself and the data you are going to push to Flask.
  For this function, please don't play with it, it serves as the signup portion for the web app.



## System Design

## Screenshot

## Quick Start

* Navigate to /Customer Interface/js/backend
```
  python .\server.py
  ```

*
