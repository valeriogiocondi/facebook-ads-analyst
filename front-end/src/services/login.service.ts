import firebaseService from './firebase.service';


class LoginService  {

  onLoginUp(callback: Function): void {
    
    firebaseService.setOnAuthStateChanged(callback);
  }

  getFirebaseAuthUI(): any {
    
    return firebaseService.authUI;
  }

  isAuth(): boolean {

    return !!localStorage.getItem('authToken');
  }

  // async getToken(): Promise<string> {

  //   // if (!localStorage.getItem('authToken'))
  //   //   return new Promise((res, rej) => res(''));

  //   // return await firebaseService.getToken();

  //   return localStorage.getItem('authToken') ? await firebaseService.getToken() : new Promise((res, rej) => res(''));
  // }

  async generateToken(): Promise<string> {

    return firebaseService.getToken();
  }

  refreshToken(token: string): void {

    localStorage.setItem('authToken', token);
  }

  logout(callback?: Function): void {
  
    firebaseService.logout();
    localStorage.removeItem('authToken');
    callback && callback();
  }
}

// SINGLETON
// Export an instance of the class directly
export default new LoginService();