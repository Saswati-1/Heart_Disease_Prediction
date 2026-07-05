import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Saswati$123",
    database="heart_disease_db"
)

cursor = db.cursor()