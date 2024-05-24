import logo from "./logo.svg";
import "./App.css";
import Formscript from "./formscript";
import Login_Page from "./login";
import Register_Page from "./register";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Result from "./result";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginPage from "./login";

function App() {
  // const [genre,set_genre] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login_Page />}/>
          <Route exact path="/register" element={<Register_Page />}/>
          <Route exact path="/" element={<Formscript />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
