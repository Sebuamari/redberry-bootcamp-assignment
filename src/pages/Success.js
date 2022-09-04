import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import success from "../images/congrats.png"
import "../styles/success.css"

export default class Success extends Component {
  render() {
    return (
      <div className='success-page'>
        <div className='success-container'>
          <div className="image-and-message">
            <img className='success-image' src={success} alt="sucess vector"/>
            <p className='success-message'>ჩანაწერი დამატებულია!</p>
          </div>
          <div className='success-links'>
            <Link className='list-button' to="/Laptops">სიაში გადაყვანა</Link>
            <Link className='main-button' to="/">მთავარი</Link>
          </div>
        </div>
      </div>
    )
  }
}
