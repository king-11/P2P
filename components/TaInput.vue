<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="12" sm="5">
        <v-text-field
          v-if="editMode"
          v-model="bufferTa.name"
          type="text"
          label="Name"
          color="primary"
          placeholder="Name of teaching assistant"
          :rules="[rules.minlength]"
          :disabled="!editMode"
          :outlined="breakpoint"
          required
        />
        <v-sheet v-else class="ml-1">
          <strong class="info--text">Name:</strong> {{ ta.name }}
          <v-divider />
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field
          v-if="editMode"
          v-model="bufferTa.email"
          type="text"
          label="Email"
          color="primary"
          placeholder="Email of teaching assistant"
          :rules="[rules.minlength, rules.emailRule]"
          :disabled="!editMode"
          required
          :outlined="breakpoint"
        />
        <v-sheet
          v-else
        >
          <strong class="info--text">Email:</strong> {{ ta.email }}
          <v-divider />
        </v-sheet>
      </v-col>
      <v-spacer />
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
      <v-row class="hidden-sm-and-up mx-1 mt-n2" justify="space-around">
        <v-col cols="6" class="pr-1">
          <v-btn
            color="primary"
            outlined
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
  name: 'TaInput',
  props: {
    index: {
      type: Number,
      default: 1
    },
    ta: {
      type: Object,
      required: true
    },
    breakpoint: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // eslint-disable-next-line no-useless-escape
      mailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      rules: {
        minlength: v => !!v || 'Required!',
        optionalMinLength: v => !!v || 'Length should not be zero!',
        emailRule: v => this.mailPattern.test(v) || 'Invalid email!'
      },
      // we will always edit buffer ta and not actual prop
      bufferTa: {
        name: '',
        email: ''
      },
      editMode: false
    }
  },
  mounted () {
    this.bufferTa.email = this.ta.email
    this.bufferTa.name = this.ta.first_name
  },
  methods: {
    validateTa () {
      if (this.bufferTa.name.length > 0) {
        if (this.bufferTa.email.length > 0 && this.mailPattern.test(this.bufferTa.email)) {
          return true
        } else {
          this.$emit('display:snackbar', 'Invalid email!')
          return false
        }
      } else {
        this.$emit('display:snackbar', 'Invalid name!')
        return false
      }
    },
    editHandler () {
      if (this.editMode) {
        if (this.validateTa()) {
          // update the ta with buffer ta and emit signal to emit in the database to.
          this.ta = Object.assign(this.ta, this.bufferTa)
          this.$emit('edit:ta', { ta: this.ta, index: this.index })
          this.editMode = !this.editMode
        }
      } else {
        // inititate edit mode by assigning buffer ta the properties of ta o that they can be edited.
        this.bufferTa = Object.assign(this.bufferTa, this.ta)
        this.editMode = !this.editMode
      }
    },
    discardHandler () {
      if (this.editMode) {
        // don't update actual ta object and clear the buffer ta
        this.bufferTa = Object.assign(this.bufferTa, { name: '', email: '' })
        this.editMode = !this.editMode
      } else {
        // emit signal to delete the actual ta.
        this.$emit('delete:ta', this.index)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
