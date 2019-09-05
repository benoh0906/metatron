import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };
  
  class Firebase {
      constructor() {
          app.initializeApp(config)
          this.auth = app.auth()
          this.db = app.firestore()
          this.storage = app.storage()
      }

      doCreateUserWithEmailAndPassword = (email, password)=>{
          return this.auth.createUserWithEmailAndPassword(email,password)
      }
      
      doSignInWithEmailAndPassword = (email,password) => 
        this.auth.signInWithEmailAndPassword(email,password)
    
      doSignOut = () => this.auth.signOut()

      doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)
    
        user = uid => this.db.collection('users').doc(uid)
        users = () => this.db.collection('users')

      // storage

      doStoreFile = file => this.storage.ref().child(file.name).put(file)
  }

export default Firebase