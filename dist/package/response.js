"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const Cmd_const = require("./cmdConst");
const Prot_const = require("./protConst");
const CMD_DataBody = require("./CMD_DataBody");
const checkCrc = require("../utils/checkCrc"); // ✅ fixed naming
function response(cmdHeadData, cmdBodyData) {
    if (!cmdHeadData || !cmdBodyData)
        return [];
    let responseResult = null;
    switch (cmdBodyData.cmdType) {
        case 1:
        case 4:
            responseResult = getCommandResponse();
            break;
        case 3:
            responseResult = serviceResponse(cmdBodyData.servicesData);
            break;
    }
    const cmdData = getByteData(getCommandHead(cmdHeadData), getByteDataBody(responseResult));
    return cmdData;
}
exports.response = response;
function getCommandResponse(cmdValue) {
    const data = {};
    data[Prot_const.CMD_Body_CmdKey] = 0;
    const cmd_bodyData = new CMD_DataBody();
    cmd_bodyData.setCmdType(Cmd_const.CMD_Type_Response);
    const cmdKey = data[Prot_const.CMD_Body_CmdKey];
    cmd_bodyData.setCmdData(cmdKey, cmdValue || null);
    return cmd_bodyData;
}
function getCommandHead(cmdHeadData) {
    const { sequenceId, version } = cmdHeadData;
    return {
        sequenceId,
        version,
        flag_ACK: false,
        flag_ERR: false,
        encryption: 0,
    };
}
function getByteDataBody(cmd_bodyData) {
    let cmd_bodyByte = [];
    const cmdType = cmd_bodyData[Prot_const.CMD_Body_CmdType];
    if (cmdType !== null) {
        cmd_bodyByte.push(cmdType);
    }
    const cmdList = cmd_bodyData["cmdData"];
    cmdList.forEach((cmd) => {
        const cmdLength = cmd["cmdLength"];
        const cmdKey = cmd[Prot_const.CMD_Body_CmdKey];
        const cmdValue = cmd["cmdValue"] || [];
        cmd_bodyByte.push(cmdLength, cmdKey, ...cmdValue);
    });
    return cmd_bodyByte;
}
function serviceResponse(bodyData) {
    let cmd_bodyData = new CMD_DataBody();
    cmd_bodyData.setCmdType(Cmd_const.CMD_Type_Service);
    for (const key in bodyData) {
        switch (key) {
            case Prot_const.Services_0x01:
            case Prot_const.Services_0x10:
            case Prot_const.Services_0x12:
                cmd_bodyData = getCommandResponse();
                break;
        }
    }
    return cmd_bodyData;
}
function getByteData(cmd_head, bodyData) {
    const headData = new Array(8);
    headData[0] = Cmd_const.CMD_Head;
    const version = cmd_head[Prot_const.CMD_Head_Version];
    const flag_ACK = cmd_head[Prot_const.CMD_Head_FlagACK] ? 1 : 0;
    const flag_ERR = cmd_head['flag_ERR'] ? 1 : 0;
    const encryption = cmd_head['encryption'];
    const properties = (encryption << 6) | (flag_ERR << 5) | (flag_ACK << 4) | version;
    headData[1] = properties & 0xFF;
    const length = bodyData.length;
    headData[2] = length & 0xFF;
    headData[3] = (length >> 8) & 0xFF;
    // ✅ Fixed CRC usage with proper variable name
    const crc = checkCrc.crc16_bit(bodyData);
    headData[4] = crc & 0xFF;
    headData[5] = (crc >> 8) & 0xFF;
    const sequenceId = cmd_head[Prot_const.CMD_Head_SequenceId];
    headData[6] = sequenceId & 0xFF;
    headData[7] = (sequenceId >> 8) & 0xFF;
    return headData.concat(bodyData);
}
