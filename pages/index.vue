<template>
  <div>
    <v-parallax :src="background" dark>
      <v-row align="center" justify="center">
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
    </v-parallax>
    <v-container>
      <v-lazy
        :options="{
          threshold: .6
        }"
        transition="scroll-y-transition"
      >
        <div class="mt-5 text-h4 text-md-h3 white--text text-center">
          Build on academic research
        </div>
      </v-lazy>
      <v-row align="center" justify="center" class="my-10">
        <v-col cols="12" sm="12" md="5">
          <span class="text-body-1">
            P2P is not just a tool that can provide you with insights into your students’ performance and save you time.
            It also creates a much better learning experience for your students. Don’t believe us?
            There’s a bunch of studies that actually proves that it can increase learning up to 30%!
          </span>
        </v-col>
        <v-col cols="12" sm="12" md="5" align="center">
          <v-img
            aspect-ratio
            height="400"
            :src="student"
          />
        </v-col>
      </v-row>
      <v-lazy
        :options="{
          threshold: .6
        }"
        transition="scale-transition"
      >
        <div class="mt-5 text-h4 text-md-h3 white--text text-center">
          What people are saying ?
        </div>
      </v-lazy>

      <v-carousel
        class="mp-5"
        hide-delimiters="true"
        show-arrows-on-hover="true"
        height="350"
      >
        <v-carousel-item
          v-for="(review, i) in reviews"
          :key="i"
        >
          <v-sheet height="100%" color="transparent">
            <v-row class="fill-height" align="center" justify="center">
              <v-card
                color="pink"
                dark
                max-width="400"
                max-height="300"
              >
                <div class="d-flex flex-no-wrap justify-space-between fill-height align-center">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="review.name"
                    />

                    <v-card-subtitle v-text="review.text" />
                  </div>

                  <v-avatar
                    class="ma-3"
                    size="150"
                    tile
                  >
                    <v-img :src="review.image" />
                  </v-avatar>
                </div>
              </v-card>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const { data } = await $content('reviews').only(['data']).fetch()
    return {
      reviews: data
    }
  },
  data () {
    return {
      imgSrc: require('../assets/images/study.webp'),
      background: require('../assets/images/background.jpg'),
      student: require('../assets/images/student.jpg')
    }
  },
  head: {
    title: 'Welcome'
  }
}
</script>
<style  scoped>
</style>
