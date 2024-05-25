import os
from collections import defaultdict

from dotenv import load_dotenv
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import numpy as np
from sqlalchemy.types import ARRAY, Integer, String

load_dotenv("../.env")
def get_movie(title: str, criteria: list) -> list:
    db_uri = os.environ["DATABASE_URL"]
    try:
        probability_dict = defaultdict(int)
        for i in criteria:
            probability_dict[i] = 100 /len(criteria)
        print(probability_dict, criteria)
        engine = create_engine(os.environ["DATABASE_URL"])
        print(engine.connect())
        result = []
        # print("SELECT overview from movies_scores where id = %s ", title)
        with engine.connect() as con:
            # result is returned from the sql query as list inside a 'sqlalchemy.engine.row.Row'
            # inside the list as a whole
            # they will be returned as overview row, keywords row and genre row
            result = (con.execute(text("SELECT overview, keywords, genre from movies_scores where LOWER(title) = LOWER(:name) limit 100"), {"name": title})).fetchall()
        if not result:
            return []
        overview_arr = result[0][0]
        keywords_arr = result[0][1]
        genre_arr = result[0][2]
        best_result = [0]*len(overview_arr)
        # print(type(result),type(result[0]), type(result[0][0]))
        query_arg=[]
        for i in probability_dict.keys():
            if i == "overview":
                for j in range(len(overview_arr)):
                    overview_arr[j] *= probability_dict["overview"]
            elif i == "genre":
                for j in range(len(overview_arr)):
                    keywords_arr[j] *= probability_dict["genre"]
            elif i == "keyword":
                for j in range(len(overview_arr)):
                    genre_arr[j] *= probability_dict["keyword"]

        for i in range(len(best_result)):
            best_result[i] += overview_arr[i] + keywords_arr[i] + genre_arr[i]
        best_result = np.argsort(np.array(best_result))[-1:-11:-1]
        print(best_result)
        for i in best_result:
            query_arg.append(str(i))
        query_arg = tuple(query_arg)
        print(text("SELECT id from netflix where id in :x "),{"x":query_arg})
        with engine.connect() as con:
            n_movies = (con.execute(text("SELECT title from netflix where netflix.index in :x "), {"x":query_arg})).fetchall()
            # print("here")
        print(n_movies)
        movie_list = []
        for i in n_movies:
            movie_list.append(i[0])
        return movie_list
    except Exception as e:
        print(e)
def validate_login(email:str,password:str):
    try:
        engine = create_engine(os.environ["DATABASE_URL"])
        with engine.connect() as con:
            res = con.execute(text("SELECT * from user_info where user_email = :email and user_password = :password"),{"email": email, "password": password}).fetchall()
        print(res)
        if res:
            return True
        else:
            return False
    except Exception as e:
        print(e)
def register(username:str, email:str, password:str):
    try:
        engine = create_engine(os.environ["DATABASE_URL"])
        with engine.connect() as con:

            sql = text("INSERT INTO user_info (user_name, user_email, user_password) VALUES (:username, :email, :password)")
            params = {"username": username, "email": email, "password": password}
            con.execute(sql, params)

            con.commit()
        return True
    except Exception as e:
        print(e)
        return False
def does_user_exist(email):
    try:
        engine = create_engine(os.environ["DATABASE_URL"])
        with engine.connect() as con:
            exist = con.execute(text("SELECT user_name from user_info where user_email = :email"),
                                {"email": email}).fetchall()
            con.commit()
        if exist:
            return True

        return True
    except Exception as e:
        return False