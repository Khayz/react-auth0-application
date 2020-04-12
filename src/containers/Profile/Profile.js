import React, { useEffect, useState, useCallback } from 'react';

const Profile = ({ auth }) => {
	const [profile, setProfile] = useState({});
	const [error, setError] = useState('');

	const loadUserProfile = useCallback(() => {
		auth.getProfile((profile, error) => {
			setProfile(profile);
			setError(error);
		});
	}, [auth]);

	useEffect(() => {
		loadUserProfile();
	}, [loadUserProfile]);

	return (
		<>
			<h1>Profile</h1>
			<p>{profile.nickname}</p>
			<img
				style={{ maxWidth: 50, maxHeight: 50 }}
				src={profile.picture}
				alt='profile pic'
			/>
			<pre>{JSON.stringify(profile, null, 2)}</pre>
		</>
	);
};

export default Profile;
