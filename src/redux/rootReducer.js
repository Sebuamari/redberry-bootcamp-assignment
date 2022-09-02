const initialState = {
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    team: localStorage.getItem("team") || "თიმი",
    teamID: localStorage.getItem("teamID") || "sss",
    position: localStorage.getItem("position") || "პოზიცია",
    mail: localStorage.getItem("mail") || "",
    phone: localStorage.getItem("phone") || "",
    image: localStorage.getItem("image") || "",
    laptopName: localStorage.getItem("laptopName") || "",
    laptopBrand: localStorage.getItem("laptopBrand") || "ლეპტოპის ბრენდი",
    CPU: localStorage.getItem("CPU") || "CPU",
    CPUcore: localStorage.getItem("CPUcore") || "",
    CPUflow: localStorage.getItem("CPUflow") || "",
    RAM: localStorage.getItem("RAM") || "",
    storage: localStorage.getItem("storage") || "",
    date: localStorage.getItem("date") || "",
    price: localStorage.getItem("price") || "",
    laptopCondition: localStorage.getItem("laptopCondition") || "",
    loading: false,
    imagePrevieShown: false,
    img: "",
    imageName: "",
    imageSize: "",
    firstNameValid: localStorage.getItem("firstNameValid") || false,
    lastNameValid: localStorage.getItem("lastNameValid") || false,
    mailValid: localStorage.getItem("mailValid") || false,
    phoneValid: localStorage.getItem("phoneValid") || false,
    teamChosen: localStorage.getItem("teamChosen") || false,
    positionChosen: localStorage.getItem("positionChosen") || false,
    personalInfoPageValid: localStorage.getItem("personalInfoPageValid") || false
}

const rootReducer = (state = initialState, action) => {
    // update first name
    if(action.type === "FIRSTNAME_UPDATE"){
        localStorage.setItem("firstName", action.firstName)
        localStorage.setItem("firstNameValid", action.status)

        return {
            ...state,
            firstName: localStorage.getItem("firstName"),
            firstNameValid: localStorage.getItem("firstNameValid")
        }
    }
    // update last name 
    else if(action.type === "LASTNAME_UPDATE"){
        localStorage.setItem("lastName", action.lastName)
        localStorage.setItem("lastNameValid", action.status)

        return {
            ...state,
            lastName: localStorage.getItem("lastName"),
            lastNameValid: localStorage.getItem("lastNameValid")
        }
    }
    // update team
    else if(action.type === "TEAM_UPDATE"){
        localStorage.setItem("team", action.team)
        localStorage.setItem("teamChosen", action.status)

        return {
            ...state,
            team: localStorage.getItem("team"),
            teamChosen: localStorage.getItem("teamChosen")
        }
    }
    // update team ID
    else if(action.type === "TEAMID_UPDATE"){
        localStorage.setItem("teamID", action.teamID)

        return {
            ...state,
            teamID: localStorage.getItem("teamID")
        }
    }
    // update position
    else if(action.type === "POSITION_UPDATE"){
        localStorage.setItem("position", action.position)
        localStorage.setItem("positionChosen", action.status)

        return {
            ...state,
            position: localStorage.getItem("position"),
            positionChosen: localStorage.getItem("positionChosen")
        }
    }
    // update mail
    else if(action.type === "MAIL_UPDATE"){
        localStorage.setItem("mail", action.mail)
        localStorage.setItem("mailValid", action.status)

        return {
            ...state,
            mail: localStorage.getItem("mail"),
            mailValid: localStorage.getItem("mailValid", action.status)
        }
    }
    // update phone
    else if(action.type === "PHONE_UPDATE"){
        localStorage.setItem("phone", action.phone)
        localStorage.setItem("phoneValid", action.status)

        return {
            ...state,
            phone: localStorage.getItem("phone"),
            phoneValid: localStorage.getItem("phoneValid", action.status)

        }
    }
    // update image
    else if(action.type === "IMAGE_UPDATE"){
        localStorage.setItem("image", action.image)

        return {
            ...state,
            image: localStorage.getItem("image")
        }
    }
    // update laptop name
    else if(action.type === "LAPTOPNAME_UPDATE"){
        localStorage.setItem("laptopName", action.laptopName)

        return {
            ...state,
            laptopName: localStorage.getItem("laptopName")
        }
    }
    // update laptop brand
    else if(action.type === "LAPTOPBRAND_UPDATE"){
        localStorage.setItem("laptopBrand", action.laptopBrand)

        return {
            ...state,
            laptopBrand: localStorage.getItem("laptopBrand")
        }
    }
    // update CPU
    else if(action.type === "CPU_UPDATE"){
        localStorage.setItem("CPU", action.CPU)

        return {
            ...state,
            CPU: localStorage.getItem("CPU")
        }
    }
    // update CPUcore
    else if(action.type === "CPUCORE_UPDATE"){
        localStorage.setItem("CPUcore", action.CPUcore)

        return {
            ...state,
            CPUcore: localStorage.getItem("CPUcore")
        }
    }
    // update CPUflow
    else if(action.type === "CPUFLOW_UPDATE"){
        localStorage.setItem("CPUflow", action.CPUflow)

        return {
            ...state,
            CPUflow: localStorage.getItem("CPUflow")
        }
    }
    // update RAM 
    else if(action.type === "RAM_UPDATE"){
        localStorage.setItem("RAM", action.RAM)

        return {
            ...state,
            RAM: localStorage.getItem("RAM")
        }
    }    
    // update storage
    else if(action.type === "STORAGE_UPDATE"){
        localStorage.setItem("storage", action.storage)

        return {
            ...state,
            storage: localStorage.getItem("storage")
        }
    }    
    // update date
    else if(action.type === "DATE_UPDATE"){
        localStorage.setItem("date", action.date)

        return {
            ...state,
            date: localStorage.getItem("date")
        }
    }    
    // update price
    else if(action.type === "PRICE_UPDATE"){
        localStorage.setItem("price", action.price)

        return {
            ...state,
            price: localStorage.getItem("price")
        }
    }    
    // update laptopCondition
    else if(action.type === "LAPTOPCONDITION_UPDATE"){
        localStorage.setItem("laptopCondition", action.condition)

        return {
            ...state,
            laptopCondition: localStorage.getItem("laptopCondition")
        }
    } 
    // update loading state
    else if(action.type === "LOADING_UPDATE"){
        localStorage.setItem("loading", action.state)

        return {
            ...state,
            loading: localStorage.getItem("loading")
        }
    }
    // update image preview status
    else if(action.type === "IMAGEPREVIEWSTATUS_UPDATE"){
        localStorage.setItem("imagePrevieShown", action.status)

        return {
            ...state,
            imagePrevieShown: localStorage.getItem("imagePrevieShown")
        }
    } 
    // update page validation status
    else if(action.type === "PERSONALINFOPAGEVALID_UPDATE"){
        localStorage.setItem("personalInfoPageValid", action.status)

        return {
            ...state,
            personalInfoPageValid: localStorage.getItem("personalInfoPageValid")
        }
    } 
    // clear data after submiting it
    else if(action.type === "CLEAR_DATA"){
        localStorage.clear();

        return {
            ...state
        }
    } 

    else return state
}

export default rootReducer