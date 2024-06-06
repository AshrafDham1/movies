import './App.css';
import Header from './components/header';
import MoviesGrid from './pages/moviesGrid';
import Movie from './pages/movie';
import Cast from './pages/cast';
import { StateContext } from './context/context'
import { useContext, useEffect } from 'react';
import { BrowserRouter , Routes } from 'react-router-dom';
import { Route, Switch } from "react-router";

function App() {
  const [state, dispatch] = useContext(StateContext)

  function fetchMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=175605194fab5c6701435a8ad630b90b`)
      .then(response => response.json())
      .then(data => {
        // this.displayMovies(data.results);
        dispatch({ type: "SET_MOVIES", payload: data.results })
        // console.log(state)
        // console.log(data.results)


      })
  }
  useEffect(() => {
    fetchMovies()
  }, [])
  return (
    <>
      <BrowserRouter>
      <Header />

        <Routes>

          <Route path='/' element={<MoviesGrid />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path="/cast/:id/:title" element={<Cast />} />

        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
