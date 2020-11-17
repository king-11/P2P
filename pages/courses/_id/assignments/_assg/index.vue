<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ assignment.title }}
        <v-spacer />
        <v-chip
          class="ma-1"
          color="white black--text"
        >
          {{ assignment.totalPoints }} Points
        </v-chip>
      </v-card-title>
      <v-card-subtitle> Due {{ assignment.submissionDeadline }}</v-card-subtitle>
      <v-card-text class="mt-5 white--text">
        <h3>Description :</h3>
        <v-card-text>
          {{ assignment.description }}
        </v-card-text>
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
        <v-row v-if="!teacher" class="mt-5">
          <v-col
            cols="12"
            lg="6"
            md="6"
          >
            <v-file-input
              v-model="file"
              label="Submit work"
              outlined
              dense
            />
          </v-col>
          <v-col
            cols="12"
            lg="3"
            md="3"
          >
            <v-btn color="white black--text" @click="submitAssignment">
              submit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="teacher">
        <v-spacer />
        <v-btn color="white black--text" :to="this.$route.fullPath+'/allSubmissions'" class="ma-2">
          View Submissions
        </v-btn>
        <v-btn color="white black--text" class="ma-2">
          View Reviews
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-speed-dial
      v-if="teacher"
      :v-model="fab"
      bottom
      right
      absolute
      fixed
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
        :to="this.$route.fullPath+'/edit'"
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
          Are you sure to delete this Assignment ? All the submisssions related to
          this assignment (if any) will also be deleted automatically .
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
  middleware: ['auth'],
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
    assignment.submissionDeadline = new Date(assignment.submissionDeadline).toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
    assignment.reviewDeadline = new Date(assignment.reviewDeadline).toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
  },
  data: () => ({
    assignment: {},
    fab: false,
    deleteConfirm: false,
    file: null
  }),
  computed: {
    teacher () {
      // return this.$auth.user.data.teacher
      return false
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
    },
    submitAssignment () {
      if (this.file) {
        this.$store.dispatch('submissionStore/createSubmission', {
          token: this.$auth.getToken('local'),
          data: {
            course: this.$route.params.id,
            assignment: this.$route.params.assg,
            attachments: [this.file]
          }
        })
      } else {
        this.$store.dispatch('authStore/snackbar', {
          show: true,
          color: 'red',
          message: 'Please upload file to submit'
        })
      }
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
