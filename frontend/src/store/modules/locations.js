import service from '@/services/location'
import Location from '@/models/location'

export default {
    namespaced: true,
    state: {
        locations: []
    },
    mutations: {
        SET_LOCATIONS: (state, data) => {
            state.locations = data.map(item => new Location(item))
        }
    },
    getters: {
        getLocations: state => state.locations
    },
    actions: {
        async fetch_locations ({ commit }) {
            commit('SET_LOCATIONS', (await service.fetch()).data)
        }
    }
}