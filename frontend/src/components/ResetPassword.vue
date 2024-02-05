<template>
  <b-container class="pt-4">
    <b-alert variant="success" :show="errors === null">Your password has been successfully reset</b-alert>
    <div v-if="errors !== null"><b-alert variant="danger" v-for="(error, i) in errors" :key="i" show>{{ error }}</b-alert></div>
    <b-form @submit.stop.prevent="submitForm">
      <password-field
        v-model="$v.form.password.$model"
        label="New password:"
        :disabled="errors === null"
        :state="validateState('password')"/>
      <password-field
        v-model="$v.form.confirmPassword.$model"
        label="Confirm new password:"
        :disabled="errors === null"
        :state="validateState('confirmPassword')"/>
      <b-button :disabled="errors === null" type="submit" variant="primary">Change</b-button>
    </b-form>
  </b-container>
</template>

<script>
import PasswordField from '@/components/shared/PasswordField'
import ValidationMixin from '@/components/mixins/ValidationMixin'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'ResetPassword',
    mixins: [ValidationMixin],
    components: { PasswordField },
    data: () => ({
        form: {
            password: null,
            confirmPassword: null
        },
        errors: []
    }),
    validations: {
        form: {
            password: { required },
            confirmPassword: { required }
        }
    },
    methods: {
        async submit () {
            try {
                await this.$store.dispatch('user/submit_reset_password', {
                    new_password1: this.form.password,
                    new_password2: this.form.confirmPassword,
                    uid: this.$route.params.uid,
                    token: this.$route.params.token
                })
                this.errors = null
            } catch (resp) {
                this.errors = Object.values(resp.data).reduce((r, a) => r.concat(a))
            }
        }
    }
}
</script>

<style scoped>

</style>