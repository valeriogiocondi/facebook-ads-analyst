import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

class FirebaseService  {

  private _user: firebase.User | null;
  private _auth: firebase.auth.Auth;
  private _unsubscribe: firebase.Unsubscribe;
  private _config: any;
  private _ui: any;

  constructor() {

    this._config = {
      apiKey: "AIzaSyDpDrOV4twG00-LOSOBFl3D9zndKmDVbkw",
      authDomain: "facebook-ads-d5326.firebaseapp.com",
      projectId: "facebook-ads-d5326",
      storageBucket: "facebook-ads-d5326.appspot.com",
      messagingSenderId: "670558925272",
      appId: "1:670558925272:web:d6aa5dd2757d332e4b82ad",
      scopes: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/calendar"
      ]
    };
  }

  /* 
   *  Get new token through getIdToken(), if user is valid
   *  
   */
  init() {

		firebase.initializeApp(this._config);
    this._auth = firebase.auth();
    
    /* 
     * UI Module
     * Initialize the FirebaseUI Widget using Firebase.
     *
     */
		this._ui = new firebaseui.auth.AuthUI(this._auth); 
  }

  /* 
   * Factory - Login UI Module
   *
   */
  get authUI() {
    
    return {
      ui: this._ui,
      config: {
        signInSuccessUrl: "localhost:3000", // Assuming you are running on your local machine
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: this._config.scopes
          }
        ],
        // Terms of service url.
        tosUrl: "localhost:3000"
      }
    };
  }

  /* 
   *  Waiting for first attempt to login
   *  
   */
  get user(): firebase.User | null {
    return this._user;
  }

  async getToken(): Promise<string> {

    this._user = this._auth.currentUser;
    
    // Get new token
    const token = this._user ? ('Bearer ' + await this._user.getIdToken(true)) : '';
    
    if (token) 
      localStorage.setItem('authToken', token);
      
    return token;
  }

  /* 
   *  This function will trigger when there is a login event
   *  
   */
  setOnAuthStateChanged(callback: Function) {

		this._unsubscribe = this._auth.onAuthStateChanged(async (resultUser: firebase.User | null) => {
        
      if (resultUser) {

        localStorage.setItem('authToken', await this.getToken());
        
        // TODO
        // Save info inside Redux

        // console.log(resultUser.displayName)
        // alert(resultUser.email)
        // console.log(resultUser.refreshToken)
        this._user = resultUser;
        callback();
      }

      // NOT LOGGED
    });
	}

  /* 
   *  firebase logout
   *  
   */
  async logout(): Promise<void> {
    
    await this._auth.signOut();
    this._unsubscribe();
  }
}

// SINGLETON
// Export an instance of the class directly
const firebaseService = new FirebaseService();
firebaseService.init();

export default firebaseService;