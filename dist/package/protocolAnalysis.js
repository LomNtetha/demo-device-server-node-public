"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocolAnalysis = void 0;
const Cmd_const = require('./cmdConst');
const Prot_const = require('./protConst');
const CMD_DataHead = require('./CMD_DataHead');
const CMD_DataBody = require('./CMD_DataBody');
const Properties = require('./CMD_properties');
const CheckCRC = require('../utils/checkCrc');
const ProtocolUtil = require('../utils/protocolUtil');
const BytesHexStrUtil = require('../utils/bytesHexStr');
const logger = require('../modules/logger').logger("info");
// Parse protocol
function protocolAnalysis(str) {
    if (!str || str.length <= 0) {
        throw ('Please input hexadecimal string');
    }
    let result = BytesHexStrUtil.hexStringToBytes(str, true);
    let cmdDataList = [];
    let cmdModelList = analysisCMDModelList(result, str); // [{cmd_headData,cmd_bodyData}] Parse to generate header data, body data, original data
    cmdModelList.forEach((item) => {
        let cmdData = protocolAnalysis2(item);
        cmdDataList.push(cmdData);
    });
    return cmdDataList;
}
exports.protocolAnalysis = protocolAnalysis;
// Parse to generate header data, body data, original data
function analysisCMDModelList(data, str) {
    const cmdList = [];
    let read = 0;
    while (read + 8 < data.length) { // Solve packet concatenation issue and filter invalid data at both ends
        if ((data[read] & 0xFF) != Cmd_const.CMD_Head) { // Not equal to 0xAB
            read++;
            continue;
        }
        let headData = data.slice(read, read + 8); // Slice array data from read position to read+8 // 0=headData<8
        let cmd_headData = analysisHeadData(headData); // Further parse to get data within this data
        if (data.length < read + cmd_headData.length + 8) {
            read++;
            continue;
        }
        let bodyData = data.slice(read + 8, read + cmd_headData.length + 8);
        let checkCRC = CheckCRC.crc16_bit(bodyData); // Verify body data
        if (cmd_headData.checkCRC != checkCRC) {
            read++;
            continue;
        }
        let cmd_bodyData = analysisBodyData(bodyData); // Parse to get body data
        // let originalData = ArrayUtils.addAll(headData, bodyData);// Put all sliced header data and body data into the data as original data
        let originalData = headData.concat(bodyData); // Put all sliced header data and body data into the data as original data
        cmdList.push({ cmd_headData, cmd_bodyData, originalData }); // Generate an object containing header data, body data and original data
        read += headData.length + 8;
    }
    return cmdList;
}
// Parse header data
function analysisHeadData(headData) {
    const cmd_headData = new CMD_DataHead();
    const header = (headData[0] & 0xFF);
    const property = (headData[1] & 0xFF);
    const length = (headData[2] & 0xFF) | (headData[3] & 0xFF) << 8; // 2 bytes, low 8 bits first, high 8 bits last.
    const checkCRC = (headData[4] & 0xFF) | (headData[5] & 0xFF) << 8;
    const sequenceId = (headData[6] & 0xFF) | (headData[7] & 0xFF) << 8;
    const properties = analysisHeadProperties(property);
    cmd_headData.setHeader(header);
    cmd_headData.setLength(length);
    cmd_headData.setCheckCRC(checkCRC);
    cmd_headData.setProperties(properties);
    cmd_headData.setSequenceId(sequenceId);
    /*    cmd_headData.setHeader(header)
    cmd_headData.setLength(length)
    cmd_headData.setCheckCRC(checkCRC)
    cmd_headData.setProperties(properties)
    cmd_headData.setSequenceId(sequenceId)*/
    // cmd_headData.getPropertie();
    return cmd_headData;
}
// Parse body
function analysisBodyData(bodyData) {
    let cmd_bodyData = new CMD_DataBody();
    let cmdType = bodyData[0] & 0xFF;
    cmd_bodyData.setCmdType(cmdType);
    let readData = 1;
    while (readData + 1 < bodyData.length) {
        let cmdLength = bodyData[readData] & 0xFF;
        let cmdKey = bodyData[readData + 1] & 0xFF;
        let cmdValue = [];
        if (cmdLength == 0) { // First packet (upgrade part) length can be 0, otherwise return error.
            if ((cmd_bodyData === null || cmd_bodyData === void 0 ? void 0 : cmd_bodyData.cmdData.length) > 0) {
                let cmdValue2 = bodyData.slice(readData, bodyData.length);
                cmd_bodyData.setErrorMsg(BytesHexStrUtil.bytesToHexString(cmdValue2));
                break;
            }
            cmdValue = bodyData.slice(readData + 2, bodyData.length);
            cmd_bodyData.setCmdData(cmdKey, cmdValue);
            break;
        }
        if (readData + 1 + cmdLength > bodyData.length) { //Error interrupts parsing and prompts
            let cmdValue2 = bodyData.slice(readData, bodyData.length);
            cmd_bodyData.setErrorMsg(BytesHexStrUtil.bytesToHexString(cmdValue2));
            break;
        }
        if (readData + 2 < bodyData.length) { // value can be empty
            cmdValue = bodyData.slice(readData + 2, readData + 1 + cmdLength);
        }
        readData += cmdLength + 1;
        cmd_bodyData.setCmdData(cmdKey, cmdValue);
    }
    return cmd_bodyData;
}
// Parse header properties
function analysisHeadProperties(properties) {
    let version = ProtocolUtil.getBit(properties, 0, 4); // Version
    let flag_ACK = ProtocolUtil.getBit(properties, 4, 5); //
    let flag_ERR = ProtocolUtil.getBit(properties, 5, 6); //
    let encryption = ProtocolUtil.getBit(properties, 6, 8); // Encryption
    let propertiesObj = new Properties();
    propertiesObj.setVersion(version);
    propertiesObj.setFlag_ACK(flag_ACK);
    propertiesObj.setFlag_ERR(flag_ERR);
    propertiesObj.setEncryption(encryption);
    return propertiesObj;
}
// Parse protocol 2
function protocolAnalysis2(cmdModel) {
    try {
        let cmdData = getCmdDataObject(cmdModel);
        if (cmdModel.cmd_bodyData) {
            let cmdBodyData = cmdData[Prot_const.CMD_Body];
            let errorMsg = cmdModel.cmd_bodyData.errorMsg;
            if (!errorMsg) {
                cmdBodyData["errorData"] = errorMsg;
            }
            switch (cmdModel.cmd_bodyData.cmdType) {
                case Cmd_const.CMD_Type_Data:
                    let locationData = analysisLocationData(cmdModel);
                    cmdBodyData[Prot_const.Type_0x01] = locationData;
                    break;
                case Cmd_const.CMD_Type_Service:
                    const servicesData = analysisServicesData(cmdModel);
                    cmdBodyData[Prot_const.Type_0x03] = servicesData;
                    break;
                case Cmd_const.CMD_Type_System:
                    const systemData = analysisSystemData(cmdModel);
                    cmdBodyData.put(Prot_const.Type_0x04, systemData);
                    break;
                case Cmd_const.CMD_Type_Response:
                    let responseData = analysisResponseData(cmdModel);
                    cmdBodyData[Prot_const.Type_0x7F] = responseData;
                    break;
            }
            return cmdData;
        }
    }
    catch (e) {
    }
    return null;
}
function analysisSystemData(cmdModel) {
    const systemData = {};
    let cmdDataList = cmdModel.cmd_bodyData.cmdData;
    cmdDataList.forEach((item) => {
        let cmdValue = item.cmdValue;
        switch (item.cmdKey) {
            case Cmd_const.CMD_Find_me:
                systemData[Prot_const.System_0x13] = null;
                break;
            default:
                let other = {};
                if (Prot_const.CMD_Key_Unsupported in systemData) {
                    other = systemData[Prot_const.CMD_Key_Unsupported];
                }
                else {
                    other["msg"] = "Other keys are not supported";
                }
                let str = "key:0x" + item.cmdKey;
                other[str] = `Value:${BytesHexStrUtil.bytesToHexString(cmdValue)}`;
                systemData[Prot_const.CMD_Key_Unsupported] = other;
                break;
        }
    });
    return systemData;
}
function analysisServicesData(cmdModel) {
    const servicesData = {};
    let cmdDataList = cmdModel.cmd_bodyData.cmdData;
    cmdDataList.forEach((item) => {
        let cmdValue = item.cmdValue;
        switch (item.cmdKey) {
            case Cmd_const.CMD_Services_IMEI:
                let imei = BytesHexStrUtil.bytes2StringByASCII(cmdValue);
                servicesData[Prot_const.Services_0x01] = imei;
                break;
            // Heartbeat packet
            case Cmd_const.CMD_Services_HeartBeat:
                let heartBeat = null;
                if (cmdValue.length > 0) {
                    heartBeat = (cmdValue[0] & 0xFF);
                }
                servicesData[Prot_const.Services_0x10] = heartBeat;
                break;
            // Return address
            case Cmd_const.CMD_Services_getAddresses: // address not parsed
                let lat = ProtocolUtil.bytes2Latlng(cmdValue.slice(0, 4));
                let lng = ProtocolUtil.bytes2Latlng(cmdValue.slice(4, 8));
                const ev07b_addresses = {};
                ev07b_addresses[Prot_const.Services_0x11_lat] = lat;
                ev07b_addresses[Prot_const.Services_0x11_lng] = lng;
                if (cmdValue.length > 8) {
                    let address = BytesHexStrUtil.bytes2StringByUTF_8(cmdValue.slice(8, cmdValue.length));
                    ev07b_addresses[Prot_const.Services_0x11_address] = address;
                }
                servicesData[Prot_const.Services_0x11] = ev07b_addresses;
                break;
            // Return system time (UTC)
            case Cmd_const.CMD_Services_getTimestamp:
                if (cmdValue.length > 0) {
                    let dateTime = ProtocolUtil.bytes2DateTime(cmdValue.slice(0, 4));
                    servicesData[Prot_const.Services_0x12] = dateTime;
                }
                else {
                    servicesData[Prot_const.Services_0x12] = Prot_const.CMD_Value_NULL;
                }
                break;
            // Weather forecast
            case Cmd_const.CMD_Services_getWeather:
                const weather = {};
                const langBytes = cmdValue.slice(0, 8);
                let lang = BytesHexStrUtil.bytes2StringByASCII(langBytes);
                weather["lang"] = lang.replaceAll(" ", ""); //Remove extra spaces
                if (cmdValue.length > 8) {
                    let lat_weather = ProtocolUtil.bytes2Latlng(cmdValue.slice(8, 12));
                    let lng_weather = ProtocolUtil.bytes2Latlng(cmdValue.slice(12, 16));
                    weather["lat"] = lat_weather;
                    weather["lng"] = lng_weather;
                }
                servicesData[Prot_const.Services_0x13] = weather;
                break;
            // Cell tower positioning
            case Cmd_const.CMD_Services_getLocationGSM:
                const ev07b_gsm = data2Model_GSM(cmdValue, Cmd_const.CMD_Services_getLocationGSM);
                servicesData[Prot_const.Services_0x21] = ev07b_gsm;
                break;
            // WIFI positioning
            case Cmd_const.CMD_Services_getLocationWIFI:
                const ev07b_wifi = data2Model_Wifi(cmdValue, Cmd_const.CMD_Services_getLocationWIFI);
                servicesData[Prot_const.Services_0x22] = ev07b_wifi;
                break;
            // Status information
            case Cmd_const.CMD_Services_generalData: //
                const ev07b_status = data2Model_Status(cmdValue);
                servicesData[Prot_const.Services_0x24] = ev07b_status;
                break;
            default:
                let other = {};
                if (servicesData.containsKey(Prot_const.CMD_Key_Unsupported)) {
                    other = servicesData[Prot_const.CMD_Key_Unsupported];
                }
                else {
                    other["msg"] = "Other keys are not supported";
                }
                let str = "key:0x" + item.cmdKey;
                other[str] = `Value:${BytesHexStrUtil.bytesToHexString(cmdValue)}`;
                servicesData[Prot_const.CMD_Key_Unsupported] = other;
                break;
        }
    });
    return servicesData;
}
function analysisResponseData(cmdModel) {
    const responseData = {};
    const cmdDataList = cmdModel.cmd_bodyData;
    let cmdKey = cmdDataList.cmdType;
    responseData["code"] = cmdKey;
    responseData[Prot_const.Response_ReturnStatus] = Prot_const.Response_Error;
    switch (cmdKey) {
        case Cmd_const.CMD_Response_Success:
            responseData[Prot_const.Response_ReturnStatus] = Prot_const.Response_Ok;
            break;
        case Cmd_const.CMD_Response_VersionError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_VersionError;
            break;
        case Cmd_const.CMD_Response_EncryptError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_EncryptError;
            break;
        case Cmd_const.CMD_Response_LengthError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_LengthError;
            break;
        case Cmd_const.CMD_Response_CRCError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_CRCError;
            break;
        case Cmd_const.CMD_Response_CommandError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_CommandError;
            break;
        case Cmd_const.CMD_Response_KeyError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_KeyError;
            break;
        case Cmd_const.CMD_Response_KeyLengthError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_KeyLengthError;
            break;
        case Cmd_const.CMD_Response_DataFormatError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_DataFormatError;
            break;
        case Cmd_const.CMD_Response_DataSizeError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_DataSizeError;
            break;
        case Cmd_const.CMD_Response_StateError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_StateError;
            break;
        case Cmd_const.CMD_Response_ParameterError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_ParameterError;
            break;
        case Cmd_const.CMD_Response_NoMemoryError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_NoMemoryError;
            break;
        case Cmd_const.CMD_Response_funNoSuported:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_FunNoSuported;
            break;
        case Cmd_const.CMD_Response_GPSNoLocation:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_GPSNoLocation;
            break;
        case Cmd_const.CMD_Response_AddressError:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_AddressError;
            break;
        case Cmd_const.CMD_Response_NoPasswordVerify:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_NoPasswordVerify;
            break;
        case Cmd_const.CMD_Response_LowBattery:
            responseData[Prot_const.Response_Msg] = Prot_const.Response_LowBattery;
            break;
    }
    return responseData;
}
//
function getCmdDataObject(cmdModel) {
    if (!(cmdModel === null || cmdModel === void 0 ? void 0 : cmdModel.cmd_bodyData) && !(cmdModel === null || cmdModel === void 0 ? void 0 : cmdModel.cmd_headData) && !(cmdModel === null || cmdModel === void 0 ? void 0 : cmdModel.originalData))
        return {};
    let { cmd_bodyData, cmd_headData, originalData } = cmdModel;
    const cmdHeadData = {}; // Create a key-value pair object
    const cmdBodyData = {}; // Body key-value pair object
    // @ts-ignore
    const cmdData = {};
    cmdHeadData[Prot_const.CMD_Head_SequenceId] = cmd_headData.sequenceId;
    cmdHeadData[Prot_const.CMD_Head_Length] = cmd_headData.length;
    cmdHeadData[Prot_const.CMD_Head_CheckCRC] = cmd_headData.checkCRC;
    cmdHeadData[Prot_const.CMD_Head_Version] = cmd_headData.properties.version;
    cmdHeadData[Prot_const.CMD_Head_FlagACK] = cmd_headData.properties.flag_ACK;
    cmdBodyData[Prot_const.CMD_Body_CmdType] = cmd_bodyData.cmdType;
    cmdData[Prot_const.CMD_Head] = cmdHeadData;
    cmdData[Prot_const.CMD_Body] = cmdBodyData;
    cmdData[Prot_const.CMD_Original] = BytesHexStrUtil.toHexString(originalData); // originalData
    return cmdData;
}
// Parse location data
function analysisLocationData(cmd_Model) {
    let data = {};
    let dataList = [];
    let locationData = {};
    let cmdDataList = cmd_Model.cmd_bodyData.cmdData;
    cmdDataList.forEach((item) => {
        let cmdValue = item.cmdValue;
        switch (item.cmdKey) {
            case Cmd_const.CMD_Data_IMEI:
                locationData[Prot_const.Data_0x01] = BytesHexStrUtil.bytes2StringByASCII(cmdValue);
                break;
            case Cmd_const.CMD_Data_Status:
                if (!locationData[Prot_const.Data_list]) {
                    locationData[Prot_const.Data_list] = dataList;
                }
                let ev07b_status = data2Model_Status(cmdValue);
                data = {};
                data[Prot_const.Data_0x24] = ev07b_status;
                dataList.push(data);
                break;
            case Cmd_const.CMD_Services_ICCID:
                locationData[Prot_const.Data_0x04] = BytesHexStrUtil.bytes2StringByASCII(cmdValue);
                break;
            case Cmd_const.CMD_Data_GPS:
                let ev07b_gps = data2Model_GPS(cmdValue);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x20] = ev07b_gps;
                break;
            case Cmd_const.CMD_Data_GSM:
                let ev07b_gsm = data2Model_GSM(cmdValue, Cmd_const.CMD_Data_GSM);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x21] = ev07b_gsm;
                break;
            case Cmd_const.CMD_Data_GSM2:
                let ev07b_gsm2 = data2Model_GSM(cmdValue, Cmd_const.CMD_Data_GSM2);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x29] = ev07b_gsm2;
                break;
            case Cmd_const.CMD_Data_GSM3:
                let ev07b_gsm3 = data2Model_GSM(cmdValue, Cmd_const.CMD_Data_GSM3);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x2B] = ev07b_gsm3;
                break;
            case Cmd_const.CMD_Data_WIFI: // mac parsing issue
                let ev07b_wifi = data2Model_Wifi(cmdValue, Cmd_const.CMD_Data_WIFI);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x22] = ev07b_wifi;
                break;
            case Cmd_const.CMD_Data_WIFI2: // mac parsing issue
                let ev07b_wifi2 = data2Model_Wifi(cmdValue, Cmd_const.CMD_Data_WIFI2);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x19] = ev07b_wifi2;
                break;
            case Cmd_const.CMD_Data_BLE: // Missing describe after parsing. mac parsing issue
                let ev07b_ble = data2Model_BLE(cmdValue);
                if (ev07b_ble != null) {
                    data = dataList[dataList.length - 1]; //Get the last data in the list
                    data[Prot_const.Data_0x23] = ev07b_ble;
                }
                break;
            case Cmd_const.CMD_Data_BLE2: // mac parsing issue
                let ev07b_ble2 = data2Model_BLE2(cmdValue);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x26] = ev07b_ble2;
                break;
            case Cmd_const.CMD_Data_Smart:
                let ev07b_smart = data2Model_Smart(cmdValue);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                data[Prot_const.Data_0x27] = ev07b_smart;
                break;
            case Cmd_const.CMD_Data_Beacon: // Missing describe after parsing
                let ev07b_beacon = data2Model_Beacon(cmdValue);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                if (!data[Prot_const.Data_0x28]) {
                    let ev07b_beacon_list = [];
                    ev07b_beacon_list.push(ev07b_beacon);
                    data[Prot_const.Data_0x28] = ev07b_beacon_list;
                }
                else { // Support multiple keys accumulated together (modified on: 2021-09-18)
                    data[Prot_const.Data_0x28] = ev07b_beacon;
                    // ((List<Object>)data.get(Prot_const.Data_0x28)).add(ev07b_beacon);
                }
                break;
            case Cmd_const.CMD_Data_Beacon2: // Missing isLanLng temperature describe isDescribe after parsing. mac parsing error
                let ev07b_beacon2 = data2Model_Beacon2(cmdValue);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                if (!data[Prot_const.Data_0x2C]) {
                    let ev07b_beacon_list = [];
                    ev07b_beacon_list.push(ev07b_beacon2);
                    data[Prot_const.Data_0x2C] = ev07b_beacon_list;
                }
                else { // Support multiple keys accumulated together (modified on: 2021-09-18)
                    data[Prot_const.Data_0x2C] = ev07b_beacon2;
                    // ((List<Object>)data.get(Prot_const.Data_0x2C)).add(ev07b_beacon2);
                }
                break;
            case Cmd_const.CMD_Data_HomeWifi: // Missing isLanLng describe isDescribe after parsing. mac parsing error
                let ev07b_homeWifi = data2Model_HomeWifi(cmdValue);
                data = dataList[dataList.length - 1]; //Get the last data in the list
                // data.put(Protocol_CONST.Data_0x2A + ev07b_homeWifi.get(Protocol_CONST.Data_index), ev07b_homeWifi);
                if (!data[Prot_const.Data_0x2A]) {
                    let ev07b_homeWifi_list = [];
                    ev07b_homeWifi_list.push(ev07b_homeWifi);
                    data[Prot_const.Data_0x2A] = ev07b_homeWifi_list;
                }
                else { // Support multiple keys accumulated together (modified on: 2021-09-18)
                    data[Prot_const.Data_0x2A].concat(ev07b_homeWifi);
                }
                break;
            case Cmd_const.CMD_Data_AlarmCode:
                let map_alarm = {};
                let alarmFlag = ProtocolUtil.bytes2Long(cmdValue.slice(0, 4));
                // map_alarm[Prot_const.Data_0x02_AlarmFlag]=alarmFlag;
                let alarmStatus = getAlarmStatus(alarmFlag);
                map_alarm[Prot_const.Data_0x02_AlarmStatus] = alarmStatus;
                if (cmdValue.length >= 8) {
                    const dateTime = ProtocolUtil.bytes2DateTime(cmdValue.slice(4, 8));
                    map_alarm[Prot_const.Data_0x02_DateTime] = dateTime;
                }
                if (cmdValue.length >= 12) {
                    let alarmFlagExtend = ProtocolUtil.bytes2Long(cmdValue.slice(8, 12));
                    let alarmExtendStatus = getAlarmStatusExtend(alarmFlagExtend);
                    map_alarm[Prot_const.Data_0x02_AlarmStatusExtend] = alarmExtendStatus;
                }
                // data = dataList[dataList.length - 1];//Get the last data in the list
                data[Prot_const.Data_0x02] = map_alarm;
                break;
            case Cmd_const.CMD_Data_SingleLocating:
                locationData[Prot_const.Data_0x12] = Prot_const.CMD_Value_NULL;
                break;
            case Cmd_const.CMD_Data_ContinueLocating:
                locationData[Prot_const.Data_0x13] = Prot_const.CMD_Value_NULL;
                break;
            case Cmd_const.CMD_Data_PetWalking:
                let map_walkPet = {};
                let startTime = ProtocolUtil.bytes2DateTime(cmdValue.slice(0, 4));
                let stopTime = ProtocolUtil.bytes2DateTime(cmdValue.slice(4, 8));
                map_walkPet[Prot_const.Data_0x14_StartTime] = startTime;
                map_walkPet[Prot_const.Data_0x14_StopTime] = stopTime;
                locationData[Prot_const.Data_0x14] = map_walkPet;
                break;
            case Cmd_const.CMD_Data_CallRecords:
                if (locationData.get(Prot_const.Data_0x25) == null) {
                    locationData[Prot_const.Data_0x25] = [];
                }
                let ev07b_call = data2Model_Call(cmdValue);
                locationData[Prot_const.Data_0x25] = ev07b_call;
                // ((List<Object>)locationData.get()).add(ev07b_call);
                break;
            case Cmd_const.CMD_Data_STEP:
                const ev07b_step_list = data2Model_Step(cmdValue);
                if (!locationData[Prot_const.Data_0x30]) {
                    locationData[Prot_const.Data_0x30] = ev07b_step_list;
                }
                else { // Support multiple keys accumulated together (modified on: 2021-06-24)
                    locationData[Prot_const.Data_0x30] = ev07b_step_list;
                    // ((List<Object>)locationData.get(Prot_const.Data_0x30)).addAll(ev07b_step_list);
                }
                break;
            case Cmd_const.CMD_Data_Active:
                let ev07b_active_list = data2Model_Active(cmdValue);
                if (!locationData[Prot_const.Data_0x31]) {
                    locationData[Prot_const.Data_0x31] = ev07b_active_list;
                    // locationData.put(Prot_const.Data_0x31, ev07b_active_list);
                }
                else { // Support multiple keys accumulated together (modified on: 2021-06-24)
                    locationData[Prot_const.Data_0x31].concat(ev07b_active_list);
                    // ((List<Object>)locationData.get(Prot_const.Data_0x31)).addAll(ev07b_active_list);
                }
                break;
            case Cmd_const.CMD_Data_HeartRate:
                let ev07b_heart_list = data2Model_HeartRate(cmdValue);
                if (!locationData[Prot_const.Data_0x40]) {
                    locationData[Prot_const.Data_0x40] = ev07b_heart_list;
                }
                else { // Support multiple keys accumulated together (modified on: 2021-06-24)
                    locationData[Prot_const.Data_0x40].concat(ev07b_heart_list);
                }
                break;
            case Cmd_const.CMD_Data_SPO2Rate:
                let ev07b_spo2_list = data2Model_SPO2List(cmdValue);
                if (!locationData[Prot_const.Data_0x41]) {
                    locationData[Prot_const.Data_0x41] = ev07b_spo2_list;
                }
                else { // Support multiple keys accumulated together (modified on: 2021-06-24)
                    locationData[Prot_const.Data_0x41].concat(ev07b_spo2_list);
                }
                break;
            case Cmd_const.CMD_Data_BeaconList:
                let beaconList = data2Model_BeaconList(cmdValue);
                locationData[Prot_const.Data_0x33] = beaconList;
                break;
            case Cmd_const.CMD_Data_BeaconList2:
                let beaconList2 = data2Model_BeaconList2(cmdValue);
                locationData[Prot_const.Data_0x34] = beaconList2;
                break;
            case Cmd_const.CMD_Data_LogRecord:
                // Log record list changed to be dynamically created during parsing (modified on: 2021-06-24)
                if (!locationData[Prot_const.Log_list]) {
                    locationData[Prot_const.Log_list] = [];
                }
                const ev07b_log = data2Model_LogRecord(cmdValue);
                locationData[Prot_const.Log_list] = ev07b_log;
                break;
            default:
                let other;
                let key = "key:0x" + Number(item.cmdKey).toString(16);
                let value = "Value:" + BytesHexStrUtil.bytesToHexString(cmdValue);
                if (locationData[Prot_const.CMD_Key_Unsupported]) {
                    other = locationData[Prot_const.CMD_Key_Unsupported];
                    // other = (Map<String, String>) locationData.get(Prot_const.CMD_Key_Unsupported);
                }
                else {
                    other = { "msg": "Other keys are not supported" };
                }
                other[key] = value;
                locationData[Prot_const.CMD_Key_Unsupported] = other;
                break;
        }
    });
    return locationData;
}
// Parse configuration data
function data2Model_Status(data) {
    let map_status = {};
    let val = data.slice(0, 4);
    let dateTime = ProtocolUtil.bytes2DateTime(val);
    let status = data.slice(4, 8);
    let statusCode = ProtocolUtil.bytes2Long(status);
    map_status[Prot_const.Data_0x24_StatusCode] = statusCode; // Has this been removed in the new version?
    map_status[Prot_const.Data_0x24_DeviceStatus] = getDeviceStatus(status);
    map_status[Prot_const.Data_0x24_DateTime] = new Date(dateTime.getTime());
    map_status[Prot_const.Data_0x24_DateTime] = new Date(dateTime.getTime());
    return map_status;
}
// Get device status
function getDeviceStatus(status) {
    const flag = status[0] & 0xFF;
    const flag_1 = status[1] & 0xFF;
    const isGPS = ProtocolUtil.getBit(flag, 0, 1) > 0; //GPS
    const isWIFI = ProtocolUtil.getBit(flag, 1, 2) > 0; //WIFI
    const isGMS = ProtocolUtil.getBit(flag, 2, 3) > 0; //GMS
    const isBLE = ProtocolUtil.getBit(flag, 3, 4) > 0; //Bluetooth
    const isCharging = ProtocolUtil.getBit(flag, 4, 5) > 0; //Charging status
    const isChargingComplete = ProtocolUtil.getBit(flag, 5, 6) > 0; //Charging complete
    const isReboot = ProtocolUtil.getBit(flag, 6, 7) > 0; //Is it the first data
    const isHistoricalData = ProtocolUtil.getBit(flag, 7, 8) > 0; //Is it historical data
    const isAGPS = ProtocolUtil.getBit(flag_1, 0, 1) > 0; //Is it assisted positioning
    const isMotion = ProtocolUtil.getBit(flag_1, 1, 2) > 0; //Is it moving (active)
    const isSmart = ProtocolUtil.getBit(flag_1, 2, 3) > 0; //Is it smart positioning
    const isBeacon = ProtocolUtil.getBit(flag_1, 3, 4) > 0; //Is it Beacon positioning
    const bleConnected = ProtocolUtil.getBit(flag_1, 4, 5) > 0; //BLE Connected
    const fallDownStatus = ProtocolUtil.getBit(flag_1, 5, 6); //Fall down allow on status
    const isHomeWifi = ProtocolUtil.getBit(flag_1, 6, 7) > 0; //Is it HomeWifi positioning
    const isHome = ProtocolUtil.getBit(flag_1, 7, 8) > 0; //Is it at home
    const workMode = ProtocolUtil.getBit(status[2], 0, 3); //Work mode
    const signalSize = ProtocolUtil.getBit(status[2], 3, 8); //Signal strength
    const battery = status[3] & 0xFF; //Battery level
    let deviceStatus = {};
    if (isBLE) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_BLE;
    }
    else if (isSmart) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_Smart;
    }
    else if (isBeacon) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_Beacon;
    }
    else if (isHomeWifi) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_HomeWifi;
    }
    else if (isGPS) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_GPS;
    }
    else if (isWIFI && isGMS) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_WIFIGSM;
    }
    else if (isWIFI) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_WIFI;
    }
    else if (isGMS) {
        deviceStatus[Prot_const.Data_0x24_DataType] = Prot_const.Data_DataType_GSM;
    }
    deviceStatus[Prot_const.Data_0x24_IsCharging] = isCharging;
    deviceStatus[Prot_const.Data_0x24_IsChargingComplete] = isChargingComplete;
    deviceStatus[Prot_const.Data_0x24_IsHistoricalData] = isHistoricalData;
    deviceStatus[Prot_const.Data_0x24_IsReboot] = isReboot;
    deviceStatus[Prot_const.Data_0x24_IsAGPS] = isAGPS;
    deviceStatus[Prot_const.Data_0x24_IsMotion] = isMotion;
    deviceStatus[Prot_const.Data_0x24_WorkMode] = workMode;
    deviceStatus[Prot_const.Data_0x24_SignalSize] = signalSize;
    deviceStatus[Prot_const.Data_0x24_Battery] = battery;
    deviceStatus[Prot_const.Data_0x24_IsHome] = isHome;
    deviceStatus[Prot_const.Data_0x24_BleConnected] = bleConnected;
    deviceStatus[Prot_const.Data_0x24_FallDownStatus] = fallDownStatus;
    return deviceStatus;
}
// Parse gps positioning
function data2Model_GPS(data) {
    let map = {};
    let lat = ProtocolUtil.bytes2Latlng(data.slice(0, 4));
    let lng = ProtocolUtil.bytes2Latlng(data.slice(4, 8));
    let speed = (data[8] & 0xFF) | (data[9] & 0xFF) << 8;
    let direction = (data[10] & 0xFF) | (data[11] & 0xFF) << 8;
    //int altitude = (data[12] & 0xFF) | (data[13] & 0xFF) << 8;
    // Support negative numbers
    let altitude = ProtocolUtil.bytes2Long(data.slice(12, 14), true);
    let precision = (data[14] & 0xFF) | (data[15] & 0xFF) << 8;
    let mileage = ProtocolUtil.bytes2Long(data.slice(16, 20));
    let satellites = data[20] & 0xFF;
    map[Prot_const.Data_0x20_Lat] = lat;
    map[Prot_const.Data_0x20_Lng] = lng;
    map[Prot_const.Data_0x20_Speed] = speed;
    map[Prot_const.Data_0x20_Direction] = direction;
    map[Prot_const.Data_0x20_Altitude] = altitude;
    map[Prot_const.Data_0x20_Precision] = precision;
    map[Prot_const.Data_0x20_Mileage] = mileage;
    map[Prot_const.Data_0x20_Satellites] = satellites;
    return map;
}
// Parse GSM positioning
function data2Model_GSM(data, key) {
    const map_gsm = {};
    if (key == Cmd_const.CMD_Data_GSM) {
        const gsmList = getJson_GSM(data);
        map_gsm[Prot_const.Data_0x21_GsmList] = gsmList;
        map_gsm[Prot_const.Data_0x21_GsmType] = "2.5G";
    }
    else if (key == Cmd_const.CMD_Data_GSM2) {
        const gsmList = getJson_GSM2(data);
        map_gsm[Prot_const.Data_0x21_GsmList] = gsmList;
        map_gsm[Prot_const.Data_0x21_GsmType] = "4G";
    }
    else if (key == Cmd_const.CMD_Data_GSM3) {
        const gsmList = getJson_GSM3(data);
        map_gsm[Prot_const.Data_0x21_GsmList] = gsmList;
        map_gsm[Prot_const.Data_0x21_GsmType] = "4G";
    }
    return map_gsm;
}
function getJson_GSM(data) {
    const list = [];
    const MCC = (data[0] & 0xFF) | (data[1] & 0xFF) << 8;
    const MNC = data[2] & 0xFF;
    for (let i = 3; i + 4 < data.length;) {
        const Json_GSM = {};
        const RXL = data[i] & 0xFF;
        const LAC = (data[i + 1] & 0xFF) | (data[i + 2] & 0xFF) << 8;
        const CELLID = (data[i + 3] & 0xFF) | (data[i + 4] & 0xFF) << 8;
        Json_GSM[Prot_const.Data_0x21_Mcc] = MCC;
        Json_GSM[Prot_const.Data_0x21_Mnc] = MNC;
        Json_GSM[Prot_const.Data_0x21_CellId] = CELLID;
        Json_GSM[Prot_const.Data_0x21_Lac] = LAC;
        Json_GSM[Prot_const.Data_0x21_Signal] = RXL;
        list.push(Json_GSM);
        i += 5;
    }
    return list;
}
function getJson_GSM2(data) {
    // CELLID 4 bite
    const list = [];
    const MCC = (data[0] & 0xFF) | (data[1] & 0xFF) << 8;
    const MNC = data[2] & 0xFF;
    for (let i = 3; i + 6 < data.length;) {
        const Json_GSM2 = {};
        const RXL = data[i] & 0xFF;
        const LAC = (data[i + 1] & 0xFF) | (data[i + 2] & 0xFF) << 8;
        const CELLID = (data[i + 3] & 0xFF) | (data[i + 4] & 0xFF) << 8
            | (data[i + 5] & 0xFF) << 16 | (data[i + 6] & 0xFF) << 24;
        Json_GSM2[Prot_const.Data_0x21_Mcc] = MCC;
        Json_GSM2[Prot_const.Data_0x21_Mnc] = MNC;
        Json_GSM2[Prot_const.Data_0x21_CellId] = CELLID;
        Json_GSM2[Prot_const.Data_0x21_Lac] = LAC;
        Json_GSM2[Prot_const.Data_0x21_Signal] = RXL;
        list.push(Json_GSM2);
        i += 7;
    }
    return list;
}
function getJson_GSM3(data) {
    // CELLID 4 bite, MNC 2 bite
    const list = [];
    const MCC = (data[0] & 0xFF) | (data[1] & 0xFF) << 8;
    const MNC = (data[2] & 0xFF) | (data[3] & 0xFF) << 8;
    for (let i = 4; i + 6 < data.length;) {
        const Json_GSM3 = {};
        const RXL = data[i] & 0xFF;
        const LAC = (data[i + 1] & 0xFF) | (data[i + 2] & 0xFF) << 8;
        const CELLID = (data[i + 3] & 0xFF) | (data[i + 4] & 0xFF) << 8
            | (data[i + 5] & 0xFF) << 16 | (data[i + 6] & 0xFF) << 24;
        Json_GSM3[Prot_const.Data_0x21_Mcc] = MCC;
        Json_GSM3[Prot_const.Data_0x21_Mnc] = MNC;
        Json_GSM3[Prot_const.Data_0x21_CellId] = CELLID;
        Json_GSM3[Prot_const.Data_0x21_Lac] = LAC;
        Json_GSM3[Prot_const.Data_0x21_Signal] = RXL;
        list.push(Json_GSM3);
        i += 7;
    }
    return list;
}
// Parse wifi positioning
function data2Model_Wifi(data, key) {
    const map_wifi = {};
    let wifiList = null;
    if (key == Cmd_const.CMD_Data_WIFI) {
        wifiList = getJson_Wifi(data);
    }
    else if (key == Cmd_const.CMD_Data_WIFI2) {
        wifiList = getJson_Wifi2(data);
    }
    map_wifi[Prot_const.Data_0x22_WifiList] = wifiList;
    return map_wifi;
}
function getJson_Wifi(data) {
    const list = [];
    for (let i = 0; i + 6 < data.length;) {
        const Json_Wifi = {};
        let rssi = (data[i] & 0xFF);
        let mac = ProtocolUtil.bytes2Mac(data.slice(i + 1, i + 7), true);
        Json_Wifi[Prot_const.Data_0x22_Signal] = rssi;
        Json_Wifi[Prot_const.Data_0x22_Mac] = mac;
        list.push(Json_Wifi);
        i += 7;
    }
    return list;
}
function getJson_Wifi2(data) {
    const list = [];
    for (let i = 0; i + 7 < data.length;) {
        const Json_Wifi2 = {};
        const rssi = (data[i] & 0xFF);
        const mac = ProtocolUtil.bytes2Mac(data.slice(i + 1, i + 7), true);
        Json_Wifi2[Prot_const.Data_0x22_Signal] = rssi;
        Json_Wifi2[Prot_const.Data_0x22_Mac] = mac;
        const nameLength = data[i + 7] & 0xFF;
        const name = BytesHexStrUtil.bytes2StringByUTF_8(data.slice(i + 8, i + 8 + nameLength));
        Json_Wifi2[Prot_const.Data_0x22_Name] = name;
        list.push(Json_Wifi2);
        i += 8 + nameLength;
    }
    return list;
}
// Parse bluetooth
function data2Model_BLE(data) {
    if (data.length > 1) { //Filter ble positioning request, only key no value.
        const map_ble = {};
        const mac = ProtocolUtil.bytes2Mac(data.slice(0, 6), false);
        const lat = ProtocolUtil.bytes2Latlng(data.slice(6, 10));
        const lng = ProtocolUtil.bytes2Latlng(data.slice(10, 14));
        map_ble[Prot_const.Data_0x23_Mac] = mac;
        map_ble[Prot_const.Data_0x23_Lat] = lat;
        map_ble[Prot_const.Data_0x23_Lng] = lng;
        if (data.length > 14) {
            const description = BytesHexStrUtil.bytes2StringByUTF_8(data.slice(14, data.length));
            map_ble[Prot_const.Data_0x23_Describe] = description;
        }
        return map_ble;
    }
    return null;
}
function data2Model_BLE2(data) {
    const map_ble = {};
    const mac = ProtocolUtil.bytes2Mac(data.slice(0, 6), false);
    const lat = ProtocolUtil.bytes2Latlng(data.slice(6, 10));
    const lng = ProtocolUtil.bytes2Latlng(data.slice(10, 14));
    const radius = (data[14] & 0xFF) | (data[15] & 0xFF) << 8;
    const height = (data[16] & 0xFF) | (data[17] & 0xFF) << 8;
    map_ble[Prot_const.Data_0x23_Mac] = mac;
    map_ble[Prot_const.Data_0x23_Lat] = lat;
    map_ble[Prot_const.Data_0x23_Lng] = lng;
    map_ble[Prot_const.Data_0x23_Radius] = radius / 10;
    map_ble[Prot_const.Data_0x23_Height] = height;
    return map_ble;
}
function data2Model_Smart(data) {
    const map_ble = {};
    const lat = ProtocolUtil.bytes2Latlng(data.slice(0, 4));
    const lng = ProtocolUtil.bytes2Latlng(data.slice(4, 8));
    const radius = (data[8] & 0xFF) | (data[9] & 0xFF) << 8;
    const height = (data[10] & 0xFF) | (data[11] & 0xFF) << 8;
    map_ble[Prot_const.Data_0x27_Lat] = lat;
    map_ble[Prot_const.Data_0x27_Lng] = lng;
    map_ble[Prot_const.Data_0x27_Radius] = radius;
    map_ble[Prot_const.Data_0x27_Height] = height;
    return map_ble;
}
function data2Model_Beacon(data) {
    const map_beacon = {};
    const flag = (data[0] & 0xFF);
    const beacon_index = ProtocolUtil.getBit(flag, 0, 4);
    const mac = ProtocolUtil.bytes2Mac(data.slice(1, 7), false);
    const rssi = data[7]; //With sign, no & 0xFF
    const rssi_1m = data[8]; //With sign, no & 0xFF
    map_beacon[Prot_const.CMD_Body_Index] = beacon_index;
    map_beacon[Prot_const.Data_0x28_Mac] = mac;
    map_beacon[Prot_const.Data_0x28_Rssi] = rssi;
    map_beacon[Prot_const.Data_0x28_Rssi_1m] = rssi_1m;
    let index = 9;
    let latLngStatus = ProtocolUtil.getBit(flag, 7, 8);
    if (latLngStatus == 1) {
        let lat = ProtocolUtil.bytes2Latlng(data.slice(9, 13));
        let lng = ProtocolUtil.bytes2Latlng(data.slice(13, 17));
        map_beacon[Prot_const.Data_0x28_Lat] = lat;
        map_beacon[Prot_const.Data_0x28_Lng] = lng;
        index += 8;
    }
    let descriptionStatus = ProtocolUtil.getBit(flag, 6, 7);
    if (descriptionStatus == 1) {
        let description = BytesHexStrUtil.bytes2StringByUTF_8(data.slice(index, data.length));
        map_beacon[Prot_const.Data_0x28_Describe] = description;
    }
    return map_beacon;
}
function data2Model_Beacon2(data) {
    const map_beacon = {};
    const flag = (data[0] & 0xFF);
    const beacon_index = ProtocolUtil.getBit(flag, 0, 4);
    const mac = ProtocolUtil.bytes2Mac(data.slice(1, 7), false);
    const rssi = data[7]; //With sign, no & 0xFF
    const rssi_1m = data[8]; //With sign, no & 0xFF
    const battery = data[9] & 0xFF;
    map_beacon[Prot_const.CMD_Body_Index] = beacon_index;
    map_beacon[Prot_const.Data_0x28_Mac] = mac;
    map_beacon[Prot_const.Data_0x28_Rssi] = rssi;
    map_beacon[Prot_const.Data_0x28_Rssi_1m] = rssi_1m;
    map_beacon[Prot_const.Data_0x28_Battery] = battery;
    let index = 10;
    let latLngStatus = ProtocolUtil.getBit(flag, 7, 8);
    if (latLngStatus == 1) {
        let lat = ProtocolUtil.bytes2Latlng(data.slice(10, 14));
        let lng = ProtocolUtil.bytes2Latlng(data.slice(14, 18));
        map_beacon[Prot_const.Data_0x28_Lat] = lat;
        map_beacon[Prot_const.Data_0x28_Lng] = lng;
        index += 8;
    }
    let descriptionStatus = ProtocolUtil.getBit(flag, 6, 7);
    if (descriptionStatus == 1) {
        let description = BytesHexStrUtil.bytes2StringByUTF_8(data.slice(index, data.length));
        map_beacon[Prot_const.Data_0x28_Describe] = description;
    }
    return map_beacon;
}
function data2Model_HomeWifi(data) {
    const map_homeWifi = {};
    const flag = (data[0] & 0xFF);
    const homeWifi_index = (flag & 0x0F);
    const mac = ProtocolUtil.bytes2Mac(data.slice(1, 7), false);
    let rssi = data[7]; //With sign, no & 0xFF
    map_homeWifi[Prot_const.Data_0x2A_Mac] = mac;
    map_homeWifi[Prot_const.Data_0x2A_Rssi] = rssi;
    map_homeWifi[Prot_const.CMD_Body_Index] = homeWifi_index;
    let index = 8;
    let latlngStatus = ProtocolUtil.getBit(flag, 7, 8);
    if (latlngStatus == 1) {
        const lat = ProtocolUtil.bytes2Latlng(data.slice(8, 12));
        const lng = ProtocolUtil.bytes2Latlng(data.slice(12, 16));
        map_homeWifi[Prot_const.Data_0x2A_Lat] = lat;
        map_homeWifi[Prot_const.Data_0x2A_Lng] = lng;
        index += 8;
    }
    const descriptionStatus = ProtocolUtil.getBit(flag, 6, 7);
    if (descriptionStatus == 1) {
        const description = BytesHexStrUtil.bytes2StringByUTF_8(data.slice(index, data.length));
        map_homeWifi[Prot_const.Data_0x2A_Describe] = description;
    }
    return map_homeWifi;
}
// Parse alarm status
function getAlarmStatus(alarmFlag) {
    const alarmStatus = {};
    alarmStatus[Prot_const.CMD_Value_FLAG] = alarmFlag;
    alarmStatus[Prot_const.Data_0x02_BatteryLow] = ProtocolUtil.getBit(alarmFlag, 0, 1);
    alarmStatus[Prot_const.Data_0x02_OverSpeed] = ProtocolUtil.getBit(alarmFlag, 1, 2);
    alarmStatus[Prot_const.Data_0x02_FallDown] = ProtocolUtil.getBit(alarmFlag, 2, 3);
    alarmStatus[Prot_const.Data_0x02_Tilt] = ProtocolUtil.getBit(alarmFlag, 3, 4);
    alarmStatus[Prot_const.Data_0x02_Geo1] = ProtocolUtil.getBit(alarmFlag, 4, 5);
    alarmStatus[Prot_const.Data_0x02_Geo2] = ProtocolUtil.getBit(alarmFlag, 5, 6);
    alarmStatus[Prot_const.Data_0x02_Geo3] = ProtocolUtil.getBit(alarmFlag, 6, 7);
    alarmStatus[Prot_const.Data_0x02_Geo4] = ProtocolUtil.getBit(alarmFlag, 7, 8);
    alarmStatus[Prot_const.Data_0x02_PowerOff] = ProtocolUtil.getBit(alarmFlag, 8, 9);
    alarmStatus[Prot_const.Data_0x02_PowerOn] = ProtocolUtil.getBit(alarmFlag, 9, 10);
    alarmStatus[Prot_const.Data_0x02_Motion] = ProtocolUtil.getBit(alarmFlag, 10, 11);
    alarmStatus[Prot_const.Data_0x02_NoMotion] = ProtocolUtil.getBit(alarmFlag, 11, 12);
    alarmStatus[Prot_const.Data_0x02_SosKey] = ProtocolUtil.getBit(alarmFlag, 12, 13);
    alarmStatus[Prot_const.Data_0x02_SosKey] = ProtocolUtil.getBit(alarmFlag, 12, 13);
    alarmStatus[Prot_const.Data_0x02_Side1key] = ProtocolUtil.getBit(alarmFlag, 13, 14);
    alarmStatus[Prot_const.Data_0x02_Side2key] = ProtocolUtil.getBit(alarmFlag, 14, 15);
    alarmStatus[Prot_const.Data_0x02_BatteryCharging] = ProtocolUtil.getBit(alarmFlag, 15, 16);
    alarmStatus[Prot_const.Data_0x02_BatteryNoCharging] = ProtocolUtil.getBit(alarmFlag, 16, 17);
    alarmStatus[Prot_const.Data_0x02_AlarmEnd] = ProtocolUtil.getBit(alarmFlag, 17, 18);
    alarmStatus[Prot_const.Data_0x02_Amber] = ProtocolUtil.getBit(alarmFlag, 18, 19);
    alarmStatus[Prot_const.Data_0x02_Welfare] = ProtocolUtil.getBit(alarmFlag, 19, 20);
    alarmStatus[Prot_const.Data_0x02_AmberEnd] = ProtocolUtil.getBit(alarmFlag, 20, 21);
    alarmStatus[Prot_const.Data_0x02_FallDownEnd] = ProtocolUtil.getBit(alarmFlag, 21, 22);
    alarmStatus[Prot_const.Data_0x02_WelfareEnd] = ProtocolUtil.getBit(alarmFlag, 22, 23);
    alarmStatus[Prot_const.Data_0x02_Upload] = ProtocolUtil.getBit(alarmFlag, 23, 24);
    alarmStatus[Prot_const.Data_0x02_HomeFenceOut] = ProtocolUtil.getBit(alarmFlag, 24, 25);
    alarmStatus[Prot_const.Data_0x02_HomeFenceIn] = ProtocolUtil.getBit(alarmFlag, 25, 26);
    // GEO alarm in/out status bit
    alarmStatus[Prot_const.Data_0x02_Geo1_In] = ProtocolUtil.getBit(alarmFlag, 26, 27);
    alarmStatus[Prot_const.Data_0x02_Geo2_In] = ProtocolUtil.getBit(alarmFlag, 27, 28);
    alarmStatus[Prot_const.Data_0x02_Geo3_In] = ProtocolUtil.getBit(alarmFlag, 28, 29);
    alarmStatus[Prot_const.Data_0x02_Geo4_In] = ProtocolUtil.getBit(alarmFlag, 29, 30);
    alarmStatus[Prot_const.Data_0x02_BleDisConnected] = ProtocolUtil.getBit(alarmFlag, 30, 31);
    return alarmStatus;
}
function getAlarmStatusExtend(alarmFlag) {
    const alarmExtendStatus = {};
    alarmExtendStatus[Prot_const.CMD_Value_FLAG] = alarmFlag; //New reserved value
    alarmExtendStatus[Prot_const.Data_0x02_FallOff] = ProtocolUtil.getBit(alarmFlag, 0, 1);
    return alarmExtendStatus;
}
function data2Model_Call(data) {
    const map_call = {};
    let dateTime = ProtocolUtil.bytes2DateTime(data.slice(0, 4));
    let flag = (data[4] & 0xFF);
    let time = (data[5] & 0xFF) | (data[6] & 0xFF) << 8;
    let retCode = (data[7] & 0xFF);
    const numberBytes = data.slice(8, data.length);
    let number = BytesHexStrUtil.bytes2StringByASCII(numberBytes);
    map_call["flag"] = flag;
    // map_call[Prot_const.Data_0x25_DateTime]= new Timestamp(dateTime.getTime()));
    map_call[Prot_const.Data_0x25_Number] = number;
    map_call[Prot_const.Data_0x25_Time] = time;
    map_call[Prot_const.Data_0x25_RetCode] = retCode;
    map_call[Prot_const.Data_0x25_CallType] = ProtocolUtil.getBit(flag, 4, 8);
    map_call[Prot_const.Data_0x25_CallInOut] = ProtocolUtil.getBit(flag, 0, 1);
    map_call[Prot_const.Data_0x25_CallStatus] = ProtocolUtil.getBit(flag, 1, 4);
    return map_call;
}
function data2Model_Step(data) {
    const ev07b_step_list = [];
    for (let i = 0; i < data.length;) {
        const ev07b_step = {};
        const dateTime = ProtocolUtil.bytes2DateTime(data.slice(i, i + 4));
        const step = ProtocolUtil.bytes2Long(data.slice(i + 4, i + 8));
        ev07b_step[Prot_const.Data_0x30_DateTime] = new Date(dateTime.getTime());
        ev07b_step[Prot_const.Data_0x30_Step] = step;
        ev07b_step_list.push(ev07b_step);
        i += 8;
    }
    return ev07b_step_list;
}
function data2Model_Active(data) {
    const ev07b_active_list = [];
    for (let i = 0; i < data.length;) {
        const ev07b_active = {};
        const dateTime = ProtocolUtil.bytes2DateTime(data.slice(i, i + 4));
        let active = ProtocolUtil.bytes2Long(data.slice(i + 4, i + 8));
        ev07b_active[Prot_const.Data_0x31_DateTime] = new Date(dateTime.getTime());
        ev07b_active[Prot_const.Data_0x31_Active] = active;
        ev07b_active_list.push(ev07b_active);
        i += 8;
    }
    return ev07b_active_list;
}
function data2Model_HeartRate(data) {
    const ev07b_heart_list = [];
    for (let i = 0; i < data.length;) {
        const ev07b_heart = {};
        const dateTime = ProtocolUtil.bytes2DateTime(data.slice(i, i + 4));
        let heartRate = data[i + 4] & 0xFF;
        let trustLevel = data[i + 5] & 0xFF;
        ev07b_heart[Prot_const.Data_0x40_DateTime] = new Date(dateTime.getTime());
        ev07b_heart[Prot_const.Data_0x40_HeartRate] = heartRate;
        ev07b_heart[Prot_const.Data_0x40_TrustLevel] = trustLevel;
        ev07b_heart_list.push(ev07b_heart);
        i += 6;
    }
    return ev07b_heart_list;
}
function data2Model_SPO2List(data) {
    const ev07b_spo2_list = [];
    for (let i = 0; i < data.length;) {
        const ev07b_spo2 = {};
        const dateTime = ProtocolUtil.bytes2DateTime(data.slice(i, i + 4));
        const heartRate = data[i + 4] & 0xFF;
        const trustLevel = data[i + 5] & 0xFF;
        ev07b_spo2[Prot_const.Data_0x41_DateTime] = new Date(dateTime.getTime());
        ev07b_spo2[Prot_const.Data_0x41_SPO2Rate] = heartRate;
        ev07b_spo2[Prot_const.Data_0x41_TrustLevel] = trustLevel;
        ev07b_spo2_list.push(ev07b_spo2);
        i += 6;
    }
    return ev07b_spo2_list;
}
function data2Model_BeaconList(data) {
    const ev07b_beacon = {};
    const dateTime = ProtocolUtil.bytes2DateTime(data.slice(0, 4));
    const companyId = ProtocolUtil.bytes2Long(data.slice(4, 6));
    const uuid = BytesHexStrUtil.bytesToHexString(data.slice(6, 22));
    ev07b_beacon[Prot_const.Data_0x33_UUID] = uuid;
    ev07b_beacon[Prot_const.Data_0x33_DateTime] = dateTime;
    ev07b_beacon[Prot_const.Data_0x33_CompanyId] = companyId;
    const ev07b_beacon_list = [];
    for (let i = 22; i < data.length;) {
        const beacon = {};
        const major = ProtocolUtil.bytes2Long(data.slice(i, i + 2));
        const minor = ProtocolUtil.bytes2Long(data.slice(i + 2, i + 4));
        const rssi_m = data[i + 4] & 0xFF;
        const rssi_r = data[i + 5] & 0xFF;
        beacon[Prot_const.Data_0x33_Major] = major;
        beacon[Prot_const.Data_0x33_Minor] = minor;
        beacon[Prot_const.Data_0x33_Rssi_m] = rssi_m;
        beacon[Prot_const.Data_0x33_Rssi_r] = rssi_r;
        ev07b_beacon_list.push(beacon);
        i += 6;
    }
    ev07b_beacon[Prot_const.Data_0x33_List] = ev07b_beacon_list;
    return ev07b_beacon;
}
function data2Model_BeaconList2(data) {
    const ev07b_beacon = {};
    const dateTime = ProtocolUtil.bytes2DateTime(data.slice(0, 4));
    const companyId = ProtocolUtil.bytes2Long(data.slice(4, 6));
    ev07b_beacon[Prot_const.Data_0x33_DateTime] = dateTime;
    ev07b_beacon[Prot_const.Data_0x33_CompanyId] = companyId;
    const ev07b_beacon_list = [];
    for (let i = 6; i < data.length;) {
        const beacon = {};
        const uuid = BytesHexStrUtil.bytesToHexString(data.slice(i, i + 16));
        const major = ProtocolUtil.bytes2Long(data.slice(i + 16, i + 18));
        const minor = ProtocolUtil.bytes2Long(data.slice(i + 18, i + 20));
        const rssi_m = data[i + 20] & 0xFF;
        const rssi_r = data[i + 21] & 0xFF;
        beacon[Prot_const.Data_0x33_UUID] = uuid;
        beacon[Prot_const.Data_0x33_Major] = major;
        beacon[Prot_const.Data_0x33_Minor] = minor;
        beacon[Prot_const.Data_0x33_Rssi_m] = rssi_m;
        beacon[Prot_const.Data_0x33_Rssi_r] = rssi_r;
        ev07b_beacon_list.push(beacon);
        i += 22;
    }
    ev07b_beacon[Prot_const.Data_0x33_List] = ev07b_beacon_list;
    return ev07b_beacon;
}
function data2Model_LogRecord(data) {
    const ev07b_log = {};
    ev07b_log["codeData"] = data;
    ev07b_log["logData"] = BytesHexStrUtil.bytes2StringByUTF_8(data);
    return ev07b_log;
}
