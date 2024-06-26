import pandas as pd
import pickle
import json

import psycopg2
import os

from sklearn.metrics import accuracy_score, classification_report
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

def config():
    db = {
      'host': os.environ.get('MOVIE_DB_HOST'),
      'database': os.environ.get('MOVIE_DB_NAME'),
      'password': os.environ.get('MOVIE_DB_PASSWORD'),
      'user': os.environ.get('MOVIE_DB_USER'),
      'port': os.environ.get('MOVIE_DB_PORT')
    }

    return db

def get_best_movies():
    # read connection parameters
    params = config()
    
    # connect to the PostgreSQL server
    conn = psycopg2.connect(**params)
    
    # create a cursor
    cur = conn.cursor()
        
    # execute a statement
    cur.execute(f"SELECT json_agg(json_build_object('id', id, 'title', title, 'release_date', release_date, 'poster_path', poster_path, 'genre_ids', genre_ids, 'vote_average', vote_average)) FROM (SELECT DISTINCT id, title, release_date, vote_average, poster_path, genre_ids, FROM movies WHERE vote_average < 9 ORDER BY vote_average DESC LIMIT 3) as subquery;")
    # cur.excute(f"genre_ids")
    
    # display the query result
    result = cur.fetchone()[0]
    print(result)
    
    cur.close()
    conn.close()
    return result;





def get_model(df):
    
    """this function gets the prediction model and the data divided in both train and test data
    
    Args: 
        df (dataframe): movies.json
    
    Returns:
        model: prediction model
        x_train: features of training (movie criterias)
        x_test: features of test data
        y_train: features of training (scores)
        y_test: features of test data
    """
    
    # Convert the JSON file into a pandas dataframe
    df = pd.DataFrame(df)
    
    # Normalize the genres column and drop unnecessary columns
    df = pd.json_normalize(df, record_path='genres', meta=['id', 'title','release_date', 'poster_path', 'vote_average'])
    df = df.drop(columns=['poster_path', 'title','id'])
    
    # Group the dataframe by movie name and score, and aggregate the genres column into a list
    df = df.groupby(['title', 'vote_average'])['id'].apply(list).reset_index(name='genre_ids')
    
    # Sort the dataframe by score and reset the index
    df = df.sort_values(by='vote_average', ascending=False)
    df = df.reset_index(drop=True)

    # Split the genres list into separate columns and drop the 'id' column
    features = pd.concat([df.drop(['vote_average', 'genre_ids'], axis=1), pd.json_normalize(df['genre_ids'])], axis=1)
    features = features.drop(columns=['id'])

    # Split the data into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(features, df['vote_average'], test_size=0.2, random_state=40)
    
    # Create a regression model using Random Forest
    model = RandomForestClassifier(random_state=1)
    
    return model, x_train, x_test, y_train, y_test




def train_model(model, x_train, y_train):   

    """trains the model thanks to the train data
    
    Args:
        model (RandomForestClassifier): current model that will be trained
    
    Returns:
        model (RandomForestClassifier) : model that was trained
    """

    model.fit(x_train, y_train)
    return(model)


def predict_rating(new_movie, model):
    """
    Predicts the movie's rating using the given model. Useful to predict scores for movies that the user has not seen before.

    Args:
        new_movie (dict): Dictionary containing the movie's data.
        model (RandomForestRegressor): Model used to predict the rating.

    Returns:
        predicted_rating (float): The movie's predicted rating.
    """
    
    # Create a DataFrame with the new movie data
    new = pd.json_normalize(new_movie, record_path='genres', meta=['name', 'poster_path'])
    new = new.drop(columns=['poster_path'])
    new = new.groupby(['name'])['id'].apply(list).reset_index(name='genres')
    new = pd.concat([new.drop(['genres'], axis=1), pd.json_normalize(new['genres'])], axis=1)
    new = new.drop(columns=['id'])
    
    # Predict the rating using the model
    predicted_rating = model.predict(new)[0]
    
    return predicted_rating



def description(model, x_test, y_test):
    
    """ gets the model description: parameters, lenght of train data, the classification report and the accuracy of the model based on test data

    Args:
        model (RandomForestClassifier): current model
        x_test (dataframe): features of test data
        y_test (dataframe): features of test data

    Returns:
        params (dict): model parameters
        accuracy (float) : model accuracy
    """
    
    y_pred = model.predict(x_test)
    support_test = classification_report(y_test,y_pred,output_dict=True)['macro avg']['support']

    params = model.get_params()
    support_train = support_test * 0.8 / 0.2
    report = classification_report(y_test,y_pred)
    accuracy = accuracy_score(y_test,y_pred)
    
    return params, accuracy


def add_to_df(df, new_row):
    """
    This function adds a new movie entry to the movies dataframe.

    Args:
        df (dataframe): movies dataframe.
        new_row (dict): new movie entry.

    Returns:
        None
    """
    
    last_row = df.tail(1)
    new_id = int(last_row.iloc[0]['id']) + 1
    new_row['id'] = new_id
    
    with open('movies.json', 'r') as f:
        data = json.load(f)
    
    data.append(new_row)

    with open('movies.json', 'w') as f:
        json.dump(data, f)


#save model in model.pkl
def pickle_model(model):
    
    """serialise the model into a pickle file
    
    Args:
        model (RandomForestClassifier): last trained model
        
    Returns:
        pickle file modified with the last trained model
    """
    
    pickle.dump(model, open('model.pkl', 'wb'))