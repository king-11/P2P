<template>
  <v-container
    class="ok"
    fluid
    style="
      height: 100vh;
      background: url();
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100% 100%;
      padding: 0;
    "
  >
    <v-row v-if="statusCheck">
      <v-col v-if="statusCheck" cols="12" style="text-align:right;padding-bottom:0;padding-right:7%">
        <b> <i>{{ returnDate }}</i></b>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="11" offset-md="1" style="padding: 0">
        <div
          style="
            width: 100%;
            height: 100vh;
            margin: 0;
            padding-left: 0.5%;
          "
        >
          <v-row style="margin-bottom: 0">
            <v-col md="8" class="d-none d-md-block" style="padding-left: 4%">
              <h1>{{ title }}</h1>
              <h5>{{ dueDate }}</h5>
            </v-col>
            <v-col v-if="statusCheck" md="4" class="d-none d-md-block">
              <h4>Points</h4>
              <h4><b>{{ points }}</b></h4>
            </v-col>
            <v-col
              sm="9"
              class="hidden-xs-only d-md-none"
              style="padding-left: 6%"
            >
              <h2>{{ title }}</h2>
              <h5>{{ dueDate }}</h5>
            </v-col>
            <v-col
              v-if="statusCheck"
              sm="3"
              class="hidden-xs-only d-md-none"
              style="text-align: right; padding-right: 8%"
            >
              <h5>points</h5>
              <h5><b>{{ points }}</b></h5>
            </v-col>
            <v-col xs="8" class="d-sm-none" style="padding-left: 8%">
              <h3>{{ title }}</h3>
              <h6>{{ dueDate }}</h6>
            </v-col>
            <v-col
              v-if="statusCheck"
              xs="4"
              class="d-sm-none"
              style="text-align: right; padding-right: 8%"
            >
              <h6>points</h6>
              <h6 style="margin-left: 1%">
                <b>{{ points }}</b>
              </h6>
            </v-col>
          </v-row>
          <v-row style="margin-top: 0; padding-top: 0">
            <v-col
              class="d-none d-md-block"
              style="padding-left: 4%; padding-top: 0"
            >
              <h4 style="">
                Instructions
              </h4>
              <h5>No late submissions</h5>
            </v-col>
            <v-col class="hidden-xs-only d-md-none" style="padding-left: 6%">
              <h4>Instructions</h4>
              <h5>No late submissions</h5>
            </v-col>
            <v-col class="d-sm-none" style="padding-left: 8%">
              <h5>Instructions</h5>
              <h6>No late submissions</h6>
            </v-col>
          </v-row>

          <v-row>
            <!-- md -->
            <v-col cols="7" class="d-none d-md-block" style="padding-left: 3%">
              <v-file-input

                placeholder="demo.pdf"
                label="Reference Materials"
                prepend-icon="mdi-paperclip"
                outlined
                dense
              />
            </v-col>
            <!-- sm -->
            <v-col cols="8" class="hidden-xs-only d-md-none" style="padding-left: 4%">
              <v-file-input

                placeholder="demo.pdf"
                label="Reference Materials"
                prepend-icon="mdi-paperclip"
                outlined

                dense
              />
            </v-col>
            <!-- xs -->
            <v-col cols="11" class="d-sm-none" style="padding-left:5%">
              <v-file-input

                placeholder="demo.pdf"
                label="Reference Materials"
                prepend-icon="mdi-paperclip"

                dense
              />
            </v-col>
          </v-row>

          <v-row>
            <!-- md -->
            <v-col cols="7" class="d-none d-md-block" style="padding-left: 3%">
              <v-file-input

                placeholder="Upload your documents"
                label="My Work"
                prepend-icon="mdi-paperclip"
                outlined
                dense
                chips
              />
            </v-col>
            <!-- sm -->
            <v-col cols="8" class="hidden-xs-only d-md-none" style="padding-left: 4%">
              <v-file-input

                placeholder="Upload your documents"
                label="My Work"
                prepend-icon="mdi-paperclip"
                outlined
                chips
                dense
              />
            </v-col>
            <!-- xs -->
            <v-col cols="11" class="d-sm-none" style="padding-left:5%">
              <v-file-input

                placeholder="Upload your documents"
                label="My Work"
                prepend-icon="mdi-paperclip"
                small-chips
                dense
              />
            </v-col>
          </v-row>
          <v-row v-if="status && statusCheck==false">
            <v-col class="d-none d-md-block" style="padding-left: 4%">
              <v-btn elevation="1">
                submit
              </v-btn>
            </v-col>
            <v-col class="hidden-xs-only d-md-none" style="padding-left: 6%">
              <v-btn elevation="1" small>
                submit
              </v-btn>
            </v-col>
            <v-col class="d-sm-none" style="padding-left: 8%">
              <v-btn elevation="1" x-small>
                submit
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="status==false || statusCheck ">
            <v-col
              class="d-none d-md-block"
              style="padding-left: 4%; padding-top: 0"
            >
              <h5>Handed In!!</h5>
            </v-col>
            <v-col class="hidden-xs-only d-md-none" style="padding-left: 6%">
              <h5>Handed In!!</h5>
            </v-col>
            <v-col class="d-sm-none" style="padding-left: 8%">
              <h6>Handed In!!</h6>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    // source: String
  },
  data: () => ({
    title: 'Assignment 1',
    courseTitlesm: 'Computer System',
    courseCode: 'CSO-211',
    instructorName: ' Prof. SK Singh',
    time: '12:00',
    dueDate: 'Due 2 October 2020 23:59',
    status: true,
    statusCheck: true,
    points: '23.5/25',
    returnDate: 'Returned Thu Oct 21 22:08'

  })
}
</script>