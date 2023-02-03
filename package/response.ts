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
                /*cmdKey = Cmd_const.CMD_Services_getAddresses;
                let addresses = bodyData[key];
                // let lat_addr = Convert.toDouble(addresses[Prot_const.Services_0x11_lat], 0.0);
                // let lng_addr = Convert.toDouble(addresses[Prot_const.Services_0x11_lng], 0.0);
                let lat_addr =parseFloat(addresses[Prot_const.Services_0x11_lat]);
                let lng_addr =parseFloat(addresses[Prot_const.Services_0x11_lng]);
                cmdValue = ProtocolUtil.latlng2Bytes(lat_addr, lng_addr);
                let address = addresses[Prot_const.Services_0x11_address];
                if (!address) {
                    // let addressBytes = BytesHexStrUtil.string2BytesByUTF_8(address);
                    let addressBytes =address || [""];
                    // addressBytes.push(addressBytes);
                    cmdValue.concat(addressBytes);
                }
                cmd_bodyData.setCmdData(cmdKey, cmdValue);*/
                break;
            case Prot_const.Services_0x12:
               /* cmdKey = Cmd_const.CMD_Services_getTimestamp;
                cmdValue = [];
                if (bodyData[key] instanceof String && !bodyData[key] === Prot_const.CMD_Value_NULL) {
                    const dateTime = Convert.toStr(bodyData[key], ProtocolUtil.DATETIME_DEFAULT);
                    cmdValue = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
                }
                cmd_bodyData.setCmdData(cmdKey, cmdValue);*/
                break;
            case Prot_const.Services_0x13:
              /*  cmdKey = Cmd_const.CMD_Services_getWeather;
                let weather = bodyData[key];
                let lang = Convert.toStr(weather[Prot_const.Services_0x13_lang], "");
                // lang = String.format("%-8s", lang);// 8个字节不足右边补空格
                cmdValue = BytesHexStrUtil.string2BytesByASCII(lang);
                if (weather[Prot_const.Services_0x13_lat] != null && weather[Prot_const.Services_0x13_lng] != null) {
                    const lat_weather = Convert.toDouble(weather[Prot_const.Services_0x13_lat], 0.0);
                    const lng_weather = Convert.toDouble(weather[Prot_const.Services_0x13_lng], 0.0);
                    cmdValue.concat(ProtocolUtil.latlng2Bytes(lat_weather, lng_weather));
                }
                cmd_bodyData.setCmdData(cmdKey, cmdValue);*/
                break;
            case Prot_const.Services_0x21:
              /*  cmdKey = Cmd_const.CMD_Services_getLocationGSM;
                let location_gsm = bodyData[key];
                cmdValue = mapGSM2Byte(location_gsm, cmdKey);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);*/
                break;
            case Prot_const.Services_0x22:
               /* cmdKey = Cmd_const.CMD_Services_getLocationWIFI;
                let location_wifi = bodyData[key];
                cmdValue = mapWifi2Byte(location_wifi);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);*/
                break;
            case Prot_const.Services_0x24:
               /* cmdKey = Cmd_const.CMD_Services_generalData;
                let generalData = bodyData[key];
                cmdValue = mapStatus2Byte(generalData);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);*/
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