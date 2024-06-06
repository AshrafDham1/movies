import React, { useContext } from 'react'
// import { useEffect } from 'react'
import Card from '../components/card'
// import { useState  } from 'react'
import { StateContext } from '../context/context'

function MoviesGrid() {
  const [state] = useContext(StateContext)


  return (

    <div className='moviesContainer'>
      {state.movies ? state.movies.map(movie => {
        return <Card movie={movie} key={movie.id} />;
      }) : ""}
    </div>
  );
}

export default MoviesGrid