<template>
  <v-container fluid>
    <v-vard ma-1>
      <v-row>
        <v-col
          cols="12"
          md="11"
          style="
          background: url(https://gstatic.com/classroom/themes/img_code.jpg);
          border-radius: 1vw;
          margin: auto;
        "
        >
          <div
            id="details"
            class="container-fluid"
            style="
            padding-left: 1vw;
            color: aliceblue;
            opacity: 0.9;
            padding-bottom: 5vh;
          "
          >
            <h1 class="overflow">{{ courseTitle }}</h1>
            <h4>Teacher - {{ instructorName }}</h4>
          </div>
        </v-col>
      </v-row>
      <v-row style="margin-top: 4vh">
        <v-col cols="12" lg="9" md="11" style="margin: auto; padding: 0">
          <v-card>
            <v-row>
              <v-col cols="1" class="hidden-xs-only">
                <v-img
                  src="https://static.thenounproject.com/png/2038384-200.png"
                  max-height="50"
                  max-width="50"
                />
              </v-col>
              <v-col cols="11" class="hidden-xs-only">
                hlo;
              </v-col>
              <v-col class="d-sm-none">
                <h4 style="margin-left: 17px">
                  Assignment 1
                </h4>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="margin-top: 4vh">
        <v-col cols="12" lg="9" md="11" style="margin: auto; padding: 0">
          <v-card>
            <v-row>
              <v-col cols="1" class="hidden-xs-only">
                <v-img
                  src="https://static.thenounproject.com/png/2038384-200.png"
                  max-height="50"
                  max-width="50"
                />
              </v-col>
              <v-col cols="11" class="hidden-xs-only">
                hlo;
              </v-col>
              <v-col class="d-sm-none">
                <h4 style="margin-left: 17px">
                  Assignment 1
                </h4>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="margin-top: 4vh">
        <v-col cols="12" lg="9" md="11" style="margin: auto; padding: 0">
          <v-card>
            <v-row>
              <v-col cols="1" class="hidden-xs-only">
                <v-img
                  src="https://static.thenounproject.com/png/2038384-200.png"
                  max-height="50"
                  max-width="50"
                />
              </v-col>
              <v-col cols="11" class="hidden-xs-only">
                hlo;
              </v-col>
              <v-col class="d-sm-none">
                <h4 style="margin-left: 17px">
                  Assignment 1
                </h4>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="margin-top: 4vh">
        <v-col cols="12" lg="9" md="11" style="margin: auto; padding: 0">
          <v-card>
            <v-row>
              <v-col cols="1" class="hidden-xs-only">
                <v-img
                  src="https://static.thenounproject.com/png/2038384-200.png"
                  max-height="50"
                  max-width="50"
                />
              </v-col>
              <v-col cols="11" class="hidden-xs-only">
                hlo;
              </v-col>
              <v-col class="d-sm-none">
                <h4 style="margin-left: 17px">
                  Assignment 1
                </h4>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row style="margin-top: 4vh">
        <v-col cols="12" lg="9" md="11" style="margin: auto; padding: 0">
          <v-card>
            <v-row>
              <v-col cols="1" class="hidden-xs-only">
                <v-img
                  src="https://static.thenounproject.com/png/2038384-200.png"
                  max-height="50"
                  max-width="50"
                />
              </v-col>
              <v-col cols="11" class="hidden-xs-only">
                hlo;
              </v-col>
              <v-col class="d-sm-none">
                <h4 style="margin-left: 17px">
                  Assignment 1
                </h4>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <nuxt-link to="/createassignment" style="color: inherit;text-decoration: none;">
        <v-fab-transition>
          <v-btn
            color="primary"
            fab
            large
            dark
            class="fab"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </nuxt-link>
    </v-vard>
  </v-container>
</template>
<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    courseTitle: 'Computer System And Organisation',
    courseTitlesm: 'Computer System',
    courseCode: 'CSO-211',
    instructorName: ' Prof. SK Singh',
    time: '12:00',
    teacher: true,
    buttonMessageT: 'Delete Course',
    buttonMessageS: 'Leave Course'
  })
}
</script>
<style scoped>
.fab {
    bottom: 0;
    margin: 0 0 16px 16px;
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
  .overflow {
    overflow:hidden;
    white-space:nowrap;
    -ms-text-overflow:ellipsis;
    text-overflow:ellipsis;
    width: 60%;
    height:1.2em;
}
</style>
