<template>
  <v-container>
    <v-row row wrap justify="center" align="center" class="mt-3">
      <v-col cols="12" md="10" xl="8">
        <v-card elevation="2">
          <v-card-title class="info--text">
            Create Assignment
          </v-card-title>
          <v-divider />
          <v-card-text justify="center">
            <v-form ref="form" v-model="valid" @submit="saveAssignment">
              <v-row>
                <v-col sm="6">
                  <v-text-field
                    v-model="title"
                    label="Title"
                    counter
                    maxlength="100"
                    :rules="[rules.minLength, rules.titleLength]"
                    :outlined="breakpoint"
                    placeholder="Name of the assignment"
                  />
                </v-col>
                <v-col sm="6">
                  <v-text-field
                    v-model.number="weightage"
                    :rules="[rules.weightageRule]"
                    label="weightage"
                    :outlined="breakpoint"
                    required
                  />
                </v-col>
              </v-row>

              <v-textarea
                v-model="description"
                label="Description"
                counter
                maxlength="250"
                :rules="[rules.descriptionLength]"
                :outlined="breakpoint"
              />
              <v-row>
                <v-col sm="6">
                  <date-input
                    label="Submission deadline"
                    @update:date="(updatedDate) => {submissionDeadline = updatedDate}"
                  />
                </v-col>
                <v-col sm="6">
                  <date-input
                    label="Review deadline"
                    @update:date="(updatedDate) => {reviewDeadline = updatedDate}"
                  />
                </v-col>
              </v-row>
              <v-file-input
                v-model="files"
                chips
                multiple
                label="Reference material"
              />
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-row justify="end" class="mr-1">
              <v-btn
                color="success"
                text
                dense
                @click="saveAssignment()"
              >
                <v-icon>mdi-content-save</v-icon>Save
              </v-btn>
              <v-btn color="error" :to="'/courses/'+this.$route.params.id" text dense>
                <v-icon>mdi-alert-circle-outline</v-icon>Discard
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-snackbar v-model="snackbar" app bottom :color="snackbarColor" rounded>
        {{ snackbarMessage }}
        <template v-slot:action="{attrs}">
          <v-btn icon text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>
<script>
import DateInput from '@/components/DateInput'
export default {
  middleware: ['auth'],
  components: {
    DateInput
  },
  data () {
    return {
      files: [],
      weightage: 0,
      snackbar: false,
      snackbarColor: 'error',
      snackbarMessage: '',
      dialog: false,
      valid: false,
      index: -1,
      lastDateOfSub: null,
      title: '',
      description: '',
      // last date of submission(begining of review)
      submissionDeadline: new Date().toISOString().substr(0, 10),
      // last date of review
      reviewDeadline: new Date().toISOString().substr(0, 10),
      multipleFiles: false,
      rules: {
        titleLength: value => value.length <= 100 || 'Max 50 characters.',
        descriptionLength: value =>
          value.length <= 250 || 'Max 250 characters.',
        minLength: value => !!value || 'Required!',
        weightageRule (value) {
          if (
            /^\d*$/.test(value) &&
            (value === '' || (parseInt(value) <= 100 && parseInt(value) >= 0))
          ) { return true } else {
            return 'Invalid Number'
          }
        }
      }
    }
  },
  layout: 'default',
  computed: {
    // required for dialog to be full screen when small screen
    breakpoint () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return false
        case 'md':
          return false
        case 'lg':
          return false
        case 'xl':
          return false
      }
      return false
    }
  },
  methods: {
    displaySnackbar (message, color) {
      this.snackbarMessage = message
      this.snackbarColor = color || 'error'
      this.snackbar = true
    },
    saveAssignment () {
      if (this.title.length <= 0) {
        this.displaySnackbar('Title is required!', 'error')
        return
      }
      if (this.submissionDeadline >= this.reviewDeadline) {
        this.displaySnackbar('Review period to short or negative!', 'error')
        return
      }
      if (this.weightage === '') {
        this.displaySnackbar('Invalid Weightage', 'error')
        return
      }
      this.$store.dispatch('assignmentStore/createAssignment', {
        token: this.$auth.getToken('local'),
        id: this.$route.params.id,
        data: {
          title: this.title,
          description: this.description,
          totalPoints: this.weightage,
          submissionDeadline: this.submissionDeadline,
          reviewDeadline: this.reviewDeadline,
          attachments: this.files
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.point-section {
  font-size: 0.8rem;
}
</style>
