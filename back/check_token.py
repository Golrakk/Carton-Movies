import psycopg2
import jwt # type: ignore
import os


def config():
    db = {
      'host': os.environ.get('USER_DB_HOST'),
      'database': os.environ.get('USER_DB_NAME'),
      'password': os.environ.get('USER_DB_PASSWORD'),
      'user': os.environ.get('USER_DB_USER'),
      'port': os.environ.get('USER_DB_PORT')
    }

    return db


def check_token(token):
    # read connection parameters
    params = config()
    
    # connect to the PostgreSQL server
    conn = psycopg2.connect(**params)
    
    # create a cursor
    cur = conn.cursor()
    
    secret_key = os.environ.get('TOKEN_SECRET')
    algorithm = os.environ.get('TOKEN_ALGORITHM')

    res = True
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
    except:
        cur.close()
        conn.close()
        return(False)
    
    cur.execute(f"SELECT * FROM users WHERE name = \'{payload['username']}\';")

    result = cur.fetchone()
    if(result == None) and res:
        res = False
    else:
        print(result)
        res = True

    cur.close()
    conn.close()

    return(res)
