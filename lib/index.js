"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stop = stop;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _graphqlServerExpress = require("graphql-server-express");

var _graphqlTools = require("graphql-tools");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = function server(_ref) {
  var typeDefs = _ref.types,
      resolvers = _ref.resolvers;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? function (req) {
    return {};
  } : _ref2$context,
      _ref2$port = _ref2.port,
      port = _ref2$port === undefined ? 3002 : _ref2$port,
      _ref2$endpoint = _ref2.endpoint,
      endpoint = _ref2$endpoint === undefined ? "/graphql" : _ref2$endpoint;

  var app = (0, _express2.default)();

  app.use((0, _cors2.default)({ origin: function origin(_origin, cb) {
      return cb(null, true);
    }, credentials: true }));
  app.use(endpoint, _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (req) {
    return { schema: (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers }), context: context(req) };
  }));

  var server = app.listen(port, function () {
    return console.log("Running on http://localhost:" + server.address().port + endpoint);
  });

  return server;
};

function stop(app) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  app.close();
  done();
}

exports.default = server;