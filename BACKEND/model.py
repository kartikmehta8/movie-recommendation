import numpy as np
import pandas as pd
import ast 
import nltk
from nltk.stem.porter import PorterStemmer 
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
movies= pd.read_csv('mdbmovies.csv')
credits= pd.read_csv('mdbcredits.csv')
movies = movies.merge(credits,on='title')
movies = movies[['movie_id','title','overview','genres','keywords','cast','crew']]
movies.isnull().sum()
movies.dropna(inplace=True)
movies.iloc[0].genres

def convert(obj):
    l=[]
    for i in ast.literal_eval(obj):
        l.append(i['name'])
    return l

movies['genres']=movies['genres'].apply(convert)
movies['keywords']=movies['keywords'].apply(convert)

def convert2(obj):
    L = []
    counter = 0
    for i in ast.literal_eval(obj):
        if counter < 3:
            L.append(i['name'])
        counter+=1
    return L 

movies['cast'] = movies['cast'].apply(convert2)


def fetch_director(text):
    L = []
    for i in ast.literal_eval(text):
        if i['job'] == 'Director':
            L.append(i['name'])
    return L

movies['crew'] = movies['crew'].apply(fetch_director)
movies['overview'] =movies['overview'].apply(lambda x:x.split())
movies['genres']=movies['genres'].apply(lambda x:[i.replace(" ","") for i in x])
movies['keywords'] = movies['keywords'].apply(lambda x:[i.replace(" ","") for i in x])
movies['crew'] = movies['crew'].apply(lambda x:[i.replace(" ","") for i in x])
movies['cast'] = movies['cast'].apply(lambda x:[i.replace(" ","") for i in x])
movies['tag']=movies['overview']+movies['keywords']+movies['genres']+movies['cast']+movies['crew']
new_df= movies[['movie_id','title','tag']]
new_df['tag'] = new_df['tag'].apply(lambda x: " ".join(x))
ps=PorterStemmer()
def stem(text):
    y=[]
    for i in text.split():
       y.append(ps.stem(i))
    return " ".join(y)
new_df['tag'] = new_df['tag'].apply(stem)
new_df['tag'] = new_df['tag'].apply(lambda x:x.lower())
cv = CountVectorizer(max_features=2000,stop_words='english')
vectors = cv.fit_transform(new_df['tag']).toarray()
cv.get_feature_names()
similarity = cosine_similarity(vectors)
list(enumerate(similarity[0]))
def recommend(movie):
    movie_index=new_df[new_df['title']==movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)),reverse=True,key= lambda x:x[1])[1:6]
        
    for i in movies_list:
        print(new_df.iloc[i[0]].title)

recommend('Batman Begins')

pickle.dump(new_df.to_dict(),open('movies_dict.pkl','wb'))
pickle.dump(similarity,open('similarity.pkl','wb'))
print