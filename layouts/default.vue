<template>
  <v-app dark>
    <navbar-vue />
    <nuxt />
    <footer-vue />
  </v-app>
</template>

<script>

import NavbarVue from '../components/Navbar.vue'
import FooterVue from '../components/Footer.vue'
export default {
  components: {
    NavbarVue,
    FooterVue
  }
}
</script>
