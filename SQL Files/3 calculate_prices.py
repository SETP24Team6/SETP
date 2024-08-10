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

def order_price(conn,order):
    cursor = conn.cursor()
    query = ("select sum(item_price), o.order_id " +
            "from orders o " +
            "INNER JOIN orders_items oi ON oi.order_id = o.order_id  " +
            "where o.order_id = {0} " +
            "GROUP by o.order_id")
    cursor.execute(query.format(order))
    
    response = []
    data = cursor.fetchone()
    cursor2 = conn.cursor()
    cursor2.execute("ROLLBACK")
    query2 = ("UPDATE orders SET order_price = {0} where order_id = {1} ")
    # data = (price_point, order)
    cursor2.execute(query2.format(*data))
    conn.commit()
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
            print("Updated to item id : " + str(item_id))

        if item_type == 'sandwich':
            update_item(connection, (item_id, item_holder[0]+6))
        elif item_type == 'smoothie':
            update_item(connection, (item_id, item_holder[0]+5))
        
    return 0

def order_get(conn):
    cursor = conn.cursor()
    query = ("select sum(item_price), o.order_id " +
            "from orders o " +
            "INNER JOIN orders_items oi ON oi.order_id = o.order_id  " +
            "GROUP by o.order_id ORDER BY o.order_id")
    cursor.execute(query)

    # for x in range(cursor.fetchone()[0]):
    #     order_price(connection, x+1)
    #     if (x+1) % 100 == 0:
    #         print("Updated to order id : " + str(x+1) )

    for (order_price, order_id) in cursor:
        cursor2 = conn.cursor()
        cursor2.execute("ROLLBACK")
        query2 = ("UPDATE orders SET order_price = {0} where order_id = {1} ")
        data = (order_price, order_id)
        # print(query2.format(*data))
        cursor2.execute(query2.format(*data))
        conn.commit()
        # order_price(connection, order_id)
        if order_id % 1000 == 0:
            print("Updated to order id : " + str(order_id) )
        
    return 0

def update_points(conn):
    cursor = conn.cursor()
    query = ("select SUM(order_price), member_id from orders " +
            "group by member_id order by sum(order_price) ")
    cursor.execute(query)

    # for x in range(cursor.fetchone()[0]):
    #     order_price(connection, x+1)
    #     if (x+1) % 100 == 0:
    #         print("Updated to order id : " + str(x+1) )

    for (order_price, member_id) in cursor:
        cursor2 = conn.cursor()
        query2 = ("SELECT sum(points_redeemed) from points_redemption " + 
                  "where member_id = {0} ")
        cursor2.execute(query2.format(member_id))
        expended_points = cursor2.fetchone()[0]

        cursor2.execute("ROLLBACK")
        query2 = ("UPDATE member SET points = {0} where member_id = {1} ")
        data = ((int(order_price//4)+40)-int(expended_points), member_id)
        cursor2.execute(query2.format(*data))
        # order_price(connection, order_id)
        if member_id % 100 == 0:
            print("Updated to member id : " + str(member_id) )
        
    return 0

# item_get(connection)
# order_get(connection)
update_points(connection)