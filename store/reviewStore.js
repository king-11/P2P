import axios from 'axios'
const BASE_URL = 'https://arcane-mountain-95630.herokuapp.com'

export const state = () => ({
})

export const mutations = {
}

export const actions = {

  createReview ({ commit }, payload) {
    const header = {
      headers: {
        Authorization: payload.token
      }
    }
    axios.post(`${BASE_URL}/review/`, payload.data, header)
      .then((data) => {
        this.$router.push(`/courses/${payload.data.course}/assignments/${payload.data.assignment}/allSubmissions`)
        commit('authStore/snackbar', {
          show: true,
          color: 'green',
          message: 'Review submitted Succesfully !'
        }, { root: true })
      }).catch((err) => {
        commit('authStore/snackbar', {
          show: true,
          color: 'red',
          message: err.message
        }, { root: true })
      })
  }

}

export const getters = {
}
