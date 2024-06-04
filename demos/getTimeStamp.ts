import path from "path";
const BytesHexStrUtil = require('../utils/bytesHexStr.ts')
const logger = require('../modules/logger').logger("info");
const {reverseAnalysis,getBodyLength} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
function getTimeStamp(hexStr:string){
    let analysisVal=protocolAnalysis(hexStr)[0]// Forward resolution sends instructions to the server
    logger.info("Forward analysis：", analysisVal)
    let systemTime=analysisVal?.cmdBodyData?.servicesData?.systemTime
    if(analysisVal?.cmdBodyData.cmdType==3&&systemTime=="null"){
        let data= [
            {
                cmdHeadData:{
                    flagACK:false,
                    sequenceId:analysisVal.cmdHeadData?.sequenceId||0,// Gets the sequenceId from which the instruction was sent
                    version:0
                },
                cmdBodyData:{
                    servicesData:{
                        systemTime:new Date().toISOString() //Convert to zero time zone
                    },
                    cmdType:3
                }
            }
        ]
        let result=reverseAnalysis(data)// reverseAnalysis is invoked to convert the JSON data format into AB instructions
        logger.info("TimeStamp：", result)
        return result
    }
}
export {getTimeStamp}
