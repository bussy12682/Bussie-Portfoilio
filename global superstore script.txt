
/*============================================================
  RETAIL SALES PERFORMANCE ANALYSIS
  Author: Busayo Omoniyi Rebecca

  Tools Used:
  - MySQL
  - Power BI

  Description:
  This script contains the SQL queries used to answer key
  business questions and prepare data for dashboard
  visualization.
============================================================*/

/*============================================================
	SALES PERFORMANCE ANALYSIS
============================================================*/
SELECT YEAR(order_date) AS year,
	SUM(sales_amtpd) AS total_sales
FROM superstore_clean
GROUP BY YEAR(order_date)
ORDER BY year;

/*============================================================
	Monthly Sales Trend
============================================================*/
SELECT
    DATE_FORMAT(order_date,'%Y-%m') AS month,
    SUM(sales_amtpd) AS total_sales
FROM superstore_clean
GROUP BY DATE_FORMAT(order_date,'%Y-%m')
ORDER BY month;

/*============================================================
	Sales by Region
============================================================*/
SELECT region, SUM(sales_amtpd) AS total_sales
FROM superstore_clean
GROUP BY region
ORDER BY total_sales DESC;

/*============================================================
	Sales by Country
============================================================*/
SELECT
    country,
    SUM(sales_amtpd) AS total_sales
FROM superstore_clean
GROUP BY country
ORDER BY total_sales DESC;

/*============================================================
	Sales by Customer Segment
============================================================*/
SELECT
    segment,
    SUM(sales_amtpd) AS total_sales
FROM superstore_clean
GROUP BY segment
ORDER BY total_sales DESC;

/*============================================================
	Profit by Category
============================================================*/
SELECT category,
    SUM(profit) AS total_profit
FROM superstore_clean
GROUP BY category
ORDER BY total_profit DESC;

/*============================================================
	Top 10 Customers
============================================================*/
SELECT
    customer_name,
    SUM(sales_amtpd) AS total_sales
FROM superstore_clean
GROUP BY customer_name
ORDER BY total_sales DESC
LIMIT 10;

/*============================================================
	Top 10 Loss-making Products
============================================================*/
SELECT
    product_name,
    SUM(profit) AS total_profit
FROM superstore_clean
GROUP BY product_name
ORDER BY total_profit
LIMIT 10;

/*============================================================
	Discount vs Profit
============================================================*/
SELECT discount,
    SUM(profit) AS total_profit
FROM superstore_clean
GROUP BY discount
ORDER BY discount;

/*============================================================
	Profit by Region
============================================================*/
SELECT
    region,
    SUM(profit) AS total_profit
FROM superstore_clean
GROUP BY region
ORDER BY total_profit DESC;

/*============================================================
	Products requiring management attention
============================================================*/
SELECT
    product_name,
    SUM(sales_amtpd) AS total_sales,
    SUM(profit) AS total_profit
FROM superstore_clean
GROUP BY product_name
HAVING SUM(profit) < 0
ORDER BY total_profit;