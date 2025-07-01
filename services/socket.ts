import {forwardAnalysis} from "../demos/forwardAnalysis";
const path = require("path");
const net = require('node:net');
const BytesHexStrUtil = require('../utils/bytesHexStr.ts');
const logger = require('../modules/logger').logger("info");
const {response} = require(path.join(process.cwd(), "/package/response"));
const {protocolAnalysis} = require(path.join(process.cwd(), "/package/protocolAnalysis"));
const {findMeDemo} =require(path.join(process.cwd(),"/demos/findeMeDemo"));
const {getTimeStamp} =require(path.join(process.cwd(),"/demos/getTimeStamp"));
// const {reverseAnalysis} = require(path.join(process.cwd(), "/package/reverseAnalysis"));
// Protocol parsing API
module.exports = function createSocket() {
    const server = net.createServer((socket:any) => {
        // 6. Set the maximum number of connections between client and server:
        server.maxConnections = 5000;
        // 7. Get the number of client connections:
        server.getConnections(function (err:any, count:number) {
            console.log("Current number of connected clients: " + count);
        });
        // 8. Get data sent from the client: the 'data' event of the socket object can receive data from the client.
        // In addition to the 'data' event, the socket object also has 'connect', 'end', 'error', 'timeout', etc. events, such as:
        socket.on('data', (dt: { toString: (arg0: string) => string; }) => {
            let str = dt.toString('hex').toUpperCase()
            if(!str)return;
            // forwardAnalysis(str) // For forward parsing, the AB command is converted to JSON format
            let timeStamp=getTimeStamp(str)
            if(!timeStamp)return
            let buf=Buffer.from(timeStamp||[])
            socket.write(buf,() => {
                // console.log("dddddd::",)
            });
            // Send the findme command to all devices in two minutes
            setTimeout(()=>{
                let findeMeVal=findMeDemo(str)
                let buf=Buffer.from( findeMeVal||[])
                logger.info("findeme：", findeMeVal)
                logger.info("findemeBuffer：",buf)
                socket.write(buf, 'binary',() => {});
            },3000)
        })
    })
    server.listen(5555, '0.0.0.0', () => {
        console.log('serve is running...')
    })
    // connection: triggered when a new connection is established, such as:
    server.on('connection', (str:string) => {
        console.log("47::",str)
        console.log('New connection established')
    })
    // close: triggered when the server is closed, such as:
    server.on('close', () => {
        console.log('Server has been closed')
    })
    // error: triggered when a server error occurs, such as:
    server.on('error', () => {
        console.log('Server error occurred')
    })
    return server;
}
