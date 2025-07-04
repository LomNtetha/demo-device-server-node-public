"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeStamp = void 0;
const BytesHexStrUtil = require('../utils/bytesHexStr');
const logger = require('../modules/logger').logger("info");
//const {reverseAnalysis,getBodyLength} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
//const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
const { reverseAnalysis } = require("../package/reverseAnalysis");
// const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
const { protocolAnalysis } = require("../package/protocolAnalysis");
function getTimeStamp(hexStr) {
    var _a, _b, _c;
    let analysisVal = protocolAnalysis(hexStr)[0]; // Forward resolution sends instructions to the server
    logger.info("Forward analysis：", analysisVal);
    let systemTime = (_b = (_a = analysisVal === null || analysisVal === void 0 ? void 0 : analysisVal.cmdBodyData) === null || _a === void 0 ? void 0 : _a.servicesData) === null || _b === void 0 ? void 0 : _b.systemTime;
    if ((analysisVal === null || analysisVal === void 0 ? void 0 : analysisVal.cmdBodyData.cmdType) == 3 && systemTime == "null") {
        let data = [
            {
                cmdHeadData: {
                    flagACK: false,
                    sequenceId: ((_c = analysisVal.cmdHeadData) === null || _c === void 0 ? void 0 : _c.sequenceId) || 0,
                    version: 0
                },
                cmdBodyData: {
                    servicesData: {
                        systemTime: new Date().toISOString() //Convert to zero time zone
                    },
                    cmdType: 3
                }
            }
        ];
        let result = reverseAnalysis(data); // reverseAnalysis is invoked to convert the JSON data format into AB instructions
        logger.info("TimeStamp：", result);
        return result;
    }
}
exports.getTimeStamp = getTimeStamp;
