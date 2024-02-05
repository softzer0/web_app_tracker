import axios from 'axios'

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? `http://${location.hostname}:50000/` : `https://${location.hostname}/api/`,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    withCredentials: true
})

export const ACCESS_TOKEN_LIFETIME = 5 * 60 * 1000
