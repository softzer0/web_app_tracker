<template>
  <b-navbar toggleable="lg">
    <b-navbar-brand href="javascript:"><img id="logo" src="@/assets/logo.png"/></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="(item, i) in items.main" :key="i" :to="{ name: item.name }" exact active-class="active"><b-icon :icon="item.icon"/> {{ item.title }}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!--b-nav-item-dropdown right>
          <template #button-content>
            <b-icon-flag/> Language
          </template>
          <b-dropdown-item href="#">English</b-dropdown-item>
          <b-dropdown-item href="#">Serbian</b-dropdown-item>
        </b-nav-item-dropdown-->

        <b-nav-item-dropdown right v-if="isLoggedIn">
          <template #button-content>
            <b-icon-person/> User
          </template>
          <b-dropdown-item v-for="(item, i) in items.user" :key="i" :to="{ name: item.name }" exact active-class="active"><b-icon :icon="item.icon"/> {{ item.title }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NavBar',
    computed: {
        ...mapGetters({ isLoggedIn: 'user/isLoggedIn' }),
        items () {
            return {
                main: [
                    { name: 'Home', title: 'Home', icon: 'house' },
                    ...(!this.isLoggedIn ? [
                        { name: 'Login', title: 'Login', icon: 'door-open' },
                        { name: 'Sign up', title: 'Sign up', icon: 'person-plus' }
                    ] : []),
                ],
                ...(this.isLoggedIn ? { user: [
                    { name: 'User', title: 'Profile', icon: 'file-person' },
                    { name: 'Logout', title: 'Logout', icon: 'door-closed' }
                ] } : {})
            }
        }
    }
}
</script>

<style scoped>
#logo {
    height: 43px;
}
</style>