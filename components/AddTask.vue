<template>
  <div>
    <v-layout child-flex>
      <v-card flat>
        <v-card-title class="info--text">
          {{ getTitle }}
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-container>
            <v-row class="mx-n8">
              <div>
                <v-card-subtitle class="info--text">
                  Task Details
                </v-card-subtitle>
                <v-divider class="mt-n4" />
              </div>
            </v-row>
            <v-row class="mt-2">
              <v-col cols="12">
                <v-text-field
                  v-model="task.title"
                  label="Title"
                  counter
                  maxlength="100"
                  :rules="[rules.minLength]"
                  placeholder="Untitled task"
                  :outlined="breakpoint"
                />
              </v-col>
            </v-row>
            <v-row row wrap class="mt-n2">
              <v-col cols="12" sm="4">
                <v-autocomplete
                  v-model="task.allowedTypes"
                  label="Allowed file types"
                  :items="allowedFileTypes"
                  multiple
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="task.maximumFileSize"
                  label="Max size"
                  required
                  :items="maximumFileSizes"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model.number="task.weightage"
                  :rules="[rules.weightageRule]"
                  label="Task weightage"
                  :outlined="breakpoint"
                  required
                />
              </v-col>
            </v-row>
            <v-row class="mx-n8">
              <div>
                <v-card-subtitle class="info--text">
                  Review criterions for task:
                </v-card-subtitle>
                <v-divider class="mt-n4" />
              </div>
            </v-row>
            <v-row v-if="task.reviewAreas.length===0" justify="center">
              <small class="text-caption font-weight-medium">No review criterions for this task.</small>
            </v-row>
            <v-row>
              <v-col v-for="(ra, index) in task.reviewAreas" :key="index" cols="12">
                <review-pallete
                  :review-question="ra"
                  :task-weightage="getWeightage"
                  :index="index"
                  @edit:criterion="editCriterion"
                  @delete:criterion="deleteCriterion"
                  @show:snackbar="displaySnackbar"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-row justify="end" class="mr-1">
            <v-btn text color="primary" @click="addCriterion()">
              <small>Add Review Criterion</small>
            </v-btn>
            <v-btn
              v-if="checkIndex"
              text
              color="primary"
              :disabled="!validateTask"
              @click="preprocessValidation({task},'add')"
            >
              save
            </v-btn>
            <v-btn
              v-else
              text
              color="primary"
              :disabled="!validateTask"
              @click="preprocessValidation({task, index:ind},'edit')"
            >
              Edit
            </v-btn>
            <v-btn v-if="checkIndex" text color="warning" @click="$emit('discard')">
              Discard
            </v-btn>
            <v-btn v-else text color="warning" @click="$emit('discard')">
              Return
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-snackbar v-model="showSnackbar" app bottom :color="color" rounded>
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn icon text v-bind="attrs" @click="showSnackbar = false">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import ReviewPallete from '@/components/ReviewPallete'
export default {
  name: 'AddTask',
  components: {
    ReviewPallete
  },
  props: {
    // required here so that we can use for both editing and adding new task
    task: {
      type: Object,
      default () {
        return {
          title: '',
          allowedTypes: [],
          maximumFileSize: '5MB',
          reviewAreas: [],
          weightage: 0
        }
      }
    },
    ind: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      showSnackbar: false,
      message: '', // snackbar message
      color: 'error',
      allowedFileTypes: [
        'presentation',
        'spreadsheet',
        'pdf',
        'image',
        'video',
        'code'
      ],
      maximumFileSizes: ['1MB', '5MB', '10MB', '25MB'],
      rules: { // textfield rules.
        titleLength: value => value.length <= 100 || 'Max 100 characters.',
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
  computed: {
    // for activation of some buttons.
    validateTask () {
      return this.task.title.length > 0 && this.task.allowedTypes.length > 0
    },
    // so that we can decide whether component is used for adding or editing the task.
    checkIndex () {
      return this.ind === -1
    },
    // so that we can decide whether component is used for adding or editing the task and ccordingle provide title.
    getTitle () {
      return this.ind === -1 ? 'Add Task' : 'Edit Task'
    },
    getWeightage () {
      return this.task.weightage
    },
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
    // for setting the snackbar properties and making it visible.
    displaySnackbar (message, color) {
      this.color = color || 'error'
      this.message = message
      this.showSnackbar = true
    },
    // required by various other methods below it.
    testWeightage () {
      const weightage = this.task.weightage
      return (
        /^\d*$/.test(weightage) &&
        parseInt(weightage) >= 0 &&
        parseInt(weightage) <= 100
      )
    },
    addCriterion () {
      if (this.testWeightage()) {
        this.task.reviewAreas.push({ ques: 'Untitled criterion', points: 0 })
      } else {
        this.displaySnackbar('Invalid task weightage!', 'error')
      }
    },
    editCriterion ({ ra, index }) {
      this.task.reviewAreas[index] = ra
      this.displaySnackbar('Criterion updated successfully!', 'success')
    },
    deleteCriterion (index) {
      this.task.reviewAreas = this.task.reviewAreas.filter(
        (e, ind) => ind !== index
      )
    },
    // validate before submittiong a task and accordingly emit event.
    preprocessValidation (payload, mode) {
      let sum = 0
      let taskWeightage
      if (this.testWeightage()) {
        taskWeightage = this.task.weightage
        for (let i = 0; i < this.task.reviewAreas.length; i++) {
          try {
            sum += parseInt(this.task.reviewAreas[i].points)
          } catch (err) {
            this.message = err.message
            this.showSnackbar = true // show Server error page for this.
          }
        }
        if (sum !== taskWeightage) {
          this.displaySnackbar(
            'Total of points and task weightage should match',
            'error'
          )
        } else {
          this.$emit(`${mode}:task`, payload)
        }
      } else {
        this.displaySnackbar('Invalid task weightage!', 'error')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.heading {
  font-size: 1.5rem;
}
</style>
