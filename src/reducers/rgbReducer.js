const rgb = (state = {red:0, green:0, blue:0}, action) => {
    switch (action.type) {
        case 'RECIEVE_RGB': 
        return {
            red: action.red,
            green:  action.green ,
            blue: action.blue,
        };
        default:
        return state;
    }
}

export default rgb;