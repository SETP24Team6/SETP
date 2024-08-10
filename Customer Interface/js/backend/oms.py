import psycopg2
import sql_connection


connection = sql_connection.get_sql_connection()

def get_all_orders(conn):
    cursor = conn.cursor()
    query = ("select orders.order_id, firstName, order_timestamp, " + 
             "store_name, order_status, order_price from orders " + 
             "INNER JOIN member ON orders.member_id = member.member_id " +
             "INNER JOIN stores on stores.store_id = orders.store_id " +
             "where NOT order_status = 'cart' " +
             "ORDER BY orders.order_id DESC LIMIT 30")
    cursor.execute(query)
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


def ready_order(conn,order):
    cursor = conn.cursor()
    cursor.execute("ROLLBACK")
    query = ("UPDATE orders SET order_status = 'ready' where order_id = {0} ")
    data = (order)
    cursor.execute(query.format(data))
    conn.commit()

    return cursor.lastrowid

def complete_order(conn,order):
    
    cursor = conn.cursor()
    cursor.execute("ROLLBACK")

    query = ("UPDATE orders SET order_status = 'completed' where order_id = {0} RETURNING order_price")
    data = (order)
    cursor.execute(query.format(data))
    points_to_add = cursor.fetchone()[0]//4

    query = ("select points from member " +
             "where member_id = %s ")
    cursor.execute(query, order)
    current_points = cursor.fetchone()[0]

    query = ("UPDATE member SET points = %s " +
             "WHERE member_id = %s ")
    data = (current_points+points_to_add, order[0])
    cursor.execute(query, data)

    query = ("UPDATE orders SET order_status = 'completed' where order_id = {0} ")
    data = (order)
    cursor.execute(query.format(data))
    conn.commit()

    return cursor.lastrowid
