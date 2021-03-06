<template>
  <v-container fluid>
    <v-toolbar class="mx-xs-0 mx-sm-4 mx-md-10 mx-lg-14 mx-xl-16 rounded-lg">
      <v-toolbar-title>
        <strong>Your Courses</strong>
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <nuxt-link
            v-if="isTeacher"
            to="/createcourse"
            style="color: inherit;text-decoration: none;"
          >
            <v-btn
              class="white black--text"
              v-bind="attrs"
              fab
              x-small
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </nuxt-link>

          <v-dialog
            v-else
            v-model="dialog"
            max-width="290"
          >
            <template v-slot:activator="scope">
              <v-btn
                class="white black--text"
                v-bind="scope.attrs"
                fab
                x-small
                v-on="scope.on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                Enter Code
              </v-card-title>
              <v-divider class="my-3" />
              <v-card-text>
                <v-text-field
                  v-model="code"
                  label="Code"
                  counter
                  maxlength="7"
                  :rules="[rules.minLength]"
                  outlined
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  @click="joinCourse"
                >
                  Join
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <span>{{ isTeacher ? "Add a new course": "Join course" }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-container>
      <transition-group
        name="course-list"
        class="d-flex flex-wrap justify-space-around"
      >
        <div
          v-for="course in courses"
          :key="course._id"
          class="course-list my-4 mx-3"
        >
          <v-card class="mx-auto" max-width="344" elevation="20" ripple rounded>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-1"
                  absolute
                  fab
                  mt-4
                  right
                  small
                  dark
                  color="black"
                  v-bind="attrs"
                  :to="'/courses/'+course._id+'/edit'"
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>edit course</span>
            </v-tooltip>
            <nuxt-link
              :to="'/courses/' + course._id"
              style="color: inherit;text-decoration: none;"
            >
              <v-img
                src="https://d3gthpli891tsj.cloudfront.net/wp-content/uploads/2019/01/22063215/GATE-Crash-Course.jpg"
                height="200px"
              />
              <v-card-title>
                {{ course.name }}
                <v-spacer />
                <v-chip class="ml-10" label>
                  {{ course.code }}
                </v-chip>
              </v-card-title>

              <v-card-subtitle v-if="isTeacher">
                You're the Insructor
              </v-card-subtitle>
            </nuxt-link>
            <v-card-actions>
              <div>ASSIGNMENTS</div>
              <v-spacer />

              <v-btn icon @click="view(course)">
                <v-icon>
                  {{ course.show ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="course.show">
                <v-data-table
                  :headers="headers"
                  :items="course.assignments"
                  :items-per-page="3"
                  class="elevation-1"
                />
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </transition-group>
    </v-container>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  async fetch () {
    let url = 'https://arcane-mountain-95630.herokuapp.com/'
    if (this.$auth.user.data.teacher) {
      url += 'teacher/course/'
      let courses = await this.$axios.$get(url)
      courses = courses.map((e) => {
        e.show = false
        return e
      })
      this.courses = courses
    } else {
      url += 'user/course/'
      const courses = await this.$axios.$get(url)
      this.courses = courses.courses
    }

    // console.log(courses)
  },
  data () {
    return {
      // headers for  assignments table
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'title'
        },
        { text: 'Last Date', value: 'submissionDeadline' },
        { text: 'No of submissions', value: 'number_of_submissions' }
      ],
      courses: [],
      isTeacher: this.$auth.user.data.teacher,
      rules: {
        minLength: value => !!value || 'Required!'
      },
      code: '',
      dialog: false
    }
  },
  methods: {
    //  switch expandable
    view (course) {
      const assg = course.assignments
      assg.forEach((a) => {
        a.submissionDeadline = new Date(a.submissionDeadline).toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
        a.reviewDeadline = new Date(a.reviewDeadline).toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
      })
      course.show = !course.show
    },
    joinCourse () {
      const payload = {
        token: this.$auth.getToken('local'),
        data: {
          classCode: this.code
        }
      }
      this.$store.dispatch('courseStore/joinCourse', payload)
    }
  },
  head: {
    title: 'Home'
  }
}
</script>

<style lang="scss" scoped>
.course-list {
  backface-visibility: hidden;

  transition: all 1s;
  &-move {
    transition: all 600ms ease-in-out 50ms;
  }
  &-enter-active {
    transition: all 300ms ease-out;
  }

  &-leave-active {
    transition: all 200ms ease-in;
    position: absolute;
    z-index: 0;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter {
    transform: scale(0.9);
  }
}
</style>
