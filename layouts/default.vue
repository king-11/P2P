<template>
  <v-app dark>
    <navbar-vue />
    <nuxt />
  </v-app>
</template>

<script>

import NavbarVue from '../components/Navbar.vue'
export default {
  components: {
    NavbarVue
  }
}
</script>
