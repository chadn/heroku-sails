

// Setup env
var APPROVED_API_KEY = process.env.APPROVED_API_KEY || ''; // temporary.  TODO: use db or similar.
if (!APPROVED_API_KEY) {
	sails.log.warn('APPROVED_API_KEY env variable not found, api key will not be required.');
} else {
	sails.log('APPROVED_API_KEY env variable found, api key will be required for create, update, delete.');
}

/**
 * checkAuthorizationKey() is a super simple way to prevent anyone from modifying API data.
 * It works by clients including an API KEY or token in the request URL.
 * As such, the KEY needs to be kept hidden.  It should only be used with https, not http.  
 * If sent over http, the KEY can be known and anyone can use.
 * 
 * It was designed to work in heroku, where it is easily to use env variables to store
 * and update the KEY as often as needed. 
 * 
 * It is not intended to be used with multiple users - it is best when all clients that need
 * to use the KEY can also be updated as often as needed.  Please use something like passport
 * for a mroe complete authentication system. 
 *
 * Example
 *
 * checkAuthorizationKey(req, function(isAuthorized, msg){
 *   if (!isAuthorized) {
 *     sails.log('checkAuthorizationKey failed: '+ msg);
 *     return res.json({msg:msg}, 401);
 *   }
 *   next();
 * });
 * 
 * @param {Object} req is standard express request object
 * @param {Function} cb(isAuthorized, msg): isAuthorized is boolean, msg provides details when not isAuthorized
 */
function checkAuthorizationKey(req, cb) {
	if (!APPROVED_API_KEY) {
		return cb(true, 'skipping checkAuthorizationKey.');
	}
	var keyRequired = isKeyRequired(req);
	
	/* 
	 * Allow key to be anywhere in the URL. When found, remove and re-assemble req.url
	 * Valid URL examples:
	 * /:controller
	 * /:controller/:apikey
	 * /:apikey/:controller
	 * /:controller/:action
	 * /:controller/:action/:apikey
	 * /:controller/:apikey/:action/:id
	 * /:apikey/:controller/:action/:id
	 */
	m = req.url.match(new RegExp('/(\\w{'+ APPROVED_API_KEY.length +'})\\b', 'g'));
	if (!m) {
		if (keyRequired) {
			return cb(false, 'Need key, none found.');
		} else {
			return cb(true, 'Valid key not required, none found');
		}
	}
	//sails.log('Potential keys found, checking matches', m);
	for (var ii=0; ii<m.length; ii++) {
		// TODO: lookup in db
		if (m[ii] === '/'+ APPROVED_API_KEY) {
			req.url = req.url.replace(m[ii],''); // remove key from URL
			//sails.log('key found ('+ m[ii] +'), url update: ', req.url);
			return cb(true, 'Found and removed valid key: '+ m[ii]);
		}
	}
	if (keyRequired) {
		return cb(false, 'No valid keys found.');
	} else {
		return cb(true, 'Valid key not required, none found');
	}
}


/**
 * isKeyRequired()  checks req.path to see if key is required.  Basically
 * only require correct api key if doing anything but 'simple' GET (index, find, findAll).
 *
 * TODO: ideally we use sails to parse url and get actions, or maybe use config/policies.js
 * for now we just hardcode what we want anyone be able to GET.
 * 
 * @param {Object} req is standard express request object
 * @return {Boolean} true if key is required based on req.path
 */
function isKeyRequired(req) {

	// list all controllers or model names that do not require keys
	var doNotRequireKey = [
		'', // home page, no path
		'user'
	];
	var m = req.path.match(/^\/([^\/]*)\/?$/i);
	if (req.method === 'GET' && m) {
		if (doNotRequireKey.indexOf(m[1]) > -1) {
			return false;
		}
	}
	return true
}


function expressMiddleware(req, res, next) {
	sails.log.verbose('expressMiddleware before checkAuthorizationKey, req.url: '+ req.url);
	checkAuthorizationKey(req, function(isAuthorized, msg){
		if (!isAuthorized) {
			sails.log('checkAuthorizationKey returning 401: isAuthorized='+ isAuthorized +': '+ msg);
			return res.json({msg:msg}, 401);
		}
		sails.log.verbose('expressMiddleware after checkAuthorizationKey, req.url: '+ req.url);
		next();
	});
};
module.exports.checkAuthorizationKey = checkAuthorizationKey;
module.exports.expressMiddleware  = expressMiddleware;
