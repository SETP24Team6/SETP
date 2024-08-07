import psycopg2
import sql_connection
import datetime


connection = sql_connection.get_sql_connection()

def get_5_orders(conn, member):
    cursor = conn.cursor()
    query = ("select orders.order_id, firstName, order_timestamp, " + 
             "store_name, order_status, order_price from orders " + 
             "INNER JOIN member ON orders.member_id = member.member_id " +
             "INNER JOIN stores on stores.store_id = orders.store_id " +
             "where orders.member_id = {0}  and order_status = 'completed' " +
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

def reorderitems(conn, order):
    
    cursor = conn.cursor()
    cursor.execute("ROLLBACK")
    ts = datetime.datetime.now()
    query = ("SELECT order_id FROM orders "
             "where member_id = %s AND order_status = %s ")
    data = (order[1], 'cart')
    cursor.execute(query, data)
    orderid_tracker = ''
    for order_id in cursor:
        orderid_tracker = order_id[0]

    if not bool(orderid_tracker):
        query = ("INSERT INTO orders "
                "(member_id, store_id, order_timestamp, order_status)"
                "VALUES (%s, 1, %s, 'cart') RETURNING order_id")
        data = (order[1], ts)
        cursor.execute(query, data)
        orderid_tracker = cursor.fetchone()[0]
    
    query = ("SELECT item_type, item_price, string_agg(products_id::varchar, ',') "
                 "FROM item_ingredients "
                 "INNER JOIN orders_items on item_ingredients.item_id = orders_items.item_id "
                 "where order_id = {0} "
                 "GROUP BY item_type, item_price")
    print(order[0])
    cursor.execute(query.format(order[0]))

    for (item_type, item_price, ingred_list) in cursor:
        cursor2 = conn.cursor()
        query = ("INSERT INTO orders_items "
                "(order_id, item_type, item_price)"
                "VALUES (%s, %s, %s) RETURNING item_id")
        data = (orderid_tracker, item_type, item_price)
        cursor2.execute(query, data)
        item_id = cursor2.fetchone()[0]
        split_il = ingred_list.split(',')
        for x in split_il:
            query = ("INSERT INTO item_ingredients "
                    "(products_id, item_id)"
                    "VALUES (%s, %s)")
        data = (x, item_id)
        cursor2.execute(query, data)

    return cursor.fetchone()

def cust_profile(conn,member):
    cursor = conn.cursor()
    query = ("SELECT firstname, lastname, email, phone, birthday "
             "from member "
             "where member_id = %s ")
    cursor.execute(query, member)
    result = {}
    for (firstname, lastname, email, phone, birthday) in cursor:
        result["firstname"] = firstname
        result["lastname"] = lastname
        result["email"] = email
        result["phone"] = phone
        result["birthday"] = birthday
    return result