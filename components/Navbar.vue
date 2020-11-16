<template>
  <nav>
    <v-navigation-drawer v-if="isSignIn" v-model="navbar" light fixed app>
      <!-- user details section -->
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="imgsrc !== 'null'" :src="imgsrc" />
            <v-avatar v-else color="black">
              <v-icon dark size="40">
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ user.first_name }}
            </v-list-item-title>
            <v-list-item-subtitle class="black--text">
              <span class="grey--text text--darken-3">
                {{ user.email }}
              </span> &mdash;
              {{ user.institution }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- links -->
      <v-list>
        <v-list-item v-for="item in links" :key="item.title" :to="item.route" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer />
    </v-navigation-drawer>
    <v-app-bar light elevate-on-scroll app>
      <v-app-bar-nav-icon v-if="isSignIn" x-large class="black--text text--darken-5" @click="navbar = !navbar" />
      <v-toolbar-title class="text-uppercase d-flex " to="/">
        <div style="display:inline-block;transform: rotateY(180deg)">
          P
        </div>2P
      </v-toolbar-title>
      <v-spacer />
      <v-btn class="ml-auto" depressed href="https://github.com/king-11/P2P">
        <v-icon large>
          mdi-github
        </v-icon>
      </v-btn>
      <v-btn v-if="isSignIn" outlined class="black white--text" to="/" @click="SignOut">
        Sign Out
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      navbar: false,
      imgsrc: null,
      links: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/courses' },
        { title: 'Profile', icon: 'mdi-account', route: '/profile' },
        { title: 'Assignments', icon: 'mdi-equal-box', route: '/assignments' }
      ]
    }
  },
  computed: {

    isSignIn () {
      return this.$store.state.auth.loggedIn
    },
    user () {
      if (this.$store.state.auth.loggedIn) {
        return this.$auth.user.data
      } else {
        return null
      }
    }
  },
  mounted () {
    this.imgsrc = localStorage.getItem('photoUrl')
  },
  methods: {
    async SignOut () {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
