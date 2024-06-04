import path from "path";
const logger = require('../modules/logger').logger("info");
const {reverseAnalysis} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
function findMeDemo(hexStr:string){
    let analysisVal=protocolAnalysis(hexStr)[0]// Forward resolution sends instructions to the server
    // logger.info("Forward analysis：", analysisVal)
    let val = [
            {
                cmdHeadData: {
                    flagACK: false,
                    version: 0,
                    checkCRC: 52643,
                    length: 3,
                    sequenceId: 1,
                },
                cmdBodyData: {
                    systemData: {
                        findMe: null
                    },
                    cmdType: 4
                },
            }
        ]
        return reverseAnalysis(val)
}
export {findMeDemo}
