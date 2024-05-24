import logo from "./logo.svg";
import "./App.css";
import Formscript from "./formscript";
import { useRef, useState } from "react";
import Result from "./result";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  // const [genre,set_genre] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Formscript />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
