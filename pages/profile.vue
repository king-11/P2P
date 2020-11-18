<template>
  <v-container justify-space-around>
    <v-row>
      <v-col cols="12" sm="12" md="5" align="center">
        <client-only>
          <v-avatar color="white" size="310">
            <v-avatar v-if="imageurl !== 'null'" size="290">
              <v-img :src="imageurl" />
            </v-avatar>
            <v-icon v-else color="black" size="290">
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </client-only>
        <v-btn
          color="white black--text"
          @click.stop="dialogImg = true"
        >
          Edit
        </v-btn>
        <v-dialog v-model="dialogImg" overlay-color="white" max-width="390">
          <v-card>
            <v-card-title class="headline">
              Edit Image
            </v-card-title>
            <v-card-text class="text-center">
              <br>
              <v-file-input
                v-model="file"
                accept="image/*"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                label="Profile Image"
                :rules="[(v) => !!v || 'This Feild is required']"
                outlined
                required
                @change="previewImage"
              />
              <img v-if="file" :src="imageurl" height="150px" width="150px">
            </v-card-text>
            <v-card-actions>
              <v-btn color="white" text @click="removeImage">
                Cancel
              </v-btn>
              <v-spacer />
              <v-btn color="white" text @click="EditImage">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" sm="12" md="7">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="name"
                  label="Name"
                  color="white"
                  outlined
                  readonly
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" @click.stop="set">
                          mdi-pencil
                        </v-icon>
                      </template>
                      Edit Name
                    </v-tooltip>
                    <v-dialog
                      v-model="dialog"
                      overlay-color="white"
                      max-width="390"
                    >
                      <v-card>
                        <v-card-title class="headline">
                          Edit Name
                        </v-card-title>
                        <v-card-text>
                          <br>
                          <v-text-field
                            v-model="firstName"
                            label="First Name"
                            :rules="[(v) => !!v || 'This Feild is required']"
                            required
                            color="white"
                            outlined
                          />
                          <v-text-field
                            v-model="lastName"
                            label="Last Name"
                            :rules="[(v) => !!v || 'This Feild is required']"
                            required
                            color="white"
                            outlined
                          />
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            color="white"
                            text
                            @click="dialog = false"
                          >
                            Cancel
                          </v-btn>
                          <v-spacer />
                          <v-btn
                            color="white"
                            text
                            @click="EditName"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  color="white"
                  prepend-icon="mdi-email-outline"
                  outlined
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.institution"
                  label="Institution"
                  prepend-icon="mdi-school-outline"
                  color="white"
                  outlined
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="role"
                  label="Role"
                  prepend-icon="mdi-account"
                  outlined
                  color="white"
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.roll_number"
                  label="Roll Number"
                  prepend-icon="mdi-badge-account-horizontal-outline"
                  outlined
                  color="white"
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.nationality"
                  label="Nationality"
                  prepend-icon="mdi-earth"
                  outlined
                  color="white"
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="joinedDate"
                  label="Joined Date"
                  prepend-icon="mdi-calendar-month"
                  outlined
                  color="white"
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.gender"
                  label="Gender"
                  prepend-icon="mdi-gender-male-female-variant"
                  outlined
                  color="white"
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-btn
                  v-if="provider === 'password'"
                  class="ma-2"
                  outlined
                  color="white black--text"
                  to="/ResetPassword"
                >
                  <v-icon left>
                    mdi-lock-reset
                  </v-icon>Change Password
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      dialog: false,
      dialogImg: false,
      file: null,
      imageurl: null,
      firstName: '',
      lastName: '',
      provider: null
    }
  },
  computed: {
    user () {
      if (this.$store.state.auth.loggedIn) {
        const userdata = this.$auth.user.data
        return userdata
      } else {
        return null
      }
    },
    name () {
      const userdata = this.user
      const name = userdata.first_name + '  ' + userdata.last_name
      return name
    },
    role () {
      return this.user.teacher ? 'Instructor' : 'Student'
    },
    joinedDate () {
      const date = new Date(this.user.createdAt)
      return date.toLocaleString(['en-US'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  mounted () {
    this.imageurl = localStorage.getItem('photoUrl')
    this.provider = localStorage.getItem('provider')
  },
  methods: {
    EditName () {
      if (this.name !== '') {
        this.dialog = false
        const updatedUser = this.user
        updatedUser.first_name = this.firstName
        updatedUser.last_name = this.lastName
        const token = this.$auth.getToken('local')
        this.$store.dispatch('authStore/editUser', {
          updatedUser,
          token
        })
      } else {
      }
    },
    previewImage () {
      if (this.file) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageurl = fileReader.result
        })
        fileReader.readAsDataURL(this.file)
      }
    },
    EditImage () {
      if (this.file) {
        this.dialogImg = false

        this.$store.dispatch('authStore/editProfileImage', {
          file: this.file
        })
        this.file = null
      } else {
      }
    },
    set () {
      this.dialog = true
      this.firstName = this.user.first_name
      this.lastName = this.user.last_name
    },
    removeImage () {
      this.file = null
      this.dialogImg = false
    }
  }
}
</script>

<style >
</style>
