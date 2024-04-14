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


def get_user_token(name, password):
    # read connection parameters
    params = config()
    
    # connect to the PostgreSQL server
    conn = psycopg2.connect(**params)
    
    # create a cursor
    cur = conn.cursor()
        
    # execute a statement
    cur.execute(f"SELECT * FROM users  WHERE name = \'{name}\';")
    # cur.excute(f"genre_ids")
   
    # display the query result
    result = cur.fetchone()

    print(result)

    if(result == None):
        return "Invalid Account"
    else :
        if result[3] != password:
            return "Invalid Password"

    payload = {
        'username': result[1],
        'email': result[2]
    }
    
    secret_key = os.environ.get('TOKEN_SECRET')
    algorithm = os.environ.get('TOKEN_ALGORITHM')
    token = jwt.encode(payload, secret_key, algorithm=algorithm)

    print(token)

    cur.close()
    conn.close()
    return token