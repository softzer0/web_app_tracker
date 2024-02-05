<script>
export default {
    name: 'ValidationMixin',
    methods: {
        validateState (name) {
            const { $dirty, $error } = this.$v.form[name]
            return $dirty ? !$error : null
        },
        resetForm () {
            for (const key in this.form) {
                this.form[key] = null
            }

            this.$nextTick(() => {
                this.$v.$reset()
            })
        },
        submitForm () {
            this.$v.form.$touch()
            if (!this.$v.form.$anyError) {
                this.submit()
            }
        }
    }
}
</script>