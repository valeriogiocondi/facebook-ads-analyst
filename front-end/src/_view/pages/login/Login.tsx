import React from 'react';
import { Redirect } from 'react-router-dom';

// SERVICES
import loginService from '../../../services/login.service';

// FIREBASE
import firebase from 'firebase'
import 'firebaseui/dist/firebaseui.css'

// STYLE
import './Login.less';
import logo from '../../../static/images/FACEBOOK-ADS.png';


type LoginState = {
	username: string,	
	password: string,	
	redirect: boolean,
};
type LoginProps = {};

export default class Login extends React.PureComponent<LoginProps, LoginState> {
	
	constructor(props) {
    
		super(props);
		this.state = {
			username: "",
			password: "",
      redirect: false,
		}
	}

	async componentWillMount() {
		
		// Update callback after login
		// console.log('Update callback after login')
		loginService.onLoginUp(() => this.setState({ redirect: true }));
		
		if (await loginService.isAuth())
			this.setState({ redirect: true })
	}

	componentDidMount() { 

		const authUI = loginService.getFirebaseAuthUI();	
		authUI.ui.start("#firebaseui-auth-container", authUI.config);
	}
		
	// setUsername = (e: Event): void => {
	// 	this.setState({'username': e.target.value});
	// };
		
	// setPassword = (e: Event): void => {
	// 	this.setState({'password': e.target.value});
	// };
		
	// login = async (e: Event): Promise<void> => {
		
	// 	e.preventDefault();

	// 	let response = await loginService.auth(this.state.username, this.state.password);
	// 	if (response)
	// 		this.setState({ redirect: true });
	// }
	
	renderRedirect = () => {

    if (this.state.redirect)
      return <Redirect to={{ pathname: "/" }} />;
  }
    
	render() {
		
		return (
			<React.Fragment>
				{ this.renderRedirect() }
				<div id="login" className="">
					<div className="image-intro left"></div>
					<div className="form-wrapper right">
						<header>
							<img className="logo" src={ logo } alt="Logo Sapienza"/>
							{/* <h1 className="title">Login</h1> */}
						</header>
						<section>
						{/* 
							<form onSubmit={this.login}>
								<div className="input-text">
									<input type="text" placeholder="E-mail" onChange={this.setUsername} />
								</div>
								<div className="input-text">
									<input type="password" placeholder="Password" onChange={this.setPassword} />
								</div>
								<div>
									<button type="submit" className="btn btn-primary"> Login </button>
								</div>
							</form>
							 */}
							<div id="firebaseui-auth-container"></div>
						</section>
					</div>
					<div className="clearfix"></div>
				</div>
			</React.Fragment>
    );
  }
}