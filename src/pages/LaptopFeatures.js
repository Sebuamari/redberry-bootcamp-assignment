import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import arrow from "../images/arrow.png"
import logo from "../images/logo.png"
import camera from "../images/camera.png"
import alert from "../images/warning.png"
import lari from "../images/lari.png"
import uploaded from "../images/uploaded.png"
import dropdown from "../images/dropdown-arrow.png"
import "../styles/laptopfeatures.css"
const CPUURL = "https://pcfy.redberryinternship.ge/api/cpus"
const brandsURL = "https://pcfy.redberryinternship.ge/api/brands"
const POSTURL = "https://pcfy.redberryinternship.ge/api/laptop/create"
const TOKEN = "bb6416f18af6492ceccc877a2aaed68c"

class LaptopFeatures extends Component {
  state = {
    CPU: [],
    brands: [],
    CPUDropDown: false,
    brandsDropDown: false,
    photo: ""
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
  // submit form data
  submitData = () => {
    const data = new FormData()
    data.append("name", this.props.firstName)
    data.append("surname", this.props.lastName)
    data.append("team_id", Number(this.props.teamID))
    data.append("position_id", Number(this.props.positionID))
    data.append("email", this.props.mail)
    data.append("phone_number", this.props.phone)
    data.append("laptop_name", this.props.laptopName)
    data.append("laptop_image", this.state.photo)
    data.append("laptop_brand_id", this.props.laptopBrandID)
    data.append("laptop_cpu", this.props.CPU)
    data.append("laptop_cpu_cores", Number(this.props.CPUcore))
    data.append("laptop_cpu_threads", Number(this.props.CPUflow))
    data.append("laptop_ram", Number(this.props.RAM))
    data.append("laptop_hard_drive_type", this.props.storage)
    data.append("laptop_state", this.props.laptopCondition)
    data.append("laptop_purchase_date", this.props.date)
    data.append("laptop_price", Number(this.props.price))
    data.append("token", TOKEN)

    // const data = {
    //     name : this.props.firstName,
    //     surname : this.props.lastName,
    //     team_id : Number(this.props.teamID),
    //     position_id : Number(this.props.positionID),
    //     email : this.props.mail,
    //     phone_number : this.props.phone,
    //     laptop_name: this.props.laptopName,
    //     laptop_image: pic["laptop_image"],
    //     laptop_brand_id: this.props.laptopBrandID,
    //     laptop_cpu: this.props.CPU,
    //     laptop_cpu_cores: Number(this.props.CPUcore),
    //     laptop_cpu_threads: Number(this.props.CPUflow),
    //     laptop_ram: Number(this.props.RAM),
    //     laptop_hard_drive_type: this.props.storage,
    //     laptop_state: this.props.laptopCondition,
    //     laptop_purchase_date: this.props.date,
    //     laptop_price: Number(this.props.price),
    //     token : TOKEN
    // }
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     accept: 'application/json',
    //     "Content-Type": 'multipart/form-data'
    //   },
    //   body: data
    // }
    
    axios.post(POSTURL, data).then(res => console.log(res.data)).catch(err => console.log(err.response))
    this.props.clear()
    //return this.navigate()
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
    this.props.changelaptopBrand(e.target.id, true, e.target.attributes["brandid"].value)
    this.setState({
      brandsDropDown: !this.state.brandsDropDown
    })
  }  
  // update CPU
  changecpu = (e) => {
    this.props.changeCPU(e.target.id, true)
    this.setState({
      CPUDropDown: !this.state.CPUDropDown
    })
  }
  // loading selector data
  showSelector = (array) => {
    return array.map( data => {
        return(
          <div id={data.name} className='dropdown-value' key={data.id} brandid={data.id}
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
    // validate laptop name 
    const nameValidationRegex = /^[a-zA-Z0-9!@#$%^&*()_+=]+$/
    this.validateInput( e.target.value, nameValidationRegex, this.props.changelaptopName)
  }
  // update CPU core 
  changeCPUcore = (e) => {
    const CPUcoreRegex = /^[0-9]+$/
    this.validateInput( e.target.value, CPUcoreRegex, this.props.changeCPUCORE)
  }
  // update CPU flow 
  changeCPUflow = (e) => {
    const CPUflowRegex = /^[0-9]+$/
    this.validateInput( e.target.value, CPUflowRegex, this.props.changeCPUFLOW)
  }
  // update RAM
  changeLaptopRAM = (e) => {
    const RAMRegex = /^[0-9]+$/
    this.validateInput( e.target.value, RAMRegex, this.props.changeRAM)
  }
  // update storage type
  changestorage = (e) => {
    this.props.changestorage(e.target.value, true);
  }
  // update date
  changedate = (e) => {
    this.props.changedate(e.target.value);
  }
  // update price
  changeprice = (e) => {
    const PriceRegex = /^[0-9]+$/
    this.validateInput( e.target.value, PriceRegex, this.props.changeprice)
  }
  // update condition
  changecondition = (e) => {
    this.props.changecondition(e.target.value, true);
  }
  // // convert image to base 64
  // convertToBase64 = (file) => {
  //   return new Promise( (resolve, reject) => {
  //     const fileReader = new FileReader();

  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = ( () => {
  //       resolve(fileReader.result)
  //     })

  //     fileReader.onerror = ( (error) => {
  //       reject(error)
  //     })
  //   })
  // }
  // uploading image
  uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    const photo = new FormData()
    data.append("file", files[0])
    photo.append("image", files[0])
    data.append("upload_preset", "redberry")

    const res = await fetch(
       "https://api.cloudinary.com/v1_1/dq0ubdzep/image/upload",
       {
         method: 'POST',
         body: data
       }
    )

    this.setState({
      photo: files[0]
    })

    const file = await res.json()
    this.props.changeimage(file.secure_url, file.original_filename+"."+file.format, Math.round(file.bytes/1000) + "Kb")
    this.props.changeimagepreviewstatus(true)
  }
  // validation function
  validateInput = (input, regex, targetFunction) => {
    if( regex.test( input ) ){
      targetFunction(input, true);
    } else {
      targetFunction(input, false);
    }
  }
  // validate page
  validatePage = () => {
    // if all the inputs are valid and storage type and laptop conditions are 
    // also chosen user can confirm the data
    if(this.props.laptopNameValid === "true" && this.props.imagePrevieShown === "true" &&
      this.props.laptopBrandChosen === "true" && this.props.CPUChosen === "true" && 
      this.props.CPUflowValid === "true" && this.props.CPUcoreValid === "true" &&
      this.props.RAMValid === "true" && this.props.storageChosen === "true" &&
      this.props.conditionChosen === "true" && this.props.priceValid === "true"){
        this.props.changepageValidationStatus(true)
        this.submitData()
        this.props.clear()
        this.redirect(this.props.laptopFeaturesPageValid)
      } else {
        this.props.changepageValidationStatus(false)
      }
  }
  // get class for fields
  getclass = (check, classvalue, target) => {
    if (target === "text"){
      return check === "true" ? classvalue : classvalue + " red-text"
    } else if (target === "border"){
      return check === "true" ? classvalue : classvalue + " red-border"
    } else {
      return check === "true" ? classvalue : classvalue + " red-background"
    }
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
                <div className={ this.getclass( this.props.imagePrevieShown,'photo-upload', "background" )}>
                  <img className='camera-icon' src={camera} alt="camera icon"/>
                  <img className={ !this.props.imagePrevieShown ? 'alert-icon' : 'hide'} src={alert} alt="alert icon"/>
                  <div className='upload-options'>
                    <label className={ this.getclass( this.props.imagePrevieShown,'upload-text', "text" )} htmlFor='photo_upload'>ჩააგდე ან ატვირთე <br/> ლეპტოპის ფოტო</label>
                    <input type="file" className='upload-photo-input'  name="photo_upload" onChange={this.uploadImage}/>
                    <label className='upload-label' htmlFor="photo_upload">ატვირთე</label>
                  </div>
                  { this.props.imagePrevieShown ? ( <img className='image-preview' src={this.props.image.replaceAll('"', ' ')} alt="preview"/> ) : ""}
                </div>
                <div className={this.props.imagePrevieShown ? "uploaded-picture-settings" : "hide"}>
                    <div className='photo-details'>
                      <img src={uploaded} alt="uploaded icon"/>
                      <div className='photo-data'>
                        <p>{this.props.imageName}</p>
                        <p>{this.props.imageSize}</p>
                      </div>
                    </div>
                    <div className='upload-again'>
                      <input type="file" className="upload-again-photo-input" name="photo_upload_again" onChange={this.uploadImage}/>
                      <label className='upload-again-label' htmlFor="photo_upload_again">თავიდან ატვირთე </label>
                    </div>
                </div>
                <div className='name-and-brand'>
                  <div className='laptop-name'>
                    <label className={ this.getclass( this.props.laptopNameValid,'name-label', "text" )} htmlFor="laptop-name">ლეპტოპის სახელი</label>
                    <input className={ this.getclass( this.props.laptopNameValid,'name-input', "border" )} type="text" id="laptop-name" name="laptop-name" placeholder="HP"
                    onChange={this.changelaptopName} value={this.props.laptopName}></input>
                    <span className={ this.getclass( this.props.laptopNameValid,'name-alert', "text" )}>ლათინური ასოები, ციფრები, !@#$%^&*()_+= </span>
                  </div>
                  <div className='brand-selector'>
                      <div className={ this.getclass( this.props.laptopBrandChosen,'brand-selected-value', "border" )} onClick={() => this.handleClick("brand")}>
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
                      <div className={ this.getclass( this.props.CPUChosen,'cpu-selected-value', "border" )} onClick={() => this.handleClick("CPU")}>
                        <p>{this.props.CPU}</p>
                        <img className='dropdown-vector' src={dropdown} alt="dropdown arrow"/>
                      </div>
                      <div id="cpu-values" className={selectorClassCPU}>
                        {this.showSelector(this.state.CPU)}
                      </div>
                  </div>
                  <div className='CPU-core'>
                    <label className={ this.getclass( this.props.CPUcoreValid,'name-label', "text" )} htmlFor="CPU-core">CPU-ს ბირთვი</label>
                    <input className={ this.getclass( this.props.CPUcoreValid,'cpu-input', "border" )} type="text" id="CPU-core" name="CPU-core" placeholder="14"
                    onChange={this.changeCPUcore} value={this.props.CPUcore}></input>
                    <span className={ this.getclass( this.props.CPUcoreValid,'name-alert', "text" )}>მხოლოდ ციფრები </span>
                  </div>
                  <div className='CPU-flow'>
                    <label className={ this.getclass( this.props.CPUflowValid,'name-label', "text" )} htmlFor="CPU-flow">CPU-ს ნაკადი</label>
                    <input className={ this.getclass( this.props.CPUflowValid,'cpu-input', "border" )} type="text" id="CPU-flow" name="CPU-flow" placeholder="365"
                    onChange={this.changeCPUflow} value={this.props.CPUflow}></input>
                    <span className={ this.getclass( this.props.CPUflowValid,'name-alert', "text" )}>მხოლოდ ციფრები</span>
                  </div>
                </div>
                <div className='storage-details'>
                  <div className='laptop-ram'>
                    <label className={ this.getclass( this.props.RAMValid,'name-label', "text" )} htmlFor="laptop-ram">ლეპტოპის RAM (GB)</label>
                    <input className={ this.getclass( this.props.RAMValid,'ram-input', "border" )} type="text" id="laptop-ram" name="laptop-ram" placeholder="16"
                    onChange={this.changeLaptopRAM} value={this.props.RAM}></input>
                    <span className={ this.getclass( this.props.RAMValid,'name-alert', "text" )}>მხოლოდ ციფრები</span>
                  </div>
                  <div className='storage-type'>
                    <div className="label-and-icon">
                      <p className={ this.getclass( this.props.storageChosen,'name-label', "text" )}>მეხსიერების ტიპი</p>
                      <img className={ !this.props.storageChosen ? "warning" : "hide"} src={alert} alt="alert icon"/>
                    </div>
                    <div className='options-container'>
                      <input type="radio" id="SSD" name="storage" value="SSD" checked={this.props.storage === "SSD" ? "checked" : ""}
                      onChange={this.changestorage}/>
                      <label for="SSD">SSD</label>
                      <input type="radio" id="HDD" name="storage" value="HDD" checked={this.props.storage === "HDD" ? "checked" : ""}
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
                    <label className={ this.getclass( this.props.priceValid,'name-label', "text" )} htmlFor="laptop-price">ლეპტოპის ფასი</label>
                    <div className="input-container">
                      <input className={ this.getclass( this.props.priceValid,'price-input', "border" )} type="text" id="laptop-price" name="laptop-price" placeholder="0000"
                      onChange={this.changeprice} value={this.props.price}></input>
                      <img className="lari-sign" src={lari} alt="lari sign"/>
                    </div>
                    <span className={ this.getclass( this.props.priceValid,'name-alert', "text" )}>მხოლოდ ციფრები</span>
                  </div>
                </div>
                <div className='laptop-condition'>
                  <div className='condition-type'>
                      <div className="label-and-icon">
                        <p className={ this.getclass( this.props.conditionChosen,'name-label', "text" )}>ლეპტოპის მდგომარეობა</p>
                        <img className={ !this.props.conditionChosen ? "warning" : "hide"} src={alert} alt="alert icon"/>
                      </div>
                      <div className='options-container'>
                        <input type="radio" id="new" name="condition" value="new" checked={this.props.laptopCondition === "new" ? "checked" : ""}
                        onChange={this.changecondition}/>
                        <label for="ახალი">ახალი</label>
                        <input type="radio" id="old" name="condition" value="used" checked={this.props.laptopCondition === "used" ? "checked" : ""}
                        onChange={this.changecondition}/>
                        <label for="მეორადი">მეორადი</label>
                      </div>
                  </div>
                </div>
              </div>
              <div className='laptop-info-next-button-container'>
                <Link className='previous-button' to="/PersonalInfo">უკან</Link>
                <button className='next-button' type="submit" onClick={this.validatePage}><Link to="/Success">დამახსოვრება</Link></button>
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
    positionID: state.positionID,
    mail: state.mail,
    phone: state.phone,
    CPU: state.CPU,
    laptopName: state.laptopName,
    laptopBrand: state.laptopBrand,
    laptopBrandID: state.laptopBrandID,
    CPUcore: state.CPUcore,
    CPUflow: state.CPUflow,
    RAM: state.RAM,
    storage: state.storage,
    date: state.date,
    price: state.price,
    laptopCondition: state.laptopCondition,
    base64Image: state.base64Image,
    image: state.image,
    imageName: state.imageName,
    imageSize: state.imageSize,
    imagePrevieShown: state.imagePrevieShown,
    laptopBrandChosen: state.laptopBrandChosen,
    CPUChosen: state.CPUChosen,
    laptopNameValid: state.laptopNameValid,
    CPUcoreValid: state.CPUcoreValid,
    CPUflowValid: state.CPUflowValid,
    RAMValid: state.RAMValid,
    priceValid: state.priceValid,
    storageChosen: state.storageChosen,
    conditionChosen: state.conditionChosen,
    laptopFeaturesPageValid: state.laptopFeaturesPageValid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCPU: (CPU, status) =>
      dispatch({ type: "CPU_UPDATE", CPU: CPU, status: status}),
    changelaptopName: (laptopName, status) =>
      dispatch({ type: "LAPTOPNAME_UPDATE", laptopName: laptopName, status: status}),
    changelaptopBrand: (laptopBrand, status, ID) =>
      dispatch({ type: "LAPTOPBRAND_UPDATE", laptopBrand: laptopBrand, status: status, ID: ID}),
    changeCPUCORE: (CPUcore, status) =>
      dispatch({ type: "CPUCORE_UPDATE", CPUcore: CPUcore, status: status}),
    changeCPUFLOW: (CPUflow, status) =>
      dispatch({ type: "CPUFLOW_UPDATE", CPUflow: CPUflow, status: status}),
    changeRAM: (RAM, status) =>
      dispatch({ type: "RAM_UPDATE", RAM: RAM, status: status}),
    changestorage: (storage, status) =>
      dispatch({ type: "STORAGE_UPDATE", storage: storage, status: status}),
    changedate: (date) =>
      dispatch({ type: "DATE_UPDATE", date: date}),
    changeprice: (price, status) =>
      dispatch({ type: "PRICE_UPDATE", price: price, status: status}),
    changecondition: (condition, status) =>
      dispatch({ type: "LAPTOPCONDITION_UPDATE", condition: condition, status: status}),
    changeimage: (image, imageName, imageSize) =>
      dispatch({ type: "IMAGE_UPDATE", image: image, imageName: imageName, imageSize:imageSize}),
    changeimagepreviewstatus: (status) =>
      dispatch({ type: "IMAGEPREVIEWSTATUS_UPDATE", status: status}),
    changepageValidationStatus: (status) =>
      dispatch({ type: "LAPTOPFEATURESPAGEVALID_UPDATE", status: status}),
    clear: () =>
      dispatch({ type: "CLEAR_DATA"})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LaptopFeatures);