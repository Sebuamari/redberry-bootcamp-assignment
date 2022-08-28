import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import arrow from "../images/arrow.png"
import logo from "../images/logo.png"
import dropdown from "../images/dropdown-arrow.png"
import "../styles/personalInfo.css"
const teamsURL = "https://pcfy.redberryinternship.ge/api/teams";
const brandsURL = "https://pcfy.redberryinternship.ge/api/brands";

export default class PersonalInfo extends Component {
  state = {
    teams: [],
    brands: [],
    teamsDropDown: false,
    brandsDropDown: false,
    selectedTeamsValue: "თიმი",
    selectedBrandValue: "პოზიცია"
  }
  //fetching functions
  fetchteams = (url) => {
    fetch(url)
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  teams: [...json.data]
              });
          })
  }
  fetchbrands = (url) => {
    fetch(url)
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  brands: [...json.data]
              });
          })
  }
  //fetching datas from API as the component mounts
  componentDidMount() {
      this.fetchteams(teamsURL);
      this.fetchbrands(brandsURL);
  }
  // change selected value
  changeSelectedValue = (e) => {
    e.target.parentElement.id === "teams-values" ? this.setState({
      selectedTeamsValue: e.target.id,
      teamsDropDown: !this.state.teamsDropDown
    }) : this.setState({
      selectedBrandValue: e.target.id,
      brandsDropDown: !this.state.brandsDropDown
    })
  }
  // loading selector data
  showSelector = (array) => {
    return array.map( (data, index) => {
        return(
          <div id={data.name} className='dropdown-value' key={index}
          onClick={this.changeSelectedValue}>{data.name}</div>
        )
      })
  }
  // handle dropdown click
  handleClick = (target) => {
    target === "teams" ? this.setState({
      teamsDropDown: !this.state.teamsDropDown
    }) : this.setState({
      brandsDropDown: !this.state.brandsDropDown
    })
  }

  render() {
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
                  <input className="name-input" type="text" id="first-name" name="first-name" placeholder="გრიშა"></input>
                  <span className='name-alert'>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
                </div>
                <div className='last-name'>
                  <label className='name-label' htmlFor="last-name">გვარი</label>
                  <input className="name-input" type="text" id="last-name" name="last-name" placeholder="ბაგრატიონი"></input>
                  <span className='name-alert'>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
                </div>
              </div>
              <div className='selector'>
                  <div className='selected-value' onClick={() => this.handleClick("teams")}>
                    <p>{this.state.selectedTeamsValue}</p>
                    <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                  </div>
                  <div id="teams-values" className={selectorClassTeams}>
                    {this.showSelector(this.state.teams)}
                  </div>
              </div>
              <div className='selector'>
                  <div className='selected-value' onClick={() => this.handleClick("brands")}>
                    <p>{this.state.selectedBrandValue}</p>
                    <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                  </div>
                  <div id="brands-values" className={selectorClassBrands}>
                    {this.showSelector(this.state.brands)}
                  </div>
              </div>
              <div className='mail'>
                  <label className='mail-label' htmlFor="mail">მეილი</label>
                  <input className="mail-input" type="mail" id="mail" name="mail" placeholder="ბაგრატიონი"/>
                  <span className='mail-alert'>უნდა მთავრდებოდეს @redberry.ge-ით</span>
              </div>
              <div className='phone-number'>
                  <label className='phone-number-label' htmlFor="phone-number">ტელეფონის ნომერი</label>
                  <input className="phone-number-input" type="number" id="phone-number" name="phone-number"/>
                  <span className='phone-number-alert'>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</span>
              </div>
              <div className='next-button-container'>
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
