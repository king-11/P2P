<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="5" align="center">
        <v-btn class="white black--text" to="/login">
          Get Started
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12" md="5" align="center">
        <v-img
          max-height="250"
          max-width="250"
          aspect-ratio
          :src="imgSrc"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      imgSrc: require('../assets/images/study.webp')
    }
  },
  head: {
    title: 'Welcome'
  }
}
</script>
<style  scoped>
</style>
