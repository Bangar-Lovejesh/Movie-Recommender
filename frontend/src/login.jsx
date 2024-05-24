// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './login.css';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`;
function Login_Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {email, password});
      // Handle successful login
      console.log(response.data);
      nav('/');

    } catch (err) {
      // Handle login error
      setError('Invalid email or password');
    }
  };

  return (
      <div className="login-container">
        <Container className="login-form">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                  style={{ marginBottom: '2rem' }}
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <ButtonContainer>
            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
            <Link to="/register" className="btn btn-secondary register-button">
              Register
            </Link>
          </ButtonContainer>
          </Form>
        </Container>
      </div>
  );
};

export default Login_Page;