<template>
  <b-container class="pt-4">
    <div v-if="isSuccess">
      <b-alert variant="success" :show="true">Your account has been successfully activated</b-alert>
      <b-button type="submit" variant="primary" :to="{ name: 'Login' }">Proceed to login</b-button>
    </div>
    <div v-else-if="isSuccess === false">
      <b-alert variant="danger" :show="true">There was an error while activating your account</b-alert>
      <b-button type="submit" variant="primary" :to="{ name: 'Home' }">Go back</b-button>
    </div>
    <div v-else class="text-center"><span class="text-muted">Please wait...</span></div>
  </b-container>
</template>

<script>
export default {
    name: 'EmailConfirmation',
    data: () => ({ isSuccess: null }),
    async mounted () {
        try {
            await this.$store.dispatch('user/confirm_email', this.$route.params.key)
            this.isSuccess = true
        } catch (e) {
            this.isSuccess = false
        }
    }
}
</script>

<style scoped>

</style>