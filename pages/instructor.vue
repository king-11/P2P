<template>
  <v-container fluid>
    <v-toolbar class="mx-xs-0 mx-sm-4 mx-md-10 mx-lg-14 mx-xl-16 rounded-lg">
      <v-toolbar-title>
        <strong>Your Courses</strong>
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="white black--text" v-bind="attrs" fab x-small v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add a new course</span>
      </v-tooltip>
    </v-toolbar>
    <v-container>
      <transition-group
        name="course-list"
        class="d-flex flex-wrap justify-space-around"
      >
        <div
          v-for="course in courses"
          :key="course.id"
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
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>edit course</span>
            </v-tooltip>
            <nuxt-link to style="color: inherit;text-decoration: none;">
              <v-img
                src="https://d3gthpli891tsj.cloudfront.net/wp-content/uploads/2019/01/22063215/GATE-Crash-Course.jpg"
                height="200px"
              />
              <v-card-title>{{ course.title }}</v-card-title>

              <v-card-subtitle>You're the Insructor</v-card-subtitle>
            </nuxt-link>
            <v-card-actions>
              <div>ASSIGNMENTS</div>
              <v-spacer />

              <v-btn icon @click="view(course)">
                <v-icon>
                  {{
                    course.show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}
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
  data () {
    return {
      // headeres for  assignments table
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Last Date', value: 'lastDate' },
        { text: 'No of submissions', value: 'nfs' }
      ],
      // sample data
      // nfs : no of submissions
      courses: [
        {
          id: 1,
          title: 'course 1 ',
          // for dropdown of assignments
          show: false,
          assignments: [
            {
              name: 'Assignment1 ',
              lastDate: '15 August 2020',
              nfs: '10'
            },
            {
              name: 'Assignment2',
              lastDate: '21 August 2020',
              nfs: '20'
            },
            {
              name: 'Assignment3',
              lastDate: '30 August 2020',
              nfs: '3'
            }
          ]
        },
        {
          id: 2,
          title: 'course 2 ',
          show: false,
          assignments: [
            {
              name: 'Assignment1 ',
              lastDate: '15 August 2020',
              nfs: '10'
            },
            {
              name: 'Assignment2',
              lastDate: '21 August 2020',
              nfs: '20'
            }
          ]
        },
        {
          id: 3,
          title: 'course 3 ',
          show: false,
          assignments: []
        },
        {
          id: 4,
          title: 'course 4 ',
          show: false,
          assignments: []
        }
      ]
    }
  },
  methods: {
    //  switch expandable
    view (course) {
      course.show = !course.show
    }
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
