import logo from "./logo.svg";
import "./App.css";
import Formscript from "./form";
import { useRef, useState } from "react";
import Test from "./test";
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
          <Route exact path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
