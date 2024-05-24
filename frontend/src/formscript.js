import logo from "./logo.svg";
import "./App.js";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './formscript.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components'

function Formscript() {
  const [movie_name, set_movie_name] = useState("");
  const nav = useNavigate();
  const [selected_criteria, set_selected_criteria] = useState([]);


  function checkbox_change(e) {
    const { value, checked } = e.target;
    set_selected_criteria((prev_criteria) =>
      checked
        ? [...new Set([...prev_criteria, value])] // Add value to the set to remove duplicates
        : prev_criteria.filter((criteria) => criteria !== value)
    );
  }
  function search(e) {
    e.preventDefault();
    nav("/result", {
      state: {
        title:movie_name,
        criteria: selected_criteria} });
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
                   value={movie_name}
                   onChange={(e) => set_movie_name(e.target.value)}
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

             <div className="d-flex justify-content-center">
               <Button className="fancy-button" variant="primary" type="submit">
                 Submit
               </Button>
             </div>
           </Form>
         </Container>
       </div>
   );
}

export default Formscript;
