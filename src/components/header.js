import React from "react";
import MOVIES from "../assets/MOVIES.png"
import { useState, useContext } from "react";
import { StateContext } from '../context/context'
import {  Link } from "react-router-dom";

function Header() {
  const [state, dispatch] = useContext(StateContext)

  const [searchWord, setSearchWord] = useState("")
  const [searchGenre, setSearchGenre] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log(searchWord)
    fetchSpecificMovies(searchWord)
  }

  // function handleGenreFetch(e){
  //   e.preventDefault()
  //   console.log(searchGenre)
  //   fetchGenre(searchGenre)
  // }
  function fetchSpecificMovies(movieName) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=175605194fab5c6701435a8ad630b90b&query=${movieName}`)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "SET_MOVIES", payload: data.results })
      })
  }

  function fetchGenre(genre) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=175605194fab5c6701435a8ad630b90b&with_genres=${genre}`)
      .then(response => response.json())
      .then(data => {
        dispatch({ type: "SET_MOVIES", payload: data.results })
      })
  }

  const genresList = [
    { id: 0, name: "All Genres" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];
  return (
    <header>

      <Link to="/">
        <div >
          <img src={MOVIES} alt="movie" className="headerImg" />
        </div>
      </Link>


      <form >
        <div class="contenir">

          <label for="movie-genre" className="search" id="searchLabel">Choose a movie genre:</label>
          <select id="movie-genre" name="genre" className="search-btn" onChange={(e) => {
            const index = genresList.findIndex((item) => { return item.name === e.target.value; })
            fetchGenre(genresList[index].id);
          }}>
            {genresList.map((genre) => (
              <option key={genre.id} >
                {genre.name}
              </option>
            ))}
          </select>

        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <div class="contenir">

          <input type="text" className="search" id="search-inp" placeholder="Search..." onChange={(e) => { setSearchWord(e.target.value) }} />
          <button className="search-btn" id="search-inp-btn" type="submit" >&#x027A4;</button>
        </div>
      </form>

    </header>
  );
}

export default Header;
