<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="12" sm="8">
        <v-text-field
          v-if="editMode"
          v-model="bufferRA.ques"
          :rules="[rules.minLength]"
          counter
          :outlined="breakpoint"
          maxlength="100"
          label="Question"
        />
        <v-sheet v-else class="ml-1">
          <strong class="info--text">Ques:</strong> {{ reviewArea.ques }}
          <v-divider />
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field
          v-if="editMode"
          v-model.number="bufferRA.points"
          :rules="[rules.weightageRule]"
          :outlined="breakpoint"
          label="Points"
        />
        <v-sheet v-else class="ml-1">
          <strong class="info--text">Points:</strong> {{ reviewArea.points }}
          <v-divider />
        </v-sheet>
      </v-col>
      <v-col sm="2" class="hidden-xs-only">
        <v-row align="center" justify="space-around">
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{on,attr}">
              <v-btn
                color="primary"
                icon
                fab
                small
                outlined
                v-bind="attr"
                v-on="on"
                @click="editHandler()"
              >
                <v-icon dark>
                  {{ editMode? "mdi-content-save":"mdi-pencil" }}
                </v-icon>
              </v-btn>
            </template>
            <span>{{ editMode? "Save":"Edit" }}</span>
          </v-tooltip>
          <v-tooltip bottom :color="editMode?'warning':'error'">
            <template v-slot:activator="{on, attr}">
              <v-btn
                icon
                fab
                small
                outlined
                :color="editMode?'warning':'error'"
                v-bind="attr"
                v-on="on"
                @click="discardHandler()"
              >
                <v-icon dark>
                  {{ editMode? "mdi-arrow-left-circle":"mdi-delete" }}
                </v-icon>
              </v-btn>
            </template>
            <span>{{ editMode? "Return":"Delete" }}</span>
          </v-tooltip>
        </v-row>
      </v-col>
      <v-row class="hidden-sm-and-up mr-1" justify="space-around">
        <v-col cols="6" class="pr-1">
          <v-btn
            color="primary"
            outlined
            small
            @click="editHandler()"
          >
            <v-icon dark>
              {{ editMode? "mdi-save-content":"mdi-pencil" }}
            </v-icon>
            {{ editMode? "Save":"Edit" }}
          </v-btn>
        </v-col>
        <v-col cols="6" class="pr-1">
          <v-btn
            :color="editMode?'warning':'error'"
            outlined
            small
            @click="discardHandler()"
          >
            <v-icon dark>
              {{ editMode? "mdi-arrow-left-circle":"mdi-delete" }}
            </v-icon>
            {{ editMode? "Return":"Delete" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-row>
    <v-divider class="hidden-sm-and-up" />
  </div>
</template>
<script>
export default {
  name: 'ReviewPallete',
  props: {
    reviewArea: {
      type: Object,
      default () {
        return {
          ques: 'Untitled Criterion',
          points: 0
        }
      }
    },
    // because user may enter a NaN and that would produse unwanted vue-warn in console.
    // eslint-disable-next-line vue/require-prop-types
    taskWeightage: {
      default: 0
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      editMode: false,
      bufferRA: {
        ques: '',
        points: 0
      },
      rules: {
        minLength: value => !!value || 'Required!',
        weightageRule: (value) => {
          if (
            /^\d*$/.test(value) &&
            (value === '' ||
              (parseInt(value) <= this.taskWeightage && parseInt(value) >= 0))
          ) { return true } else {
            return 'Invalid number or points greater than task weightage'
          }
        }
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
    // for all validation related things(including the display of snackbar).
    validationHandler () {
      if (/^\d*$/.test(this.bufferRA.points) && parseInt(this.bufferRA.points) <= this.taskWeightage && parseInt(this.bufferRA.points) >= 0) {
        if (this.bufferRA.ques.length > 0) {
          return true
        } else {
          this.$emit('show:snackbar', 'Title is missing!')
        }
      } else {
        this.$emit('show:snackbar', 'Invalid points for criterion!')
      }
    },
    editHandler () {
      if (this.editMode) {
        if (this.validationHandler()) {
          // update the criterion with buffer criterion and emit signal to update in the database to.
          this.reviewArea = { ...this.bufferRA }
          this.$emit('edit:criterion', { ra: this.reviewArea, index: this.index })
          this.editMode = !this.editMode
        } // no else required as required snackbars are shown in validationHandler
      } else {
        // inititate edit mode by assigning buffer criterion the properties of criterion o that they can be edited.
        this.bufferRA = { ...this.reviewArea }
        this.editMode = !this.editMode
      }
    },
    discardHandler () {
      if (this.editMode) {
        this.bufferRA = { ...{ ques: '', points: '' } }
        this.editMode = !this.editMode
      } else {
        // emit signal to delete the actual criterion.
        this.$emit('delete:criterion', this.index)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.criterion-text {
  font-size: 1rem;
}
</style>
