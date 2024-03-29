import React from 'react';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			validationError: undefined,
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = (event) => {
		console.log(this.state);
		fetch(process.env.REACT_APP_API_URL+'/signin', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			})
		})
			.then(async response => {
				const data = await response.json();
				if (response.status !== 200) {
					throw new Error(data);
				}
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			})
			.catch(error => this.setState({validationError: error.toString()}));
		event.preventDefault();
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<main className="ma4 black-80 center">
				<div className="measure center shadow-2 mw6 pa4 pl5 pr5 ba b--black br2">
					<form onSubmit={this.onSubmitSignIn}>
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input 
									onChange={this.onEmailChange}
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br2" 
									type="email" 
									name="email-address"  
									id="email-address" 
									/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input 
									onChange={this.onPasswordChange}
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br2" 
									type="password" 
									name="password"
									id="password" 
									/>
							</div>
						</fieldset>
						<input 
							className="b ph3 pv2 ba b--black bg-transparent br2 grow pointer dib" 
							type="submit" 
							value="Sign in" 
							/>
					</form>
					{ this.state.validationError !== undefined && <ErrorAlert errorMessage={this.state.validationError} />}
					<div 
						onClick={() => onRouteChange('register')} 
						className="lh-copy mt3">
						<a href="#0" className="f6 link dim black db">Register</a>
					</div>
				</div>
			</main>
		)
	}
}

export default SignIn;