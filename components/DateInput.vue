<template>
  <v-menu
    ref="menu"
    v-model="showMenu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="250px"
    @update:return-value="emitDate"
  >
    <template v-slot:activator="{on, attrs}">
      <v-text-field
        v-model="date"
        color="primary"
        label="Submission deadline"
        hint="YYYY-MM-DD format"
        persistent-hint
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer />
      <v-btn text color="primary" @click="showMenu = false">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">
        Ok
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: 'DateInput',
  data () {
    return {
      showMenu: false,
      date: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    emitDate (updatedDate) {
      this.$emit('update:date', updatedDate)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
