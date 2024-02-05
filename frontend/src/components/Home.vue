<template>
  <b-container id="home" class="py-3" fluid>
    <b-row id="row" class="h-100">
      <b-col cols="6" md="9" xl="10" class="h-100">
        <l-map
          ref="map"
          :minZoom="minZoom"
          :maxZoom="maxZoom"
          :options="{ zoomSnap }"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; &lt;a href=&quot;http://osm.org/copyright&quot;&gt;OpenStreetMap&lt;/a&gt; contributors"
            :options="{ minZoom, maxZoom }"
          />
          <div v-for="device in devices" :key="device.id">
            <l-marker v-if="device.last_location" :lat-lng="device.last_location.coordinates" @click="pointToDevice(device)">
              <l-tooltip>
                {{ device.label || device.identifier }}
              </l-tooltip>
            </l-marker>
          </div>
        </l-map>
      </b-col>
      <b-col id="devices_parent" cols="6" md="3" xl="2" class="pr-0 h-100" order-sm="0" order-md="first">
        <b-jumbotron id="devices" class="d-flex flex-wrap m-0 p-0 flex-column align-items-stretch">
          <template #lead>
            Devices
          </template>
          <b-col class="pb-3 flex-grow-1 flex-shrink-0 overflow-auto">
            <b-list-group>
              <b-list-group-item button v-for="device in devices" :key="device.id" :disabled="!device.last_location" @click="pointToDevice(device)">
                {{ device.label || device.identifier }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-jumbotron>
        <AddDeviceModal/>
      </b-col>
      <div id="add" class="position-fixed">
        <b-tooltip target="add" title="Add a new device" placement="left" container="#add"/>
        <a href="javascript:" class="text-success" v-b-modal.add-device>
          <b-icon-plus-circle-fill/>
        </a>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { LMap, LMarker, LTileLayer, LTooltip } from 'vue2-leaflet'
import { mapGetters } from 'vuex'
import AddDeviceModal from '@/components/shared/AddDeviceModal'

export default {
    name: 'Home',
    components: {
        AddDeviceModal,
        LMap,
        LTileLayer,
        LMarker,
        LTooltip
    },
    computed: mapGetters({
        devices: 'devices/getDevices'
    }),
    data () {
        return {
            minZoom: 3,
            maxZoom: 19,
            zoomSnap: 0.5,
            timeoutRef: null
        }
    },
    mounted () {
        let first = false
        const refresh = async () => {
            await this.$store.dispatch('devices/fetch_devices')
            if (!first) {
                const originalMaxZoom = this.maxZoom
                const originalMinZoom = this.minZoom
                this.maxZoom = 15.5
                this.minZoom = null
                this.$refs.map.mapObject.fitBounds(this.devices.map(device => device.last_location ? [device.last_location.coordinates.lat, device.last_location.coordinates.lng] : false ))
                this.$nextTick(() => { this.maxZoom = originalMaxZoom })
                this.$nextTick(() => { this.minZoom = originalMinZoom })
                first = true
            }
            this.timeoutRef = window.setTimeout(refresh, 3000)
        }
        this.$nextTick(refresh)
    },
    beforeDestroy () {
        window.clearTimeout(this.timeoutRef)
    },
    methods: {
        pointToDevice (device) {
            this.$refs.map.mapObject.fitBounds([[device.last_location.coordinates.lat, device.last_location.coordinates.lng]])
        }
    }
}
</script>

<style lang="scss">
#home {
    @media (max-width: 767px) {
        #row {
            min-height: 579px;
            flex-direction: column;

            > div {
                max-width: none;
            }
        }

        #devices_parent {
            padding-top: 15px;
            padding-right: 15px !important;
        }

        #add {
            left: initial !important;
            right: 25px;
        }
    }

    #devices {
        min-height: 100%;

        > .lead {
            flex: 0 1 0;
            max-width: 100%;
            padding: 15px 15px 10px;
            margin-bottom: 0;
        }

        .list-group {
            word-break: break-word;
        }
    }

    #add {
        z-index: 9999;
        bottom: 25px;
        left: 25px;

        > a > svg {
            width: 48px;
            height: 48px;
        }

        > .tooltip > .tooltip-inner {
            white-space: pre;
        }
    }
}
</style>