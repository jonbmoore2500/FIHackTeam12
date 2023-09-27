import React, {useState, useContext} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import './modal.css'
import ModProfileForm from './components/ModProfileForm';
import LandingPage from './components/LandingPage';
import Profile from "./components/Profile";

function App() {

    const [user, setUser] = useState(true) // temporary

  return (
    <div className="App">
      
        { user ? 
        <BrowserRouter >
        <Routes>
          <Route exact path="/" element={<Profile />} />
          <Route path="/profile" element={<ModProfileForm />} />
        </Routes>

        </BrowserRouter>
        :
        <LandingPage /> 
        }
    </div>
  );
}

export default App;
