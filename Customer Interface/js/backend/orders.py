import psycopg2
import sql_connection


connection = sql_connection.get_sql_connection()

def get_all_orders(conn):
    cursor = conn.cursor()
    query = ("select orders.order_id, item_type, firstName, order_timestamp, " + 
             "store_name, order_status from orders " + 
             "INNER JOIN member ON orders.member_id = member.member_id " +
             "INNER JOIN orders_items on orders.order_id = orders_items.order_id " +
             "INNER JOIN stores on stores.store_id = orders.store_id")
    cursor.execute(query)
    response = []
    for (order_id, item_type, firstName, order_timestamp, store_name, order_status) in cursor:
        response.append({
            'order_id': order_id,
            'item_type': item_type,
            'firstName': firstName,
            'order_timestamp': order_timestamp,
            'store_name': store_name,
            'order_status' : order_status
        })
        print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response
