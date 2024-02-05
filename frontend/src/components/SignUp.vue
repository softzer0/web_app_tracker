<template>
  <b-container class="pt-4">
    <b-alert variant="success" :show="errors === null">An confirmation email has been sent to your email address</b-alert>
    <div v-if="errors !== null"><b-alert variant="danger" v-for="(error, i) in errors" :key="i" show>{{ error }}</b-alert></div>
    <b-form @submit.prevent.stop="submitForm">
      <b-form-group label="Email address:">
        <b-form-input
          v-model="$v.form.email.$model"
          :disabled="errors === null"
          :state="validateState('email')"
          debounce="1000"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <password-field
        v-model="$v.form.password.$model"
        :disabled="errors === null"
        :state="validateState('password')"/>
      <password-field
        v-model="$v.form.confirmPassword.$model"
        :disabled="errors === null"
        :state="validateState('confirmPassword')"
        label="Confirm password"/>
      <!--b-form-group label="First name:">
        <b-form-input
          v-model="$v.form.firstName.$model"
          :disabled="errors === null"
          :state="validateState('firstName')"
          debounce="1000"
          type="text"
          required
          placeholder="Enter first name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Last name:">
        <b-form-input
          v-model="$v.form.lastName.$model"
          :disabled="errors === null"
          :state="validateState('lastName')"
          debounce="1000"
          type="text"
          required
          placeholder="Enter last name"
        ></b-form-input>
      </b-form-group-->
      <b-button :disabled="errors === null" type="submit" variant="primary">Sign up</b-button>
    </b-form>
  </b-container>
</template>

<script>
import PasswordField from '@/components/shared/PasswordField'
import ValidationMixin from '@/components/mixins/ValidationMixin'
import { email, required, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'SignUp',
    mixins: [ValidationMixin],
    components: {
        PasswordField
    },
    data: () => ({
        form: {
            email: null,
            password: null,
            confirmPassword: null,
            /*firstName: null,
            lastName: null*/
        },
        errors: []
    }),
    validations: {
        form: {
            email: { required, email },
            password: { required, sameAs: sameAs('confirmPassword') },
            confirmPassword: { required, sameAs: sameAs('password') },
            /*firstName: { required },
            lastName: { required }*/
        }
    },
    methods: {
        async submit () {
            try {
                await this.$store.dispatch('user/register', {
                    email: this.form.email,
                    password1: this.form.password,
                    password2: this.form.confirmPassword,
                    /*first_name: this.form.firstName,
                    last_name: this.form.lastName*/
                })
                this.errors = null
            } catch (resp) {
                this.errors = Object.values(resp.data).reduce((r, a) => r.concat(a))
            }
        }
    }
}
</script>