from time import sleep
import requests
import psycopg2
import os

API_KEY = os.environ.get('API_KEY')

def config():
    db = {
      'host': os.environ.get('MOVIE_DB_HOST'),
      'database': os.environ.get('MOVIE_DB_NAME'),
      'password': os.environ.get('MOVIE_DB_PASSWORD'),
      'user': os.environ.get('MOVIE_DB_USER'),
      'port': os.environ.get('MOVIE_DB_PORT')
    }

    return db

def get_page(api, cur,conn):
    response = requests.get(f"{api}")

    if response.status_code == 200:
        send_data(response.json()["results"], cur, conn)
    else:
        print(f"Hello person, there's a {response.status_code} error with your request")


def get_data():
    (conn,cur) = connect_db()

    for i in range(101,1000):
        get_page("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=" + str(i) + "&api_key=" + API_KEY, cur, conn)

    cur.close()
    conn.close()

def connect_db():
    db = config()
    conn = psycopg2.connect(
        host=db['host'],
        port=db['port'],
        database=db['database'],
        user=db['user'],
        password=db['password'])
    # create a cursor
    cur = conn.cursor()
        
    # execute a statement
    print('PostgreSQL database version:')
    cur.execute('SELECT * FROM movies')

    # display the PostgreSQL database server version
    db_version = cur.fetchall()
    print(db_version)
       
    return (conn,cur)

def send_data(data, cur,conn):
    for d in data:
        if "release_date" in d:
            if str(d["release_date"]) != '':
                d_release = "\'" + str(d["release_date"]) + "\'"
            else: 
                d_release = "NULL"
        else:
            d_release = "NULL"

        req = "INSERT INTO movies(genre_ids,id,original_language,original_title,overview,release_date,title, vote_average) VALUES (ARRAY " + str(d["genre_ids"]) + "::integer[]," + str(d["id"]) + ",\'" + d["original_language"] + "\',\'" + d["original_title"].replace('\'','`') + "\',\'" + d["overview"].replace('\'','`') + "\'," + d_release + ",\'" + d["title"].replace('\'','`') + "\'," + str(d["vote_average"]) + ");"
        try: 
            cur.execute(req)
        except Exception as e:
            print(e)
            print(req)
            conn.rollback()
        conn.commit()

sleep(5)
get_data()