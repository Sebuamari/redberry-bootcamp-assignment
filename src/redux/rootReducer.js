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
}

const rootReducer = (state = initialState, action) => {
    // update first name
    if(action.type === "FIRSTNAME_UPDATE"){
        localStorage.setItem("firstName", action.firstName)

        return {
            ...state,
            firstName: localStorage.getItem("firstName")
        }
    }
    // update last name 
    else if(action.type === "LASTNAME_UPDATE"){
        localStorage.setItem("lastName", action.lastName)

        return {
            ...state,
            lastName: localStorage.getItem("lastName")
        }
    }
    // update team
    else if(action.type === "TEAM_UPDATE"){
        localStorage.setItem("team", action.team)

        return {
            ...state,
            team: localStorage.getItem("team")
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

        return {
            ...state,
            position: localStorage.getItem("position")
        }
    }
    // update mail
    else if(action.type === "MAIL_UPDATE"){
        localStorage.setItem("mail", action.mail)

        return {
            ...state,
            mail: localStorage.getItem("mail")
        }
    }
    // update phone
    else if(action.type === "PHONE_UPDATE"){
        localStorage.setItem("phone", action.phone)

        return {
            ...state,
            phone: localStorage.getItem("phone")
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

    else return state
}

export default rootReducer