import psycopg2
import sql_connection


connection = sql_connection.get_sql_connection()

def get_all_inventory(conn):
    cursor = conn.cursor()
    query = ("SELECT ii.products_id, product_name, quantity_amount, uom_name, count(*) FROM orders o "+
            "INNER JOIN orders_items oi ON oi.order_id = o.order_id " +
            "INNER JOIN item_ingredients ii ON ii.item_id = oi.item_id " +
            "INNER JOIN product p ON p.products_id = ii.products_id " +
            "INNER JOIN inventory i ON i.products_id = p.products_id " +
            "INNER JOIN uom u ON u.uom_id = i.uom_id " +
            "where order_timestamp BETWEEN " +
                "NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7 " +
                "AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER " +
            "group by ii.products_id,product_name,quantity_amount, uom_name " +
            "order by ii.products_id " )
    cursor.execute(query)
    response = []
    for (products_id, product_name, quantity_amount, uom, amount) in cursor:
        response.append({
            'products_id': products_id,
            'product_name': product_name,
            'quantity_amount': quantity_amount,
            'amount': amount,
            'uom' : uom
        })
        # print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response


def update_inventory(conn,order):
    cursor = conn.cursor()
    cursor.execute("ROLLBACK")
    query = ("select i.products_id, uom_name from uom u " +
            "INNER JOIN inventory i ON i.uom_id = u.uom_id " +
            "INNER JOIN item_ingredients ii ON ii.products_id = i.products_id " +
            "INNER JOIN orders_items oi ON oi.item_id = ii.item_id " +
            "INNER JOIN orders o ON o.order_id = oi.order_id " +
            "where o.order_id = {0}")
    cursor.execute(query.format(order))

    for (products_id, uom_name) in cursor:
        query2 = ("select products_id, quantity_amount " +
                  "from inventory where products_id = {0}")
        cursor2 = connection.cursor()
        cursor2.execute(query2.format(products_id))
        for (unneeded, quantity_amount) in cursor2:
            cursor3 = connection.cursor()
            query3 = ("UPDATE inventory SET quantity_amount = {0} where products_id = {1}")
            updatedAmount = quantity_amount - uom_name
            data = (updatedAmount, products_id)
            cursor3.execute(query3.format(*data))

    conn.commit()

    return cursor.lastrowid

def update_stock(conn,order):
    cursor = conn.cursor()
    print(order)
    cursor.execute("ROLLBACK")
    query = ("select inventory.products_id, quantity_amount from inventory " +
            "INNER JOIN product ON inventory.products_id = product.products_id " + 
            "where product.product_name = '{0}'")
    cursor.execute(query.format(order['ingredient']))
    for (products_id, quantity_amount) in cursor:
        cursor2 = conn.cursor()
        query2 = ("UPDATE inventory SET quantity_amount = {0} where products_id = {1}")
        updatedAmount = quantity_amount + (int(order['quantity'])*1000)
        data = (updatedAmount, products_id)
        cursor2.execute(query2.format(*data))
    conn.commit()

    return cursor.lastrowid
