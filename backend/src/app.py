import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv("../.env")


def main():
    db_uri = os.environ["DATABASE_URL"]
    try:
        print("here")
        engine = create_engine(db_uri)
        print(engine.connect())
        print("here")
        with engine.connect() as con:
            result = con.execute(text("SELECT title from movies_scores limit 10"))
            print("here")
            print(result.all())
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()
