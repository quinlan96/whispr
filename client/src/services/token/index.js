const getToken = () => {
    return localStorage.getItem('token')
}

const setToken = (token) => {
    localStorage.setItem('token', token)
}

const removeToken = () => {
    localStorage.removeItem('token')
}

const tokenExists = () => {
    if(getToken()) {
        return true
    } else {
        return false
    }
}

export {
    getToken,
    setToken,
    removeToken,
    tokenExists
}