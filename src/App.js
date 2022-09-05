import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import LaptopFeatures from "./pages/LaptopFeatures"
import LaptopInfo from "./pages/LaptopInfo"
import Laptops from "./pages/Laptops"
import PersonalInfo from "./pages/PersonalInfo"
import Success from "./pages/Success"

export default class App extends Component{
  render(){
    return (
      <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing/>}/>
            <Route exact path="/PersonalInfo" element={<PersonalInfo/>}/>
            <Route exact path="/LaptopFeatures" element={<LaptopFeatures/>}/>
            <Route exact path="/Success" element={<Success/>}/>
            <Route exact path="/Laptops" element={<Laptops/>}/>
            <Route exact path="/LaptopInfo" element={<LaptopInfo/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}