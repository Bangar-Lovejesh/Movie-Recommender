
from flask import Flask, request, jsonify
import json
import urllib.request
import urllib.error
import urllib.parse
from . import dbl_connect
# from dbl_connect import get_movie
app = Flask(__name__)
OMDB_API_KEY = 'c2a372f8'

@app.route("/api/result", methods=["GET", "POST"], strict_slashes=False)
def search():
    print(request.get_json())
    if request.method == "POST":
        name = request.get_json()["name"]
        criteria = request.get_json()["criteria"]
        print(criteria, len(criteria))
        if name == "":
            return [{"id":1,"name":"wrong movie name"}]


        movie_list = dbl_connect.get_movie(name, criteria)
        if not movie_list:
            return '', 401
        best_match= []
        for i in range(len(movie_list)):
            best_match.append({"id":i+1, "name":movie_list[i]})
        return best_match
@app.route("/api/login", methods=["GET", "POST"], strict_slashes=False)
def login():
    data = request.get_json()
    # return jsonify(username=data["email"], password=data["password"]), 200
    email = data["email"]
    password = data["password"]
    res = dbl_connect.validate_login(email, password)
    print(email,password)
    if res:
        return "", 200
    else:
        return "", 401

@app.route("/api/register", methods=["GET", "POST"], strict_slashes=False)
def register():
    data = request.get_json()
    username = str(data["username"])
    email = str(data["email"])
    password = str(data["password"])
    if dbl_connect.does_user_exist(email):
        return "", 409
    if dbl_connect.register(username, email, password):
        return "", 200
    else:
        return "", 401
@app.route("/api/movie_detail", methods=["GET", "POST"], strict_slashes=False)
def get_movie_details():
        data = request.json
        movie_name = data.get('movieName')
        if not movie_name:
            return "", 400

        if '(' not in movie_name:
            encoded_movie_name = urllib.parse.quote(str(movie_name).strip())
        else:
            encoded_movie_name = urllib.parse.quote(str(movie_name[:(str(movie_name).index(" ("))]).strip())

        print(encoded_movie_name)
        # First API call to get the IMDb ID
        search_url = f'http://www.omdbapi.com/?apikey={OMDB_API_KEY}&s={encoded_movie_name}'
        try:
            with urllib.request.urlopen(search_url) as response:
                search_data = json.loads(response.read().decode())
        except urllib.error.HTTPError as e:
            return jsonify({'error': f'Failed to fetch movie list: {e.reason}'}), 500
        except (urllib.error.URLError, json.JSONDecodeError):
            return jsonify({'error': 'Failed to fetch movie list'}), 500

        if 'Search' not in search_data:
            return jsonify({'error': 'Failed to fetch movie list'}), 500

        search_results = search_data['Search']
        if not search_results:
            return jsonify({'error': 'No movies found'}), 404

        imdb_id = search_results[0]['imdbID']

        # Second API call to get detailed movie information
        details_url = f'http://www.omdbapi.com/?apikey={OMDB_API_KEY}&i={imdb_id}&plot=full'
        try:
            with urllib.request.urlopen(details_url) as response:
                details_data = json.loads(response.read().decode())
        except Exception as e:
            print(e)
            return "", 500

        return jsonify(details_data)

if __name__ == "__main__":
    app.run()
