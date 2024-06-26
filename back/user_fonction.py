import os
import string

import psycopg2
from user import User

conn = psycopg2.connect(
    host=os.environ.get('USER_DB_HOST'),
    port=os.environ.get('USER_DB_PORT'),
    database=os.environ.get('USER_DB_NAME'),
    user=os.environ.get('USER_DB_USER'),
    password=os.environ.get('USER_DB_PASSWORD')
)

def read_db(req: string):
    
    # create a cursor
    cur = conn.cursor()

    cur.execute(req)
    conn.commit()

    # display the PostgreSQL database server version
    db_result = cur.fetchall()
    print(db_result)

    cur.close()
    conn.close()
    return db_result


def update_bdd(req: string):
    
    # create a cursor
    cur = conn.cursor()

    cur.execute(req)
    conn.commit()

    cur.close()
    conn.close()


def post_user_bdd(user: User):
    tmp: string = str(user.id)
    req = "UPDATE users SET email='"+user.email+"', password='"+user.password+"' WHERE id = "+tmp+";"

    print(update_bdd(req))
    return "ok"


def get_user_bdd(name: string):
    req = "SELECT * FROM users WHERE name='"+name+"'"
    return read_db(req)


def create_user(name, email, password):
    # create a cursor
    cur = conn.cursor()

    # execute a statement
    cur.execute(f"INSERT INTO users(name, email, password) VALUES (\'{name}\', \'{email}\', \'{password}\')")

    cur.close()
    conn.commit()
    conn.close()

