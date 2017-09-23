var jwt = require('jwt-simple');
var moment = require('moment');
var conf = require('../config');

exports.generateTestToken = function(userLogin) {
	var payload = {
        login: userLogin,
        exp: moment().add(conf.jwtconfig.expire, 'days').valueOf()
    };

    var token = jwt.encode(payload, conf.jwtconfig.secret);

    return token;
};