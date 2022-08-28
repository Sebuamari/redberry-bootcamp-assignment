const initialState = {
    
}

const rootReducer = (state = initialState, action) => {
    // update chosen category 
    if(action.type === "CATEGORY_UPDATE"){
        localStorage.removeItem("attributes")
        localStorage.setItem("category", action.category)

        return {
            ...state,
            attributes: {},
            category: localStorage.getItem("category")
        }
    }

    else return state
}

export default rootReducer