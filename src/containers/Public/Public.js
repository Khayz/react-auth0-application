import React, { Component } from 'react';

export default class Public extends Component {
	state = {
		message: '',
	};

	componentDidMount() {
		fetch('/public')
			.then((response) => {
				if (response.ok) return response.json();
				throw new Error('Network response was not ok.');
			})
			.then((data) => this.setState({ message: data.message }))
			.catch((error) => this.setState({ message: error.message }));
	}

	render() {
		return <p>{this.state.message}</p>;
	}
}
