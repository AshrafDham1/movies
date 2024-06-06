import React from 'react';
import {  Link } from "react-router-dom";

function Card(props) {
  const { movie, onClick } = props;
  return (
    <Link to={`/movie/${props.movie.id}`}>
    <div className='movieBlock' >
      <img 
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
        className='movieIMG' 
        alt={movie.title} 
      />
      <h3 className='movieTitle'>{movie.title}</h3>
    </div>
    </Link>
  );
}

export default Card;
