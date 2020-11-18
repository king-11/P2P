import axios from 'axios'
const BASE_URL = 'https://arcane-mountain-95630.herokuapp.com'

export const data = () => {}
export const actions = {
  joinCourse ({ commit }, payload) {
    const header = {
      headers: {
        Authorization: payload.token
      }
    }
    axios.put(`${BASE_URL}/user/courses/`, payload.data, header)
      .then((data) => {
        commit('authStore/snackbar', {
          show: true,
          color: 'green',
          message: 'Course joined successfully !'
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
