import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
const BASE_URL = 'https://arcane-mountain-95630.herokuapp.com'

export const state = () => ({
})

export const mutations = {
}

export const actions = {
  createSubmission ({ commit }, payload) {
    const header = {
      headers: {
        Authorization: payload.token
      }
    }
    const file = payload.data.attachments[0]
    firebase.storage().ref('submissions/' + file.name).put(file)
      .then(async (fileData) => {
        const imageUrl = await firebase.storage().ref('submissions').child(fileData.metadata.name).getDownloadURL()
        payload.data.attachments = [imageUrl]
        axios.post(`${BASE_URL}/submission/`, payload.data, header)
          .then((data) => {
            this.$router.push(`/courses/${payload.data.course}`)
            commit('authStore/snackbar', {
              show: true,
              color: 'green',
              message: 'Assignment submitted Succesfully !'
            }, { root: true })
          }).catch((err) => {
            let msg = err.message
            if (err.message === 'Request failed with status code 403') {
              msg = 'Submission deadline is over'
            }
            commit('authStore/snackbar', {
              show: true,
              color: 'red',
              message: msg
            }, { root: true })
          })
      })
  },
  updateSubmission ({ commit }, payload) {
    const header = {
      headers: {
        Authorization: payload.token
      }
    }
    const file = payload.data.attachments[0]
    firebase.storage().ref('submissions/' + file.name).put(file)
      .then(async (fileData) => {
        const imageUrl = await firebase.storage().ref('submissions').child(fileData.metadata.name).getDownloadURL()
        payload.data.attachments = [imageUrl]
        axios.put(`${BASE_URL}/submission/${payload.id}`, payload.data, header)
          .then((data) => {
            this.$router.push(`/courses/${payload.course}/assignments/${payload.data.assignment}`)
            commit('authStore/snackbar', {
              show: true,
              color: 'green',
              message: 'Assignment updated Succesfully !'
            }, { root: true })
          }).catch((err) => {
            let msg = err.message
            if (err.message === 'Request failed with status code 403') {
              msg = 'Submission deadline is over'
            }
            commit('authStore/snackbar', {
              show: true,
              color: 'red',
              message: msg
            }, { root: true })
          })
      })
  }
}

export const getters = {
}
