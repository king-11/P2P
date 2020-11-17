<template>
  <v-container>
    <v-row row wrap justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title>
            Review
          </v-card-title>
          <v-divider />
          <v-card-text align="center">
            <v-form justify="center">
              <v-card-subtitle>
                Attachment
                <v-chip
                  class="ma-1"
                  color="white black--text"
                  :href="link"
                  target="_blank"
                >
                  link
                </v-chip>
              </v-card-subtitle>
              <v-row>
                <v-col cols="12" lg="8">
                  <v-textarea
                    v-model="remark"
                    label="Remark"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-text-field
                    v-model="score"
                    outlined
                    label="score"
                    type="text"
                    :maxlength="2"
                    required
                    color="primary"
                    @keypress="isNumber($event)"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="info"
              class="ma-2"
              @click="saveReview"
            >
              <v-icon>mdi-content-save</v-icon>
              save
            </v-btn>
            <v-btn
              class="ma-2"
              color="red"
              :to="'/courses/'+$route.params.id+'/assignments/'+$route.params.assg"
            >
              <v-icon>
                mdi-arrow-left-circle
              </v-icon>
              Discard
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  async fetch () {
    const header = {
      headers: {
        Authorization: this.$auth.getToken('local')
      }
    }

    const submission = await this.$axios.$get(`https://arcane-mountain-95630.herokuapp.com/submission/${this.$route.params.sub}`, header)
    this.link = submission.attachments[0]
    this.submission = submission
  },
  data () {
    return {
      link: '',
      submission: '',
      remark: '',
      score: 0
    }
  },
  methods: {
    isNumber (evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    saveReview () {
      return null
    }
  }
}
</script>

<style>

</style>
