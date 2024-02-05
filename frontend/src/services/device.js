import axios from './'

const BASE_PATH = '/device/'

export default {
    fetch: () => axios('get', BASE_PATH),
    add: ({ user, identifier, secret, label = '' }) => axios('put', `${BASE_PATH}None/`, { user, identifier, secret, label }),
    remove: id => axios('delete', `${BASE_PATH}${id}/`)
}