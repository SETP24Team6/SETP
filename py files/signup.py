from flask import Flask, request, jsonify, render_template

print("Hello World")

app = Flask(__name__)

@app.route('/login')
def hello():
    return "Hello, hello"

@app.route('/order-now.html', methods =['GET', 'POST'])
def register():
    return "Wilson help me"
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        #cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        #cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
        #account = cursor.fetchone()

        ##This is the account validation part
        #if account:
        #    msg = 'Account already exists !'
        #elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        #    msg = 'Invalid email address !'
        #elif not re.match(r'[A-Za-z0-9]+', username):
        #    msg = 'Username must contain only characters and numbers !'
        #elif not username or not password or not email:
        #    msg = 'Please fill out the form !'
        #else:
        #    cursor.execute('INSERT INTO accounts VALUES (NULL, % s, % s, % s)', (username, password, email, ))
        #    mysql.connection.commit()
        #    msg = 'You have successfully registered !'
    #elif request.method == 'POST':
    #    msg = 'Please fill out the form !'
    return render_template('order-now.html', msg = msg)

if __name__ == "__main__":
    print("Starting Server")
    app.run(port=5000)