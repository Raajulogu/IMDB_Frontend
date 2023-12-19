import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Producer_Data.css";
import { CardMedia } from "@mui/material";
import asserts from "../assert";

//Backend URL
const api_url = asserts.backend_url;

const Producer_Data = () => {
  let { id } = useParams();
  let [producer, setProducer] = useState("");
  let [movies, setMovies] = useState("");

  useEffect(() => {
    //Fetching data
    let token = localStorage.getItem("token");
    let fetchAllData = async () => {
      try {
        const response = await axios.get(
          `${api_url}/producer/get-producer-data-by-id`,
          {
            headers: {
              id: id,
              "x-auth": token,
            },
          }
        );

        setProducer(response.data.producer_Data.producer);
        setMovies(response.data.producer_Data.movies);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, []);

  return (
    <Base>
      {producer && (
        <div className="profile-complete-data-container">
          <div className="profile-image-container">
            <CardMedia
              sx={{ height: 770, width: 500 }}
              image={producer.img ? producer.img : ""}
              title={producer.name}
            />
          </div>
          <div className="profile-data-container">
            <h1>Details</h1>
            <div className="profile-details-box">
              <p>
                <b>Name:</b> {producer.name}
              </p>
              <p>
                <b>Gender:</b> {producer.gender}
              </p>
              <p>
                <b>Age:</b> {producer.age}
              </p>
              <p>
                <b>DOB:</b>
                {producer.dob}
              </p>
              <p>
                <b>Bio:</b>
                {producer.dob}
              </p>
              <h2>Movies:</h2>
              <div className="producer-movie-data-container">
              {movies.map((val) => (
                <div className="producer-movie-data">
                    <img
                    src={val.poster} alt=""
                    className="producer-movie"
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

export default Producer_Data