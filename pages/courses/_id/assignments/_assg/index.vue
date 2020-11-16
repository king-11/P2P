<template>
  <v-container fluid>
    <v-card>
      <v-card-title>{{ assignment.title }}</v-card-title>
      <v-card-subtitle> Due {{ assignment.submissionDeadline }}</v-card-subtitle>
      <v-card-text class="mt-5">
        <v-chip
          class="ma-1"
          color="white black--text"
        >
          {{ assignment.totalPoints }} Points
        </v-chip>
        <v-card-subtitle>Reference Material </v-card-subtitle>
        <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip
            v-for="(link,i) in assignment.attachments"
            :key="i"
            class="ma-2"
            label
            :href="link"
            target="_blank"
            color="primary"
          >
            link {{ i }}
          </v-chip>
        </v-chip-group>
        <v-row v-if="!teacher">
          <v-col
            cols="12"
            lg="6"
            md="6"
            style="text-align: right; padding-bottom: 0; padding-right: 7%"
          >
            <v-file-input
              label="Submit work"
              outlined
              class="mt-5"
              dense
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-speed-dial
      v-if="teacher"
      :v-model="fab"
      bottom
      right
      direction="top"
      open-on-hover
      transition="slide-y-reverse-transition"
      class="fab"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab large>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        :to="
          '/courses/' +
            $route.params.id +
            '/assignments/' +
            $route.params.assg +
            '/edit'
        "
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="dialog">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog v-model="deleteConfirm" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Confirm
        </v-card-title>
        <v-card-text>
          Are you sure to delete this course ? All the assignments related to
          this course will also be deleted automatically .
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="deleteConfirm = false">
            CANCEL
          </v-btn>
          <v-spacer />
          <v-btn color="green darken-1" text @click="deleteAssignment">
            CONFIRM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  async fetch () {
    const header = {
      headers: {
        Authorization: this.$auth.getToken('local')
      }
    }
    const assignment = await this.$axios.$get(
      `https://arcane-mountain-95630.herokuapp.com/assignment/${this.$route.params.assg}`,
      header
    )
    this.assignment = assignment
  },
  data: () => ({
    assignment: {},
    fab: false,
    deleteConfirm: false,
    title: 'Assignment 1',
    courseTitlesm: 'Computer System',
    courseCode: 'CSO-211',
    instructorName: ' Prof. SK Singh',
    time: '12:00',
    dueDate: 'Due 2 October 2020 23:59',
    status: true,
    statusCheck: true,
    points: '23.5/25',
    returnDate: 'Returned Thu Oct 21 22:08'
  }),
  computed: {
    teacher () {
      return this.$auth.user.data.teacher
    }
  },
  methods: {
    dialog () {
      this.deleteConfirm = true
    },
    deleteAssignment () {
      this.$store.dispatch('assignmentStore/deleteAssignment', {
        token: this.$auth.getToken('local'),
        id: this.$route.params.assg,
        data: {
          course: this.$route.params.id
        }
      })
    }
  }
}
</script>
<style scoped>
.fab {
  bottom: 0;
  margin: 0 0 16px 16px;
  position: fixed;
  bottom: 70px;
  right: 50px;
}
</style>
