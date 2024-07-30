import psycopg2
import sql_connection


connection = sql_connection.get_sql_connection()

def get_all_orders(conn):
    cursor = conn.cursor()
    query = ("select orders.order_id, firstName, order_timestamp, " + 
             "store_name, order_status from orders " + 
             "INNER JOIN member ON orders.member_id = member.member_id " +
             "INNER JOIN stores on stores.store_id = orders.store_id " +
             "ORDER BY orders.order_id ")
    cursor.execute(query)
    response = []
    for (order_id, firstName, order_timestamp, store_name, order_status) in cursor:
        
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
            "order_ingred" : order_ingred
        })
        print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response

get_all_orders(connection)
