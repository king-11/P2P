<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10" width="500" height="300" outlined justify-center>
      <v-card-title>Reset Password</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="currentPassword"
          label="Current Password"
          prepend-icon="mdi-lock"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          required
          color="primary"
          :rules="[rules.psmin]"
          @click:append="show1 = !show1"
        />
        <v-text-field
          v-model="newPassword"
          label="New Password"
          prepend-icon="mdi-lock"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          required
          color="primary"
          :rules="[rules.psmin]"
          @click:append="show2 = !show2"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="white black--text" @click="reset">
          Reset
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
export default {
  middleware: ['auth'],
  data () {
    return {
      newPassword: '',
      currentPassword: '',
      show1: false,
      show2: false,
      rules: {
        psmin: v =>
          v.length >= 8 || 'Password should be atleast 8 characters '
      }
    }
  },
  mounted () {
    const provider = localStorage.getItem('provider')
    if (provider !== 'password') {
      this.$router.push('/profile')
    }
  },
  methods: {
    reset () {
      if (this.currentPassword.length > 7 && this.newPassword.length > 7) {
        const user = firebase.auth().currentUser
        const credentials = firebase.auth.EmailAuthProvider.credential(
          user.email,
          this.currentPassword
        )
        user
          .reauthenticateAndRetrieveDataWithCredential(credentials)
          .then((_) => {
            user
              .updatePassword(this.newPassword)
              .then((_) => {
                this.showSnackbar('Password Updated Succesfully ! ', 'green')
                this.$router.push('/profile')
              })
              .catch((err) => {
                this.showSnackbar(err.message, 'red')
              })
          })
          .catch((err) => {
            this.showSnackbar(err.message, 'red')
          })
      } else {
        const msg = 'Password should be minimum of 8 characters'
        this.showSnackbar(msg, 'red')
      }
    },
    showSnackbar (msg, color) {
      this.$store.dispatch('authStore/snackbar', {
        show: true,
        color,
        message: msg
      })
    }
  }
}
</script>

<style>
</style>
