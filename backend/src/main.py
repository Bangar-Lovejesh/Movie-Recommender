import os

<<<<<<< HEAD
from dotenv import load_dotenv
from sqlalchemy import text
from sqlalchemy import create_engine

load_dotenv("../.env")
os.environ['DATABASE_URL'] = "postgresql://lovejesh:7dJx7gKdxrJ9QLaX3c-tPg@tangy-raven-13112.7tt.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
def main():
    db_uri = os.environ['DATABASE_URL']
=======
from sqlalchemy import create_engine, text


def main():
    db_uri = os.environ["DATABASE_URL"]
>>>>>>> aw/db_notebook
    try:
        print("here")
        engine = create_engine(db_uri)
        print(engine.connect())
        print("here")
        with engine.connect() as con:
<<<<<<< HEAD
            result = con.execute(text("SELECT title from movie_scores limit 10"))
            print("here")
            print(result)
    except Exception as e:
        print(e)

if __name__ == '__main__':
    main()
=======
            result = con.execute(text("SELECT title from movies_scores limit 10"))
            print("here")
            print(result.all())
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()
>>>>>>> aw/db_notebook
