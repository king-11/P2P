/* eslint-disable no-console */ /* eslint-disable
vue/no-side-effects-in-computed-properties */
<template>
  <v-main>
    <v-row row wrap justify="center" align="center" class="mt-n5">
      <v-col cols="12" md="10" xl="8">
        <v-card elevation="2">
          <v-card-title class="info--text">
            Create Assignment
          </v-card-title>
          <v-divider />
          <v-card-text justify="center">
            <v-form ref="form" v-model="valid" @submit="saveAssignment">
              <v-text-field
                v-model="title"
                label="Title"
                counter
                maxlength="100"
                :rules="[rules.minLength, rules.titleLength]"
                :outlined="breakpoint"
                placeholder="Name of the assignment"
              />
              <v-text-field
                v-model="description"
                label="Description"
                counter
                maxlength="250"
                :rules="[rules.descriptionLength]"
                :outlined="breakpoint"
              />
              <v-row>
                <v-col sm="6">
                  <date-input @update:date="(updatedDate) => {submissionDeadline = updatedDate}" />
                </v-col>
                <v-col sm="6">
                  <date-input @update:date="(updatedDate) => {reviewDeadline = updatedDate}" />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <small class="ml-2">Points: {{ gettotalPoints }}</small>
            <v-spacer />
            <v-row justify="end" class="mr-1">
              <v-dialog
                v-model="dialog"
                transition="dialog-bottom-transition"
                :fullscreen="breakpoint"
                :hide-overlay="breakpoint"
                persistent
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    text
                    v-bind="attrs"
                    dense
                    @click.stop="dialog = true"
                    v-on="on"
                  >
                    <v-icon>mdi-bookmark-plus-outline</v-icon>Add task
                  </v-btn>
                </template>
                <add-task
                  :task="getTaskbuff"
                  :ind="index"
                  @add:task="addTask"
                  @discard="discardTask"
                  @edit:task="modify"
                />
              </v-dialog>
              <v-btn
                color="success"
                text
                dense
                @click="saveAssignment()"
              >
                <v-icon>mdi-content-save</v-icon>Save
              </v-btn>
              <v-btn color="error" text dense>
                <v-icon>mdi-alert-circle-outline</v-icon>Discard
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="tasks.length > 0" cols="12" md="10" xl="8">
        <v-slide-y-reverse-transition class="py-1" group tag="v-list" rounded>
          <template v-for="(task, i) in tasks">
            <v-list-item :key="i">
              <v-layout child-flex>
                <v-card outlined class="my-2">
                  <v-card-title>
                    {{ `${i + 1}. ${task.title}` }}
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <div>
                          <div>
                            <v-btn outlined color="primary">
                              <v-icon>mdi-cloud-upload-outline</v-icon>Add file
                            </v-btn>
                          </div>
                          <div>
                            <small>Allowed types are:
                              {{ task.allowedTypes.toString() }}</small>
                          </div>
                          <div>
                            <small>Weightage: {{ task.weightage }}</small>
                          </div>
                        </div>
                        <v-divider vertical class="mx-4" />
                        <div>
                          <div
                            v-for="(criterion, index) in task.reviewAreas"
                            :key="index"
                          >
                            <v-row class="point-section">
                              <v-col>
                                {{ criterion.ques }}
                                <small>
                                  <em>{{ criterion.points }} points</em>
                                </small>
                              </v-col>
                            </v-row>
                          </div>
                        </div>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <small>Allowed file size: {{ task.maximumFileSize }}</small>
                    <v-spacer />
                    <v-btn text color="primary" dense @click="editTask(i)">
                      <v-icon>mdi-clipboard-edit-outline</v-icon>Edit
                    </v-btn>
                    <v-btn text color="error" dense @click="deleteTask(i)">
                      <v-icon>mdi-delete-circle-outline</v-icon>Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-layout>
            </v-list-item>
          </template>
        </v-slide-y-reverse-transition>
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
  </v-main>
</template>
<script>
import AddTask from '@/components/AddTask'
import DateInput from '@/components/DateInput'
export default {
  components: {
    AddTask,
    DateInput
  },
  data () {
    return {
      snackbar: false,
      snackbarColor: 'error',
      snackbarMessage: '',
      dialog: false,
      valid: false,
      index: -1,
      lastDateOfSub: null,
      taskbuff: {
        title: '',
        allowedTypes: [],
        maximumFileSize: '5MB',
        reviewAreas: [],
        weightage: 0
      },
      reviewPhase: false,
      course: 'Boring Course', // autofill
      title: '',
      description: '',
      instructor: 'Dusht Aatma', // autofill
      submissions: [],
      // last date of submission(begining of review)
      submissionDeadline: new Date().toISOString().substr(0, 10),
      // last date of review
      reviewDeadline: new Date().toISOString().substr(0, 10),
      totalPoints: 0,
      tasks: [],
      reviewArea: {
        task: '',
        points: 0
      },
      multipleFiles: false,
      rules: {
        titleLength: value => value.length <= 100 || 'Max 50 characters.',
        descriptionLength: value =>
          value.length <= 250 || 'Max 250 characters.',
        minLength: value => !!value || 'Required!'
      }
    }
  },
  layout: 'default',
  computed: {
    // to update the total points of the assignment
    gettotalPoints () {
      let sum = 0
      this.tasks.forEach((element) => {
        sum += parseInt(element.weightage)
      })
      // done intentionally will fix during api integration.
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalPoints = sum
      return this.totalPoints
    },
    getTaskbuff () {
      return this.taskbuff
    },
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
        // eslint-disable-next-line no-useless-return
        return
      }
      if (this.submissionDeadline >= this.reviewDeadline) {
        this.displaySnackbar('Review period to short or negative!', 'error')
        // eslint-disable-next-line no-useless-return
        return
      }
      this.displaySnackbar('Ready to save!', 'success')
    },
    // during edit one changes the buuffer task which needs to be put back to original state if changes are not saved so this method is
    discardTask () {
      this.index = -1
      this.dialog = false
      this.taskbuff = {
        title: '',
        required: false,
        allowedTypes: [],
        maximumFileSize: '5MB',
        reviewAreas: [],
        wightage: 0
      }
    },
    // for sending which index is to be edited.
    editTask (ind) {
      this.index = ind
      this.taskbuff = { ...this.tasks[ind] }
      this.dialog = true
    },
    addTask ({ task }) {
      this.tasks.push(task)
      this.discardTask()
    },
    deleteTask (index) {
      this.tasks = this.tasks.filter((e, i) => {
        return i !== index
      })
    },
    // for commiting changes to databases to actual database upon actual editing.
    modify ({ task, ind }) {
      // actual editing is done from here editTask method just sets the index for edit.
      this.tasks[ind] = task
      this.discardTask()
    }
  }
}
</script>
<style lang="scss" scoped>
.point-section {
  font-size: 0.8rem;
}
</style>
