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
    <v-container>
      <v-card v-for="(item,i) in reviews" :key="i">
        <v-card-title>
          madhava
          <v-spacer />
          {{ item.score }}
        </v-card-title>
        <v-card-text>
          <v-treeview
            rounded
            hoverable
            activatable
            :items="reviews"
          />
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>

export default {
  middleware: ['auth'],
  data: () => ({
    switch1: true,
    reviews: [
      {
        name: 'reviews',
        score: '20',
        id: 1,
        children: [
          {
            id: 2,
            name: 'review 1',
            children: [
              { id: 16, name: 'October : pdf' },
              { id: 18, name: 'Tutorial : html' }
            ]
          },
          {
            id: 3,
            name: 'review 2',
            children: [
              { id: 16, name: 'October : pdf' },
              { id: 18, name: 'Tutorial : html' }]
          },
          {
            id: 4,
            name: 'review 3',
            children: [
              { id: 16, name: 'October : pdf' },
              { id: 18, name: 'Tutorial : html' }]
          }
        ]
      }
    ]
  }),

  computed: {
  },

  methods: {
  }
}
</script>
