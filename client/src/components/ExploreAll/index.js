import React, { useState, useEffect } from 'react';
import movieTrailer from 'movie-trailer';

import axios from '../../axios';
import classes from './exploreAll.module.css';
import NavBar from '../NavBar';
import TrailerModal from '../TrailerModal';

function ExploreAll(props) {
  const type = props.match.path.replace('/', '');
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/movie', {
        params: { type, limit: 16 }
      });
      setMovies(response.data.movies);
      return response;
    }
    fetchData();
  }, [type]);

  // To play trailer
  const handlePlayTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie.title || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((err) => console.log(err));
    }
  };

  let trailerModal = null;
  if (trailerUrl) {
    trailerModal = (
      <TrailerModal trailerUrl={trailerUrl} setTrailerUrl={setTrailerUrl} />
    );
  }
  return (
    <>
      <NavBar />
      <div className={classes.row}>
        <h2 className={classes.row_title}>PLAYING NOW</h2>
        <div className={classes.row_posters}>
          {movies.map((movie) => {
            return (
              <div className={classes.poster_container} key={movie._id}>
                <img
                  className={classes.row_poster}
                  src={movie.bannerImage}
                  alt={movie.name}
                />
                <div className={classes.movie_info}>
                  <h3>TITANIC</h3>
                  <h4>ENGLISH . ROMANTIC</h4>
                </div>
                <div className={classes.poster_actions}>
                  <button type="button" className={classes.book_btn}>
                    BOOK NOW
                  </button>
                  <button
                    type="button"
                    className={classes.play_btn}
                    onClick={() => handlePlayTrailer(movie)}>
                    PLAY TRAILER
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {trailerModal}
    </>
  );
}

export default ExploreAll;