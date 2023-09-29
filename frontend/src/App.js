import React, {useContext} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {UserContext} from "./contexts/UserContext"
import './App.css';
import './modal.css'
import ModProfileForm from './components/ModProfileForm';
import LandingPage from './components/LandingPage';
import Profile from "./components/Profile";
import DocModifierContainer from "./components/DocModifierContainer";
import PortfolioContainer from "./components/PortfolioContainer";

import Layout from "./components/Layout";

function App() {

    const {user} = useContext(UserContext) // temporary

    let finishReg = false
    if (user) {finishReg = user.simplifiedText === null || user.simplifiedText === null || user.simplifiedText === null}

  return (
    <div className="App">
        { user ? 
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={finishReg ? <ModProfileForm /> : <Profile />} />
              <Route path="/profileEdit" element={<ModProfileForm preLogged={true}/>} />
              <Route path="/portfolio" element={<PortfolioContainer />}> 
                {/* <Route> - subroutes for given doc ids. coming later. will just fetch a given resource and display in preexisting components */}
              </Route> 
              <Route path="/docModifier" element={<DocModifierContainer />} />
            </Route>
          </Routes>
        </BrowserRouter>
        :
        <LandingPage />
        }
    </div>
  );
}

export default App;
