<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-progress-linear
              v-if="loading"
              height="6"
              indeterminate
              color="white darken-2"
            />
            <v-window v-model="step">
              <v-window-item :value="1" class="cin">
                <v-row>
                  <v-col cols="12" md="8" class="accent">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center display-2 white--text"
                        style="opacity: 0.8"
                      >
                        Sign in
                      </h1>
                      <div class="text-center mt-4">
                        <v-btn
                          class="mx-2"
                          fab
                          color="blue"
                          outlined
                          style="opacity: 0.8"
                          @click="facebook"
                        >
                          <v-icon large>
                            mdi-facebook
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          fab
                          color="white"
                          outlined
                          style="opacity: 0.8"
                          @click="google"
                        >
                          <v-icon large>
                            mdi-google-plus
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          fab
                          color="white"
                          outlined
                          @click="github"
                        >
                          <v-icon color="white" large>
                            mdi-github
                          </v-icon>
                        </v-btn>
                      </div>
                      <h4 class="text-center mt-4" />
                      <v-form>
                        <v-text-field
                          v-model="email"
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          :rules="[rules.minlength]"
                          required
                          color="primary"
                        />
                        <v-text-field
                          v-if="!socialAuth"
                          id="password"
                          v-model="password"
                          label="Password"
                          name="Password"
                          prepend-icon="mdi-lock"
                          :rules="[rules.minlength]"
                          :type="show3 ? 'text' : 'password'"
                          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                          required
                          color="primary"
                          @click:append="show3 = !show3"
                        />
                      </v-form>
                      <div style="text-align: center">
                        <v-btn v-if="!socialAuth" text to="/ForgotPassword">
                          Forgot password ?
                        </v-btn>
                      </div>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn rounded dark @click="ValidSignin">
                        SIGN IN
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">
                        Hello, friends!
                      </h1>
                      <h3 class="text-center">
                        Enter Your details
                      </h3>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step++">
                        SIGN UP
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2" class="sin">
                <v-row class="fill height">
                  <v-col cols="12" md="8" class="accent">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 white--text">
                        Create Account
                      </h1>

                      <div class="text-center mt-4">
                        <h4>Or register with</h4>
                        <v-btn
                          class="mx-2"
                          fab
                          color="blue"
                          outlined
                          style="opacity: 0.8"
                          @click="facebook"
                        >
                          <v-icon large>
                            mdi-facebook
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          fab
                          color="white"
                          outlined
                          style="opacity: 0.8"
                          @click="google"
                        >
                          <v-icon large>
                            mdi-google-plus
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          fab
                          color="black"
                          outlined
                          @click="github"
                        >
                          <v-icon large>
                            mdi-github
                          </v-icon>
                        </v-btn>
                      </div>
                      <v-form>
                        <v-text-field
                          v-model="FirstName"
                          label="Firstname"
                          name="Firstname"
                          prepend-icon="mdi-account"
                          type="text"
                          :rules="[rules.minlength]"
                          required
                          color="primary"
                        />
                        <v-text-field
                          v-model="LastName"
                          label="Lastname"
                          name="Lastname"
                          prepend-icon="mdi-account"
                          type="text"
                          color="primary"
                        />
                        <v-select
                          v-model="gender"
                          label="Gender"
                          name="Gender"
                          prepend-icon="mdi-gender-male-female-variant"
                          :items="Gender"
                          required
                          color="primary"
                        />
                        <v-text-field
                          v-model="Email"
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          :rules="[rules.minlength]"
                          required
                          color="primary"
                        />
                        <v-text-field
                          v-model="Rollnumber"
                          label="Rollnumber"
                          name="Rollnumber"
                          prepend-icon="mdi-account"
                          type="text"
                          :rules="[rules.rollRule, rules.minlength]"
                          :maxlength="11"
                          required
                          color="primary"
                          @keypress="isNumber($event)"
                        />
                        <v-text-field
                          v-if="!socialAuth"
                          id="password"
                          v-model="Password"
                          label="Password"
                          name="Password"
                          prepend-icon="mdi-lock"
                          :type="show4 ? 'text' : 'password'"
                          :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                          required
                          color="primary"
                          :rules="[rules.psmin]"
                          @click:append="show4 = !show4"
                        />
                        <v-text-field
                          v-if="!socialAuth"
                          id="confirm password"
                          v-model="CPassword"
                          label="Confirm Password"
                          name="CPassword"
                          prepend-icon="mdi-lock"
                          :type="show5 ? 'text' : 'password'"
                          :append-icon="show5 ? 'mdi-eye' : 'mdi-eye-off'"
                          required
                          color="primary"
                          :rules="[rules.psmin]"
                          @click:append="show5 = !show5"
                        />
                        <v-select
                          v-model="institute"
                          label="Institute"
                          name="Institue"
                          prepend-icon="mdi-school"
                          :items="items"
                          required
                          color="primary"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn rounded dark @click="ValidSignup">
                        CREATE ACCOUNT
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">
                        Welcome Back!
                      </h1>
                      <h3 class="text-center">
                        Please Sign Up to Continue
                      </h3>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--">
                        SIGN IN
                      </v-btn>
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
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Verify your Email
        </v-card-title>

        <v-card-text>
          A Verification email is send to you , click on the link provided in
          it to verify your email
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="toSignin">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="signIndialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Verify your Email
        </v-card-title>
        <v-card-text>
          Please verify you email to continue , click on the verify buttton to
          send you a verification email
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="signIndialog = false">
            CANCEL
          </v-btn>
          <v-spacer />
          <v-btn color="green darken-1" text @click="sendVerificationEmail">
            VERIFY
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import firebase, { auth } from 'firebase/app'

