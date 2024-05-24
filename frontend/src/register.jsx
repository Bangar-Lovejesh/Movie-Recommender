import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Register_Page = () => {
  const [email, setEmail] = useState('');
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('/api/register', { email, password });
      // Handle successful registration
      console.log(response.data);
      nav('/login');

    } catch (err) {
      // Handle registration error
      setError('Registration failed');
    }
  };

  return (
    <div className="login-container">
      <Container className="login-form">
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
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
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit" className="login-button">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register_Page;