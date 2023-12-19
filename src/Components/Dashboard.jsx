import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import {
    Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import asserts from "../assert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//Backend URL
const api_url = asserts.backend_url;

const Dashboard = () => {
  let navigate = useNavigate();
  let [search, setSearch] = useState("");
  const [movies, setMovies] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }

    //Fetching data
    let fetchAllData = async () => {
      try {
        const response = await axios.get(`${api_url}/movie/get-all-movies`, {
          headers: {
            "x-auth": token,
          },
        });
        setMovies(response.data.movies);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
    console.log(movies)
  }, []);

  return (
    <Base>
      { movies && (
        <div className="home-container">
          <div className="search-container">
            <TextField
              label="Search"
              sx={{ m: 5, width: "75ch" }}
              placeholder="search profile"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {search.length > 0 ? (
            <div className="searched-content">
              {movies.map((val, index) => (
                <div className="searched-data">
                  {val.name.toLowerCase().includes(search.toLowerCase()) && (
                    <Movies key={index} data={val}/>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="non-search content">
              <div className="movie-heads">
                <h1>Movies</h1>
              </div>
              <div className="movie-container">
                {movies.length ? (
                  movies.map((val, index) => (
                    <Movies key={index} data={val} />
                  ))
                ) : (
                  <div>
                    {movies.length <= 0 ? (
                      <p>
                        No data found.
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Base>
  );
};

const Movies = ({ data, user }) => {
  let [snackmsg, setSnackmsg] = useState("");
  let navigate = useNavigate();

  //Handle Delete Request
  async function handleDelete(id ) {
    let token= localStorage.getItem("token")
    console.log(token)
    try {
      const response = await axios.delete(
        `${api_url}/movie/delete-movie`,
        {
          headers: {
            "x-auth": token,
            "id":id
          },
        }
      );
      setSnackmsg(`${data.name} Deleted Successfully`);
      handleClick();
    } catch (error) {
      console.error("Error Deleting Movie:", error);
    }
  }
  //Snackbar Setup
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }} className="movie-cards">
      <CardMedia
        sx={{ height: 300, width: 300 }}
        image={data.poster ? data.poster :""}
        title={data.name}
        onClick={() => navigate(`/movie-data/${data._id}`)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Year:{data.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Plot:{data.plot}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Producer:{data.producer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Actor:{data.actors.join(" ")}
        </Typography>
      </CardContent>
      <CardActions className="card-btns">
      <Button
          color="primary"
          variant="contained"
          onClick={() => navigate(`/movie-edit/${data._id}`)}
        >
            Edit
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => handleDelete(data._id )}
        >
            Delete
        </Button>
      </CardActions>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackmsg}
          </Alert>
        </Snackbar>
      </Stack>
    </Card>
  );
};

export default Dashboard;