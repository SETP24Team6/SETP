import psycopg2
import sql_connection


connection = sql_connection.get_sql_connection()


def item_price(conn,order):
    cursor = conn.cursor()
    query = ("select oi.item_id, sum(price_point) " +
            "from orders_items oi " +
            "INNER JOIN item_ingredients ii ON oi.item_id = ii.item_id " +
            "INNER JOIN product p ON p.products_id = ii.products_id " +
            "where oi.item_id = {0} " +
            "GROUP by oi.item_id")
    cursor.execute(query.format(order))
    
    response = []
    for (item_id, price_point) in cursor:
        response.append(price_point)
    return response

def update_item(conn,order):
    cursor = conn.cursor()
    cursor.execute("ROLLBACK")
    query = ("UPDATE orders_items SET item_price = {0} where item_id = {1} ")
    # print(order)
    data = (order[1], order[0])
    cursor.execute(query.format(*data))
    conn.commit()

    return cursor.lastrowid

def item_get(conn):
    cursor = conn.cursor()
    query = ("SELECT item_id, item_type FROM orders_items ")
    cursor.execute(query)
    for (item_id, item_type) in cursor:
        item_holder = item_price(connection, item_id)
        if item_id % 10000 == 0:
            print(item_id)

        if item_type == 'Sandwich':
            update_item(connection, (item_id, item_holder[0]+6))
        elif item_type == 'Smoothie':
            update_item(connection, (item_id, item_holder[0]+5))
        
    return 0

item_get(connection)