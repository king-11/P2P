<template>
  <v-app dark>
    <navbar-vue />
    <v-main>
      <nuxt />
    </v-main>
    <v-snackbar
      v-if="snackbar.show"
      v-model="snackbar.show"
      :app="true"
      :timeout="5000"
      elevation="20"
      bottom
      :color="snackbar.color"
      mb-5
    >
      {{ snackbar.message }}
    </v-snackbar>
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
  },
  computed: {
    snackbar () {
      return this.$store.getters['authStore/snackbar']
    }
  }
}
</script>
