// JWT config
exports.jwtconfig = {
	secret: "adi_secret",
	expire: 14
};

// audiosear.ch oauth api
exports.audiosearchOauth = {
	AUDIOSEARCH_APP_ID:
		"821cde107a118ed64049a452dba000d0a52823675dcc9844d4e43058ff7330d5",
	AUDIOSEARCH_SECRET:
		"d6b0aff21363540fcae9734a1ad92a13ed0e0b31065c4e9e7c2bdae497235fec"
};

// Connection
exports.port = process.env.PORT;
exports.ipaddr = process.env.IP;

// Database
exports.database = {
	host: "localhost",
	user: "",
	password: "",
	port: "3306",
	database: ""
};

// openshift
/*
// Connection
exports.port =
	process.env.OPENSHIFT_NODEJS_PORT ||
	process.env.OPENSHIFT_INTERNAL_PORT ||
	process.env.PORT ||
	3000;
exports.ipaddr =
	process.env.OPENSHIFT_NODEJS_IP ||
	process.env.OPENSHIFT_INTERNAL_IP ||
	"localhost";

// Database
exports.database = {
	host: process.env.OPENSHIFT_MYSQL_DB_HOST,
	user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
	password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
	port: process.env.OPENSHIFT_MYSQL_DB_PORT,
	database: process.env.OPENSHIFT_GEAR_NAME,
	_socket: "/var/run/mysqld/mysqld.sock"
};
*/
