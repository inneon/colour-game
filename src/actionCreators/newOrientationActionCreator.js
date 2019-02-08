const newOrientation = (alpha, beta, gamma) => {
    return {
        type: 'RECIEVE_ORIENTATION',
        alpha,
        beta,
        gamma
    }
}

export default newOrientation;