const orientation = (state = {alpha:0, beta:0, gamma:0}, action) => {
    switch (action.type) {
        case 'RECIEVE_ORIENTATION': 
        return {
            alpha: action.alpha,
            beta:  action.beta ,
            gamma: action.gamma,
        };
        default:
        return state;
    }
}

export default orientation;