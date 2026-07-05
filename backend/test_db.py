from db import cursor

cursor.execute("SHOW TABLES")

for table in cursor:
    print(table)