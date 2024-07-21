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


def signup_new(conn, member):
    cursor = conn.cursor()
    query = ("INSERT INTO member "
             "(lastname, firstname, email, phone, birtday, passwordhash)"
             "VALUES (%s, %s, %s, %s, %s, %s)")
    data = (member['lastname'], member['firstname'], member['email'],
            member['phone'], member['birtday'], member['passwordhash'])

    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid