const Cmd_const = require("./cmdConst");
const Prot_const = require("./protConst");
const CMD_DataBody = require("./CMD_DataBody");
const CheckCRC = require("../utils/checkCrc.ts");
function response(cmdHeadData:any,cmdBodyData:any) {
    if (!cmdHeadData || !cmdBodyData) return [];
    let responseResult = null;
    switch (cmdBodyData.cmdType) {
        case 1:responseResult = getCommandResponse()
            break;
        case 3:responseResult = serviceResponse(cmdBodyData.servicesData)
            break;
    }
    const cmdData = getByteData(getCommandHead(cmdHeadData), getByteDataBody(responseResult));
    return cmdData;
}
function getCommandResponse(cmdValue?: any) {
    let data: any = {}
    data[Prot_const.CMD_Body_CmdKey] = 0
    const cmd_bodyData = new CMD_DataBody();
    cmd_bodyData.setCmdType(Cmd_const.CMD_Type_Response);
    let cmdKey = data[Prot_const.CMD_Body_CmdKey];
    cmd_bodyData.setCmdData(cmdKey, cmdValue || null);
    return cmd_bodyData;
}
function getCommandHead(cmdHeadData: any) {
    let {sequenceId, version} = cmdHeadData
    const cmd_headData: any = {};
    cmd_headData['sequenceId'] = sequenceId
    cmd_headData['version'] = version
    cmd_headData['flag_ACK'] = false
    return cmd_headData;
}
function getByteDataBody(cmd_bodyData: any) {
    let cmd_bodyByte: any[] = [];
    const cmdType = cmd_bodyData[Prot_const.CMD_Body_CmdType];
    cmdType && cmd_bodyByte.push(cmdType);
    const cmdList = cmd_bodyData["cmdData"];
    cmdList.forEach((cmd: any) => {
        const cmdLength = cmd["cmdLength"];
        cmd_bodyByte.push(cmdLength);
        const cmdKey = cmd[Prot_const.CMD_Body_CmdKey];
        cmd_bodyByte.push(cmdKey);
        let cmdValue = cmd["cmdValue"] || [];
        cmd_bodyByte = cmd_bodyByte.concat(cmdValue)
    })
    return cmd_bodyByte;
}
function serviceResponse(bodyData: any) {
    let cmd_bodyData = new CMD_DataBody();
    cmd_bodyData.setCmdType(Cmd_const.CMD_Type_Service);
    for (let key in bodyData) {
        let cmdValue: any[] = [];
        let cmdKey;
        switch (key) {
            case Prot_const.Services_0x01:
                cmd_bodyData=getCommandResponse()
                break;
            case Prot_const.Services_0x10:
                cmd_bodyData=getCommandResponse()
                break;
            case Prot_const.Services_0x11:
                break;
            case Prot_const.Services_0x12:
                break;
            case Prot_const.Services_0x13:
                break;
            case Prot_const.Services_0x21:
                break;
            case Prot_const.Services_0x22:
                break;
            case Prot_const.Services_0x24:
                break;
        }
        return cmd_bodyData;
    }
}
function getByteData(cmd_head: any, bodyData: any) {
    const headData = new Array(8);
    headData[0] = Cmd_const.CMD_Head;
    const version = cmd_head[Prot_const.CMD_Head_Version];
    const flag_ACK = cmd_head[Prot_const.CMD_Head_FlagACK] ? 1 : 0;
    const flag_ERR = cmd_head['flag_ERR'] ? 1 : 0;
    const encryption = cmd_head['encryption'];
    const properties =  (encryption << 6) | (flag_ERR << 5) | (flag_ACK << 4) | version;
    headData[1] = (properties & 0xFF);
    const length = bodyData.length;
    headData[2] = (length & 0xFF);
    headData[3] = (length >> 8 & 0xFF);
    const checkCRC = CheckCRC.crc16_bit(bodyData);
    headData[4] = (checkCRC & 0xFF);
    headData[5] = (checkCRC >> 8 & 0xFF);
    const sequenceId = cmd_head[Prot_const.CMD_Head_SequenceId];
    headData[6] = (sequenceId & 0xFF);
    headData[7] = (sequenceId >> 8 & 0xFF);
    return headData.concat(bodyData);
}
export {response}