<template>
  <v-container>
    <v-toolbar class="mx-xs-0 mx-sm-4 mx-md-10 mx-lg-14 mx-xl-16 rounded-lg">
      <v-toolbar-title>
        <strong>Reviewed Submissions</strong>
      </v-toolbar-title>
      <v-spacer />
      <v-switch
        v-model="switch1"
        inset
        color="white"
        :label="switch1 ? 'Complted' : 'Inphase'"
      />
    </v-toolbar>
  </v-container>
</template>
<script>

export default {
  middleware: ['auth'],
  data: () => ({
    switch1: true
  }),

  computed: {
  },

  methods: {
  }
}
</script>
