import React from 'react';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

class Register extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: '',
			validationError: undefined,
		};
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}

	onSubmitRegister = () => {
		console.log(this.state);
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword,
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
	}

	render() {
		return (
			<main className="ma4 black-80 center">
				<div className="measure center shadow-2 mw6 pa4 pl5 pr5 ba b--black br2">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f2 fw6 ph0 mh0">Register</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
							<input 
								onChange={this.onNameChange}
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 br2" 
								type="text" 
								name="name"
								id="name" 
								/>
						</div>
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
						onClick={this.onSubmitRegister} 
						className="b ph3 pv2 ba b--black bg-transparent br2 grow pointer dib" 
						type="submit" 
						value="Register" 
						/>
					<div
						onClick={() => this.props.onRouteChange('signin')}  
						className="lh-copy mt3">
						<a href="#0" className="f6 link dim black db">Sign In</a>
					</div>
					{ this.state.validationError !== undefined && <ErrorAlert errorMessage={this.state.validationError} />}
				</div>
			</main>
		)
	}
}

export default Register;