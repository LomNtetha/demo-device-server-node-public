## 介绍
该项目是一个演示，教你如何将设备AB指令转换成JSON格式数据，以及如何将JSON数据转换成设备能够识别的AB指令Demo。它无法为你提供REST API。但你可以学习如何解析AB协议，然后将解析后的数据存入自己的数据库中。最后编写复合自己业务的REST API。
### 项目结构
```bash
 package  解析AB协议包
 utils  解析AB协议工具包
 app.ts 项目入口文件
 response.ts 正向解析后响应结果给设备 
 protocolAnalysis.ts 正向解析脚本 即：AB指令转换成JSON数据
 reverseAnalysis.ts 反向解析脚本  即：JSON数据转换成AB指令
```
### 项目启动
```bash
$ npm i      
$ npm run dev     
```
### 正向解析, 将AB命令转换为JSON格式
```bash
let str = dt.toString('hex').toUpperCase()
let data = protocolAnalysis(str);
logger.info("正向解析：",JSON.stringify(data,null,1))
 const responseVal=data.length&&response(data[0].cmdHeadData,data[0].cmdBodyData)
 logger.info("响应结果：",BytesHexStrUtil.toHexString(responseVal))
let buf=Buffer.from(responseVal||[])
socket.write(buf, 'binary',() => {
});
```
### 2分钟内发送findme命令到所有设备
在模拟服务器向设备发送AB指令之前，请提前观看项目中quick start.mp4视频。了解如何修改设备的Server IP。
注：项目和设备必须处于同一个局域网。
解决方案：
1.你可以将项目部署到公网上，然后设置设备的Server IP。
2.如果你项目运行在本地，也没有云服务器。那么可以借助内网穿透等第三方工具实现。
```bash
setTimeout(()=>{
    let buf=Buffer.from(findMeDemo()||[])
    logger.info("findeme：", findMeDemo())
    logger.info("findemeBuffer：",buf)
    socket.write(buf, 'binary',() => {
    });
},60*60*1000)
```
定时器时间可以自定义
