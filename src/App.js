import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import SignUp from './Pages/SignUp';
import ResetPassword from './Pages/ResetPassword';
import Login from './Pages/Login';
import Dashboard from './Components/Dashboard';
import Actors from './Components/Actors';
import Producers from './Components/Producers';
import Add_Actor from './Components/Add_Actor';
import Add_Producer from './Components/Add_Producer';
import Add_Movie from './Components/Add_Movie';
import Actor_Data from './Components/Actor_Data';
import Producer_Data from './Components/Producer_Data';
import Movie_detail from './Components/Movie_detail';
import Edit_Movie from './Components/Edit_Movie';
import Help from './Components/Help';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/all-actors" element={<Actors />} />
        <Route path="/all-producers" element={<Producers />} />
        <Route path="/add-actor" element={<Add_Actor />} />
        <Route path="/add-producer" element={<Add_Producer />} />
        <Route path="/add-movie" element={<Add_Movie />} />
        <Route path="/actor-data/:id" element={<Actor_Data />} />
        <Route path="/producer-data/:id" element={<Producer_Data />} />
        <Route path="/movie-data/:id" element={<Movie_detail />} />
        <Route path="/movie-edit/:id" element={<Edit_Movie />} />
        <Route path="/help" element={<Help/>} />
      </Routes>
    </div>
  );
}

export default App;
