<template>
  <b-container class="pt-4">
    <b-alert variant="danger" :show="showError">Invalid credentials</b-alert>
    <b-alert variant="success" :show="emailResent">Activation e-mail has been successfully sent</b-alert>
    <b-alert variant="danger" :show="emailResent === false">There was an error while sending activation e-mail, please try again</b-alert>
    <b-alert variant="warning" :show="showError === false && !emailResent">
      Your account isn't yet activated.
      <a href="javascript:" @click="resendEmail()">Resend activation e-mail</a>
    </b-alert>
    <b-form @submit.stop.prevent="submitForm">
      <b-form-group label="Email address:">
        <b-form-input
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          debounce="1000"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <password-field
        v-model="$v.form.password.$model"
        :state="validateState('password')"/>
      <b-button type="submit" variant="primary">Login</b-button>
      <router-link :to="{ name: 'ForgotPassword' }" class="pl-4">Forgot password?</router-link>
    </b-form>
  </b-container>
</template>

<script>
import PasswordField from '@/components/shared/PasswordField'
import ValidationMixin from '@/components/mixins/ValidationMixin'
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    mixins: [ValidationMixin],
    components: { PasswordField },
    data: () => ({
        form: {
            email: null,
            password: null
        },
        showError: null,
        emailResent: null
    }),
    validations: {
        form: {
            email: { required, email },
            password: { required }
        }
    },
    methods: {
        async submit () {
            this.emailResent = null
            try {
                await this.$store.dispatch('user/login', { email: this.form.email, password: this.form.password })
                this.$router.push({ name: 'Home' })
            } catch (error) {
                this.showError = !error.data.non_field_errors || error.data.non_field_errors[0] !== "E-mail is not verified."
            }
        },
        async resendEmail () {
            try {
                await this.$store.dispatch('user/resend_email', this.form.email)
                this.emailResent = true
            } catch (e) {
                this.emailResent = false
            }
        }
    }
}
</script>

<style scoped>

</style>