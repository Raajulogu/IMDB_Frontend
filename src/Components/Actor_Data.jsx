import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Actor_Data.css";
import { CardMedia } from "@mui/material";
import asserts from "../assert";

//Backend URL
const api_url = asserts.backend_url;

const Actor_Data = () => {
  let { id } = useParams();
  let [actor, setActor] = useState("");
  let [movies, setMovies] = useState("");

  useEffect(() => {
    //Fetching data
    let token = localStorage.getItem("token");
    let fetchAllData = async () => {
      try {
        const response = await axios.get(
          `${api_url}/actor/get-actor-data-by-id`,
          {
            headers: {
              id: id,
              "x-auth": token,
            },
          }
        );

        setActor(response.data.actor_Data.actor);
        setMovies(response.data.actor_Data.movies);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, []);

  return (
    <Base>
      {actor && (
        <div className="profile-complete-data-container">
          <div className="profile-image-container">
            <CardMedia
              sx={{ height: 770, width: 500 }}
              image={actor.img ? actor.img : ""}
              title={actor.name}
            />
          </div>
          <div className="profile-data-container">
            <h1>Details</h1>
            <div className="profile-details-box">
              <p>
                <b>Name:</b> {actor.name}
              </p>
              <p>
                <b>Gender:</b> {actor.gender}
              </p>
              <p>
                <b>Age:</b> {actor.age}
              </p>
              <p>
                <b>DOB:</b>
                {actor.dob}
              </p>
              <p>
                <b>Bio:</b>
                {actor.dob}
              </p>
              <h2>Movies:</h2>
              <div className="actors-movie-data-container">
                {movies.map((val) => (
                  <div className="actors-movie-data">
                    <img src={val.poster} alt="" className="actors-movie" />
                    <p>{val.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

export default Actor_Data;
