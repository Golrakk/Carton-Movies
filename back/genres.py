import psycopg2
import json
import os


def config():
    db = {
      'host': os.environ.get('MOVIE_DB_HOST'),
      'database': os.environ.get('MOVIE_DB_NAME'),
      'password': os.environ.get('MOVIE_DB_PASSWORD'),
      'user': os.environ.get('MOVIE_DB_USER'),
      'port': os.environ.get('MOVIE_DB_PORT')
    }

    return db


def get_genre(id):
    # read connection parameters
    params = config()
    
    # connect to the PostgreSQL server
    conn = psycopg2.connect(**params)
    
    # create a cursor
    cur = conn.cursor()
        
    # execute a statement
    cur.execute(f"SELECT json_agg(json_build_object('id', id, 'name', name)) FROM (SELECT id, name FROM genres WHERE id = {id}) as subquery;")
    # cur.excute(f"genre_ids")
   
    # display the query result
    result = json.dumps(cur.fetchone()[0][0]['name'])
    print(result)
    
    cur.close()
    conn.close()
    return result