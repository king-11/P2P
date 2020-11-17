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
              Submitted by
            </th>
            <th class="text-left">
              Submitted At
            </th>
            <th class="text-left">
              Attachment
            </th>
          </tr>
        </thead>
        <tbody v-if="sub">
          <tr
            v-for="item in submissions"
            :key="item.name"
          >
            <td>{{ item.submitter.first_name }}</td>
            <td>{{ new Date(item.updatedAt).toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' }) }}</td>
            <td>
              <v-chip
                class="ma-1"
                color="white black--text"
                :href="item.attachments[0]"
                target="_blank"
              >
                attachment
              </v-chip>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          No submissions yet !
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
  },
  computed: {
    sub () {
      return this.submissions
    }
  },
  method: {
    formatDate (date) {
      const formatedDate = new Date(date).toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
      return formatedDate
    }
  }
}
</script>
