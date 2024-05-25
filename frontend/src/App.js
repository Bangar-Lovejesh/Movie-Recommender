
import "./App.css";
import React from 'react';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
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
} from "react-router-dom";

function App() {

  return (
      <html>
      <AuthProvider>

          <Router>
              <Routes>
                  <Route exact path="/login" element={<Login_Page/>}/>
                  <Route exact path="/register" element={<Register_Page/>}/>
                  <Route exact path="/search" element={
                      <PrivateRoute>
                          <Formscript/>
                      </PrivateRoute>
                  }/>
                  <Route exact path="/result"
                         element={
                             <PrivateRoute>

                                 <Result/>
                             </PrivateRoute>}/>
                  <Route
                      path="/"
                      element={
                          <PrivateRoute>
                              <Navigate to="/search"/>
                          </PrivateRoute>
                      }
                  />
              </Routes>
          </Router>
      </AuthProvider>
      </html>
  )
      ;
}

export default App;
