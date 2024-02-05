<template>
  <b-container class="py-4">
    <b-table
      :fields="fields"
      :items="devices"
      sort-icon-left
      responsive="md"
      caption-top
      hover>
      <template #table-caption>Below are your devices which you can add or remove.</template>
      <template #cell(action)="{ item }">
        <a href="javascript:" class="text-danger" v-b-modal.remove-device @click="removeObj = item"><b-icon-x-circle-fill/></a>
      </template>
    </b-table>
    <b-button variant="success" v-b-modal.add-device>Add a new device</b-button>
    <AddDeviceModal/>
    <b-modal id="remove-device" title="Remove device" @cancel="removeObj = null" @ok="removeDevice">
      This action will remove device with the following ID / label:<br/><strong>{{ removeObj && (removeObj.label || removeObj.identifier) }}</strong>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddDeviceModal from '@/components/shared/AddDeviceModal'

export default {
    name: 'User',
    components: { AddDeviceModal },
    computed: mapGetters({ devices: 'devices/getDevices' }),
    data () {
        return {
            fields: [
                {
                    key: 'id_label',
                    label: "ID / Label",
                    sortable: true,
                    sortByFormatted: true,
                    formatter: (value, key, item) => item.label || item.identifier
                },
                {
                    key: 'last_updated',
                    label: "Last updated",
                    sortable: true,
                    formatter: (value, key, item) => this.$options.filters.formatDate(item.last_updated)
                },
                {
                    key: 'added',
                    label: "Added",
                    sortable: true,
                    formatter: (value, key, item) => this.$options.filters.formatDate(item.added)
                },
                { key: 'action', label: "Action" }
            ],
            form: {
                id: null,
                secret: null,
                label: null
            },
            removeObj: null
        }
    },
    mounted () {
        this.$store.dispatch('devices/fetch_devices', false)
    },
    methods: {
        removeDevice () {
            this.$store.dispatch('devices/remove_device', this.removeObj.id)
        }
    }
}
</script>