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

  createAssignment ({ commit }, payload) {
    const header = {
      params : { courseId : payload.id },
      headers: {
        Authorization: payload.token
      }
    }
    const files = payload.data.attachments
    const urls = []
    if(files.length > 0 ){
    files.forEach((file) => {
      firebase.storage().ref('attachments/' + file.name).put(file)
        .then(async (fileData) => {
          const imageUrl = await firebase.storage().ref('attachments').child(fileData.metadata.name).getDownloadURL()
          urls.push(imageUrl)
          if (urls.length === files.length) {
            payload.data.attachments = urls
            console.log(payload.data,payload.token)
            
             axios.post(`${BASE_URL}/assignment/`,payload.data ,header )
             .then(data => {
              this.$router.push('/courses')
              commit('authStore/snackbar', {
                  show: true,
                  color: "green",
                  message: "Assignment created Succesfully !"
              },{ root: true })
          }).catch( err => {
              commit('authStore/snackbar', {
                  show: true,
                  color: "red",
                  message: err.message
              },{ root: true })
          })
          }
        })
    })
  }
  else {
    axios.post(`${BASE_URL}/assignment/`,payload.data ,header )
    .then(data => {
     this.$router.push('/courses')
     commit('authStore/snackbar', {
         show: true,
         color: "green",
         message: "Assignment created Succesfully !"
     },{ root: true })
 }).catch( err => {
     commit('authStore/snackbar', {
         show: true,
         color: "red",
         message: err.message
     },{ root: true })
 })
  }
  }
}

export const getters = {
}
