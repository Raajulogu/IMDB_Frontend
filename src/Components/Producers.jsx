import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import {
  Card,
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
import "./Producers.css";
import asserts from "../assert";

//Backend URL
const api_url = asserts.backend_url;

const Producers = () => {
  let navigate = useNavigate();
  let [search, setSearch] = useState("");
  const [producers, setProducers] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }

    //Fetching data
    let fetchAllData = async () => {
      try {
        const response = await axios.get(
          `${api_url}/producer/get-all-producer`,
          {
            headers: {
              "x-auth": token,
            },
          }
        );
        setProducers(response.data.producer);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, []);

  return (
    <Base>
      {producers && (
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
              {producers.map((val, index) => (
                <div className="searched-data">
                  {val.name.toLowerCase().includes(search.toLowerCase()) && (
                    <ProducerCard key={index} data={val} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="non-search content">
              <div className="producer-heads">
                <h1>Producerss</h1>
              </div>
              <div className="producer-container">
                {producers.length ? (
                  producers.map((val, index) => (
                    <ProducerCard key={index} data={val} />
                  ))
                ) : (
                  <div>
                    {producers.length <= 0 ? <p>No data found.</p> : <p></p>}
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

const ProducerCard = ({ data }) => {
  let navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }} className="producer-cards">
      <CardMedia
        sx={{ height: 300, width: 300 }}
        image={data.img ? data.img : ""}
        title={data.name}
        onClick={() => navigate(`/producer-data/${data._id}`)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender:{data.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          DOB:{data.dob}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {data.age}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Producers;
