import path from "path";
const {reverseAnalysis} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
function testReverseAnalysis(){
    let val=[{
        "cmdHeadData": {
            "sequenceId": 20,
            "length": 51,
            "checkCRC": 33515,
            "version": 0,
            "flagACK": true
        },
        cmdBodyData:{
            "cmdType":3,
            "servicesData": {
                "addresses":{
                    "address":"工具人",
                    "lng":0.0,
                    "lat":0.0
                }
       /* "addresses":{
        "address":"",
            "lng":0.0,
            "lat":0.0
    }*/
               /* "wifi2":{
                    "wifiList":[
                        {
                            "name":"eview",
                            "signal":-90,
                            "mac":"AC:C6:62:E4:C9:B0"
                        }
                    ]
                }*/
            }
        }
    }]
    reverseAnalysis(val)
}
export {testReverseAnalysis}