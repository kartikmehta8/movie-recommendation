from turtle import title
import streamlit as st
import pickle 
import pandas as pd
import requests
import streamlit.components.v1 as components
from fastapi import FastAPI

app = FastAPI()

def fetch_poster(movie_id):
    response = requests.get('https://api.themoviedb.org/3/movie/{}?api_key=af526f5cf8216b8426ce52e6f5a9a573&language=en-US'.format(movie_id))
    data = response.json()
    
    full_path= "https://image.tmdb.org/t/p/w500/" + data['poster_path']
    return full_path


def recommend(movie: str):
        movie_index=movies[movies['title']==movie].index[0]
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)),reverse=True,key= lambda x:x[1])[0:16]

        recommended_movies=[]
        recommended_movies_posters=[]
        for i in movies_list:
            movie_id=movies.iloc[i[0]].movie_id
            recommended_movies.append(movies.iloc[i[0]].title)
            recommended_movies_posters.append(fetch_poster(movie_id))
            print(recommended_movies,recommended_movies_posters)
        return recommended_movies,recommended_movies_posters

movies_dict = pickle.load(open('movies_dict.pkl','rb'))
similarity= pickle.load(open('similarity.pkl','rb'))
movies = pd.DataFrame(movies_dict)

@app.get("/")
def main():
    return {"server": "OK"}

@app.get('/movie/{movie_name}')
def get_movies(movie_name: str):
    names,posters= recommend(movie_name)
    return names, posters

# pip install uvicorn fastapi

#To run -  uvicorn app:app --reload 