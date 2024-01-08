from flask import Flask, request

app = Flask(__name__)


# @app.route('/test')
# def test():
#     return [{ "id":1,
#               "name" : "Movie Name1"
#     },{
#         "id": 2,
#         "name": "Movie Name2"
#     },{
#         "id": 3,
#         "name": "Movie Name3"
#     }]


@app.route("/test", methods=["GET", "POST"], strict_slashes=False)
def test():
    name = "unavailable"
    if request.method == "POST":
        print("inside")
        name = request.get_json()["name"]

        return [
            {"id": 1, "name": name},
            {"id": 2, "name": name},
            {"id": 3, "name": name},
        ]

    return [{"id": 1, "name": name}, {"id": 2, "name": name}, {"id": 3, "name": name}]


if __name__ == "__main__":
    app.run()
