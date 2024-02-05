import service from '@/services/device'
import Device from '@/models/device'
import store from '@/store'

export default {
    namespaced: true,
    state: {
        devices: [],
        hasLocationObj: true
    },
    mutations: {
        INIT_DEVICES: (state, params) => {
            state.hasLocationObj = params.hasLocationObj
            state.devices = params.data.map(item => new Device(item, state.hasLocationObj))
        },
        ADD_DEVICE: (state, data) => {
            state.devices.push(new Device(data, state.hasLocationObj))
        },
        REMOVE_DEVICE: (state, id) => {
            state.devices.splice(state.devices.findIndex(device => device.id === id), 1)
        }
    },
    getters: {
        getDevices: state => state.devices
    },
    actions: {
        async fetch_devices ({ commit }, hasLocationObj = true) {
            commit('INIT_DEVICES', { data: (await service.fetch()).data, hasLocationObj })
        },
        async add_device ({ commit }, data) {
            try {
                commit('ADD_DEVICE', (await service.add({ user: store.getters['user/getUserData'].id, identifier: data.id, secret: data.secret, label: data.label })).data)
            } catch (error) {
                console.error(error)
            }
        },
        async remove_device ({ commit }, id) {
            await service.remove(id)
            commit('REMOVE_DEVICE', id)
        }
    }
}