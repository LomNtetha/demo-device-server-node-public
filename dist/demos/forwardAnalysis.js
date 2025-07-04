"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardAnalysis = void 0;
const BytesHexStrUtil = require('../utils/bytesHexStr');
const fs = require('fs');
const logger = require('../modules/logger').logger("info");
//const {reverseAnalysis} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
//const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
// const {reverseAnalysis} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
const { reverseAnalysis } = require("../package/reverseAnalysis");
// const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
const { protocolAnalysis } = require("../package/protocolAnalysis");
// const {response} = require(path.join(process.cwd(), "/package/response"));
const { response } = require("../package/response");
function forwardAnalysis(hexStr) {
    let data = protocolAnalysis(hexStr);
    console.log("JSON Data:", JSON.stringify(data, null, 2));
    fs.writeFileSync('testdb.json', JSON.stringify(data, null, 2));
    logger.info("Forward Parsing:", JSON.stringify(data, null, 1));
    const responseVal = data.length && response(data[0].cmdHeadData, data[0].cmdBodyData);
    logger.info("Response Result:", BytesHexStrUtil.toHexString(responseVal));
    let buf = Buffer.from(responseVal || []);
}
exports.forwardAnalysis = forwardAnalysis;
