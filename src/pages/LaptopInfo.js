import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import arrow from "../images/arrow.png"
import "../styles/LaptopInfo.css"
const TOKEN ="ace653226f10e65c09ed40859f32f58b"

class LaptopInfo extends Component {
  state = {
    Laptop: ""
  }

  //fetching functions
  fetchData = () => {
    const LAPTOPLINK = "https://pcfy.redberryinternship.ge/api/laptop/" + this.props.laptopID + "?token=" + TOKEN
    axios.get(LAPTOPLINK).then( response => {
      this.setState({
        Laptop: response.data.data
      })}
    ).catch( error => console.log(error))
  }
  // fetching data from API as the component mounts
  componentDidMount () {
    this.fetchData()
  }
  // show laptops
  showLaptopData = () => {
    let laptop = this.state.Laptop
    console.log(laptop)
    return this.state.Laptop.length !== 0 ? (
        <div className='laptop-container'>
          <div className='general-data'>
            <img className='laptop-image' src={"https://pcfy.redberryinternship.ge"+ laptop.laptop.image} alt="laptop"/>
            <div className='data-container'>
              <div className='data-types'>
                <p>სახელი:</p>
                <p>თიმი:</p>
                <p>პოზიცია:</p>
                <p>მეილი:</p>
                <p>ტელ. ნომერი:</p>
              </div>
              <div className='data'>
                <p>{laptop.user.name }  {laptop.user.surname}</p>
                <p>{laptop.user.team_id}</p>
                <p>{laptop.user.position_id}</p>
                <p>{laptop.user.email}</p>
                <p>{laptop.user.phone_number}</p>
              </div>
            </div>
          </div>
          <div className='technical-data'>
            <div className='general-features'>
              <div className='data-types'>
                <p>ლეპტოპის სახელი:</p>
                <p>ლეპტოპის ბრენდი:</p>
                <p>RAM:</p>
                <p>მეხსიერების ტიპი:</p>
              </div>
              <div className='data'>
                <p>{laptop.laptop.name}</p>
                <p>{laptop.laptop.brand_id}</p>
                <p>{laptop.laptop.ram}</p>
                <p>{laptop.laptop.hard_drive_type}</p>
              </div>
            </div>
            <div className='cpu-details'>
              <div className='data-types'>
                <p>CPU:</p>
                <p>CPU-ს ბირთვი:</p>
                <p>CPU-ს ნაკადი:</p>
              </div>
              <div className='data'>
                <p>{laptop.laptop.cpu.name}</p>
                <p>{laptop.laptop.cpu.cores}</p>
                <p>{laptop.laptop.cpu.threads}</p>
              </div>
            </div>
          </div>
          <div className='other-data'>
            <div className='condition-and-price'>
              <div className='data-types'>
                <p>ლეპტოპის მდგომარეობა</p>
                <p>ლეპტოპის ფასი:</p>
              </div>
              <div className='data'>
                <p>{laptop.laptop.state}</p>
                <p>{laptop.laptop.price}</p>
              </div>
            </div>
            <div className='purchase-date'>
                <p className='data-type'>შეძენის რიცხვი:</p>
                <p className='data'>{laptop.laptop.purchase_date}</p>
            </div>
          </div>
        </div>
      ) : <h1>Loading...</h1>
  }

  render() {
    return (
      <div className='laptop-details-page'>
        <div className='laptop-details-page-header'>
          <div className='nav-back'>
            <Link to="/Laptops">
              <img id='nav-arrow' src={arrow} alt="navigation arrow"/>
            </Link>
          </div>
          <h2>ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</h2>
        </div>
        {this.showLaptopData()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    laptopID: state.laptopID
  }
}

export default connect(mapStateToProps,null)(LaptopInfo);
