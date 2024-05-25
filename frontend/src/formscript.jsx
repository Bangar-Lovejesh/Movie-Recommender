
import "./App.js";
import { useRef, useState } from "react";
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './formscript.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components'

function Formscript() {
  const [movieName, setMovieName] = useState("");
  const nav = useNavigate();
  const [dropdownValue, setDropdownValue] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const { logout } = useAuth();
  const [searchResults, setSearchResults] = useState([]);

  function checkbox_change(e) {
    const { value, checked } = e.target;
    setSelectedCriteria((prevCriteria) =>
      checked
        ? [...new Set([...prevCriteria, value])] // Add value to the set to remove duplicates
        : prevCriteria.filter((criteria) => criteria !== value)
    );
  }
  function search(e) {
    e.preventDefault();
    if(movieName.trim() === ""){
      alert("Please enter a movie name");
      return;
    }
    nav("/result", {
      state: {
        title:movieName,
        criteria: selectedCriteria} });
    // alert((e.target.movie_name));
  }
   return (
       <div className="form-container">
         <Container className="form-wrapper">
           <Form onSubmit={search}>
             <Form.Group className="mb-3" controlId="formMovieName">
               <Form.Label className="form-label">Movie Name:</Form.Label>
               <Form.Control
                   type="text"
                   value={movieName}
                   onChange={(e) => setMovieName(e.target.value)}
               />
             </Form.Group>

             <Form.Group className="mb-3" controlId="formCriteria">
               <Form.Label className="form-label">Criteria:</Form.Label>
               <div className="checkbox-group">
                 <Form.Check
                     type="checkbox"
                     label="Overview"
                     value="overview"
                     onChange={checkbox_change}
                     inline
                 />
                 <Form.Check
                     type="checkbox"
                     label="Keywords"
                     value="keywords"
                     onChange={checkbox_change}
                     inline
                 />
                 <Form.Check
                     type="checkbox"
                     label="Genre"
                     value="genre"
                     onChange={checkbox_change}
                     inline
                 />
               </div>
             </Form.Group>

             <div className="button-container">
               <Button className="fancy-button" variant="primary" type="submit">
                 Submit
               </Button>
               <Button className="fancy-button" variant="secondary" onClick={logout}>
              Logout
            </Button>
             </div>
           </Form>
         </Container>
       </div>
   );
}

export default Formscript;
