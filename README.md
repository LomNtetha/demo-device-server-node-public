## Introduction
This project is a demonstration that teaches you how to convert device AB instructions into JSON format data, and how to convert JSON data into AB instructions that can be recognized by the device. It doesn't provide you with REST apis. But you can learn how to parse the AB protocol and then store the parsed data in your own database. Finally, write REST apis that compound your own business.
### Project structure
```bash
package parses the AB protocol package
utils parses the AB protocol toolkit
app.ts project entry file
response.ts The response result is sent to the device after forward parsing
protocolAnalysis.ts In the forward parsing script, AB commands are converted to JSON data
reverseAnalysis.ts The reverse parsing script converts JSON data into AB instructions
```
### Project start-up
```bash
$ npm i      
$ npm run dev     
```
### For forward parsing, the AB command is converted to JSON format

```bash
let str = dt.toString('hex').toUpperCase()
let data = protocolAnalysis(str);
logger.info("Forward Parsing：",JSON.stringify(data,null,1))
 const responseVal=data.length&&response(data[0].cmdHeadData,data[0].cmdBodyData)
 logger.info("Response Result：",BytesHexStrUtil.toHexString(responseVal))
let buf=Buffer.from(responseVal||[])
socket.write(buf, 'binary',() => {
});
```
### Send the findme command to all devices in two minutes
Before the simulation server sends AB instructions to the device, watch the quick start.mp4 video in the project in advance. This section describes how to change the Server IP address of the device.
Note: The project and device must be on the same LAN.
Solution:
1. You can deploy the project to the public network and set the Server IP of the device.
2. If your project is running locally, there is no cloud server. Then you can use third-party tools such as Intranet penetration.
```bash
setTimeout(()=>{
    let buf=Buffer.from(findMeDemo()||[])
    logger.info("findeme：", findMeDemo())
    logger.info("findemeBuffer：",buf)
    socket.write(buf, 'binary',() => {
    });
},60*60*1000)
```
The timer time can be customized
