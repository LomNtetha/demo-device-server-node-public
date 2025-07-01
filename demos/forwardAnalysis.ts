import path from "path";
const BytesHexStrUtil = require('../utils/bytesHexStr.ts')
const logger = require('../modules/logger').logger("info");
const {reverseAnalysis} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
const {response} = require(path.join(process.cwd(), "/package/response"));
function forwardAnalysis(hexStr:string){
    let data = protocolAnalysis(hexStr);
    logger.info("Forward Parsing:", JSON.stringify(data,null,1));
    const responseVal = data.length && response(data[0].cmdHeadData, data[0].cmdBodyData);
    logger.info("Response Result:", BytesHexStrUtil.toHexString(responseVal));
    let buf=Buffer.from(responseVal||[]);
}
export {forwardAnalysis}
