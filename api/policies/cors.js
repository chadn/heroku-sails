/**
* CORS - enable cross-origin resource sharing
*/
//console.log('cors init');
module.exports = function (req, res, next) {
	// set headers to allow cross domain
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	//console.log('cors set');
	next();
};