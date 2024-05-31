import path from "path";
const {reverseAnalysis} = require(path.join(process.cwd(), "/package/reverseAnalysis"));

function findMeDemo(){
    let val= [
        {
            "cmdHeadData":{
                "flagACK":true,
                "checkCRC":19262,
                "length":18,
                "sequenceId":4,
                "version":0
            },
            "cmdBodyData":{
                "locationData":{
                    "imei":"123456789012349"
                },
                "cmdType":1
            },
            "originalData":"AB 10 12 00 3E 4B 04 00 01 10 01 31 32 33 34 35 36 37 38 39 30 31 32 33 34 39"
        }
    ]
   return  reverseAnalysis(val)
}
export {findMeDemo}