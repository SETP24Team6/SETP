import psycopg2
import sql_connection


connection = sql_connection.get_sql_connection()

def getSales(conn):
    cursor = conn.cursor()
    # yearly sales
    query = ("select sum(order_price) from orders " +
            "WHERE date_part('year', order_timestamp) = " +
            "date_part('year', CURRENT_DATE)")
    cursor.execute(query)
    response = {}
    response['yearly']= cursor.fetchone()[0]

    # this month sales
    query = ("select sum(order_price) from orders " +
            "WHERE date_part('year', order_timestamp) = " +
            "date_part('year', CURRENT_DATE) " +
            "AND date_part('month', order_timestamp) = date_part('month', CURRENT_DATE)")
    cursor.execute(query)
    response['monthly']= cursor.fetchone()[0]

    # this year monthly sales
    query = ("select date_part('month', order_timestamp), sum(order_price) from orders " +
            "WHERE date_part('year', order_timestamp) = " +
            "date_part('year', CURRENT_DATE) " +
            "AND date_part('month', order_timestamp) <= date_part('month', CURRENT_DATE) " +
            "GROUP BY date_part('month', order_timestamp)")
    cursor.execute(query)
    monthly_sales = []
    for (month, sales) in cursor:
        monthly_sales.append(sales)
    response['thisYearMonthly']=monthly_sales

    # last yearmonthly sales
    query = ("select date_part('month', order_timestamp), sum(order_price) from orders " +
            "WHERE date_part('year', order_timestamp) = " +
            "date_part('year', CURRENT_DATE) - 1 " +
            "GROUP BY date_part('month', order_timestamp)")
    cursor.execute(query)
    monthly_sales = []
    for (month, sales) in cursor:
        monthly_sales.append(sales)
    response['lastYearMonthly']=monthly_sales

    # hourly sales on this month sales
    query = ("select date_part('hour', order_timestamp), sum(order_price) from orders " +
            "WHERE date_part('year', order_timestamp) = date_part('year', CURRENT_DATE) " +
            "AND date_part('month', order_timestamp) = date_part('month', CURRENT_DATE) " +
            "group by date_part('hour', order_timestamp) " +
            "order by date_part('hour', order_timestamp);")
    cursor.execute(query)
    hourly_sales = {}
    for (hour, sales) in cursor:
        hourly_sales[hour] = sales
    response['hourlySales']=hourly_sales
    
    # top sandwich ingredients
    query = ("select count(*), product_name from item_ingredients ii " +
            "INNER JOIN orders_items oi on ii.item_id = oi.item_id " +
            "INNER JOIN orders o on o.order_id = oi.order_id " +
            "INNER JOIN product p on p.products_id = ii.products_id " +
            "WHERE date_part('year', order_timestamp) = date_part('year', CURRENT_DATE)  " +
            "AND date_part('month', order_timestamp) = date_part('month', CURRENT_DATE)  " +
            "AND p.products_id BETWEEN 1 AND 18 " +
            "group by p.product_name order by count(*) DESC limit 10")
    cursor.execute(query)
    top_sandwich_count = []
    top_sandwich_name = []
    for (count, name) in cursor:
        top_sandwich_count.append(count)
        top_sandwich_name.append(name)
    response['top_sandwich'] = [top_sandwich_count, top_sandwich_name]

    # top smoothie ingredients
    query = ("select count(*), product_name from item_ingredients ii " +
            "INNER JOIN orders_items oi on ii.item_id = oi.item_id " +
            "INNER JOIN orders o on o.order_id = oi.order_id " +
            "INNER JOIN product p on p.products_id = ii.products_id " +
            "WHERE date_part('year', order_timestamp) = date_part('year', CURRENT_DATE)  " +
            "AND date_part('month', order_timestamp) = date_part('month', CURRENT_DATE)  " +
            "AND p.products_id BETWEEN 19 AND 30 " +
            "group by p.product_name order by count(*) DESC limit 5")
    cursor.execute(query)
    top_smoothie_count = []
    top_smoothie_name = []
    for (count, name) in cursor:
        top_smoothie_count.append(count)
        top_smoothie_name.append(name)
    response['top_smoothie'] = [top_smoothie_count, top_smoothie_name]

    # top smoothie ingredients
    query = ("select FLOOR((date_part('year', CURRENT_DATE) - date_part('year', birthday)) / 10 )as age, " +
            "sum(order_price) from member " +
            "INNER JOIN orders on member.member_id = orders.member_id " +
            "WHERE date_part('year', order_timestamp) = date_part('year', CURRENT_DATE)  " +
            "AND not order_status = 'cart'  " +
            "group by age order by age")
    cursor.execute(query)
    age_sales = {}
    for (age, sales) in cursor:
        ageGroup = str(int(age)) + "0 - " + str(int(age)) + "9"
        age_sales[ageGroup] = sales
    response['age_sales']=age_sales

    # print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response
