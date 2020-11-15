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
        this.$router.push('/courses')
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
  },

  deleteCourse ({ commit }, payload) {

    console.log(payload)

    const header = {
      headers: {
        Authorization: payload.token
      }
    }
   axios.delete(`${BASE_URL}/teacher/course/${payload.id}`,header )
    .then(data => {
        this.$router.push('/courses')
        commit('authStore/snackbar', {
            show: true,
            color: "green",
            message: "Course deleted Succesfully !"
        },{ root: true })
    }).catch( err => {
  
        commit('authStore/snackbar', {
            show: true,
            color: "red",
            message: err.message
        },{ root: true })
    })
  },

}

export const getters = {
}
