const initialState = {
    firstName: localStorage.getItem("firstName") || "",
    lastName: localStorage.getItem("lastName") || "",
    team: localStorage.getItem("team") || "თიმი",
    teamID: localStorage.getItem("teamID") || "",
    position: localStorage.getItem("position") || "პოზიცია",
    positionID: localStorage.getItem("positionID") || "",
    mail: localStorage.getItem("mail") || "",
    phone: localStorage.getItem("phone") || "",
    image: localStorage.getItem("image") || "",
    laptopName: localStorage.getItem("laptopName") || "",
    laptopBrand: localStorage.getItem("laptopBrand") || "ლეპტოპის ბრენდი",
    laptopBrandID: localStorage.getItem("laptopBrandID") || "",
    CPU: localStorage.getItem("CPU") || "CPU",
    CPUcore: localStorage.getItem("CPUcore") || "",
    CPUflow: localStorage.getItem("CPUflow") || "",
    RAM: localStorage.getItem("RAM") || "",
    storage: localStorage.getItem("storage") || "",
    date: localStorage.getItem("date") || "",
    price: localStorage.getItem("price") || "",
    laptopCondition: localStorage.getItem("laptopCondition") || "",
    imagePrevieShown: localStorage.getItem("imagePrevieShown") || false,
    base64Image: localStorage.getItem("base64Image") || "",
    image: localStorage.getItem("image") || "",
    imageName: localStorage.getItem("imageName") || "",
    imageSize: localStorage.getItem("imageSize") || "",
    firstNameValid: localStorage.getItem("firstNameValid") || false,
    lastNameValid: localStorage.getItem("lastNameValid") || false,
    mailValid: localStorage.getItem("mailValid") || false,
    phoneValid: localStorage.getItem("phoneValid") || false,
    teamChosen: localStorage.getItem("teamChosen") || false,
    positionChosen: localStorage.getItem("positionChosen") || false,
    personalInfoPageValid: localStorage.getItem("personalInfoPageValid") || false,
    laptopNameValid: localStorage.getItem("laptopNameValid") || false,
    laptopBrandChosen: localStorage.getItem("laptopBrandChosen") || false,
    CPUChosen: localStorage.getItem("CPUChosen") || false,
    CPUcoreValid: localStorage.getItem("CPUcoreValid") || false,
    CPUflowValid: localStorage.getItem("CPUflowValid") || false,
    RAMValid: localStorage.getItem("RAMValid") || false,
    priceValid: localStorage.getItem("priceValid") || false,
    storageChosen: localStorage.getItem("storageChosen") || false,
    conditionChosen: localStorage.getItem("conditionChosen") || false,
    laptopFeaturesPageValid: localStorage.getItem("laptopFeaturesPageValid") || false,
    laptopID: localStorage.getItem("laptopID") || ""
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
        localStorage.setItem("positionID", action.ID)
        localStorage.setItem("positionChosen", action.status)

        return {
            ...state,
            position: localStorage.getItem("position"),
            positionID: localStorage.getItem("positionID"),
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
        localStorage.setItem("base64Image", action.base64Image)
        localStorage.setItem("image", JSON.stringify(action.image))
        localStorage.setItem("imageName", action.imageName)
        localStorage.setItem("imageSize", action.imageSize)

        return {
            ...state,
            base64Image: localStorage.getItem("base64Image"),
            image: JSON.parse(localStorage.getItem("image")),
            imageName: localStorage.getItem("imageName"),
            imageSize: localStorage.getItem("imageSize")
        }
    }
    // update laptop name
    else if(action.type === "LAPTOPNAME_UPDATE"){
        localStorage.setItem("laptopName", action.laptopName)
        localStorage.setItem("laptopNameValid", action.status)

        return {
            ...state,
            laptopName: localStorage.getItem("laptopName"),
            laptopNameValid: localStorage.getItem("laptopNameValid")
        }
    }
    // update laptop brand
    else if(action.type === "LAPTOPBRAND_UPDATE"){
        localStorage.setItem("laptopBrand", action.laptopBrand)
        localStorage.setItem("laptopBrandChosen", action.status)
        localStorage.setItem("laptopBrandID", action.ID)

        return {
            ...state,
            laptopBrand: localStorage.getItem("laptopBrand"),
            laptopBrandID: localStorage.getItem("laptopBrandID"),
            laptopBrandChosen: localStorage.getItem("laptopBrandChosen")
        }
    }
    // update CPU
    else if(action.type === "CPU_UPDATE"){
        localStorage.setItem("CPU", action.CPU)
        localStorage.setItem("CPUChosen", action.status)

        return {
            ...state,
            CPU: localStorage.getItem("CPU"),
            CPUChosen: localStorage.getItem("CPUChosen")
        }
    }
    // update CPUcore
    else if(action.type === "CPUCORE_UPDATE"){
        localStorage.setItem("CPUcore", action.CPUcore)
        localStorage.setItem("CPUcoreValid", action.status)

        return {
            ...state,
            CPUcore: localStorage.getItem("CPUcore"),
            CPUcoreValid: localStorage.getItem("CPUcoreValid")
        }
    }
    // update CPUflow
    else if(action.type === "CPUFLOW_UPDATE"){
        localStorage.setItem("CPUflow", action.CPUflow)
        localStorage.setItem("CPUflowValid", action.status)

        return {
            ...state,
            CPUflow: localStorage.getItem("CPUflow"),
            CPUflowValid: localStorage.getItem("CPUflowValid")
        }
    }
    // update RAM 
    else if(action.type === "RAM_UPDATE"){
        localStorage.setItem("RAM", action.RAM)
        localStorage.setItem("RAMValid", action.status)

        return {
            ...state,
            RAM: localStorage.getItem("RAM"),
            RAMValid: localStorage.getItem("RAMValid")
        }
    }    
    // update storage
    else if(action.type === "STORAGE_UPDATE"){
        localStorage.setItem("storage", action.storage)
        localStorage.setItem("storageChosen", action.status)

        return {
            ...state,
            storage: localStorage.getItem("storage"),
            storageChosen: localStorage.getItem("storageChosen")
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
        localStorage.setItem("priceValid", action.status)

        return {
            ...state,
            price: localStorage.getItem("price"),
            priceValid: localStorage.getItem("priceValid")
        }
    }    
    // update laptopCondition
    else if(action.type === "LAPTOPCONDITION_UPDATE"){
        localStorage.setItem("laptopCondition", action.condition)
        localStorage.setItem("conditionChosen", action.status)

        return {
            ...state,
            laptopCondition: localStorage.getItem("laptopCondition"),
            conditionChosen: localStorage.getItem("conditionChosen")
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
    // update page validation status
    else if(action.type === "LAPTOPFEATURESPAGEVALID_UPDATE"){
        localStorage.setItem("laptopFeaturesPageValid", action.status)

        return {
            ...state,
            laptopFeaturesPageValid: localStorage.getItem("laptopFeaturesPageValid")
        }
    } 
    // clear data after submiting it
    else if(action.type === "CLEAR_DATA"){
        localStorage.clear();

        return {
            ...state
        }
    } 
    // update laptop ID
    else if(action.type === "LAPTOPID_UPDATE"){
        localStorage.setItem("laptopID", action.ID)

        return {
            ...state,
            laptopID: localStorage.getItem("laptopID")
        }
    } 

    else return state
}

export default rootReducer