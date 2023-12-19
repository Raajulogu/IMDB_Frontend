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
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import asserts from "../assert";
import axios from "axios";
import "./Add_Movie.css";
import { useTheme } from "@emotion/react";

//Backend URL
const api_url = asserts.backend_url;

const Add_Movie = () => {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [year, setYear] = useState("");
  let [plot, setPlot] = useState("");
  let [poster, setPoster] = useState("");
  let [actors, setActors] = useState([]);
  let [producer, setProducer] = useState("");
  let [error, setError] = useState("");

  if (!localStorage.getItem("token")) {
    navigate("/login", { replace: true });
  }
  let token = localStorage.getItem("token");

  useEffect(() => {
    //Fetching data
    let fetchAllData = async () => {
      try {
        const response = await axios.get(`${api_url}/actor/get-all-actors`, {
          headers: {
            "x-auth": token,
          },
        });
        let temp = [];
        for (var i = 0; i < response.data.actors.length; i++) {
          temp.push(response.data.actors[i].name);
        }
        setActors(temp);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, []);

  //Post a New Movie in server
  async function postNewMovie() {
    if (!name || !year || !plot || !poster || !actors || !producer) {
      alert("Please Fill all the field");
      return 1;
    }
    const newMovie = {
      name,
      year,
      plot,
      poster,
      actors: personName,
      producer,
    };
    const response = await axios.post(`${api_url}/movie/add-movie`, newMovie, {
      headers: {
        "x-auth": token,
      },
    });

    const data = response.data;
    if (!data.message === "Movie Added successfully") {
      setError(data.message);
    } else {
      navigate("/");
    }
  }

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
  const [personName, setPersonName] = useState([]);

  const handleChange = (value) => {
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

// Function for Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
//Actor Modal
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [actName, setActName] = useState("");
  let [actGender, setActGender] = useState("");
  let [actDob, setActDob] = useState("");
  let [actAge, setActAge] = useState("");
  let [actBio, setActBio] = useState("");
  let [actImg, setActImg] = useState("");
  //Post a New Actor in server
  async function postNewActor() {
    let Age = Date.now() - new Date(actDob).getTime();
    let age_dt = new Date(Age);
    setActAge(Math.abs(age_dt.getUTCFullYear() - 1970));
    if (!actName || !actGender || !actDob || !actAge || !actBio || !actImg) {
      alert("Please Fill all the field");
      return 1;
    }
    const newActor = {
      name:actName,
      gender:actGender,
      dob:actDob,
      age:actAge,
      bio:actBio,
      img:actImg,
    };
    const response = await axios.post(`${api_url}/actor/add-actor`, newActor, {
      headers: {
        "x-auth": token,
      },
    });

    const data = response.data;
    if (!data.data) {
      setError(data.message);
    } else {
      navigate("/");
    }
  }

  //Producer Modal
  const [show, setShow] = React.useState(false);
  const handleOpenShow = () => setShow(true);
  const handleCloseShow = () => setShow(false);
  let [prodName, setProdName] = useState("");
  let [prodGender, setProdGender] = useState("");
  let [prodDob, setProdDob] = useState("");
  let [prodAge, setProdAge] = useState("");
  let [prodBio, setProdBio] = useState("");
  let [prodImg, setProdImg] = useState("");

  //Post a New Producer in server
  async function postNewProducer() {
    let Age = Date.now() - new Date(actDob).getTime();
    let age_dt = new Date(Age);
    setActAge(Math.abs(age_dt.getUTCFullYear() - 1970));
    if (!prodName || !prodGender || !prodDob || !prodAge || !prodBio || !prodImg) {
      alert("Please Fill all the field");
      return 1;
    }
    const newProducer = {
      name:prodName,
      gender:prodGender,
      dob:prodDob,
      age:prodAge,
      bio:prodBio,
      img:prodImg,
    };
    const response = await axios.post(`${api_url}/producer/add-producer`, newProducer, {
      headers: {
        "x-auth": token,
      },
    });

    const data = response.data;
    if (!data.data) {
      setError(data.message);
    } else {
      navigate("/");
    }
  }
  return (
    <Base>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="input-box">
          <h1>Add Actors</h1>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Actor Name"
            value={actName}
            onChange={(e) => setActName(e.target.value)}
            type="text"
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Mention Gender"
            value={actGender}
            onChange={(e) => setActGender(e.target.value)}
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
              value={actDob}
              onChange={(e) => setActDob(e.target.value)}
            />
          </div>
          <br />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Actors Name"
            type="text"
            value={actBio}
            onChange={(e) => setActBio(e.target.value)}
          />
          <TextField
            label="Image"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Image Url"
            type="text"
            value={actImg}
            onChange={(e) => setActImg(e.target.value)}
          />
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => postNewActor()}
          >
            Add
          </Button>
          {error ? <Typography color={"danger"}>{error}</Typography> : ""}
        </div>
        </Box>
      </Modal>

      <Modal
        open={show}
        onClose={handleCloseShow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="input-box">
          <h1>Add Producer</h1>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Actor Name"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            type="text"
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Mention Gender"
            value={prodGender}
            onChange={(e) => setProdGender(e.target.value)}
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
              value={prodDob}
              onChange={(e) => setProdDob(e.target.value)}
            />
          </div>
          <br />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Actors Name"
            type="text"
            value={prodBio}
            onChange={(e) => setProdBio(e.target.value)}
          />
          <TextField
            label="Image"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Image Url"
            type="text"
            value={prodImg}
            onChange={(e) => setProdImg(e.target.value)}
          />
          <Button
            onClick={handleCloseShow}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => postNewActor()}
          >
            Add
          </Button>
          {error ? <Typography color={"danger"}>{error}</Typography> : ""}
        </div>
        </Box>
      </Modal>
      <div className="input-container row">
        <div className="back-arrow" onClick={() => navigate("/")}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="movie-input-box">
          <h1>Add Movie</h1>
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
          <div className="add-new-actor">
          <FormControl sx={{ m: 1 }} className="actor-input">
            <InputLabel id="demo-multiple-chip-label">Actors</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={(e) => handleChange(e.target.value)}
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
          <Button
            type="submit"
            variant="contained"
            onClick={handleOpen}
            className="add-new-actor-button"
          >
            Add Actor
          </Button>
          </div>
          <div className="add-new-producer">
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
          <Button
            type="submit"
            variant="contained"
            onClick={handleOpenShow}
            className="add-new-producer-button"
          >
            Add Producer
          </Button>
          </div>
          <br/>
          <Button
            type="submit"
            variant="contained"
            onClick={() => postNewMovie()}
          >
            Post
          </Button>
          {error ? <Typography color={"crimson"}>{error}</Typography> : ""}
        </div>
      </div>
    </Base>
  );
};

export default Add_Movie;
