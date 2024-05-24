import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './result.css';
import axios from "axios";

function Result() {
  const location = useLocation();
  const nav = useNavigate();
  const post = location.state || {}; // Provide a default empty object if location.state is null
  const [stuff, setStuff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("loading");
  const has_fetched = useRef(false);

useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "loading...") return "loading";
        return prev + ".";
      });
    }, 500);

    const fetchData = async () => {
      if (post.title && post.criteria) {
        try {
          const response = await axios.post('/api/result', {
            name: post.title,
            criteria: post.criteria
          });
          setStuff(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        } finally {
          clearInterval(loadingInterval);
        }
      } else {
        setLoading(false);
        clearInterval(loadingInterval);
      }
    };

    fetchData();

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(loadingInterval);
  }, [post.title, post.criteria]);

  const listItems = stuff.map((i) => <li key={i.id}>{i.name}</li>);

  return (
      <div className="result-container">
        <Container className="result-wrapper">
          <header className="result-header">
            {loading ? (
                <p className="loading-text">{loadingText}</p>
            ) : (
                <table className="styled-table">
                  <thead>
                  <tr>
                    <th style={{width: '10%'}}>ID</th>
                    <th style={{width: '90%'}}>Movie Title</th>
                  </tr>
                  </thead>
                  <tbody>
                  {stuff.map((movie) => (
                      <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.name}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
            )}
            <div className="button-container">
              <button type="button" onClick={() => nav("/")} className="fancy-button">
                Go back
              </button>
            </div>
          </header>
        </Container>
      </div>
  );
}

export default Result;