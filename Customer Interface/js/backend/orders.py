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
        query2 = ("select orders_items.item_id, item_type, string_agg(product_name, ', ') from item_ingredients " +
            "INNER JOIN product on product.products_id = item_ingredients.products_id " +
            "INNER JOIN orders_items on orders_items.item_id = item_ingredients.item_id " +
            "where orders_items.order_id = %s " +
            "GROUP BY orders_items.item_id, item_type ORDER BY orders_items.item_id")
        cursor2.execute(query2, [order_id])
        item_ingred = []
        for (item_id2, item_type2, ingred_list) in cursor2:
            item_ingred.append(
                item_type2 +": "+ ingred_list
            )

        response.append({
            'order_id': order_id,
            'firstName': firstName,
            'order_timestamp': order_timestamp,
            'store_name': store_name,
            'order_status' : order_status,
            "item_ingred" : item_ingred
        })
        print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response

get_all_orders(connection)
