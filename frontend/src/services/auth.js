import axios from './'

const BASE_PATH = '/auth/'

export default {
    register: data => axios('post', `${BASE_PATH}registration/`, data),
    confirm_email: key => axios('post', `${BASE_PATH}registration/verify-email/`, { key }),
    resend_email: email => axios('post', `${BASE_PATH}registration/resend-email/`, { email }),
    login: data => axios('post', `${BASE_PATH}login/`, data),
    forgot_password_request: email => axios('post', `${BASE_PATH}password/reset/`, { email }),
    reset_password_request: data => axios('post', `${BASE_PATH}password/reset/confirm/`, data),
    refresh_token: refresh => axios('post', `${BASE_PATH}token/refresh/`, { refresh }),
    logout: refresh => axios('post', `${BASE_PATH}logout/`, { refresh }),
    update: data => axios('patch', `${BASE_PATH}user/`, data),
    user_info: () => axios('get', `${BASE_PATH}user/`)
}