export default {
  middleware: ['auth'],
  auth: 'guest',
  data () {
    return {
      step: 1, // window change on clicking signup or signin
      items: ['IIT BHU', 'IIT Bombay', 'IIT Madras', 'IIT Delhi'],
      Gender: ['male', 'female', 'other'],
      Email: '', // capital duplicate fields like Email indicate signup form
      password: '',
      FirstName: '',
      LastName: '',
      email: '',
      Rollnumber: '',
      institute: '',
      Password: '',
      CPassword: '',
      gender: '',
      snackbarMessage: '',
      showSnackbar: false, // display snackbar
      show3: false, // eye icon in password
      show4: false,
      show5: false,
      dialog: false,
      signIndialog: false,
      idToken: null,
      socialAuth: false,
      loading: false,
      color: 'error', // snackbar
      mailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      rules: {
        minlength: v => !!v || 'Required!',
        emailRule: v => this.mailPattern.test(v) || 'Invalid email!',
        rollRule: v =>
          v.length < 12 || 'Roll number must be less than 12 digits',
        psmin: v =>
          v.length >= 8 || 'Password should be atleast 8 characters '
      } // basic check for fields
    }
  },
  methods: {
    displaySnackbar (message, color) {
      this.loading = false
      this.snackbarMessage = message
      this.color = color || 'error'
      this.showSnackbar = true
    },
    // to restrict the user  to enter only numbers in roll_number field
    isNumber (evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    ValidSignin () {
      if (!this.socialAuth) {
        // checks email first then password
        if (this.email.length > 0 && this.mailPattern.test(this.email)) {
          if (this.password.length > 0) {
            this.loading = true
            auth()
              .signInWithEmailAndPassword(this.email, this.password)
              .then((data) => {
                // check if the email is verified
                if (data.user.emailVerified) {
                  data.user
                    .getIdToken(true)
                    .then((idToken) => {
                      this.idToken = idToken
                      this.login()
                    })
                    .catch((err) => {
                      this.displaySnackbar(err.message)
                    })
                } else {
                  this.signIndialog = true
                  this.loading = false
                }
              })
              .catch((err) => {
                this.loading = false
                if (err.code === 'auth/user-not-found') {
                  this.displaySnackbar(
                    'No Account Registered with this email . Please SignUp to Continue ! '
                  )
                } else {
                  this.displaySnackbar(err.message)
                }
              })
          } else {
            this.displaySnackbar('Password required', 'error')
          }
        } else {
          this.displaySnackbar('Invalid email', 'error')
        }
      } else {
        this.login()
      }
    },
    ValidSignup () {
      this.loading = true
      if (!this.socialAuth) {
        // checks the fields accordingly to the form if first is ok it goes onto second
        if (this.FirstName.length > 0) {
          if (this.gender && this.gender.length > 0) {
            if (this.Email.length > 0 && this.mailPattern.test(this.Email)) {
              if (this.Rollnumber) {
                if (this.Password.length > 7) {
                  if (this.CPassword === this.Password) {
                    if (this.institute && this.institute.length > 0) {
                      auth()
                        .createUserWithEmailAndPassword(
                          this.Email,
                          this.Password
                        )
                        .then((data) => {
                          data.user
                            .getIdToken(true)
                            .then((idToken) => {
                              this.idToken = idToken
                              data.user
                                .sendEmailVerification()
                                .then(() => {
                                  this.dialog = true
                                  this.register()
                                })
                                .catch((err) => {
                                  this.displaySnackbar(err.message)
                                })
                            })
                            .catch((err) => {
                              this.displaySnackbar(err.message)
                            })
                        })
                        .catch((err) => {
                          this.displaySnackbar(err.message)
                        })
                    } else {
                      this.displaySnackbar('Required Institue', 'error')
                    }
                  } else {
                    this.displaySnackbar('Passwords dont match', 'error')
                  }
                } else if (!this.Password.length) {
                  this.displaySnackbar('Password required', 'error')
                } else {
                  this.displaySnackbar(
                    'Password should be minimum of 8 characters',
                    'error'
                  )
                }
              } else {
                this.displaySnackbar('Required Rollnumber', 'error')
              }
            } else {
              this.displaySnackbar('Invalid Email', 'error')
            }
          } else {
            this.displaySnackbar('Required Gender', 'error')
          }
        } else {
          this.displaySnackbar('Required Firstname', 'error')
        }
      } else {
        this.socialSignUp()
      }
    },
    google () {
      const provider = new auth.GoogleAuthProvider()
      this.social(provider)
    },
    facebook () {
      const provider = new auth.FacebookAuthProvider()
      this.social(provider)
    },
    github () {
      const provider = new auth.GithubAuthProvider()
      this.social(provider)
    },
    social (provider) {
      auth()
        .signInWithPopup(provider)
        .then((data) => {
          data.user
            .getIdToken(true)
            .then((idToken) => {
              this.idToken = idToken
              const names = data.user.displayName.split(/\s+/)
              this.FirstName = names[0]
              this.LastName = names.length > 0 ? names[1] : ''
              this.Email = data.user.email
              this.email = data.user.email
              this.socialAuth = true
              // let the user enter other details
            })
            .catch((err) => {
              this.loading = false
              this.displaySnackbar(err.message)
            })
        })
        .catch((err) => {
          this.loading = false
          this.displaySnackbar(err.message)
        })
    },
    socialSignUp () {
      this.loading = true
      // check all the fields
      if (this.gender && this.gender.length > 0) {
        if (this.Rollnumber) {
          if (this.institute && this.institute.length > 0) {
            this.register()
            this.$router.push('/login')
          } else {
            this.displaySnackbar('Required Institue', 'error')
          }
        } else {
          this.displaySnackbar('Required Rollnumber', 'error')
        }
      } else {
        this.displaySnackbar('Required Gender', 'error')
      }
    },
    register () {
      this.$store.dispatch('authStore/SignUp', {
        first_name: this.FirstName,
        last_name: this.LastName,
        email: this.Email,
        institution: this.institute,
        // setting it to default as the field in not provided in the form
        nationality: 'Indian',
        gender: this.gender,
        roll_number: this.Rollnumber,
        idToken: this.idToken
      })
      if (this.socialAuth) {
        // to signin page
        this.$router.push('/login')
        window.location.reload()
      }
      this.loading = false
    },
    login () {
      this.loading = true
      this.$auth
        .loginWith('local', {
          data: {
            idToken: this.idToken
          }
        })
        .then(() => {
          this.loading = false
          this.$store.dispatch('teacherStore/getCourses', {
            token: this.$auth.getToken('local')
          })
        })
        .catch((err) => {
          this.loading = false
          if (err.message === 'Request failed with status code 404') {
            this.displaySnackbar(
              'No Account Registered with this email , Please SignUp to Continue ! '
            )
          } else {
            this.displaySnackbar(err.message)
          }
        })
    },
    sendVerificationEmail () {
      const user = firebase.auth().currentUser
      user
        .sendEmailVerification()
        .then(() => {
          this.signIndialog = false
          this.dialog = true
        })
        .catch((err) => {
          this.displaySnackbar(err.message)
        })
    },
    toSignin () {
      this.dialog = false
      this.$router.push('/login')
    }
  }
}
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
