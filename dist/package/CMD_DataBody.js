"use strict";
const CMD_Data = require('./CMD_Data');
module.exports = class CMD_DataBody {
    constructor() {
        this.cmdData = [];
    }
    getCmdType() {
        return this.cmdType;
    }
    setCmdType(value) {
        this.cmdType = value;
    }
    getCmdData() {
        return this.cmdData;
    }
    /*setCmdData(cmdKey:number,cmdValue:number[]) {
        const length=cmdValue.length
        const cmdLength = length>0 ? length + 1 : 1;
        this.cmdData?.push(new CMD_Data(cmdLength,cmdKey,cmdValue));
    }*/
    setCmdData(cmdKey, cmdValue) {
        const cmdLength = (cmdValue != null) ? cmdValue.length + 1 : 1;
        this.cmdData.push(new CMD_Data({ cmdLength, cmdKey, cmdValue }));
    }
    getErrorMsg() {
        return this.errorMsg;
    }
    setErrorMsg(value) {
        this.errorMsg = value;
    }
};
