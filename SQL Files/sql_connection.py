import psycopg2

__cnx = None

def get_sql_connection():
    global __cnx

    if __cnx is None:
        __cnx = psycopg2.connect(database="bite_and_delight",
                                host="localhost",
                                user="postgres",
                                password="password",
                                port="5432")

    return __cnx