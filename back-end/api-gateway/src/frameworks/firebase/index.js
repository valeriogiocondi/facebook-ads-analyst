/* 
 *
 *    https://firebase.google.com/docs/auth/admin/errors
 *
 *    https://console.firebase.google.com/u/0/project/facebook-ads-d5326/overview
 *
 */
'use strict';
require('dotenv').config();
const firebase = require('firebase-admin');


class FirebaseProxy {

  init() {
    
    try {
      
      firebase.initializeApp({
        apiKey:              process.env.FIREBASE_API_KEY,
        authDomain:          process.env.FIREBASE_AUTH_DOMAIN,
        projectId:           process.env.FIREBASE_PROJECT_ID,
        storageBucket:       process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId:   process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId:               process.env.FIREBASE_APP_ID,
      });
      
    } catch (error) {
      
      console.error(error);
    }
  }

  async verifyToken (token) {

    try {

      // decrypt token
      // check if email is in white list
      return await firebase.auth().verifyIdToken(token).then(decodedToken => !!decodedToken);

    } catch (err) {

        console.error(err);
    }
    return false;
  }
}


// SINGLETON
// Export an instance of the class directly
const firebaseProxy = new FirebaseProxy();
firebaseProxy.init();

module.exports = firebaseProxy;