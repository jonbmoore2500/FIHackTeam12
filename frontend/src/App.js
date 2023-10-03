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
import ResourceByID from "./components/ResourceByID";
import Layout from "./components/Layout";
import TermsConditions from "./components/TermsConditions";

function App() {

    const {user} = useContext(UserContext) 

    let finishReg = false
    if (user) {finishReg = user.simplifiedText === null || user.simplifiedText === null || user.simplifiedText === null} // we don't need efficiency

  return (
    <div className="App">
        { user ? 
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={finishReg ? <ModProfileForm /> : <Profile />} />
              <Route path="/profileEdit" element={<ModProfileForm preLogged={true}/>} />
              <Route path="/portfolio" element={<PortfolioContainer />}/> 
              <Route path="/portfolio/:id" element={< ResourceByID/>} />
              <Route path="/docModifier" element={<DocModifierContainer />} />
            </Route>
          </Routes>
        </BrowserRouter>
        :
        <BrowserRouter >
          <Routes >
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/termsandconditions" element={<TermsConditions />} />
          </Routes>
        </BrowserRouter>
        }
    </div>
  );
}

export default App;
