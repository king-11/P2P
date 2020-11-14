/* eslint-disable */     
import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/storage'
import axios from 'axios';
const BASE_URL = 'https://arcane-mountain-95630.herokuapp.com';

export const state = () => ({

    snackbar: {
        show: false,
        color: "blue",
        message: "",
    }
})

export const mutations = {

    snackbar(state, payload) {
        state.snackbar = payload
    },
}

export const actions = {

    async SignUp({ commit }, payload) {

        console.log(payload)
        
        axios.post(`${BASE_URL}/auth/signup`, payload)
            .then(token => {
                this.$router.push('/instructor')
                commit('snackbar', {
                    show: true,
                    color: "green",
                    message: "Account Created succesfully"
                })
            }).catch(err => {
                commit('snackbar', {
                    show: true,
                    color: "red",
                    message: "An Acoount with this email Alredy exists ! "
                })
            })
    },

    editUser({ commit, state },payload ) {

        const config = {
            headers: {
                Authorization: payload.token,
            }
        }

        axios.put(`${BASE_URL}/user/`,payload.updatedUser , config )
            .then(res => {
                commit('snackbar', {
                    show: true,
                    color: "success",
                    message: "Name Updated Succesfully ! "
                })
            })
            .catch(err => {
                commit('snackbar', {
                    show: true,
                    color: "red",
                    message: err.message
                })
            })

    },

    editProfileImage({ commit },payload){
        
        const user = firebase.auth().currentUser ;
        
       firebase.storage().ref('users/' + user.uid ).put(payload.file)
       .then(async (fileData) => {

          const  imageUrl = await firebase.storage().ref('users').child(fileData.metadata.name).getDownloadURL()
       
            user.updateProfile({
                photoURL: imageUrl
              }).then(function() {
                  localStorage.setItem("photoUrl",imageUrl)
                   commit('snackbar', {
                    show: true,
                    color: "success",
                    message: "Profile Image Updated Succesfully ! "
                })
              }).catch(err => {
                commit('snackbar', {
                    show: true,
                    color: "red",
                    message: err.message
                })
              });
        })
    },
    snackbar({ commit }, payload) {
        commit('snackbar', payload)
    },

}

export const getters = {

    snackbar(state) {
        return state.snackbar
    },
}
