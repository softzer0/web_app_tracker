import axios from './'

const BASE_PATH = '/location/'

export default {
    fetch: () => axios('get', BASE_PATH)
}