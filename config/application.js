
var authenKey = require('../lib/authenKey');

module.exports = {
	
	// Name of the application (used as default <title>)
	appName: "Chad Sails Application",

	// Port this Sails application will live on
	port: process.env.PORT || 1337,

	// The environment the app is deployed in 
	// (`development` or `production`)
	//
	// In `production` mode, all css and js are bundled up and minified
	// And your views and templates are cached in-memory.  Gzip is also used.
	// The downside?  Harder to debug, and the server takes longer to start.
	environment: 'development',

	express: { 
		customMiddleware: function (app) {
			
			app.use(authenKey.expressMiddleware); // calls checkAuthorizationKey
			
			app.use(function(req, res, next) {
				// Enable CORS support, set headers to allow cross domain
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				res.header('Access-Control-Allow-Headers', 'Content-Type');
				next();
			});
		}
	},

	// Logger
	// Valid `level` configs:
	// 
	// - error
	// - warn
	// - debug
	// - info
	// - verbose
	//
	log: {
		level: 'verbose'
	}

};