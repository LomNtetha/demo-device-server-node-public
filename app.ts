const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const resextra = require('./modules/resextra')
// 路由加载
const mount = require('mount-routes')
const app = express()
const createSocket =require(path.join(process.cwd(),"/services/socket"))
createSocket();
/**
 *
 * 公共系统初始化
 *
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// 初始化统一响应机制
app.use(resextra)

// 如果没有路径处理就返回 Not Found
app.use(function (req: any, res: { sendResult: (arg0: null, arg1: number, arg2: string) => void }, next: any) {
    res.sendResult(null, 404, 'Not Found')
})
app.listen(88)
module.exports = app
export {};
