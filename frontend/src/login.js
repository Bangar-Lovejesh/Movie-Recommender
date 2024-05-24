// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });
      // Handle successful login
      console.log(response.data);
    } catch (err) {
      // Handle login error
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <Container className="login-form">
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              onClick={handleLogin}
              className="login-button"
            >
              Login
            </Button>
            <Button variant="secondary" className="login-button">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;