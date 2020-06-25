import { post } from '@/services/api'
import ApiError from '@/services/api/ApiError'

const login = async (username, password, rememberMe = false) => {
    const body = {
        username: username,
        password: password,
        rememberMe: rememberMe
    }

    try {
        const { token } = await post('/auth/login', body)

        setToken(token)
    } catch(e) {
        throw new ApiError(401, e.message)
    }
}

const logout = () => {
    localStorage.removeItem('token')
}

const tokenExists = () => {
    if(getToken()) {
        return true
    } else {
        return false
    }
}

const getToken = () => {
    return localStorage.getItem('token')
}

const setToken = (token) => {
    localStorage.setItem('token', token)
}

export {
    login,
    logout,
    tokenExists,
    getToken,
    setToken
}