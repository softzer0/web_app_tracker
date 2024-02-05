<template>
  <div class="d-flex align-items-stretch flex-nowrap flex-column h-100">
    <NavBar id="navbar"/>
    <vue-page-transition id="router-view" class="d-flex overflow-hidden" name="fade-in-right">
      <router-view/>
    </vue-page-transition>
  </div>
</template>

<script>
import NavBar from '@/components/layout/NavBar'

export default {
    name: 'App',
    components: {
        NavBar
    }
}
</script>

<style lang="scss">
html, body {
    height: 100%;
}

#navbar {
    min-height: fit-content;
}

#router-view {
    flex: auto;

    > .container, > .container-fluid {
        overflow: auto;
    }
}
</style>