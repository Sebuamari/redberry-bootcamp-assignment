import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import arrow from "../images/arrow.png"
import "../styles/Laptops.css"
const TOKEN ="bb6416f18af6492ceccc877a2aaed68c"
const LAPTOPSLINK = "https://pcfy.redberryinternship.ge/api/laptops?token=" + TOKEN

class Laptops extends Component {
  state = {
    Laptops: ""
  }
  //fetching functions
  fetchData = () => {
    axios.get(LAPTOPSLINK).then( response => {
      this.setState({
        Laptops: response.data.data
      })}
    ).catch( error => console.log(error))
  }
  // fetching data from API as the component mounts
  componentDidMount () {
    this.fetchData()
  }
  // show laptops
  showLaptops = () => {
    return this.state.Laptops.length !== 0 ? 
    this.state.Laptops.map( laptop => {
      return(
        <div className='laptop-container' key={laptop.laptop.id}>
          <img className='laptop-image' type="external" src={"https://pcfy.redberryinternship.ge"+ laptop.laptop.image} alt="laptop"/>
          <div className='laptop-data'>
            <h3> {laptop.user.name + " " + laptop.user.surname} <br/> {laptop.laptop.name} </h3>
            <Link onClick={() => this.redirect(laptop.laptop.id)} to="/LaptopInfo">მეტის ნახვა</Link>
          </div>
        </div>
      )
    }) : <h1>Loading...</h1>
  }
  // redirect to laptop page
  redirect = (ID) => {
    this.props.changelaptopID(ID)
  }

  render() {
    return (
      <div className='list-page'>
        <div className='list-page-header'>
          <div className='nav-back'>
            <Link to="/">
              <img id='nav-arrow' src={arrow} alt="navigation arrow"/>
            </Link>
          </div>
          <h2>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h2>
        </div>
        <div className='list-container'>
          {this.showLaptops()}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changelaptopID: ( ID ) =>
      dispatch({ type: "LAPTOPID_UPDATE", ID, ID}),
  }
}
export default connect(null,mapDispatchToProps)(Laptops)