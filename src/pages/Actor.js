import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import "../App.css"
import back from "../assets/back-button (1).png"

function Actor() {
    function handleClick(){
        window.history.back();
      }
    const [data, setData] = useState([])

    const { id } = useParams()
    useEffect(() => {

    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=175605194fab5c6701435a8ad630b90b`)
        .then(res => res.json())
        .then(data => { console.log(data); setData(data) })
    }, [id]);

    return (
        <>
                <img src={back} alt="back" className="backIMG actorBack" onClick={handleClick} />

                <div className="content profile-detail">
                    <img src={`https://image.tmdb.org/t/p/w342${data.profile_path}`} alt={data.name} className="profile-picture" />
                    <div className="profile-info">
                        <h1>{data.name}</h1>
                        <p><strong className="details">Biography:</strong> {data.biography}</p>
                        <p><strong className="details">Birthday:</strong> {data.birthday}</p>
                        <p><strong className="details">Place Of Birth:</strong> {data.place_of_birth}</p>
                        <p><strong className="details">Role:</strong> {data.known_for_department}</p>
                    </div>
                </div>

        </>
    )
}

export default Actor