import os
from dotenv import load_dotenv
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import numpy as np
from sqlalchemy.types import ARRAY, Integer, String

load_dotenv("../.env")
def main():
    db_uri = os.environ["DATABASE_URL"]
    try:
        print(os.environ["DATABASE_URL"])
        engine = create_engine(os.environ["DATABASE_URL"])
        print(engine.connect())
        result = []
        with engine.connect() as con:
            result = con.execute(text("SELECT genre from movies_scores where id = '96882' ")).fetchall()
        arr = np.array(result[0][0])
        best_result = np.argsort(arr)[-1:-10:-1]
        print(len(result[0][0]))
        query_arg=[]
        for i in best_result:
            query_arg.append(str(i))
        query_arg = tuple(query_arg)
        print(text("SELECT id from netflix where id in :x "),{"x":query_arg})
        with engine.connect() as con:
            n_movies = (con.execute(text("SELECT title from netflix where netflix.index in :x "),{"x":query_arg})).fetchall()
            # print("here")
            print(n_movies)
    except Exception as e:
        print(e)

if __name__ == '__main__':
    main()
