const initialState ={}

export default function transactions(state= initialState, action){
    switch(action.type){
        case "SAVE_USER_TRANSACTIONS":
            return {
                ...state,
                data: action.payload
            }
        default:
            return{
                ...state
            }
    }
}