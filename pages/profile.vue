<template>
  <v-container justify-space-around>
    <v-row>
      <v-col cols="12" sm="12" md="5" align="center">
        <v-avatar color="white" size="310">
          <v-avatar v-if="user.imgsrc" size="290">
            <v-img :src="user.imgsrc" />
          </v-avatar>
          <v-icon v-else color="black" size="290">
            mdi-account-circle
          </v-icon>
        </v-avatar>
        <v-btn color="white black--text" @click.stop="dialogImg = true">
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
                :rules="[v => !!v || 'This Feild is required']"
                outlined

                @change="previewImage"
              />
              <img v-if="file" :src="imageurl" height="150px" width="150px">
            </v-card-text>
            <v-card-actions>
              <v-btn color="white" text @click="dialogImg = false">
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
                <v-text-field v-model="user.Name" label="Name" color="white" outlined readonly>
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" @click.stop="set">
                          mdi-pencil
                        </v-icon>
                      </template>
                      Edit Name
                    </v-tooltip>
                    <v-dialog v-model="dialog" overlay-color="white" max-width="390">
                      <v-card>
                        <v-card-title class="headline">
                          Edit Name
                        </v-card-title>
                        <v-card-text>
                          <br>
                          <v-text-field
                            v-model="name"
                            label="Name"
                            :rules="[v => !!v || 'This Feild is required']"
                            required
                            color="white"
                            outlined
                          />
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="white" text @click="dialog = false">
                            Cancel
                          </v-btn>
                          <v-spacer />
                          <v-btn color="white" text @click="EditName">
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
                  v-model="user.Email"
                  label="Email"
                  color="white"
                  prepend-icon="mdi-email-outline"
                  outlined
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="user.Institution"
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
                  v-model="user.JoinedDate"
                  label="Joined Date"
                  prepend-icon="mdi-calendar-month"
                  outlined
                  color="white"
                  readonly
                />
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-btn class="ma-2" outlined color="white black--text">
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
  data () {
    return {
      user: {
        Name: 'S K Singh ',
        Email: 'skscse@itbhu.ac.in',
        Instructor: true,
        Institution: 'IIT (BHU) Varanasi',
        imgsrc: null,
        JoinedDate: '27 August 2020'
      },
      dialog: false,
      dialogImg: false,
      file: null,
      imageurl: null,
      name: ''
    }
  },
  computed: {
    role () {
      return this.user.Instructor ? 'Instructor' : 'Student'
    }
  },
  methods: {
    EditName () {
      if (this.name !== '') {
        this.dialog = false
        // send edit request to backend
        this.user.Name = this.name
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
        this.file = null
        this.user.imageurl = this.imageurl
      } else {

      }
    },
    set () {
      this.dialog = true
      // initializing the value of edit name text feild
      this.name = this.user.Name
    }
  }
}
</script>

<style >

</style>
