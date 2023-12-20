import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import asserts from "../assert";
import axios from "axios";
import "./Add_Actor.css";

//Backend URL
const api_url = asserts.backend_url;

const Add_Actor = () => {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [gender, setGender] = useState("");
  let [dob, setDob] = useState("");
  let [age, setAge] = useState("");
  let [bio, setBio] = useState([]);
  let [img, setImg] = useState("");
  let [error, setError] = useState("");

  if (!localStorage.getItem("token")) {
    navigate("/login", { replace: true });
  }
  let token = localStorage.getItem("token");

  //calculate age on change of DOB
  useEffect(() => {
    let Age = Date.now() - new Date(dob).getTime();
    let age_dt = new Date(Age);
    setAge(Math.abs(age_dt.getUTCFullYear() - 1970));
  }, [dob]);
  //Post a New Actor in server
  async function postNewActor() {
    if (!name || !gender || !dob || !age || !bio || !img) {
      alert("Please Fill all the field");
      return 1;
    }
    const newActor = {
      name,
      gender,
      dob,
      age,
      bio,
      img,
    };
    const response = await axios.post(`${api_url}/actor/add-actor`, newActor, {
      headers: {
        "x-auth": token,
      },
    });

    const data = response.data;
    if (!data.message === "Actor Added successfully") {
      setError(data.message);
    } else {
      navigate("/");
    }
  }
  return (
    <Base>
      <div className="input-container row">
        <div className="back-arrow" onClick={() => navigate("/")}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="input-box">
          <h1>Add Actors</h1>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Actor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Mention Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            type="text"
          />
          <br />
          <div className="dob-box">
            <label>
              <h4>DOB</h4>
            </label>
            <input
              className="dob-input"
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <br />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <TextField
            label="Image"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Image Url"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={() => postNewActor()}
          >
            Post
          </Button>
          {error ? <Typography color={"danger"}>{error}</Typography> : ""}
        </div>
      </div>
    </Base>
  );
};

export default Add_Actor;
