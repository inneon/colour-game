const hsl = (state = {hue:0, saturation:0, lightness:0}, action) => {
    switch (action.type) {
        case 'RECIEVE_HSL': 
        return {
            hue: action.hue,
            saturation:  action.saturation ,
            lightness: action.lightness,
        };
        default:
        return state;
    }
}

export default hsl;