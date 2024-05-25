import React, { useState } from 'react';
import axios from 'axios';
import {Container, Form, Button, FormGroup} from 'react-bootstrap';
import './login.css';
import {useAuth} from "./AuthContext";
import {Link, useNavigate} from 'react-router-dom';
import styled from "styled-components";
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`;
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('/api/register', { email, password,username });
      // Handle successful registration
      console.log(response.data);
      nav('/login');

    } catch (err) {

      if (err.response && err.response.status === 409) {
        setError('Email already exists');
      } else {
        // Handle other errors
        setError('Registration Failed');
      }
    }
  };

  return (
    <div className="login-container">
      <Container className="login-form">
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleRegister}>
          <FormGroup controlId="formUsername">
            <Form.Label >Username:</Form.Label>
            <Form.Control
                style={{ marginBottom: '1rem' }}
              type = "text"
              placeholder= "Enter username"
              value = {username}
              onChange={(e) => setUsername(e.target.value)}/>
          </FormGroup>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
                style={{ marginBottom: '1rem' }}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label >Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
            <div className= "button-container">
            <Button variant="primary" type="submit" className="login-button">
              Register
            </Button>
            <Link to="/" className="btn btn-secondary register-button">
              Go back to Login
            </Link>
            </div>
        </Form>
      </Container>
    </div>
  );
}

export default RegisterPage;