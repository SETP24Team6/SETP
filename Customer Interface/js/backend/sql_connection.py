import psycopg2

conn = psycopg2.connect(database="bite_and_delight",
                        host="localhost",
                        user="postgres",
                        password="password",
                        port="5432")

cursor = conn.cursor()

cursor.execute("SELECT * FROM member")
print(cursor.fetchone())