import { latLng } from 'leaflet'
export default class {
    constructor (data) {
        this.id = data.id
        if (data.device) {
            this.label = data.device.label || data.device.identifier
        }
        const coordinates = data.coordinates.match(/POINT \((-?(?:[0-9]+\.)?[0-9]+) (-?(?:[0-9]+\.)?[0-9]+)\)/)
        this.coordinates = latLng(coordinates[1], coordinates[2])
    }
}