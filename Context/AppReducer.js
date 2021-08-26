export default (state, action) => {
    switch(action.type){
        case "CHANGE_THEME":
            return (
                {
                    ...state,
                    theme:state.payload
                }
            )
        default:
            return state;
    }
}