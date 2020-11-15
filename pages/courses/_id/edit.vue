<template>
  <div>
    <v-row row wrap justify="center">
      <v-col cols="12" md="10">
        <v-card elevation="2">
          <v-card-title class="info--text">
            Edit Course
          </v-card-title>
          <v-divider />
          <v-card-text justify="center">
            <v-form>
              <v-row class="mx-n4">
                <div>
                  <v-card-subtitle class="info--text">
                    Course Details
                  </v-card-subtitle>
                  <v-divider class="mt-n2" />
                </div>
              </v-row>
              <v-row>
                <v-col cols="12" sm="8" md="10">
                  <v-text-field
                    v-model="name"
                    type="text"
                    label="Name"
                    color="primary"
                    placeholder="Name of the course"
                    counter
                    maxlength="20"
                    :rules="[rules.minlength]"
                    required
                    :outlined="breakpoint"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="2">
                  <v-text-field
                    v-model="code"
                    type="text"
                    label="Course-code"
                    color="primary"
                    :rules="[rules.minlength]"
                    required
                    :outlined="breakpoint"
                  />
                </v-col>
              </v-row>
              <v-row>
                <div>
                  <v-card-subtitle class="info--text" align="center">
                    Teaching Assistants
                    <v-btn outlined color="info" dark small @click="addTa">
                      Add More
                    </v-btn>
                  </v-card-subtitle>
                  <v-divider class="mt-n2 ml-n1" />
                </div>
              </v-row>
              <v-row v-if="TAs.length === 0" justify="center">
                <small
                  class="text-caption font-weight-medium"
                >No teaching assistants for this course.</small>
              </v-row>
              <v-row v-for="(ta, index) in course.ta" v-else :key="index">
                <v-col my-0 py-0>
                  <ta-input
                    :ta="ta"
                    :index="index"
                    :breakpoint="breakpoint"
                    @display:snackbar="displaySnackbar"
                    @edit:ta="editTa"
                    @delete:ta="deleteTa"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="info" text @click="saveCourse">
              <v-icon>mdi-content-save</v-icon>
              save
            </v-btn>
            <v-btn color="warning" text>
              <v-icon> mdi-arrow-left-circle </v-icon>
              Discard
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="showSnackbar" app bottom :color="color" rounded>
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn icon text v-bind="attrs" @click="showSnackbar = false">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import TaInput from '@/components/TaInput'
export default {
  middleware: ['auth'],
  components: {
    TaInput
  },
  async fetch () {
    const header = {
      headers: {
        Authorization: this.$auth.getToken('local')
      }
    }
    const course = await this.$axios.$get(
      `https://arcane-mountain-95630.herokuapp.com/teacher/course/${this.$route.params.id}`,
      header
    )
    console.log(course)
    this.course = course
    this.name = course.name
    this.code = course.code
    course.ta.forEach((ta) => {
      this.TAs.push({
        email: ta.email
      })
    })
  },
  data () {
    return {
      course: {},
      name: '',
      code: '',
      snackbarMessage: '',
      showSnackbar: false,
      color: 'error',
      TAs: [],
      // eslint-disable-next-line no-useless-escape
      mailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      rules: {
        minlength: v => !!v || 'Required!',
        optionalMinLength: v => !!v || 'Length should not be zero!',
        emailRule: v => this.mailPattern.test(v) || 'Invalid email!'
      }
    }
  },
  computed: {
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
      this.color = color || 'error'
      this.showSnackbar = true
    },
    addTa () {
      this.TAs.push({
        email: 'something@example.com'
      })
    },
    editTa ({ ta, index }) {
      this.TAs[index] = ta
      this.displaySnackbar('TA details updated successfully!', 'success')
    },
    deleteTa (index) {
      this.TAs = this.TAs.filter((e, ind) => ind !== index)
    },
    courseDetailsValidation () {
      if (!(this.name.length > 0)) {
        this.displaySnackbar('Invalid course name!', 'error')
        return false
      }
      if (!(this.code.length > 0)) {
        this.displaySnackbar('Invalid course code!', 'error')
        return false
      }
      return true
    },
    taDetailsValidation () {
      console.log(this.TAs)
      this.TAs.forEach((element) => {
        if (
          !(element.email.length > 0 && this.mailPattern.test(element.email))
        ) {
          this.displaySnackbar(
            'Some teaching assistant(s) have invalid email!',
            'error'
          )
          return false
        }
      })
      return true
    },
    saveCourse () {
      if (this.courseDetailsValidation() && this.taDetailsValidation()) {
        const TAsEmails = this.TAs.map((ta) => {
          return ta.email
        })
        this.$store.dispatch('teacherStore/updateCourse', {
          token: this.$auth.getToken('local'),
          id: this.$route.params.id,
          data: {
            name: this.name,
            code: this.code,
            ta: TAsEmails
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
