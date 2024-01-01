from flask import Flask

app = Flask(__name__)


@app.route("/test")
def test():
    return "It works"


if __name__ == "__main__":
    app.run()
