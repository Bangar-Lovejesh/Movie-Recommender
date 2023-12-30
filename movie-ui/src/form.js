import logo from "./logo.svg";
import './App.js';
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function Formscript() {
    const [movie_name, set_movie_name] = useState('');
    const nav = useNavigate();
    const genre = useRef(null);
    function search(e) {

        e.preventDefault();
        console.log(movie_name,genre.current.value);
        nav('/test', {state:movie_name});
        // alert((e.target.movie_name));
    }
  return (
      <>
          <div className="App">
      <header className="App-header">
          <form onSubmit={search}>
              <label>Movie Name:
                  <input type="text" value={movie_name} onChange={e => set_movie_name(e.target.value)}/>
              </label>
              <br/>
              <label>Genre:
                  <select ref={genre}>
                      <option value="drama"> Drama</option>
                      <option value="Comedy"> Comedy</option>
                      <option value="Horror"> Horror</option>
                  </select>
              </label>
              <br/>
              <button type = "submit" >Submit</button>
          </form>
      </header>
          </div>
      </>
    );
}

export default Formscript;