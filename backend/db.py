import os
import mysql.connector

print("MYSQLHOST =", os.getenv("MYSQLHOST"))
print("MYSQLPORT =", os.getenv("MYSQLPORT"))
print("MYSQLUSER =", os.getenv("MYSQLUSER"))
print("MYSQLDATABASE =", os.getenv("MYSQLDATABASE"))

db = mysql.connector.connect(
    host=os.getenv("MYSQLHOST"),
    user=os.getenv("MYSQLUSER"),
    password=os.getenv("MYSQLPASSWORD"),
    database=os.getenv("MYSQLDATABASE"),
    port=int(os.getenv("MYSQLPORT"))
)

cursor = db.cursor()