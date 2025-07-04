"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const resextra = require('./modules/resextra');
const mount = require('mount-routes');
const createSocket = require('./services/socket');
const app = (0, express_1.default)();
// Start TCP server
createSocket();
/**
 * Public system initialization
 */
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Unified response
app.use(resextra);
// 404 fallback
app.use((req, res, next) => {
    res.sendResult(null, 404, 'Not Found');
});
app.listen(3000, () => {
    console.log('HTTP server is running on port 3000');
});
exports.default = app;
