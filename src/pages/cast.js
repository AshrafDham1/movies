import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css"; // Import CSS file for styling
import defaultUser from "../assets/user-avatar.png"

function Cast() {
  const { id, title } = useParams();

  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=175605194fab5c6701435a8ad630b90b&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast);
        setCrew(data.crew);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);
  const newCrew = crew.slice(0, 12);
  const newCast = cast.slice(0, 12);

  return (
    <div>
      {/* <h1>Cast for Movie ID: {id}</h1> */}
      <h1 className="title">Movie Title: {title}</h1> 
      <h1 className="heading">Cast</h1>
      <div className="cast-container">
        {newCast.map((member) => (
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
        ))}
      </div>
      <h1 className="heading">Crew</h1>
      <div className="crew-container">
        {newCrew.map((member) => (
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
        ))}
      </div>
    </div>
  );
}

export default Cast;
