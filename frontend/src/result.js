import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './result.css';

function Result() {
  const location = useLocation();
  const nav = useNavigate();
  const post = location.state || {}; // Provide a default empty object if location.state is null
  const [stuff, setStuff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("loading");
  const has_fetched = useRef(false);

  useEffect(() => {
    if (has_fetched.current) return;
    has_fetched.current = true;

    const loadingInterval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "loading...") return "loading";
        return prev + ".";
      });
    }, 500);



    if (post.title && post.criteria) {
      fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: post.title, criteria: post.criteria }),
      })
        .then((res) => res.json())
        .then((data) => {
          setStuff(data);
          setLoading(false);
          clearInterval(loadingInterval);
        })
        .catch(() => {
          setLoading(false);
          clearInterval(loadingInterval);
        });
    } else {
      setLoading(false);
      clearInterval(loadingInterval);
    }

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