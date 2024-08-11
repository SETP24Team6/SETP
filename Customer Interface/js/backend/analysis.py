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

    # print('\n'.join('{}: {}'.format(*k) for k in enumerate(response)))
    return response
