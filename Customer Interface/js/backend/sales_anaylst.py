from flask import Flask, render_template, request, jsonify
import psycopg2
import datetime

app = Flask(__name__)

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        dbname='your_database_name',
        user='your_username',
        password='your_password',
        host='your_host',
        port='your_port'
    )
    return conn

@app.route('/')
def index():
    return render_template('Businessoverview.html')

@app.route('/get-sales-data', methods=['POST'])
def get_sales_data():
    start_date = request.form['start_date']
    end_date = request.form['end_date']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM orders WHERE order_date BETWEEN %s AND %s', (start_date, end_date))
    orders = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(orders)

if __name__ == '__main__':
    app.run(debug=True)