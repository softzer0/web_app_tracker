<template>
  <b-form-group :label="label">
    <b-input-group>
      <b-form-input
        :type="showPassword ? 'text' : 'password'"
        v-bind="$attrs"
        v-on="$listeners"
        required
        placeholder="Enter password"
      />
      <b-input-group-append>
        <b-button @click="showPassword = !showPassword"><b-icon :icon="!showPassword ? 'eye' : 'eye-slash'"/></b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
    name: 'PasswordField',
    props: {
        label: {
            type: String,
            default: 'Password:'
        }
    },
    data () {
        return {
            showPassword: false
        }
    }
}
</script>