import axios from 'axios'
const BASE_URL = 'https://arcane-mountain-95630.herokuapp.com'

export const state = () => ({
})

export const mutations = {
}

export const actions = {

 createCourse ({ commit }, payload) {

    const header = {
      headers: {
        Authorization: payload.token
      }
    }
   axios.post(`${BASE_URL}/teacher/course/`,payload.data ,header )
    .then(data => {
        this.$router.push('/instructor')
        commit('authStore/snackbar', {
            show: true,
            color: "green",
            message: "Course created Succesfully !"
        },{ root: true })
    }).catch( err => {
      let msg = err.message
      if(err.message == 'Request failed with status code 400'){
          msg = 'A course with this code already Exists ! Please choose other code'
      }
        commit('authStore/snackbar', {
            show: true,
            color: "red",
            message: msg
        },{ root: true })
    })
  }
}

export const getters = {
}
