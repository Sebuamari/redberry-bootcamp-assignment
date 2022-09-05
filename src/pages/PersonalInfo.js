import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import arrow from "../images/arrow.png"
import logo from "../images/logo.png"
import dropdown from "../images/dropdown-arrow.png"
import "../styles/personalInfo.css"
const teamsURL = "https://pcfy.redberryinternship.ge/api/teams";
const positionsURL = "https://pcfy.redberryinternship.ge/api/positions";

class PersonalInfo extends Component {
  state = {
    teams: [],
    positions: [],
    teamsDropDown: false,
    brandsDropDown: false
  }
  //fetching functions
  fetchData = () => {
    const getTeams = axios.get(teamsURL)
    const getPositions = axios.get(positionsURL)
    axios.all([getTeams, getPositions]).then(
      axios.spread((...allData) => {
        const teams = allData[0].data.data
        const positions = allData[1].data.data
        this.setState({
          teams: teams,
          positions: positions
        })
      })
    ).catch(error => console.log(error))
  }
  // fetching datas from API as the component mounts
  componentDidMount () {
    this.fetchData()
  }
  // change selected value
  changeSelectedValue = (e) => {
    e.target.parentElement.id === "teams-values" ? this.changeteam(e) : this.changeposition(e)
  }
  // loading selector data
  showSelector = (array) => {
    return array.map( (data, index) => {
        return(
          <div id={data.name} className='dropdown-value' teamid={data.id} key={data.id}
          onClick={this.changeSelectedValue}>{data.name}</div>
        )
      })
  }
  // handle dropdown click
  handleClick = (target) => {
    target === "teams" ? this.setState({
      teamsDropDown: !this.state.teamsDropDown,
      brandsDropDown: false
    }) : this.setState({
      teamsDropDown: false,
      brandsDropDown: !this.state.brandsDropDown
    })
  }
  // validating first and last name
  validateNames = (nameInput, targetFunction) => {
    const regex = /^[ა-ჰ]+$/
    if(nameInput.length >= 2 && regex.test(nameInput)) {
        targetFunction(nameInput, true)
      } else {
        targetFunction(nameInput, false)
      }
  }
  // update first name
  changefirstName = (e) => {
    this.validateNames( e.target.value, this.props.changefirstName)
  }
  // update last name
  changelastName = (e) => {
    this.validateNames( e.target.value, this.props.changelastName)
  }  
  // update mail
  changemail = (e) => {
    //validate email to be ending with @redberry.ge
    const mailValidationRegex = /^[^?/+-/!@#$%^&*()][a-zA-Z0-9-_.]+@redberry.ge$/
    if( mailValidationRegex.test( e.target.value) ){
      this.props.changemail(e.target.value, true)
    } else {
      this.props.changemail(e.target.value, false)
    }
  }
  // update phone
  changephone = (e) => {
    //validate phone number to be Georgian
    const phoneValidationRegex = /^\+995[0-9]{9}$/
    if( phoneValidationRegex.test( e.target.value) ){
      this.props.changephone(e.target.value, true)
    } else {
      this.props.changephone(e.target.value, false)
    }
  }
  // update team
  changeteam = (e) => {
    this.props.changeteam(e.target.id, true)
    this.props.changeteamID(e.target.attributes["teamid"].value)
    this.setState({
      teamsDropDown: !this.state.teamsDropDown
    })
  }  
  // update position
  changeposition = (e) => {
    this.props.changeposition(e.target.id, true, e.target.attributes[2].value)
    this.setState({
      brandsDropDown: !this.state.brandsDropDown
    })
  }
  // redirect to next page
  redirect = () => {
    return this.props.firstNameValid === "true" && this.props.lastNameValid === "true" &&
    this.props.teamChosen === "true" && this.props.positionChosen === "true" && 
    this.props.mailValid === "true" && this.props.phoneValid === "true" ? "/LaptopFeatures" :
    this.props.personalInfoPageValid === "true" ? "/LaptopFeatures" : "/PersonalInfo"
  }
  // validate page
  validatePage = () => {
    //this.validateNames( e.target.value, this.props.changefirstName)
    // if all the inputs are valid and team and position are also chosen
    // user can continue to fill the form and get to the second page
    if(this.props.firstNameValid === "true" && this.props.lastNameValid === "true" &&
      this.props.teamChosen === "true" && this.props.positionChosen === "true" && 
      this.props.mailValid === "true" && this.props.phoneValid === "true"){
        this.props.changepageValidationStatus(true)
      } else {
        this.props.changepageValidationStatus(false)
      }
      //console.log(typeof(this.props.personalInfoPageValid) + this.props.personalInfoPageValid)
  }
  // get class for fields
  getclass = (check, classvalue, target) => {
    if (target === "text"){
      return check === "false" ? classvalue + " red-text" : classvalue;
    } else {
      return check === "false" ? classvalue + " red-text" : classvalue;
    }
  }

  render() {
    // defining selector dropdown class
    const selectorClassTeams = this.state.teamsDropDown ? "selector-dropdown" : "hide";
    const selectorClassBrands = this.state.brandsDropDown ? "selector-dropdown" : "hide";
    
    return (
      <div id="personal-info-page">
        <div className='personal-info-page'>
          <div className='nav-back'>
            <Link to="/">
              <img id='nav-arrow' src={arrow} alt="navigation arrow"/>
            </Link>
          </div>
          <div className='personal-info-container'>
            <div className='navigation'>
              <Link className='info-nav-link employee' to="/PersonalInfo">თანამშრომლის ინფო</Link>
              <Link className='info-nav-link employee-minimized' to="/PersonalInfo">თანამშრომლის ინფო</Link>
              <Link className='info-nav-link laptop' onClick={this.validatePage()} to={this.redirect()}>ლეპტოპის მახასიათებლები</Link>
              <div className='left-underline'/>
            </div>
            <div className='survey-container'>
              <div className='names'>
                <div className='first-name'>
                  <label className={this.getclass(this.props.firstNameValid, 'name-label', "text")} htmlFor="first-name">სახელი</label>
                  <input className={this.getclass(this.props.firstNameValid, 'name-input', "border")} type="text" id="first-name" name="first-name" placeholder="გრიშა"
                  required onChange={this.changefirstName} value={this.props.firstName}></input>
                  <span className={this.getclass(this.props.firstNameValid, 'name-alert', "text")}>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
                </div>
                <div className='last-name'>
                  <label className={this.getclass(this.props.lastNameValid, 'name-label', "text")} htmlFor="last-name">გვარი</label>
                  <input className={this.getclass(this.props.lastNameValid, 'name-input', "border")} type="text" id="last-name" name="last-name" placeholder="ბაგრატიონი"
                  onChange={this.changelastName} value={this.props.lastName}></input>
                  <span className={this.getclass(this.props.lastNameValid, 'name-alert', "text")}>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
                </div>
              </div>
              <div className='selector'>
                  <div className={this.getclass(this.props.teamChosen, 'selected-value', "border")} onClick={() => this.handleClick("teams")}>
                    <p>{this.props.team}</p>
                    <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                  </div>
                  <div id="teams-values" className={selectorClassTeams}>
                    {this.showSelector(this.state.teams)}
                  </div>
              </div>
              <div className='selector'>
                  <div className={this.getclass(this.props.positionChosen, 'selected-value', "border")} onClick={() => this.handleClick("brands")}>
                    <p>{this.props.position}</p>
                    <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                  </div>
                  <div id="positions-values" className={selectorClassBrands}>
                    {this.showSelector(this.state.positions.filter( data => data.team_id === Number(this.props.teamID)))}
                  </div>
              </div>
              <div className='mail'>
                  <label className={this.getclass(this.props.mailValid, 'mail-label', "text")} htmlFor="mail">მეილი</label>
                  <input className={this.getclass(this.props.mailValid, 'mail-input', "border")} type="mail" id="mail" name="mail" placeholder="grish666@redberry.ge"
                  onChange={this.changemail} value={this.props.mail}/>
                  <span className={this.getclass(this.props.mailValid, 'mail-alert', "text")}>უნდა მთავრდებოდეს @redberry.ge-ით</span>
              </div>
              <div className='phone-number'>
                  <label className={this.getclass(this.props.phoneValid, 'phone-number-label', "text")} htmlFor="phone-number">ტელეფონის ნომერი</label>
                  <input className={this.getclass(this.props.phoneValid, 'phone-number-input', "border")} type="text" id="phone-number" name="phone-number"
                  placeholder='+995 598 00 07 01' onChange={this.changephone} value={this.props.phone}/>
                  <span className={this.getclass(this.props.phoneValid, 'phone-number-alert', "text")}>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</span>
              </div>
              <div className='next-button-container' onClick={this.validatePage}>
                <Link className='next-button' to={this.redirect()}>შემდეგი</Link>
              </div>
            </div>
          </div>
          <img className='redberry-logo' src={logo} alt="redberry-logo"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    team: state.team,
    teamID: state.teamID,
    position: state.position,
    mail: state.mail,
    phone: state.phone,
    firstNameValid: state.firstNameValid,
    lastNameValid: state.lastNameValid,
    mailValid: state.mailValid,
    phoneValid: state.phoneValid,
    teamChosen: state.teamChosen,
    positionChosen: state.positionChosen,
    personalInfoPageValid: state.personalInfoPageValid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changefirstName: (firstName, status) =>
      dispatch({ type: "FIRSTNAME_UPDATE", firstName: firstName, status: status}),
    changelastName: (lastName, status) =>
      dispatch({ type: "LASTNAME_UPDATE", lastName: lastName, status: status}),
    changeteam: (team, status) =>
      dispatch({ type: "TEAM_UPDATE", team: team, status: status}),
    changeteamID: (teamID) =>
      dispatch({ type: "TEAMID_UPDATE", teamID: teamID}),
    changeposition: (position, status, ID) =>
      dispatch({ type: "POSITION_UPDATE", position: position, status: status, ID: ID}),
    changemail: (mail, status) =>
      dispatch({ type: "MAIL_UPDATE", mail: mail, status: status}),
    changephone: (phone, status) =>
      dispatch({ type: "PHONE_UPDATE", phone: phone, status: status}),
    changepageValidationStatus: ( status) =>
      dispatch({ type: "PERSONALINFOPAGEVALID_UPDATE", status: status})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(PersonalInfo);