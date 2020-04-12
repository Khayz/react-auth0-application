import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import Navbar from './components/Navbar';
import Auth from './auth/Auth';
import Callback from './containers/Callback/Callback';
import Public from './containers/Public/Public';
import Private from './containers/Private/Private';
import Courses from './containers/Courses/Courses';
import PrivateRoute from './containers/PrivateRoute/PrivateRoute';
import AuthContext from './Context/AuthContext';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: new Auth(this.props.history),
			tokenRenewalComplete: false,
		};
	}

	componentDidMount() {
		this.state.auth.renewToken(() =>
			this.setState({ tokenRenewalComplete: true })
		);
	}

	render() {
		const { auth } = this.state;
		if (!this.state.tokenRenewalComplete) return 'Loading...';
		return (
			<AuthContext.Provider value={auth}>
				<Navbar auth={auth} />
				<div className='body'>
					<Route
						path='/'
						exact
						render={(props) => <Home auth={auth} {...props} />}
					/>
					<Route
						path='/callback'
						render={(props) => <Callback auth={auth} {...props} />}
					/>
					<PrivateRoute path='/profile' component={Profile} />
					<Route path='/public' component={Public} />
					<PrivateRoute path='/private' component={Private} />
					<PrivateRoute
						path='/courses'
						component={Courses}
						scopes={['read:courses']}
					/>
				</div>
			</AuthContext.Provider>
		);
	}
}
