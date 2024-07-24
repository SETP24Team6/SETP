import psycopg2
import sql_connection


connection = sql_connection.get_sql_connection()

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

def check_member_exist(conn,member):
    cursor = conn.cursor()
    query = ("select email from member where email = %s or phone = %s")
    data = (member['email'], member['phone'])
    cursor.execute(query, data)
    result = ""
    for (email) in cursor:
        result = email
    return bool(result)

def login(conn,member):
    cursor = conn.cursor()
    query = ("select firstname, member_id from member where email = %s and passwordhash = %s")
    data = (member['email'], member['passwordhash'])
    cursor.execute(query, data)
    result = {}
    for (firstname, member_id) in cursor:
        result["firstname"] = firstname
        result["member_id"] = member_id
    return result

def signup_new(conn, member):
    cursor = conn.cursor()
    cursor.execute("ROLLBACK")
    query = ("INSERT INTO member "
             "(lastname, firstname, email, phone, birthday, passwordhash)"
             "VALUES (%s, %s, %s, %s, %s, %s)")
    data = (member['lastname'], member['firstname'], member['email'],
            member['phone'], member['birthday'], member['passwordhash'])

    cursor.execute(query, data)
    conn.commit()

    return cursor.lastrowid
