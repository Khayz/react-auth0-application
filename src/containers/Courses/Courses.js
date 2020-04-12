import React, { Component } from 'react';

export default class Courses extends Component {
	state = {
		courses: [],
	};

	componentDidMount() {
		fetch('/courses', {
			headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
		})
			.then((response) => {
				if (response.ok) return response.json();
				throw new Error('Network response was not ok.');
			})
			.then((data) => this.setState({ courses: data.courses }))
			.catch((error) => this.setState({ message: error.message }));

		fetch('/admin', {
			headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
		})
			.then((response) => {
				if (response.ok) return response.json();
				throw new Error('Network response was not ok.');
			})
			.then((data) => console.log(data))
			.catch((error) => this.setState({ message: error.message }));
	}

	render() {
		return (
			<ul>
				{this.state.courses.map((course) => {
					return <li key={course.id}>{course.title}</li>;
				})}
			</ul>
		);
	}
}
