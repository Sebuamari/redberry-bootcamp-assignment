import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import arrow from "../images/arrow.png"
import logo from "../images/logo.png"
import camera from "../images/camera.png"
import alert from "../images/warning.png"
import dropdown from "../images/dropdown-arrow.png"
import "../styles/laptopfeatures.css"
const CPUURL = "https://pcfy.redberryinternship.ge/api/cpus";
const brandsURL = "https://pcfy.redberryinternship.ge/api/brands";

export default class LaptopFeatures extends Component {
  state = {
    CPU: [],
    brands: [],
    CPUDropDown: false,
    brandsDropDown: false,
    selectedCPUValue: "თიმი",
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
      this.fetchteams(CPUURL);
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
    const selectorClassBrand = this.state.teamsDropDown ? "selector-dropdown" : "hide";

    return (
      <div id="laptop-features-page">
        <div className='laptop-features-page'>
          <div className='nav-back'>
            <Link to="/">
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
              <div className='photo-and-name'>
                <div className='photo-upload'>
                  <img className='camera-icon' src={camera} alt="camera icon"/>
                  <img className='alert-icon hide' src={alert} alt="alert icon"/>
                  <div className='upload-options'>
                    <p className='upload-text'>ჩააგდე ან ატვირთე <br/> ლეპტოპის ფოტო</p>
                    <button className='upload-button'>ატვირთე</button>
                  </div>
                </div>
                <div className='name-and-brand'>
                  <div className='laptop-name'>
                    <label className='name-label' htmlFor="laptop-name">ლეპტოპის სახელი</label>
                    <input className="name-input" type="text" id="laptop-name" name="laptop-name" placeholder="HP"></input>
                    <span className='name-alert'>ლათინური ასოები, ციფრები, !@#$%^&*()_+= </span>
                  </div>
                  <div className='brand-selector'>
                      <div className='brand-selected-value' onClick={() => this.handleClick("brand")}>
                        <p>{this.state.selectedBrandValue}</p>
                        <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                      </div>
                      <div id="teams-values" className={selectorClassBrand}>
                        {this.showSelector(this.state.brands)}
                      </div>
                  </div>
                </div>
              </div>
              <div className='technical-details'>
                <div className='CPU-details'>
                  <div className='CPU-selector'>
                      <div className='cpu-selected-value' onClick={() => this.handleClick("brand")}>
                        <p>{this.state.selectedBrandValue}</p>
                        <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                      </div>
                      <div id="teams-values" className={selectorClassBrand}>
                        {this.showSelector(this.state.brands)}
                      </div>
                  </div>
                  <div className='CPU-core'>
                    <label className='name-label' htmlFor="CPU-core">CPU-ს ბირთვი</label>
                    <input className="cpu-input" type="text" id="CPU-core" name="CPU-core" placeholder="14"></input>
                    <span className='name-alert'>მხოლოდ ციფრები </span>
                  </div>
                  <div className='CPU-flow'>
                    <label className='name-label' htmlFor="CPU-flow">CPU-ს ნაკადი</label>
                    <input className="cpu-input" type="text" id="CPU-flow" name="CPU-flow" placeholder="365"></input>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div>
                </div>
                <div className='storage-details'>
                  <div className='laptop-ram'>
                    <label className='name-label' htmlFor="laptop-ram">ლეპტოპის RAM (GB)</label>
                    <input className="ram-input" type="text" id="laptop-ram" name="laptop-ram" placeholder="16"></input>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div>
                  <div className='storage-type'>
                    <p>მეხსიერების ტიპი</p>
                    <div className='options-container'>
                      <input type="radio" id="SSD" name="SSD storage" value="SSD"/>
                      <label for="SSD">SSD</label>
                      <input type="radio" id="HDD" name="HDD storage" value="HDD"/>
                      <label for="css">HDD</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='other-details'>
                <div className='laptop-buying'> 
                  <div className='buying-date'>
                    <label className='name-label' htmlFor="buying-date">შეძენის რიცხვი (არჩევითი)</label>
                    <input className="date-input" type="text" id="buying-date" name="buying-date" placeholder="დდ/თთ/წწწწ"></input>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div> 
                  <div className='laptop-price'>
                    <label className='name-label' htmlFor="laptop-price">ლეპტოპის ფასი</label>
                    <input className="price-input" type="number" id="laptop-price" name="laptop-price" placeholder="0000"></input>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div>
                </div>
                <div className='laptop-condition'>
                  <div className='condition-type'>
                      <p>ლეპტოპის მდგომარეობა</p>
                      <div className='options-container'>
                        <input type="radio" id="new" name="ახალი" value="ახალი"/>
                        <label for="ახალი">ახალი</label>
                        <input type="radio" id="old" name="მეორადი" value="მეორადი"/>
                        <label for="მეორადი">მეორადი</label>
                      </div>
                  </div>
                </div>
              </div>
              <div className='laptop-info-next-button-container'>
                <Link className='previous-button' to="/PersonalInfo">უკან</Link>
                <button className='next-button' type="submit">დამახსოვრება</button>
              </div>
            </div>
          </div>
          <img className='redberry-logo' src={logo} alt="redberry-logo"/>
        </div>
      </div>
    )
  }
}
