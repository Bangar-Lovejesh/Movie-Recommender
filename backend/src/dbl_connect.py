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
            result = (con.execute(text("SELECT overview, keywords, genre from movies_scores where title = :name limit 100"), {"name": title})).fetchall()

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
            n_movies = (con.execute(text("SELECT title from netflix where netflix.index in :x "),{"x":query_arg})).fetchall()
            # print("here")
        print(n_movies)
        movie_list = []
        for i in n_movies:
            movie_list.append(i[0])
        return movie_list
    except Exception as e:
        print(e)
def main():
    # get_movie("Sallie Gardner at a Gallop")
    print("here")
if __name__ == '__main__':
    main()
