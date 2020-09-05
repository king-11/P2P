<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="5">
        <v-avatar color="white" size="310">
        <v-avatar v-if="user.imgsrc" size="290">
          <v-img  :src="user.imgsrc" />
        </v-avatar>
          <v-icon v-else color="black" size="290">mdi-account-circle</v-icon>
        </v-avatar>
         <v-btn color="white black--text"  @click.stop="dialogImg = true">Edit</v-btn>
          <v-dialog v-model="dialogImg" overlay-color="white" max-width="390">
            <v-card>
              <v-card-title class="headline">Edit Image</v-card-title>
              <v-card-text  class="text-center">
                <br>
                <v-file-input
                  accept="image/*"
                  placeholder="Pick an image"
                  prepend-icon="mdi-camera"
                  label="Profile Image"
                  @change="previewImage"
                  :rules="[v => !!v || 'This Feild is required']"
                  v-model="file"
                  
                  outlined
                ></v-file-input>
                 <img :src="imageurl" height="150px" width="150px" v-if="file" />
              </v-card-text>
              <v-card-actions>
                <v-btn color="white" text @click="dialogImg = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="white" text @click="EditImage">Save</v-btn>
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
                        <v-icon v-on="on" @click.stop="set">mdi-pencil</v-icon>
                      </template>
                      Edit Name
                    </v-tooltip>
                    <v-dialog v-model="dialog" overlay-color="white" max-width="390">
                      <v-card>
                        <v-card-title class="headline">Edit Name</v-card-title>
                        <v-card-text>
                          <br />
                          <v-text-field
                            label="Name"
                            v-model="name"
                            :rules="[v => !!v || 'This Feild is required']"
                            required
                            color="white"
                            outlined
                          ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="white" text @click="dialog = false">Cancel</v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="white" text @click="EditName">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Email"
                  v-model="user.Email"
                  color="white"
                  prepend-icon="mdi-email-outline"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Institution"
                  v-model="user.Institution"
                  prepend-icon="mdi-school-outline"
                  color="white"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Role"
                  v-model="role"
                  prepend-icon="mdi-account"
                  outlined
                  color="white"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Joined Date"
                  v-model="user.JoinedDate"
                  prepend-icon="mdi-calendar-month"
                  outlined
                  color="white"
                  readonly
                ></v-text-field>
                
              </v-col>

               <v-col cols="12" sm="6" md="6">
                <v-btn class="ma-2" outlined color="white black--text" >
                  <v-icon left>mdi-lock-reset</v-icon>Change Password
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
  data() {
    return {
      user: {
        Name: "S K Singh ",
        Email: "skscse@itbhu.ac.in",
        Instructor: true,
        Institution: "IIT (BHU) Varanasi",
        imgsrc: null,
        JoinedDate: "27 August 2020",
      },
      dialog: false,
      dialogImg: false,
      file: null,
      imageurl: null,
      name: "",
    };
  },
  computed: {
    role() {
      return this.user.Instructor ? "Instructor" : "Student";
    },
  },
  methods: {
    EditName() {
      if (this.name != "") {
        this.dialog = false;
        // send edit request to backend
        this.user.Name = this.name;
      } else {
        return;
      }
    },
    previewImage() {
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageurl = fileReader.result;
          
        });
        fileReader.readAsDataURL(this.file);
      }
    },
    EditImage() {
      if (this.file) {
        this.dialogImg = false;
        this.file = null 
        this.user.imageurl = this.imageurl
      } else {
        return;
      }
    },
    set() {
      this.dialog = true;
      // initializing the value of edit name text feild
      this.name = this.user.Name;
    },
  },
};
</script>

<style >

</style>