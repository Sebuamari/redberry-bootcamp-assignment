import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { connect } from "react-redux";
import Landing from "./pages/Landing"
import LaptopFeatures from "./pages/LaptopFeatures"
import LaptopInfo from "./pages/LaptopInfo"
import Laptops from "./pages/Laptops"
import PersonalInfo from "./pages/PersonalInfo"
import Success from "./pages/Success"

class App extends Component{
  render(){
    return (
      <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing/>}/>
            <Route exact path="/PersonalInfo" element={<PersonalInfo/>}/>
            { this.props.personalInfoPageValid === "true" ? 
              <Route exact path="/LaptopFeatures" element={<LaptopFeatures/>}/> : ""
            }
            { this.props.laptopFeaturesPageValid === "false" ? 
              <Route exact path="/Success" element={<Success/>}/> : ""
            }
            <Route exact path="/Laptops" element={<Laptops/>}/>
            <Route exact path="/LaptopInfo" element={<LaptopInfo/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    personalInfoPageValid: state.personalInfoPageValid,
    laptopFeaturesPageValid: state.laptopFeaturesPageValid
  }
}
export default connect(mapStateToProps,null)(App);