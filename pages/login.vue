<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1" class="cin">
                <v-row>
                  <v-col cols="12" md="8" class="accent">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center display-2 white--text"
                        style="opacity:0.8"
                      >Sign in to web</h1>
                      <div class="text-center mt-4">
                        <v-btn class="mx-2" fab color="blue" outlined style="opacity:0.8">
                          <v-icon large>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="white" outlined style="opacity:0.8">
                          <v-icon large>mdi-google-plus</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon large>mdi-github</v-icon>
                        </v-btn>
                      </div>
                      <h4 class="text-center mt-4"></h4>
                      <v-form>
                        <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          :rules="[rules.emailRule]"
                          v-model="email"
                          required
                          color="primary"
                        ></v-text-field>
                        <v-text-field
                          id="password"
                          label="Password"
                          name="Password"
                          prepend-icon="mdi-lock"
                          :rules="[rules.minlength]"
                          :type="show3 ? 'text' : 'password'"
                          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                          v-model="password"
                          required
                          color="primary"
                          @click:append="show3 = !show3"
                        ></v-text-field>
                      </v-form>
                      <div style="text-align:center;">
                        <v-btn text>Forgot your password</v-btn>
                      </div>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn rounded dark @click="ValidSignin">SIGN IN</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Hello, friends!</h1>
                      <h3 class="text-center">Enter Your details</h3>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2" class="sin">
                <v-row class="fill height">
                  <v-col cols="12" md="8" class="accent">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center display-2 white--text"
                        style="opacity:0.8"
                      >Create Account</h1>

                      <div class="text-center mt-4">
                        <h4>Or register with</h4>
                        <v-btn class="mx-2" fab color="blue" outlined style="opacity:0.8">
                          <v-icon large>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="white" outlined style="opacity:0.8">
                          <v-icon large>mdi-google-plus</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon large>mdi-github</v-icon>
                        </v-btn>
                      </div>
                      <v-form>
                        <v-text-field
                          label="Firstname"
                          name="Firstname"
                          prepend-icon="mdi-account"
                          type="text"
                          :rules="[rules.minlength]"
                          v-model="FirstName"
                          required
                          color="primary"
                        ></v-text-field>
                        <v-text-field
                          label="Lastname"
                          name="Lastname"
                          prepend-icon="mdi-account"
                          type="text"
                          v-model="LastName"
                          color="primary"
                        ></v-text-field>
                        <v-select
                          label="Gender"
                          name="Gender"
                          prepend-icon="mdi-gender-male-female-variant"
                          :items="Gender"
                          v-model="gender"
                          required
                          color="primary"
                        ></v-select>
                        <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          :rules="[rules.minlength,rules.emailRule]"
                          v-model="Email"
                          required
                          color="primary"
                        ></v-text-field>
                        <v-text-field
                          id="password"
                          label="Password"
                          name="Password"
                          prepend-icon="mdi-lock"
                          :type="show4 ? 'text' : 'password'"
                          :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                          v-model="Password"
                          required
                          color="primary"
                          @click:append="show4 = !show4"
                          :rules="[rules.psmin]"
                        ></v-text-field>
                        <v-text-field
                          id="confirm password"
                          label="Confirm Password"
                          name="CPassword"
                          prepend-icon="mdi-lock"
                          :type="show5 ? 'text' : 'password'"
                          :append-icon="show5 ? 'mdi-eye' : 'mdi-eye-off'"
                          v-model="CPassword"
                          required
                          color="primary"
                          @click:append="show5 = !show5"
                          :rules="[rules.psmin]"
                        ></v-text-field>
                        <v-select
                          label="Institute"
                          name="Institue"
                          prepend-icon="mdi-school"
                          :items="items"
                          v-model="institute"
                          required
                          color="primary"
                        ></v-select>
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn @click="ValidSignup" rounded dark>CREATE ACCOUNT</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Welcome Back!</h1>
                      <h3 class="text-center">Please Sign Up to Continue</h3>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="showSnackbar" app bottom :color="color" rounded>
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn icon text v-bind="attrs" @click="showSnackbar = false">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1, //window change on clicking signup or signin
      items: ["IIT BHU", "IIT Bombay", "IIT Madras", "IIT Delhi"],
      Gender: ["Male", "Female", "Others"],
      Email: "", //capital duplicate fields like Email indicate signup form
      password: "",
      FirstName: "",
      LastName: "",
      email: "",
      institute: "",
      Password: "",
      CPassword: "",
      gender: "",
      snackbarMessage: "",
      showSnackbar: false, //display snackbar
      show3: false, //eye icon in password
      show4: false,
      show5: false,
      color: "error", //snackbar
      mailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      rules: {
        minlength: (v) => !!v || "Required!",
        emailRule: (v) => this.mailPattern.test(v) || "Invalid email!",
        psmin: (v) =>
          v.length >= 8 || "Password should be atleast 8 characters ",
      }, //basic check for fields
    };
  },
  props: {
    source: String,
  },
  methods: {
    displaySnackbar(message, color) {
      this.snackbarMessage = message;
      this.color = color || "error";
      this.showSnackbar = true;
    },
    ValidSignin() {
      // checks email first then password
      if (this.email.length > 0 && this.mailPattern.test(this.email)) {
        if (this.password.length > 0) {
          //this.displaySnackbar("Successfully signed in", "success");
        } else {
          this.displaySnackbar("Password required", "error");
        }
      } else this.displaySnackbar("Invalid email", "error");
    },
    ValidSignup() {
      //checks the fields accordingly to the form if first is ok it goes onto second
      if (this.FirstName.length > 0) {
        if (this.gender && this.gender.length > 0) {
          if (this.Email.length > 0 && this.mailPattern.test(this.Email)) {
            if (this.Password.length > 7) {
              if (this.CPassword === this.Password) {
                if (this.institute && this.institute.length > 0) {
                  this.displaySnackbar("Successfully Signed Up", "success");
                } else {
                  this.displaySnackbar("Required Institue", "error");
                }
              } else {
                this.displaySnackbar("Passwords dont match", "error");
              }
            } else if (!this.Password.length) {
              this.displaySnackbar("Password required", "error");
            } else {
              this.displaySnackbar(
                "Password should be minimum of 8 characters",
                "error"
              );
            }
          } else this.displaySnackbar("Invalid Email", "error");
        } else this.displaySnackbar("Required Gender", "error");
      } else {
        this.displaySnackbar("Required Firstname", "error");
      }
    },
  },
};
</script>
<style scoped>
.sin {
  background-image: url("https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.8;
}
.cin {
  background-image: url("https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.7;
}
</style>