import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css"; 
import defaultUser from "../assets/user-avatar.png"
import back from "../assets/back-button (1).png"
import { Link } from "react-router-dom";

function Cast() {
  const { id, title } = useParams();

  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  function handleClick(){
    window.history.back();
  }
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=175605194fab5c6701435a8ad630b90b&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast);
        setCrew(data.crew);
        console.log(data.cast);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);
  const newCrew = crew.slice(0, 12);
  const newCast = cast.slice(0, 12);

  return (
    <div>
      {/* <h1>Cast for Movie ID: {id}</h1> */}
      <div className="flex">
        <img src={back} alt="back" className="backIMG" onClick={handleClick}/>
        <h1 className="title">Movie Title: {title}</h1> 
      </div>
      
      <h1 className="heading">Cast</h1>
      <div className="cast-container">
        {newCast.map((member) => (
          <Link to={`/Actor/${member.id}`} className="links">
          <div key={member.cast_id} className="cast-card">
            <img
              src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
              alt={member.name}
              className="cast-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = defaultUser;
              }}
            />
            <div className="cast-info">
              <p className="cast-name">{member.name}</p>
              <p className="cast-character">as {member.character}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
      <h1 className="heading">Crew</h1>
      <div className="crew-container">
        {newCrew.map((member) => (
          <Link to={`/Actor/${member.id}`} className="links"> 
          <div key={member.credit_id} className="crew-card">
            <img
              src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
              alt={member.name}
              className="crew-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = defaultUser;
              }}
            />
            <div className="crew-info">
              <p className="crew-name">{member.name}</p>
              <p className="crew-job">{member.job}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cast;
