import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container,Modal, Button } from 'react-bootstrap';
import './result.css';
import axios from "axios";

function Result() {
  const location = useLocation();
  const nav = useNavigate();
  const post = location.state || {}; // Provide a default empty object if location.state is null
  const [stuff, setStuff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("loading");
  const [error, setError] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
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
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setError('Movie not found.');
          } else {
            setError('An error occurred while fetching data.');
          }
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

    return () => clearInterval(loadingInterval);
  }, [post.title, post.criteria]);

  const handleRowClick = async (movieName) => {
    try {
      const response = await axios.post('/api/movie_detail', { movieName });
      setSelectedMovie(response.data);
      console.log('Modal show state:', modalShow);
      setModalShow(true);
    } catch (err) {
      console.error('Failed to fetch movie details', err);
    }
  };
  const listItems = stuff.map((i) => <li key={i.id}>{i.name}</li>);

return (
    <div className="result-container">
      <Container className="result-wrapper">
        <header className="result-header">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading ? (
            <p className="loading-text">{loadingText}</p>
          ) : (
            !error && (
              <table className="styled-table">
                <thead>
                  <tr>
                    <th style={{width: '10%'}}>ID</th>
                    <th style={{width: '90%'}}>Movie Title</th>
                  </tr>
                </thead>
                <tbody>
                      {stuff.map((movie) => (
                          <tr key={movie.id} onClick={() => handleRowClick(movie.name)}>
                            <td>{movie.id}</td>
                            <td>{movie.name}</td>
                          </tr>
                      ))}
                </tbody>
              </table>
            )
          )}
          <div className="button-container">
            <button type="button" onClick={() => nav("/search")} className="fancy-button">
              Go back
            </button>
          </div>
        </header>
      </Container>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMovie?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Plot:</strong> {selectedMovie?.Plot}</p>
          <p><strong>Genre:</strong> {selectedMovie?.Genre}</p>
          <p><strong>Actors:</strong> {selectedMovie?.Actors}</p>
          <p><strong>Rating:</strong> {selectedMovie?.imdbRating}</p>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Result;