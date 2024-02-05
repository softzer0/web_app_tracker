<template>
  <b-modal id="add-device" ref="addDevice" title="New device" @show="resetForm" hide-footer>
    <b-form @submit.stop.prevent="submitForm">
      <b-form-group label="ID:">
        <b-form-input
          v-model="$v.form.id.$model"
          :state="validateState('id')"
          debounce="1000"
          type="text"
          required
          placeholder="Enter ID"
        ></b-form-input>
        <b-form-invalid-feedback>Must have exactly {{ $v.form.id.$params.minLength.min }} characters.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Secret:">
        <b-form-input
          v-model="$v.form.secret.$model"
          :state="validateState('secret')"
          debounce="1000"
          type="text"
          required
          placeholder="Enter secret"
        ></b-form-input>
        <b-form-invalid-feedback>Must have exactly {{ $v.form.secret.$params.minLength.min }} characters.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Label (optional):">
        <b-form-input
          v-model="form.label"
          type="text"
          placeholder="Enter label"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Add</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import ValidationMixin from '@/components/mixins/ValidationMixin'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
    name: 'AddDeviceModal',
    mixins: [ValidationMixin],
    data () {
        return {
            form: {
                id: null,
                secret: null,
                label: null
            }
        }
    },
    validations: {
        form: {
            id: { required, minLength: minLength(13), maxLength: maxLength(13) },
            secret: { required, minLength: minLength(32), maxLength: maxLength(32) }
        }
    },
    methods: {
        removeDevice () {
            this.$store.dispatch('devices/remove_device', this.removeObj.id)
        },
        async submit () {
            await this.$store.dispatch('devices/add_device', this.form)
            this.$refs.addDevice.hide()
            this.resetForm()
        }
    }
}
</script>

<style scoped>

</style>