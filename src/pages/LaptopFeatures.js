import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import arrow from "../images/arrow.png"
import logo from "../images/logo.png"
import camera from "../images/camera.png"
import alert from "../images/warning.png"
import lari from "../images/lari.png"
import dropdown from "../images/dropdown-arrow.png"
import "../styles/laptopfeatures.css"
const CPUURL = "https://pcfy.redberryinternship.ge/api/cpus";
const brandsURL = "https://pcfy.redberryinternship.ge/api/brands";

class LaptopFeatures extends Component {
  state = {
    CPU: [],
    brands: [],
    CPUDropDown: false,
    brandsDropDown: false,
    image: ""
  }
  //fetching functions
  fetchData = () => {
    const getCPU = axios.get(CPUURL)
    const getBrands = axios.get(brandsURL)
    axios.all([getCPU, getBrands]).then(
      axios.spread((...allData) => {
        const CPU = allData[0].data.data
        const brands = allData[1].data.data
        this.setState({
          CPU: CPU,
          brands: brands
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
    e.target.parentElement.id === "brand-values" ? this.changebrand(e) : this.changecpu(e);
  }
  // update brand
  changebrand = (e) => {
    this.props.changelaptopBrand(e.target.id)
    this.setState({
      brandsDropDown: !this.state.brandsDropDown
    })
  }  
  // update CPU
  changecpu = (e) => {
    this.props.changeCPU(e.target.id)
    this.setState({
      CPUDropDown: !this.state.CPUDropDown
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
    target === "brand" ? this.setState({
      CPUDropDown: false,
      brandsDropDown: !this.state.brandsDropDown
    }) : this.setState({
      CPUDropDown: !this.state.CPUDropDown,
      brandsDropDown: false
    })
  }
  // update laptop name 
  changelaptopName = (e) => {
    this.props.changelaptopName(e.target.value);
  }
  // update CPU core 
  changeCPUcore = (e) => {
    console.log(e.target.value)
    this.props.changeCPUCORE(e.target.value);
  }
  // update CPU flow 
  changeCPUflow = (e) => {
    this.props.changeCPUFLOW(e.target.value);
  }
  // update RAM
  changeLaptopRAM = (e) => {
    this.props.changeRAM(e.target.value);
  }
  // update storage type
  changestorage = (e) => {
    this.props.changestorage(e.target.value);
  }
  // update date
  changedate = (e) => {
    this.props.changedate(e.target.value);
  }
  // update price
  changeprice = (e) => {
    this.props.changeprice(e.target.value);
  }
  // update condition
  changecondition = (e) => {
    this.props.changecondition(e.target.value);
  }
  // uploading image
  uploadImage = async (e) => {
     const files = e.target.files
     const data = new FormData()
     data.append("file", files[0])
     data.append("upload_preset", "redberry")

    this.props.changeloading(true)

     const res = await fetch(
       "https://api.cloudinary.com/v1_1/dq0ubdzep/image/upload",
       {
         method: 'POST',
         body: data
       }
     )
     
     const file = await res.json()

     this.props.changeloading(false)
     this.setState({
      image: file.secure_url
     })
     this.props.changeimagepreviewstatus(true)
     this.props.changeimage(file.secure_url)
  }

  render() {
    const selectorClassCPU = this.state.CPUDropDown ? "selector-dropdown" : "hide";
    const selectorClassBrand = this.state.brandsDropDown ? "selector-dropdown" : "hide";

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
                    <label className={this.props.imagePrevieShown ? 'upload-text previewed' : 'upload-text'} htmlFor='photo_upload'>ჩააგდე ან ატვირთე <br/> ლეპტოპის ფოტო</label>
                    <input type="file"  name="photo_upload"/>
                    <label className='upload-label' htmlFor="photo_upload" onChange={this.uploadImage}>ატვირთე</label>
                  </div>
                  { this.state.loading ? (
                    <h1> Loading... </h1>
                  ) : this.props.imagePrevieShown ? (
                    <img className='image-preview' src={this.state.image}/>
                  ) : ""}
                </div>
                <div className='name-and-brand'>
                  <div className='laptop-name'>
                    <label className='name-label' htmlFor="laptop-name">ლეპტოპის სახელი</label>
                    <input className="name-input" type="text" id="laptop-name" name="laptop-name" placeholder="HP"
                    onChange={this.changelaptopName} value={this.props.laptopName}></input>
                    <span className='name-alert'>ლათინური ასოები, ციფრები, !@#$%^&*()_+= </span>
                  </div>
                  <div className='brand-selector'>
                      <div className='brand-selected-value' onClick={() => this.handleClick("brand")}>
                        <p>{this.props.laptopBrand}</p>
                        <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                      </div>
                      <div id="brand-values" className={selectorClassBrand}>
                        {this.showSelector(this.state.brands)}
                      </div>
                  </div>
                </div>
              </div>
              <div className='technical-details'>
                <div className='CPU-details'>
                  <div className='CPU-selector'>
                      <div className='cpu-selected-value' onClick={() => this.handleClick("CPU")}>
                        <p>{this.props.CPU}</p>
                        <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                      </div>
                      <div id="cpu-values" className={selectorClassCPU}>
                        {this.showSelector(this.state.CPU)}
                      </div>
                  </div>
                  <div className='CPU-core'>
                    <label className='name-label' htmlFor="CPU-core">CPU-ს ბირთვი</label>
                    <input className="cpu-input" type="text" id="CPU-core" name="CPU-core" placeholder="14"
                    onChange={this.changeCPUcore} value={this.props.CPUcore}></input>
                    <span className='name-alert'>მხოლოდ ციფრები </span>
                  </div>
                  <div className='CPU-flow'>
                    <label className='name-label' htmlFor="CPU-flow">CPU-ს ნაკადი</label>
                    <input className="cpu-input" type="text" id="CPU-flow" name="CPU-flow" placeholder="365"
                    onChange={this.changeCPUflow} value={this.props.CPUflow}></input>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div>
                </div>
                <div className='storage-details'>
                  <div className='laptop-ram'>
                    <label className='name-label' htmlFor="laptop-ram">ლეპტოპის RAM (GB)</label>
                    <input className="ram-input" type="text" id="laptop-ram" name="laptop-ram" placeholder="16"
                    onChange={this.changeLaptopRAM} value={this.props.RAM}></input>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div>
                  <div className='storage-type'>
                    <p>მეხსიერების ტიპი</p>
                    <div className='options-container'>
                      <input type="radio" id="SSD" name="storage" value="SSD" checked="checked"
                      onChange={this.changestorage}/>
                      <label for="SSD">SSD</label>
                      <input type="radio" id="HDD" name="storage" value="HDD"
                      onChange={this.changestorage}/>
                      <label for="css">HDD</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='other-details'>
                <div className='laptop-buying'> 
                  <div className='buying-date'>
                    <label className='name-label' htmlFor="buying-date">შეძენის რიცხვი (არჩევითი)</label>
                    <input className="date-input" type="text" id="buying-date" name="buying-date" placeholder="დდ/თთ/წწწწ"
                    onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} onChange={this.changedate} value={this.props.date}></input>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div> 
                  <div className='laptop-price'>
                    <label className='name-label' htmlFor="laptop-price">ლეპტოპის ფასი</label>
                    <input className="price-input" type="text" id="laptop-price" name="laptop-price" placeholder="0000"
                    onChange={this.changeprice} value={this.props.price}></input>
                    <img className="lari-sign" src={lari} alt="lari sign"/>
                    <span className='name-alert'>მხოლოდ ციფრები</span>
                  </div>
                </div>
                <div className='laptop-condition'>
                  <div className='condition-type'>
                      <p>ლეპტოპის მდგომარეობა</p>
                      <div className='options-container'>
                        <input type="radio" id="new" name="condition" value="ახალი" checked="checked"
                        onChange={this.changecondition}/>
                        <label for="ახალი">ახალი</label>
                        <input type="radio" id="old" name="condition" value="მეორადი" 
                        onChange={this.changecondition}/>
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
const mapStateToProps = (state) => {
  return {
    CPU: state.CPU,
    laptopName: state.laptopName,
    laptopBrand: state.laptopBrand,
    CPUcore: state.CPUcore,
    CPUflow: state.CPUflow,
    RAM: state.RAM,
    storage: state.storage,
    date: state.date,
    price: state.price,
    condition: state.condition,
    loading: state.loading,
    imagePrevieShown: state.imagePrevieShown
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCPU: (CPU) =>
      dispatch({ type: "CPU_UPDATE", CPU: CPU}),
    changelaptopName: (laptopName) =>
      dispatch({ type: "LAPTOPNAME_UPDATE", laptopName: laptopName}),
    changelaptopBrand: (laptopBrand) =>
      dispatch({ type: "LAPTOPBRAND_UPDATE", laptopBrand: laptopBrand}),
    changeCPUCORE: (CPUcore) =>
      dispatch({ type: "CPUCORE_UPDATE", CPUcore: CPUcore}),
    changeCPUFLOW: (CPUflow) =>
      dispatch({ type: "CPUFLOW_UPDATE", CPUflow: CPUflow}),
    changeRAM: (RAM) =>
      dispatch({ type: "RAM_UPDATE", RAM: RAM}),
    changestorage: (storage) =>
      dispatch({ type: "STORAGE_UPDATE", storage: storage}),
    changedate: (date) =>
      dispatch({ type: "DATE_UPDATE", date: date}),
    changeprice: (price) =>
      dispatch({ type: "PRICE_UPDATE", price: price}),
    changecondition: (condition) =>
      dispatch({ type: "LAPTOPCONDITION_UPDATE", condition: condition}),
    changeloading: (state) =>
      dispatch({ type: "LOADING_UPDATE", state: state}),
    changeimage: (image) =>
      dispatch({ type: "IMAGE_UPDATE", image: image}),
    changeimagepreviewstatus: (status) =>
      dispatch({ type: "IMAGEPREVIEWSTATUS_UPDATE", status: status})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LaptopFeatures);