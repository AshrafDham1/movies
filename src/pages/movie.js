import React from 'react'
import "../MovieDetail.css"
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";

function Movie() {
  const [movie, setMovie] = useState({})
  const { id } = useParams();
  console.log(id)
  function fetchDetails(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=175605194fab5c6701435a8ad630b90b`)
      .then(res => res.json())
      .then(data => { console.log(data); setMovie(data) })
  }
  fetchDetails(id)

  return (
    <div className="movie-detail">
      <div className="backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
        <div className="content">
          <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} className="movie-poster" alt={movie.title} />
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <h2>{movie.tagline}</h2>
            <p><strong className="details">Overview:</strong> {movie.overview}</p>
            <p><strong className="details">Release Date:</strong> {movie.release_date}</p>
            <p><strong className="details">Genres:</strong> {movie.genres && movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong className="details">Runtime:</strong> {movie.runtime} minutes</p>
            <p><strong className="details">Rating:</strong> {movie.vote_average} (based on {movie.vote_count} votes)</p>
            <p><strong className="details">Budget:</strong> ${movie.budget && movie.budget.toLocaleString()}</p>
            <p><strong className="details">Revenue:</strong> ${movie.revenue && movie.revenue.toLocaleString()}</p>
            <p><strong className="details">Production Companies:</strong> {movie.production_companies && movie.production_companies.map(company => company.name).join(', ')}</p>
            <p><strong className="details">Homepage:</strong> <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p>
            <Link to={`/cast/${id}/${movie.title}`}>
        <p>Cast</p>
      </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie