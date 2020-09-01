<template>
  <nav>
    <v-navigation-drawer v-model="navbar" light fixed app>
      <!-- user details section -->
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="user.imgsrc" src="user.imgsrc" />
            <v-avatar v-else color="black">
              <v-icon dark size="40">
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ user.Name }}
            </v-list-item-title>
            <v-list-item-subtitle class="black--text">
              <span class="grey--text text--darken-3">
                {{ user.Email }}
              </span> &mdash;
              {{ user.Institution }}
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
      <v-app-bar-nav-icon x-large class="black--text text--darken-5" @click="navbar = !navbar" />
      <v-toolbar-title class="text-uppercase">
        <div style="display:inline-block;transform: rotateY(180deg)">
          P
        </div>2P
      </v-toolbar-title>
      <v-spacer />
      <v-btn outlined class="black white--text" to="/">
        Sign Out
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      user: {
        Name: 'S K Singh',
        Email: 'skscse@itbhu.ac.in',
        Instructor: true,
        Institution: 'IIT (BHU) Varanasi',
        imgsrc: null
      },
      navbar: false,
      links: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/instructor' },
        { title: 'Profile', icon: 'mdi-account-group', route: '/profile' },
        { title: 'Assignments', icon: 'mdi-equal-box', route: '/assignments' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
