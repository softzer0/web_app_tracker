import Location from './location'
export default class {
    constructor (data, hasLocationObj = true) {
        this.id = data.id
        this.identifier = data.identifier
        this.label = data.label
        if (data.last_location) {
            if (hasLocationObj) {
                this.last_location = new Location(data.last_location)
            } else {
                this.last_updated = data.last_location.created
            }
        }
        this.added = data.created
    }
}