from flask import Flask, request, jsonify
# from dbl_connect import main
from . import dbl_connect
# from dbl_connect import get_movie
app = Flask(__name__)

@app.route("/api/result", methods=["GET", "POST"], strict_slashes=False)
def test():
    print(request.get_json())
    if request.method == "POST":
        name = request.get_json()["name"]
        criteria = request.get_json()["criteria"]
        print(criteria, len(criteria))
        if name == "":
            return [{"id":1,"name":"wrong movie name"}]


        movie_list = dbl_connect.get_movie(name, criteria)
        best_match= []
        for i in range(len(movie_list)):
            best_match.append({"id":i+1, "name":movie_list[i]})
        return best_match
@app.route("/api/login", methods=["GET", "POST"], strict_slashes=False)
def login():
    data = request.get_json()
    return jsonify(username=data["email"], password=data["password"]), 200
    email = data["email"]
    password = data["password"]



@app.route("/api/register", methods=["GET", "POST"], strict_slashes=False)
def register():
    data = request.get_json()

if __name__ == "__main__":
    app.run()
