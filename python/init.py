import mariadb
import sys
import os

try:
    conn = mariadb.connect(
        user="mysqlusr",
        password="mysqlpwd",
        host="database",
        port=3306,
        database="parc"
    )
    cur = conn.cursor()

    base_path = os.path.dirname(os.path.abspath(__file__))

    for sql_file in ['init.sql', 'create.sql']:
        file_path = os.path.join(base_path, 'sql_file', sql_file)
        with open(file_path, 'r') as f:
            content = f.read()
            queries = content.split(";")
            for i, query in enumerate(queries):
                query = query.strip()
                if query:
                    try:
                        cur.execute(query)
                    except mariadb.Error as e:
                        print(f"Erreur SQL (fichier: {sql_file}, ligne {i+1}): {e}")

    conn.commit()
    conn.close()

except mariadb.Error as e:
    print(f"Erreur de connexion à la base de données: {e}")
    sys.exit(1)
