import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import redberryLogo from "../images/redberry-logo.png"
import man from "../images/man.png"
import "../styles/landing.css"
import "../styles/fonts.css"

export default class Landing extends Component {
  render() {
    return (
      <div id="landing-container-page">
        <div className='landing-container'>
          <img className='reberry-logo-text' src={redberryLogo} alt="redberry logo text"/>
          <img className='landing-page-visual' src={man} alt="landing page visual"/>
          <div className='landing-links'>
            <Link to="/PersonalInfo" className='landing-link'>ჩანაწერის დამატება</Link>
            <Link to="/Laptops" className='landing-link'>ჩანაწერების სია</Link>
          </div>
        </div>
      </div>
    )
  }
}
