<template>
  <v-container>
    <v-simple-table
      fixed-header
      height="300px"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Submitted by :
            </th>
            <th class="text-left">
              Attachment
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in submissions"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.attachment }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  middleware: ['auth'],
  async fetch () {
    const header = {
      params: {
        courseId: this.$route.params.id,
        assignmentId: this.$route.params.assg,
        userSpecific: 'F'
      },
      headers: {
        Authorization: this.$auth.getToken('local')
      }
    }

    const submissions = await this.$axios.$get(
      'https://arcane-mountain-95630.herokuapp.com/submission',
      header
    )
    this.submissions = submissions
  },
  data () {
    return {
      submissions: [
      ]
    }
  }
}
</script>
