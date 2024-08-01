import psycopg2
import sql_connection
import datetime


connection = sql_connection.get_sql_connection()

def get_products(conn):
    cursor = conn.cursor()
    query = ("select products_id, product_type_name, product_name, "
            + "image_path, price_point from product "
            + "INNER JOIN product_type on product.product_type_id = product_type.product_type_id"
            + " ORDER BY products_id"
            )
    cursor.execute(query)
    response = []
    for (products_id, product_type_name, product_name, image_path, price_point) in cursor:
        response.append({
            'products_id': products_id,
            'product_type_name': product_type_name,
            'product_name': product_name,
            'image_path': image_path,
            'price_point': price_point
        })
        # print(response)
    return response

def add_order(conn, order):
    cursor = conn.cursor()
    cursor.execute("ROLLBACK")
    ts = datetime.datetime.now()
    query = ("INSERT INTO orders "
             "(member_id, store_id, order_timestamp, order_status)"
             "VALUES (%s, 1, %s, 'cart') RETURNING order_id")
    data = (order['member'], ts)
    cursor.execute(query, data)

    query = ("INSERT INTO orders_items "
             "(order_id, item_type)"
             "VALUES (%s, %s) RETURNING item_id")
    data = (cursor.fetchone()[0], order['type'])
    cursor.execute(query, data)

    my_item_id = cursor.fetchone()[0]
    for ingred in order['ingredents'] :
        query = ("INSERT INTO item_ingredients "
                "(products_id, item_id)"
                "VALUES (%s, %s)")
        data = (ingred, my_item_id)
        cursor.execute(query, data)

    conn.commit()

    return cursor.lastrowid