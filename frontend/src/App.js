import React, {useState, useContext} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {UserContext} from "./contexts/UserContext"
import './App.css';
import './modal.css'
import ModProfileForm from './components/ModProfileForm';
import LandingPage from './components/LandingPage';
import Profile from "./components/Profile";
import DocModifierContainer from "./components/DocModifierContainer";

function App() {

    const {user} = useContext(UserContext) // temporary

  return (
    <div className="App">
        { user ? 
        <BrowserRouter >
        <Routes>
          <Route exact path="/" element={<Profile />} />
          <Route path="/profileEdit" element={<ModProfileForm />} />
          {/* <Route path="/portfolio" element={<PortfolioContainer />}> 
            <Route> - subroutes for given doc ids
          </Route>  */}
          <Route path="/docModifier" element={<DocModifierContainer />} />

        </Routes>

        </BrowserRouter>
        :
        <LandingPage /> 
        }
    </div>
  );
}

export default App;
