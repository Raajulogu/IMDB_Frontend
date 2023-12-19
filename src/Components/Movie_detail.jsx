import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Movie_detail.css";
import { CardMedia } from "@mui/material";
import asserts from "../assert";

//Backend URL
const api_url = asserts.backend_url;

const Movie_detail = () => {
  let { id } = useParams();
  let [movie, setMovie] = useState("");
  let [actors, setActors] = useState("");

  useEffect(() => {
    //Fetching data
    let token = localStorage.getItem("token");
    let fetchAllData = async () => {
      try {
        const response = await axios.get(
          `${api_url}/movie/get-movie-data-by-id`,
          {
            headers: {
              id: id,
              "x-auth": token,
            },
          }
        );

        setMovie(response.data.movie_Data.movie);
        setActors(response.data.movie_Data.actors);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
    console.log(actors)
  }, []);

  return (
    <Base>
      {movie && (
        <div className="profile-complete-data-container">
          <div className="profile-image-container">
            <CardMedia
              sx={{ height: 700, width: 500 }}
              image={movie.poster ? movie.poster : ""}
              title={movie.name}
            />
          </div>
          <div className="profile-data-container">
            <h1>Details</h1>
            <div className="profile-details-box">
              <p>
                <b>Title:</b> {movie.name}
              </p>
              <p>
                <b>Year:</b> {movie.year}
              </p>
              <p>
                <b>Plot:</b> {movie.plot}
              </p>
              <p>
                <b>Producer:</b>
                {movie.producer}
              </p>
              <h2>Actors</h2>
              <div className="movie-actors-data-container">
              {actors.map((val) => (
                <div className="movie-actors-data">
                    <img
                    src={val.img} alt=""
                    className="movie-actor"
                    />
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

export default Movie_detail;
