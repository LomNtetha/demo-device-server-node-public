const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const resextra = require('./modules/resextra')
// Route loading
const mount = require('mount-routes')
const app = express()
const createSocket =require(path.join(process.cwd(),"/services/socket"))
createSocket();
/**
 *
 * Public system initialization
 *
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Initialize unified response mechanism
app.use(resextra)

// If no path matches, return Not Found
app.use(function (req: any, res: { sendResult: (arg0: null, arg1: number, arg2: string) => void }, next: any) {
    res.sendResult(null, 404, 'Not Found')
})
app.listen(88)
module.exports = app
export {};
