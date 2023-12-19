import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import asserts from "../assert";
import axios from "axios";
import "./Add_Movie.css";
import { useTheme } from "@emotion/react";

//Backend URL
const api_url = asserts.backend_url;

const Edit_Movie = () => {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [year, setYear] = useState("");
  let [plot, setPlot] = useState("");
  let [poster, setPoster] = useState("");
  let [actors, setActors] = useState([]);
  let [producer, setProducer] = useState("");
  let [error, setError] = useState("");
  let [personName, setPersonName] = useState([]);
  let { id } = useParams();

  if (!localStorage.getItem("token")) {
    navigate("/login", { replace: true });
  }
  let token = localStorage.getItem("token");

  //Edit Movie
  async function editMovie() {
    if (!name || !year || !plot || !poster || !actors || !producer) {
      alert("Please Fill all the field");
      return 1;
    }
    const editMovie = {
      name,
      year,
      plot,
      poster,
      actors: personName,
      producer,
      id,
    };
    const response = await axios.put(`${api_url}/movie/edit-movie`, editMovie, {
      headers: {
        "x-auth": token,
      },
    });

    const data = response.data;
    if (!data.message==="Movie Edited successfully") {
      setError(data.message);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    //Fetching data
    let fetchAllData = async () => {
      try {
        const response1 = await axios.get(`${api_url}/actor/get-all-actors`, {
          headers: {
            "x-auth": token,
          },
        });
        let temp = [];
        for (var i = 0; i < response1.data.actors.length; i++) {
          temp.push(response1.data.actors[i].name);
        }
        setActors(temp);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
      //Get Data
      try {
        const response = await axios.get(
          `${api_url}/movie/get-movie-data-by-id`,
          {
            headers: {
              "id": id,
              "x-auth": token,
            },
          }
        );
        
        setName(response.data.movie_Data.movie.name);
        setYear(response.data.movie_Data.movie.year);
        setProducer(response.data.movie_Data.movie.producer);
        setPoster(response.data.movie_Data.movie.poster);
        setPlot(response.data.movie_Data.movie.plot);
        let temp=[]
        for(var j=0;j<response.data.movie_Data.actors.length;j++){
         temp.push(response.data.movie_Data.actors[j].name)
        }
        handleChange({value:temp.join(",")})
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, []);

  //Setup for actor Input
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name, personName, theme) {
    const typography = theme?.typography || {};
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? typography.fontWeightRegular || "normal"
          : typography.fontWeightMedium || "bold",
    };
  }
  const theme = useTheme();


  const handleChange = ({value}) => {
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Base>
      <div className="input-container row">
        <div className="back-arrow" onClick={() => navigate("/")}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="input-box">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Movie Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <br />
          <div className="dob-box">
            <label>
              <h4>Year</h4>
            </label>
            <input
              className="dob-input"
              type="date"
              name="dob"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <br />
          <TextField
            label="Plot"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter the plot"
            type="text"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
          <TextField
            label="Poster"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Giver the url of the poster"
            type="text"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
          <FormControl sx={{ m: 1 }} className="actor-input">
            <InputLabel id="demo-multiple-chip-label">Actors</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={(e)=>handleChange({value:e.target.value})}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {actors.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Producer"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter the Producer Name"
            type="text"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
          />
          <Button type="submit" variant="contained" onClick={() => editMovie()}>
            Edit
          </Button>
          {error ? <Typography color={"danger"}>{error}</Typography> : ""}
        </div>
      </div>
    </Base>
  );
};

export default Edit_Movie;
