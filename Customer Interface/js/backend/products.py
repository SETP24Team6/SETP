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
    query = ("SELECT order_id FROM orders "
             "where member_id = %s AND order_status = %s ")
    data = (order['member'], 'cart')
    cursor.execute(query, data)
    orderid_tracker = ''
    for order_id in cursor:
        orderid_tracker = order_id[0]

    if not bool(orderid_tracker):
        query = ("INSERT INTO orders "
                "(member_id, store_id, order_timestamp, order_status)"
                "VALUES (%s, 1, %s, 'cart') RETURNING order_id")
        data = (order['member'], ts)
        cursor.execute(query, data)
        orderid_tracker = cursor.fetchone()[0]

    query = ("INSERT INTO orders_items "
             "(order_id, item_type, item_price)"
             "VALUES (%s, %s, %s) RETURNING item_id")
    data = (orderid_tracker, order['name'], order['price'])
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


def get_order(conn,order):
    
    response = []
    cursor = conn.cursor()
    query = ("select orders_items.item_id, item_type, item_price, product_type_name, string_agg(product_name, ', ') from item_ingredients " +
            "INNER JOIN product on product.products_id = item_ingredients.products_id " +
            "INNER JOIN product_type on product.product_type_id = product_type.product_type_id " +
            "INNER JOIN orders_items on orders_items.item_id = item_ingredients.item_id " +
            "INNER JOIN orders on orders_items.order_id = orders.order_id " +
            "where member_id = %s and order_status = %s" +
            "GROUP BY orders_items.item_id, item_type, product_type_name ORDER BY orders_items.item_id")
    data = (order, 'cart')
    cursor.execute(query, data)

    # print(cursor.rowcount )
    if cursor.rowcount != 0:

        order_ingred = {}
        item_ingred = {}
        product_ingred = {}
        id_tracker = 0
        type_tracker = ""
        for (item_id2, item_type2, item_price, product_type_name, ingred_list) in cursor:
            if id_tracker == 0:
                id_tracker = item_id2
                type_tracker = item_type2
            
            if id_tracker != item_id2:
                item_ingred[type_tracker] = product_ingred
                
                order_ingred[id_tracker] = item_ingred
                product_ingred = {}
                item_ingred = {}
                id_tracker = item_id2
                type_tracker = item_type2

            product_ingred[product_type_name] = ingred_list
            product_ingred['price'] = str(item_price)
            
        item_ingred[type_tracker] = product_ingred
        order_ingred[item_id2] = item_ingred
            

        response.append({
            "order_ingred" : order_ingred
        })
    
    # print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response


def delete_item(conn, order):
    cursor = conn.cursor()
    print(order)
    cursor.execute("ROLLBACK")
    query = ("DELETE FROM item_ingredients where item_id = %s ")
    data = (order,)
    cursor.execute(query, data)
    query = ("DELETE FROM orders_items where item_id = %s ")
    cursor.execute(query, data)
    conn.commit()

    return cursor.lastrowid

def cart_out(conn, order):
    cursor = conn.cursor()
    ts = datetime.datetime.now()
    cursor.execute("ROLLBACK")
    print(order)
    query = ("UPDATE orders SET order_status = %s, order_timestamp = %s, "
             "order_price = %s "
             "WHERE member_id = %s AND order_status = %s  RETURNING order_id")
    data = ('preparing', ts, float(order[1][1:]), order[0], 'cart')
    cursor.execute(query, data)
    conn.commit()

    return cursor.fetchone()[0]

def last_checkout(conn, order):
    cursor = conn.cursor()
    print(order)
    query = ("SELECT order_id, order_timestamp, order_price from orders WHERE order_id = {0} ")
    data = (order)
    cursor.execute(query.format(data))
    response = []
    for (order_id, order_timestamp, order_price) in cursor:
        response.append({
            'order_id': order_id,
            'order_timestamp': order_timestamp,
            'order_price': order_price
        })

def get_5_orders(conn, member):
    cursor = conn.cursor()
    query = ("select orders.order_id, firstName, order_timestamp, " + 
             "store_name, order_status, order_price from orders " + 
             "INNER JOIN member ON orders.member_id = member.member_id " +
             "INNER JOIN stores on stores.store_id = orders.store_id " +
             "where orders.member_id = {0} " +
             "ORDER BY orders.order_id DESC LIMIT 5")
    cursor.execute(query.format(member))
    response = []
    for (order_id, firstName, order_timestamp, store_name, order_status, order_price) in cursor:
        
        cursor2 = conn.cursor()
        query2 = ("select orders_items.item_id, item_type, product_type_name, string_agg(product_name, ', ') from item_ingredients " +
            "INNER JOIN product on product.products_id = item_ingredients.products_id " +
            "INNER JOIN product_type on product.product_type_id = product_type.product_type_id " +
            "INNER JOIN orders_items on orders_items.item_id = item_ingredients.item_id " +
            "where orders_items.order_id = %s " +
            "GROUP BY orders_items.item_id, item_type, product_type_name ORDER BY orders_items.item_id")
        cursor2.execute(query2, [order_id])
        
        order_ingred = {}
        item_ingred = {}
        product_ingred = {}
        id_tracker = 0
        type_tracker = ""
        for (item_id2, item_type2, product_type_name, ingred_list) in cursor2:
            if id_tracker == 0:
                id_tracker = item_id2
                type_tracker = item_type2
            
            if id_tracker != item_id2:
                item_ingred[type_tracker] = product_ingred
                
                order_ingred[id_tracker] = item_ingred
                product_ingred = {}
                item_ingred = {}
                id_tracker = item_id2
                type_tracker = item_type2

            product_ingred[product_type_name] = ingred_list
            
        item_ingred[type_tracker] = product_ingred
        order_ingred[item_id2] = item_ingred
           

        response.append({
            'order_id': order_id,
            'firstName': firstName,
            'order_timestamp': order_timestamp,
            'store_name': store_name,
            'order_status' : order_status,
            "order_ingred" : order_ingred,
            "order_price" : order_price
        })
        # print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response
