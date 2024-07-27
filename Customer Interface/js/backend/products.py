import psycopg2
import sql_connection


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
        print(response)
    return response
