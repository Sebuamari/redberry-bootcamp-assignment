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
    )
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
          <div id={data.name} className='dropdown-value' teamid={data.id} key={index}
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
  // update first name
  changefirstName = (e) => {
    this.props.changefirstName(e.target.value)
  }
  // update last name
  changelastName = (e) => {
    this.props.changelastName(e.target.value)
  }  
  // update mail
  changemail = (e) => {
    this.props.changemail(e.target.value)
  }
  // update phone
  changephone = (e) => {
    this.props.changephone(e.target.value)
  }
  // update team
  changeteam = (e) => {
    this.props.changeteam(e.target.id)
    this.props.changeteamID(e.target.attributes[2].value)
    this.setState({
      teamsDropDown: !this.state.teamsDropDown
    })
  }  
  // update position
  changeposition = (e) => {
    this.props.changeposition(e.target.id)
    this.setState({
      brandsDropDown: !this.state.brandsDropDown
    })
  }
  // validating data to be able to continue filling the form
  validateData = () => {
    // validate name
    //this.props.firstName
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
              <Link className='info-nav-link laptop' to="/LaptopFeatures">ლეპტოპის მახასიათებლები</Link>
              <div className='left-underline'/>
            </div>
            <div className='survey-container'>
              <div className='names'>
                <div className='first-name'>
                  <label className='name-label' htmlFor="first-name">სახელი</label>
                  <input className={ this.props.firstNameValid ? "name-input" : "name-input error"} type="text" id="first-name" name="first-name" placeholder="გრიშა"
                  required onChange={this.changefirstName} value={this.props.firstName}></input>
                  <span className='name-alert'>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
                </div>
                <div className='last-name'>
                  <label className='name-label' htmlFor="last-name">გვარი</label>
                  <input className="name-input" type="text" id="last-name" name="last-name" placeholder="ბაგრატიონი"
                  onChange={this.changelastName} value={this.props.lastName}></input>
                  <span className='name-alert'>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
                </div>
              </div>
              <div className='selector'>
                  <div className='selected-value' onClick={() => this.handleClick("teams")}>
                    <p>{this.props.team}</p>
                    <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                  </div>
                  <div id="teams-values" className={selectorClassTeams}>
                    {this.showSelector(this.state.teams)}
                  </div>
              </div>
              <div className='selector'>
                  <div className='selected-value' onClick={() => this.handleClick("brands")}>
                    <p>{this.props.position}</p>
                    <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                  </div>
                  <div id="brands-values" className={selectorClassBrands}>
                    {this.showSelector(this.state.positions.filter( data => data.team_id == this.props.teamID))}
                  </div>
              </div>
              <div className='mail'>
                  <label className='mail-label' htmlFor="mail">მეილი</label>
                  <input className="mail-input" type="mail" id="mail" name="mail" placeholder="grish666@redberry.ge"
                  onChange={this.changemail} value={this.props.mail}/>
                  <span className='mail-alert'>უნდა მთავრდებოდეს @redberry.ge-ით</span>
              </div>
              <div className='phone-number'>
                  <label className='phone-number-label' htmlFor="phone-number">ტელეფონის ნომერი</label>
                  <input className="phone-number-input" type="number" id="phone-number" name="phone-number"
                  placeholder='+995 598 00 07 01' onChange={this.changephone} value={this.props.phone}/>
                  <span className='phone-number-alert'>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</span>
              </div>
              <div className='next-button-container' onClick={this.validateData}>
                <Link className='next-button' to="/LaptopFeatures">შემდეგი</Link>
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
    firstNameValid: state.firstNameValid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changefirstName: (firstName) =>
      dispatch({ type: "FIRSTNAME_UPDATE", firstName: firstName}),
    changelastName: (lastName) =>
      dispatch({ type: "LASTNAME_UPDATE", lastName: lastName}),
    changeteam: (team) =>
      dispatch({ type: "TEAM_UPDATE", team: team}),
    changeteamID: (teamID) =>
      dispatch({ type: "TEAMID_UPDATE", teamID: teamID}),
    changeposition: (position) =>
      dispatch({ type: "POSITION_UPDATE", position: position}),
    changemail: (mail) =>
      dispatch({ type: "MAIL_UPDATE", mail: mail}),
    changephone: (phone) =>
      dispatch({ type: "PHONE_UPDATE", phone: phone})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(PersonalInfo);