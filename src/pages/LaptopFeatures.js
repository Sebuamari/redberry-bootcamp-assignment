import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import arrow from "../images/arrow.png"
import logo from "../images/logo.png"
import "../styles/laptopfeatures.css"

export default class LaptopFeatures extends Component {
  render() {
    return (
      <div id="laptop-features-page">
        <div className='laptop-features-page'>
          <div className='nav-back'>
            <Link to="/Landing">
              <img id='nav-arrow' src={arrow} alt="navigation arrow"/>
            </Link>
          </div>
          <div className='laptop-features-container'>
            <div className='navigation'>
              <Link className='info-nav-link employee' to="/PersonalInfo">თანამშრომლის ინფო</Link>
              <Link className='info-nav-link laptop' to="/LaptopFeatures">ლეპტოპის მახასიათებლები</Link>
              <Link className='info-nav-link laptop-minimized' to="/PersonalInfo">ლეპტოპის მახასიათებლები</Link>
              <div className='right-underline'/>
            </div>
            <div className='survey-container'>

            </div>
          </div>
          <img className='redberry-logo' src={logo} alt="redberry-logo"/>
        </div>
      </div>
    )
  }
}
