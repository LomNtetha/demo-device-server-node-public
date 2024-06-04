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
//协议解析API
module.exports = function createSocket() {
    const server = net.createServer((socket:any) => {
        //6.设置客户端与服务端最大链接数量：
        server.maxConnections = 5000;
        //7.获取客户度接入的数量：
        server.getConnections(function (err:any, count:number) {
            console.log("当前连接的客户端数量：" + count);
        });
        //8.获取客户端传入过来的数据：socket对象的data事件可以获取客户端发送过来的数据，socket对象除了有data事件外，还有connect、end、error、timeout等事件，如：
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
            //Send the findme command to all devices in two minutes
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
//connection：新的链接接入时触发，如：
    server.on('connection', (str:string) => {
        console.log("47::",str)
        console.log('新的接入')
    })
//close：服务器关闭时触发，如：
    server.on('close', () => {
        console.log('服务器关闭了')
    })
//error：服务器发生错误时触发，如：
    server.on('error', () => {
        console.log('服务器错误')
    })
    return server;
}

