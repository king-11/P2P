
import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCYe0DEp3CCt4iwva2rsHKF6Jt5P4Edvpg',
  authDomain: 'peer2peer-a77ac.firebaseapp.com',
  databaseURL: 'https://peer2peer-a77ac.firebaseio.com',
  projectId: 'peer2peer-a77ac',
  storageBucket: 'peer2peer-a77ac.appspot.com',
  messagingSenderId: '803810913279',
  appId: '1:803810913279:web:ce71fca2e030c6dfce55ca',
  measurementId: 'G-YNDKRFSWHN'
}

// eslint-disable-next-line no-unused-expressions
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem('photoUrl', user.photoURL)
    localStorage.setItem('provider', user.providerData[0].providerId)
  }
})

export const auth = firebase.auth()
export default firebase
