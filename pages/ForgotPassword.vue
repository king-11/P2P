<template>
  <v-container fluid>
    <v-card class="mx-auto mt-10" width="500" height="250" outlined justify-center>
      <v-card-title>Reset Password</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="Email"
          label="Email"
          name="Email"
          prepend-icon="mdi-email"
          type="text"
          :rules="[rules.minlength]"
          required
          color="primary"
          outlined
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
import { auth } from 'firebase/app'
export default {
  middleware: ['auth'],
  auth: 'guest',
  data () {
    return {
      Email: '',
      rules: {
        minlength: v => !!v || 'Required!',
        emailRule: v => this.mailPattern.test(v) || 'Invalid email!'
      },
      mailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  methods: {
    reset () {
      if (this.Email.length > 0 && this.mailPattern.test(this.Email)) {
        auth()
          .sendPasswordResetEmail(this.Email)
          .then((user) => {
            const msg =
              'The reset password link has been sent to your email. Please check the inbox'
            this.showSnackbar(msg, 'info')
            this.$router.push('/login')
          })
          .catch((err) => {
            this.showSnackbar(err.message, 'red')
          })
      } else {
        const msg = 'Please enter a valid email'
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
