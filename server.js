const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const checkScope = require('express-jwt-authz');
require('dotenv/config');

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
	}),

	audience: process.env.REACT_APP_AUTH0_AUDIENCE,
	issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
	algorithms: ['RS256'],
});

const app = express();

app.get('/public', (req, res) => {
	res.json({ message: 'Hello from a public API' });
});

app.get('/private', checkJwt, (req, res) => {
	res.json({ message: 'Hello from a private API' });
});

function checkRole(role) {
	return function (req, res, next) {
		const assignedRoles = req.user['http://localhost:3000/roles'];
		if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
			return next();
		} else {
			return res.status(401).send('Insufficient role');
		}
	};
}

app.get('/courses', checkJwt, checkScope(['read:courses']), (req, res) => {
	res.json({
		courses: [
			{ id: 1, title: 'Building apps with react and redux' },
			{ id: 2, title: 'Creating reusable react components' },
		],
	});
});
app.get('/admin', checkJwt, checkRole('admin'), (req, res) => {
	res.json({
		message: 'Hello from an admin API',
	});
});

app.listen(3001, () =>
	console.log('Server running on ' + process.env.REACT_APP_AUTH0_AUDIENCE)
);
