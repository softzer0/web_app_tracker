import axios from '@/plugins/axios'

export default function (method, url, data, additional = {}) {
    return axios({ method, url, data, ...additional }).then(response => Promise.resolve(response)).catch(error => Promise.reject(error.response))
}