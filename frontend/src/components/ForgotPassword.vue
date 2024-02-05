<template>
  <b-container class="pt-4">
    <b-alert variant="success" :show="showSuccess">An e-mail has been sent to your address if it's associated to your account</b-alert>
    <b-form @submit.stop.prevent="submitForm">
      <b-form-group label="Enter email address of your account:">
        <b-form-input
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          debounce="1000"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <p class="pt-3 text-muted">Once you submit a request, a link to reset the password will be sent to the email address associated with your account.</p>
    </b-form>
  </b-container>
</template>

<script>
import ValidationMixin from '@/components/mixins/ValidationMixin'
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'ForgotPassword',
    mixins: [ValidationMixin],
    data: () => ({
        form: {
            email: null
        },
        showSuccess: false
    }),
    validations: {
        form: {
            email: { required, email }
        }
    },
    methods: {
        async submit () {
            try {
                await this.$store.dispatch('user/submit_forgot_password', this.form.email)
                this.showSuccess = true
            } catch (e) {
                this.showSuccess = false
            }
        }
    }
}
</script>

<style scoped>

</style>