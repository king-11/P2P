<template>
  <v-container fluid>
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
          <v-card-title class="white--text">
            <span class="headline">{{ course.name }}</span>

            <v-spacer></v-spacer>

            <v-menu bottom left :close-on-content-click="false">
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      dark
                      icon
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                    >
                      <v-icon large>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <span>More Info</span>
                </v-tooltip>
              </template>
              <v-card class="mx-auto" width="300">
                <v-list>
                  <v-list-group :value="false" prepend-icon="mdi-account-tie">
                    <template v-slot:activator>
                      <v-list-item-title>Teacher</v-list-item-title>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>{{
                          instructor.first_name
                        }}</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>{{
                          instructor.email
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-list-group>
                  <v-list-group :value="false" prepend-icon="mdi-account">
                    <template v-slot:activator>
                      <v-list-item-title>Teaching Assistants</v-list-item-title>
                    </template>
                    <v-list>
                      <v-list-item v-for="(item, i) in course.ta" :key="i">
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-list-group>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-barcode-scan</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title
                      >ClassCode
                      <v-chip
                        class="ml-2 font-weight-bold"
                        color="white black--text"
                        label
                      >
                        {{ course.classCode }}
                      </v-chip>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-account-group</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title
                      >Total Students - {{ course.totalStudents }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-card-title>
          <v-card-subtitle>
            <v-chip
              class="mt-2 font-weight-bold"
              color="white black--text"
              label
            >
              {{ course.code }}
            </v-chip>
          </v-card-subtitle>
        </div>
      </v-col>
    </v-row>
    <div
      v-for="(assg, i) in assignments"
      :key="i"
    >
      <v-row style="margin-top: 4vh">
        <v-col cols="12" lg="9" md="11" style="margin: auto; padding: 0">
          <v-card>
            <v-row>
              <v-col cols="1" class="hidden-xs-only">
                <v-img
                  src="https://static.thenounproject.com/png/2038384-200.png"
                  max-height="50"
                  max-width="50"
                  class="img"
                />
              </v-col>
              <v-col cols="11" class="hidden-xs-only">
                <v-card-title>{{ assg.title }}</v-card-title>
              </v-col>
              <v-col class="d-sm-none">
                <h4 style="margin-left: 17px">{{ assg.title }}</h4>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div  v-if="!noAssg" class="text-xs-center mt-3 ml-10">
        No assignments in this course yet ! 
    </div>
    <nuxt-link
      to="/createassignment"
      style="color: inherit; text-decoration: none"
    >
      <v-fab-transition>
        <v-btn v-if="teacher" color="primary" fab large dark class="fab">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </nuxt-link>
  </v-container>
</template>
<script>
export default {
  middleware: ["auth"],
  async fetch() {
    const header = {
      headers: {
        Authorization: this.$auth.getToken("local"),
      },
    };
    let course = await this.$axios.$get(
      `https://arcane-mountain-95630.herokuapp.com/teacher/course/${this.$route.params.id}`,
      header
    );
    console.log(course);
    this.course = course;
    this.instructor = course.instructor;
  },
  data: () => ({
    course: {},
    instructor: {},
    assignments : [
        {
            title:'Assignment1',
        },
         {
            title:'Assignment2',
        },
         {
            title:'Assignment3',
        }
    ],
    buttonMessageT: "Delete Course",
    buttonMessageS: "Leave Course",
  }),
  computed : {
      noAssg(){
          return this.assignments.length
      },
      teacher(){
         return this.$auth.user.data.teacher
      }
  }
};
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
  overflow: hidden;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  width: 60%;
  height: 1.3em;
}
.img {
  filter: brightness(0) invert(1);
}
</style>
