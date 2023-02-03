const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const resextra = require('./modules/resextra')
// 路由加载
const mount = require('mount-routes')
const app = express()
const createSocket =require(path.join(process.cwd(),"/services/socket"));
const {testReverseAnalysis} =require(path.join(process.cwd(),"/package/test"));
createSocket()
// testReverseAnalysis()
/**
 *
 * 公共系统初始化
 *
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// 设置跨域和相应数据格式
app.all('/api/*', function (req: { method: string }, res: { header: (arg0: string, arg1: string) => void; setHeader: (arg0: string, arg1: string) => void; send: (arg0: number) => void }, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
})

// 初始化统一响应机制
app.use(resextra)


/**
 *
 * 初始化路由
 *
 */
// 带路径的用法并且可以打印出路有表
mount(app, path.join(process.cwd(), '/routes'), true)

app.all('/ueditor/ue', function (req: { method: string }, res: { header: (arg0: string, arg1: string) => void; send: (arg0: number) => void }, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
})


// var upload_config = require('config').get('upload_config')
// app.use('/' + upload_config.get('upload_ueditor'), express.static(upload_config.get('upload_ueditor')))


// 定义日志
// var log4js = require('./modules/logger');
// log4js.use(app);

/**
 *
 * 统一处理无响应
 *
 */
// 如果没有路径处理就返回 Not Found
app.use(function (req: any, res: { sendResult: (arg0: null, arg1: number, arg2: string) => void }, next: any) {
    res.sendResult(null, 404, 'Not Found')
})
app.listen(88)
module.exports = app
export {};
