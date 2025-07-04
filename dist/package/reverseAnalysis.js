"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseAnalysis = void 0;
const Cmd_const = require('./cmdConst');
const Prot_const = require('./protConst');
const Convert = require('../utils/convert');
const CMD_DataBody = require('./CMD_DataBody');
const CheckCRC = require('../utils/checkCrc');
const ProtocolUtil = require('../utils/protocolUtil');
const logger = require('../modules/logger').logger("info");
const BytesHexStrUtil = require('../utils/bytesHexStr');
function reverseAnalysis(arr) {
    if (!arr || arr.length <= 0)
        return;
    let [{ cmdHeadData, cmdBodyData }] = arr;
    let cmd_bodyData = [];
    switch (cmdBodyData.cmdType) {
        case 1:
            cmd_bodyData = getCommand_data(cmdBodyData.locationData);
            break;
        case 3:
            cmd_bodyData = getCommand_service(cmdBodyData.servicesData);
            break;
        case 4:
            cmd_bodyData = getCommand_system(cmdBodyData.systemData);
            break;
    }
    const cmdData = getByteData(cmdHeadData, getByteData_body(cmd_bodyData));
    // const cmdData = getByteData_body(cmd_bodyData);
    let str = BytesHexStrUtil.toHexString(cmdData);
    logger.info("反向解析：", str);
    return cmdData;
}
exports.reverseAnalysis = reverseAnalysis;
function getCommand_data(bodyData) {
    let cmd_bodyData = new CMD_DataBody();
    cmd_bodyData.setCmdType(Cmd_const.CMD_Type_Data);
    for (let key in bodyData) {
        let cmdValue = [];
        let cmdKey;
        switch (key) { // 没有处理ICCID逻辑
            case Prot_const.Data_0x01:
                cmdKey = Cmd_const.CMD_Data_IMEI;
                const imei = Convert.toStr(bodyData[key], ProtocolUtil.IMEI_DEFAULT);
                cmdValue = BytesHexStrUtil.string2BytesByASCII(imei);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_list:
                for (let dataListKey of bodyData[key]) {
                    for (let keys in dataListKey) {
                        switch (keys) {
                            case Prot_const.Data_0x20:
                                cmdKey = Cmd_const.CMD_Data_GPS;
                                let data_gps = dataListKey[keys];
                                cmdValue = mapGPS2Byte(data_gps);
                                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                                break;
                            case Prot_const.Data_0x24:
                                cmdKey = Cmd_const.CMD_Data_Status;
                                let data_status = dataListKey[keys];
                                cmdValue = mapStatus2Byte(data_status);
                                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                                break;
                        }
                    }
                }
                break;
            case Prot_const.Data_0x02:
                cmdKey = Cmd_const.CMD_Data_AlarmCode;
                let alarmCode = bodyData[key];
                let status = alarmCode[Prot_const.Data_0x02_AlarmStatus];
                let dateTime = Convert.toStr(alarmCode[Prot_const.Data_0x02_DateTime], ProtocolUtil.DATETIME_DEFAULT);
                let statusCode = Convert.toInt(status[Prot_const.Data_0x02_BatteryLow], 0);
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_OverSpeed], 0) << 1;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_FallDown], 0) << 2;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Tilt], 0) << 3;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo1], 0) << 4;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo2], 0) << 5;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo3], 0) << 6;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo4], 0) << 7;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_PowerOff], 0) << 8;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_PowerOn], 0) << 9;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Motion], 0) << 10;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_NoMotion], 0) << 11;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_SosKey], 0) << 12;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Side1key], 0) << 13;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Side2key], 0) << 14;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_BatteryCharging], 0) << 15;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_BatteryNoCharging], 0) << 16;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_AlarmEnd], 0) << 17;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Amber], 0) << 18;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Welfare], 0) << 19;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_AmberEnd], 0) << 20;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_FallDownEnd], 0) << 21;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_WelfareEnd], 0) << 22;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Upload], 0) << 23;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_HomeFenceOut], 0) << 24;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_HomeFenceIn], 0) << 25;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo1_In], 0) << 26;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo2_In], 0) << 27;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo3_In], 0) << 28;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_Geo4_In], 0) << 29;
                statusCode |= Convert.toInt(status[Prot_const.Data_0x02_BleDisConnected], 0) << 30;
                let statusExtend = alarmCode[Prot_const.Data_0x02_AlarmStatusExtend];
                let statusCodeExtend = Convert.toInt(statusExtend[Prot_const.Data_0x02_FallOff], 0);
                cmdValue = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
                cmdValue = ProtocolUtil.long2Bytes(statusCode, 4).concat(cmdValue);
                cmdValue = cmdValue.concat(ProtocolUtil.long2Bytes(statusCodeExtend, 4));
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x12:
                cmdKey = Cmd_const.CMD_Data_SingleLocating;
                cmd_bodyData.setCmdData(cmdKey, null);
                break;
            case Prot_const.Data_0x13:
                cmdKey = Cmd_const.CMD_Data_ContinueLocating;
                cmd_bodyData.setCmdData(cmdKey, null);
                break;
            case Prot_const.Data_0x14:
                cmdKey = Cmd_const.CMD_Data_PetWalking;
                let walkPet = bodyData[key];
                let startTime = Convert.toStr(walkPet[Prot_const.Data_0x14_StartTime], ProtocolUtil.DATETIME_DEFAULT);
                let stopTime = Convert.toStr(walkPet[Prot_const.Data_0x14_StopTime], ProtocolUtil.DATETIME_DEFAULT);
                let startByte = ProtocolUtil.dateTime2Bytes(new Date(startTime));
                let stopByte = ProtocolUtil.dateTime2Bytes(new Date(stopTime));
                cmdValue = startByte.concat(stopByte);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x20:
                cmdKey = Cmd_const.CMD_Data_GPS;
                let data_gps = bodyData[key];
                cmdValue = mapGPS2Byte(data_gps);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x21:
                cmdKey = Cmd_const.CMD_Data_GSM;
                let data_gsm = bodyData[key];
                cmdValue = mapGSM2Byte(data_gsm, cmdKey);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x29:
                cmdKey = Cmd_const.CMD_Data_GSM2;
                let data_gsm2 = bodyData[key];
                cmdValue = mapGSM2Byte(data_gsm2, cmdKey);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x2B:
                cmdKey = Cmd_const.CMD_Data_GSM3;
                let data_gsm3 = bodyData[key];
                cmdValue = mapGSM2Byte(data_gsm3, cmdKey);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x22:
                cmdKey = Cmd_const.CMD_Data_WIFI;
                let data_wifi = bodyData[key];
                cmdValue = mapWifi2Byte(data_wifi);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x19:
                cmdKey = Cmd_const.CMD_Data_WIFI2;
                let data_wifi2 = bodyData[key];
                cmdValue = mapWifi2Byte(data_wifi2);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x23:
                cmdKey = Cmd_const.CMD_Data_BLE;
                let data_ble = bodyData[key];
                cmdValue = mapBLE2Byte(data_ble);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x26:
                cmdKey = Cmd_const.CMD_Data_BLE2;
                let data_ble2 = bodyData[key];
                cmdValue = mapBLE2Byte2(data_ble2);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x24:
                cmdKey = Cmd_const.CMD_Data_Status;
                let data_status = bodyData[key];
                cmdValue = mapStatus2Byte(data_status);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x25:
                cmdKey = Cmd_const.CMD_Data_CallRecords;
                let data_call = bodyData[key];
                cmdValue = mapCALL2Byte(data_call);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x27:
                cmdKey = Cmd_const.CMD_Data_Smart;
                let data_smart = bodyData[key];
                cmdValue = mapSmart2Byte(data_smart);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x28:
                cmdKey = Cmd_const.CMD_Data_Beacon;
                let data_beacon = bodyData[key];
                cmdValue = mapBeacon2Byte(data_beacon, cmdKey);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x2C:
                cmdKey = Cmd_const.CMD_Data_Beacon2;
                let data_beacon2 = bodyData[key];
                cmdValue = mapBeacon2Byte(data_beacon2, cmdKey);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x2A:
                cmdKey = Cmd_const.CMD_Data_HomeWifi;
                let data_homeWifi = bodyData[key];
                cmdValue = mapHomeWifi2Byte(data_homeWifi);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x30:
                cmdKey = Cmd_const.CMD_Data_STEP;
                let data_step = bodyData[key];
                cmdValue = mapStep2Byte(data_step);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x31:
                cmdKey = Cmd_const.CMD_Data_Active;
                let data_active = bodyData[key];
                cmdValue = mapActive2Byte(data_active);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x33:
                cmdKey = Cmd_const.CMD_Data_BeaconList;
                let data_beaconList = bodyData[key];
                cmdValue = mapBeaconList2Byte(data_beaconList);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x34:
                cmdKey = Cmd_const.CMD_Data_BeaconList2;
                let data_beaconList2 = bodyData[key];
                cmdValue = mapBeaconList2Byte2(data_beaconList2);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x40:
                cmdKey = Cmd_const.CMD_Data_HeartRate;
                let data_heartRate = bodyData[key];
                cmdValue = mapHeartRate2Byte(data_heartRate);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Data_0x41:
                cmdKey = Cmd_const.CMD_Data_SPO2Rate;
                let data_spo2Rate = bodyData[key];
                cmdValue = mapSPO2Rate2Byte(data_spo2Rate);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
        }
    }
    return cmd_bodyData;
}
function getCommand_system(bodyData) {
    let cmd_bodyData = new CMD_DataBody();
    cmd_bodyData.setCmdType(Cmd_const.CMD_Type_System);
    for (let key in bodyData) {
        let cmdValue = [];
        let cmdKey;
        switch (key) {
            case Prot_const.System_0x13:
                cmdKey = Cmd_const.CMD_Find_Me;
                cmd_bodyData.setCmdData(cmdKey, null);
                break;
        }
        return cmd_bodyData;
    }
}
function getCommand_service(bodyData) {
    let cmd_bodyData = new CMD_DataBody();
    cmd_bodyData.setCmdType(Cmd_const.CMD_Type_Service);
    for (let key in bodyData) {
        let cmdValue = [];
        let cmdKey;
        switch (key) {
            case Prot_const.Services_0x01:
                cmdKey = Cmd_const.CMD_Services_IMEI;
                const imei = Convert.toStr(bodyData[key], ProtocolUtil.IMEI_DEFAULT);
                cmdValue = BytesHexStrUtil.string2BytesByASCII(imei);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Services_0x10:
                cmdKey = Cmd_const.CMD_Services_HeartBeat;
                cmdValue.push(bodyData[key]);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Services_0x11:
                cmdKey = Cmd_const.CMD_Services_getAddresses;
                let addresses = bodyData[key];
                let lat_addr = Convert.toDouble(addresses[Prot_const.Services_0x11_lat], 0.0);
                let lng_addr = Convert.toDouble(addresses[Prot_const.Services_0x11_lng], 0.0);
                cmdValue = ProtocolUtil.latlng2Bytes(lat_addr, lng_addr);
                let value = addresses[Prot_const.Services_0x11_address];
                if (value) {
                    let addressBytes = BytesHexStrUtil.string2BytesByUTF_8(value);
                    cmdValue = cmdValue.concat(...addressBytes);
                }
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Services_0x12:
                const systemTime = bodyData[key];
                cmdKey = Cmd_const.CMD_Services_getTimestamp;
                if (systemTime) {
                    const dateTime = Convert.toStr(systemTime, ProtocolUtil.DATETIME_DEFAULT);
                    cmdValue = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
                }
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Services_0x13:
                cmdKey = Cmd_const.CMD_Services_getWeather;
                let weather = bodyData[key];
                let lang = Convert.toStr(weather[Prot_const.Services_0x13_lang], "");
                lang = "%-8s" + lang;
                // lang = lang String.format("%-8s", lang);// 8个字节不足右边补空格
                cmdValue = BytesHexStrUtil.string2BytesByASCII(lang);
                if (weather[Prot_const.Services_0x13_lat] != null && weather[Prot_const.Services_0x13_lng] != null) {
                    const lat_weather = Convert.toDouble(weather[Prot_const.Services_0x13_lat], 0.0);
                    const lng_weather = Convert.toDouble(weather[Prot_const.Services_0x13_lng], 0.0);
                    cmdValue = cmdValue.concat(ProtocolUtil.latlng2Bytes(lat_weather, lng_weather));
                }
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Services_0x21:
                cmdKey = Cmd_const.CMD_Services_getLocationGSM;
                let location_gsm = bodyData[key];
                cmdValue = mapGSM2Byte(location_gsm, cmdKey);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Services_0x22:
                cmdKey = Cmd_const.CMD_Services_getLocationWIFI;
                let location_wifi = bodyData[key];
                cmdValue = mapWifi2Byte(location_wifi);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
            case Prot_const.Services_0x24:
                cmdKey = Cmd_const.CMD_Services_generalData;
                let generalData = bodyData[key];
                cmdValue = mapStatus2Byte(generalData);
                cmd_bodyData.setCmdData(cmdKey, cmdValue);
                break;
        }
        return cmd_bodyData;
    }
}
function mapGPS2Byte(map_gps) {
    const lat = Convert.toDouble(map_gps[Prot_const.Data_0x20_Lat], 0.0);
    const lng = Convert.toDouble(map_gps[Prot_const.Data_0x20_Lng], 0.0);
    const speed = Convert.toLong(map_gps[Prot_const.Data_0x20_Speed], 0);
    const direction = Convert.toLong(map_gps[Prot_const.Data_0x20_Direction], 0);
    const altitude = Convert.toDouble(map_gps[Prot_const.Data_0x20_Altitude], 0.0);
    const precision = Convert.toLong(map_gps[Prot_const.Data_0x20_Precision], 0);
    const mileage = Convert.toLong(map_gps[Prot_const.Data_0x20_Mileage], 0);
    const satellites = Convert.toByte(map_gps[Prot_const.Data_0x20_Satellites], 0);
    let data_gps = ProtocolUtil.latlng2Bytes(lat, lng);
    data_gps = data_gps.concat(ProtocolUtil.long2Bytes(speed, 2));
    data_gps = data_gps.concat(ProtocolUtil.long2Bytes(direction, 2));
    data_gps = data_gps.concat(ProtocolUtil.long2Bytes(altitude, 2));
    data_gps = data_gps.concat(ProtocolUtil.long2Bytes(precision, 2));
    data_gps = data_gps.concat(ProtocolUtil.long2Bytes(mileage, 4));
    data_gps = data_gps.concat(satellites);
    return data_gps;
}
function mapGSM2Byte(map_gsm, key) {
    let gsmList = map_gsm[Prot_const.Data_0x21_GsmList];
    let mcc = 0, mnc = 0;
    let data_gsm = [];
    for (let gsm of gsmList) {
        mcc = Convert.toInt(gsm[Prot_const.Data_0x21_Mcc], mcc);
        mnc = Convert.toInt(gsm[Prot_const.Data_0x21_Mnc], mnc);
        const cellId = Convert.toInt(gsm[Prot_const.Data_0x21_CellId], 0);
        const lac = Convert.toInt(gsm[Prot_const.Data_0x21_Lac], 0);
        const signal = Convert.toInt(gsm[Prot_const.Data_0x21_Signal], 0);
        data_gsm = data_gsm.concat(signal);
        data_gsm = data_gsm.concat(ProtocolUtil.long2Bytes(lac, 2));
        if (key == Cmd_const.CMD_Data_GSM) {
            data_gsm = data_gsm.concat(ProtocolUtil.long2Bytes(cellId, 2));
        }
        else {
            data_gsm = data_gsm.concat(ProtocolUtil.long2Bytes(cellId, 4));
        }
    }
    let mcc_mnc = ProtocolUtil.long2Bytes(mcc, 2);
    if (key == Cmd_const.CMD_Data_GSM3) {
        mcc_mnc = mcc_mnc.concat(ProtocolUtil.long2Bytes(mnc, 2));
    }
    else {
        mcc_mnc = mcc_mnc.concat((mnc & 0xFF));
    }
    return mcc_mnc.concat(data_gsm);
}
function mapWifi2Byte(map_wifi) {
    let data_wifi = [];
    let wifiList = map_wifi[Prot_const.Data_0x22_WifiList];
    for (let wifi of wifiList) {
        const signal = Convert.toInt(wifi[Prot_const.Data_0x22_Signal], 0);
        const mac = Convert.toStr(wifi[Prot_const.Data_0x22_Mac], ProtocolUtil.MAC_DEFAULT);
        data_wifi = data_wifi.concat(ProtocolUtil.minusToHex(signal, 8));
        data_wifi = data_wifi.concat(ProtocolUtil.mac2Bytes(mac, true));
        const name = Convert.toStr(wifi[Prot_const.Data_0x22_Name]);
        if (name != null || name != undefined) {
            console.log("389", name.length.toString(2));
            // @ts-ignore
            let val = new TextEncoder().encode(name);
            console.log("389", val);
            data_wifi = data_wifi.concat(name.length);
            // @ts-ignore
            data_wifi = data_wifi.concat([...val]);
            // data_wifi = data_wifi.concat(BytesHexStrUtil.string2BytesByUTF_8(name));
        }
    }
    return data_wifi;
}
function mapBLE2Byte(map_ble) {
    let mac = Convert.toStr(map_ble[Prot_const.Data_0x23_Mac], ProtocolUtil.MAC_DEFAULT);
    let lat = Convert.toDouble(map_ble[Prot_const.Data_0x23_Lat], 0.0);
    let lng = Convert.toDouble(map_ble[Prot_const.Data_0x23_Lng], 0.0);
    let data_ble = ProtocolUtil.mac2Bytes(mac, false);
    data_ble = data_ble.concat(ProtocolUtil.latlng2Bytes(lat, lng));
    let describe = Convert.toStr(map_ble[Prot_const.Data_0x23_Describe]);
    if (describe != null) {
        let val = new TextEncoder().encode(describe);
        data_ble = data_ble.concat([...val]);
    }
    return data_ble;
}
function mapBLE2Byte2(map_ble2) {
    const mac = Convert.toStr(map_ble2[Prot_const.Data_0x23_Mac], ProtocolUtil.MAC_DEFAULT);
    const lat = Convert.toDouble(map_ble2[Prot_const.Data_0x23_Lat], 0.0);
    const lng = Convert.toDouble(map_ble2[Prot_const.Data_0x23_Lng], 0.0);
    const radius = Convert.toLong(map_ble2[Prot_const.Data_0x23_Radius], 0);
    const height = Convert.toLong(map_ble2[Prot_const.Data_0x23_Height], 0);
    let data_ble2 = ProtocolUtil.mac2Bytes(mac, false);
    data_ble2 = data_ble2.concat(ProtocolUtil.latlng2Bytes(lat, lng));
    data_ble2 = data_ble2.concat(ProtocolUtil.long2Bytes(radius * 10, 2));
    data_ble2 = data_ble2.concat(ProtocolUtil.long2Bytes(height, 2));
    return data_ble2;
}
function mapStatus2Byte(map_status) {
    const dateTime = Convert.toStr(map_status[Prot_const.Data_0x24_DateTime], ProtocolUtil.DATETIME_DEFAULT);
    const deviceStatus = map_status[Prot_const.Data_0x24_DeviceStatus];
    let deviceStatusCode = Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsGPS], 0);
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsWIFI], 0) << 1;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsGMS], 0) << 2;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsBLE], 0) << 3;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsCharging], 0) << 4;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsChargingComplete], 0) << 5;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsReboot], 0) << 6;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsHistoricalData], 0) << 7;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsAGPS], 0) << 8;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsMotion], 0) << 9;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsSmart], 0) << 10;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsBeacon], 0) << 11;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_BleConnected], 0) << 12;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_FallDownStatus], 0) << 13;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsHomeWifi], 0) << 14;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_IsHome], 0) << 15;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_WorkMode], 0) << 16;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_SignalSize], 0) << 19;
    deviceStatusCode |= Convert.toInt(deviceStatus[Prot_const.Data_0x24_Battery], 0) << 24;
    let data_status = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
    data_status = data_status.concat(ProtocolUtil.long2Bytes(deviceStatusCode, 4));
    return data_status;
}
function mapCALL2Byte(callList) {
    let data_call = [];
    for (let call of callList) {
        const dateTime = Convert.toStr(call[Prot_const.Data_0x25_DateTime], ProtocolUtil.DATETIME_DEFAULT);
        const number = Convert.toStr(call[Prot_const.Data_0x25_Number], "");
        const time = Convert.toLong(call[Prot_const.Data_0x25_Time], 0);
        const retCode = Convert.toByte(call[Prot_const.Data_0x25_RetCode], 0);
        const callInOut = Convert.toByte(call[Prot_const.Data_0x25_CallInOut], 0);
        const callStatus = Convert.toByte(call[Prot_const.Data_0x25_CallStatus], 0);
        const callType = Convert.toByte(call[Prot_const.Data_0x25_CallType], 0);
        const flag = callInOut | (callStatus << 1) | (callType << 4);
        const dataTime = new Date(dateTime);
        data_call = data_call.concat(ProtocolUtil.dateTime2Bytes(dataTime));
        data_call = data_call.concat(flag);
        data_call = data_call.concat(ProtocolUtil.long2Bytes(time, 2));
        data_call = data_call.concat(retCode);
        data_call = data_call.concat(BytesHexStrUtil.string2BytesByASCII(number));
    }
    return data_call;
}
function mapSmart2Byte(map_smart) {
    const lat = Convert.toDouble(map_smart[Prot_const.Data_0x27_Lat], 0.0);
    const lng = Convert.toDouble(map_smart[Prot_const.Data_0x27_Lng], 0.0);
    const radius = Convert.toLong(map_smart[Prot_const.Data_0x27_Radius], 0);
    const height = Convert.toLong(map_smart[Prot_const.Data_0x27_Height], 0);
    let data_smart = ProtocolUtil.latlng2Bytes(lat, lng);
    data_smart = data_smart.concat(ProtocolUtil.long2Bytes(radius, 2));
    data_smart = data_smart.concat(ProtocolUtil.long2Bytes(height, 2));
    return data_smart;
}
function mapBeacon2Byte(map_beacon, key) {
    const index = Convert.toInt(map_beacon[Prot_const.CMD_Body_Index], 0);
    const mac = Convert.toStr(map_beacon[Prot_const.Data_0x28_Mac], ProtocolUtil.MAC_DEFAULT);
    let rssi = Convert.toByte(map_beacon[Prot_const.Data_0x28_Rssi], 0);
    let rssi_1m = Convert.toByte(map_beacon[Prot_const.Data_0x28_Rssi_1m], 0);
    const isLanLng = Convert.toInt(map_beacon[Prot_const.Data_0x28_IsLanLng], 0);
    const lat = Convert.toDouble(map_beacon[Prot_const.Data_0x28_Lat], 0.0);
    const lng = Convert.toDouble(map_beacon[Prot_const.Data_0x28_Lng], 0.0);
    const isDescribe = Convert.toInt(map_beacon[Prot_const.Data_0x28_IsDescribe], 0);
    rssi = ProtocolUtil.minusToHex(rssi, 8);
    rssi_1m = ProtocolUtil.minusToHex(rssi_1m, 8);
    let val = new TextEncoder().encode(map_beacon[Prot_const.Data_0x28_Describe]);
    // @ts-ignore
    // const describe = Convert.utf8Str(map_beacon[Prot_const.Data_0x28_Describe]);
    const describe = [...val];
    const flag = index | (isDescribe << 6) | (isLanLng << 7);
    let data_beacon = [flag];
    data_beacon = data_beacon.concat(ProtocolUtil.mac2Bytes(mac, false));
    data_beacon = data_beacon.concat(rssi, rssi_1m);
    if (key == Cmd_const.CMD_Data_Beacon2) {
        const battery = Convert.toByte(map_beacon[Prot_const.Data_0x28_Battery], 0);
        data_beacon = data_beacon.concat(battery);
    }
    if (isLanLng == 1) {
        data_beacon = data_beacon.concat(ProtocolUtil.latlng2Bytes(lat, lng));
    }
    if (isDescribe == 1) {
        // @ts-ignore
        data_beacon = data_beacon.concat(describe);
    }
    return data_beacon;
}
function mapHomeWifi2Byte(map_homeWifi) {
    const index = Convert.toInt(map_homeWifi[Prot_const.CMD_Body_Index], 0);
    const mac = Convert.toStr(map_homeWifi[Prot_const.Data_0x2A_Mac], ProtocolUtil.MAC_DEFAULT);
    const rssi = Convert.toByte(map_homeWifi[Prot_const.Data_0x2A_Rssi], 0);
    const isLanLng = Convert.toInt(map_homeWifi[Prot_const.Data_0x2A_IsLanLng], 0);
    const lat = Convert.toDouble(map_homeWifi[Prot_const.Data_0x2A_Lat], 0.0);
    const lng = Convert.toDouble(map_homeWifi[Prot_const.Data_0x2A_Lng], 0.0);
    const isDescribe = Convert.toInt(map_homeWifi[Prot_const.Data_0x2A_IsDescribe], 0);
    const describe = Convert.utf8Str(map_homeWifi[Prot_const.Data_0x2A_Describe]);
    const flag = index | (isDescribe << 6) | (isLanLng << 7);
    let data_homeWifi = [{ flag }];
    data_homeWifi = data_homeWifi.concat(ProtocolUtil.mac2Bytes(mac, false));
    data_homeWifi = data_homeWifi.concat(rssi);
    if (isLanLng == 1) {
        data_homeWifi = data_homeWifi.concat(ProtocolUtil.latlng2Bytes(lat, lng));
    }
    if (isDescribe == 1) {
        data_homeWifi = data_homeWifi.concat(BytesHexStrUtil.string2BytesByUTF_8(describe));
    }
    return data_homeWifi;
}
function mapStep2Byte(stepList) {
    let data_step = [];
    for (let step of stepList) {
        const dateTime = Convert.toStr(step[Prot_const.Data_0x30_DateTime], ProtocolUtil.DATETIME_DEFAULT);
        const stepNo = Convert.toInt(step[Prot_const.Data_0x30_Step], 0);
        //data_step = ProtocolUtil.dateTime2Bytes(new Date(dateTime.replace("-", "/")));
        let stepBytes = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
        data_step = data_step.concat(stepBytes);
        data_step = data_step.concat(ProtocolUtil.long2Bytes(stepNo, 4));
    }
    return data_step;
}
function mapActive2Byte(activeList) {
    let data_active = [];
    for (let active of activeList) {
        const dateTime = Convert.toStr(active[Prot_const.Data_0x31_DateTime], ProtocolUtil.DATETIME_DEFAULT);
        const activeNo = Convert.toInt(active[Prot_const.Data_0x31_Active], 0);
        const activeBytes = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
        data_active = data_active.concat(activeBytes);
        data_active = data_active.concat(ProtocolUtil.long2Bytes(activeNo, 4));
    }
    return data_active;
}
function mapBeaconList2Byte(beaconList) {
    const dateTime = Convert.toStr(beaconList[Prot_const.Data_0x33_DateTime], ProtocolUtil.DATETIME_DEFAULT);
    const companyId = Convert.toLong(beaconList[Prot_const.Data_0x33_CompanyId]);
    let uuid = Convert.toStr(beaconList[Prot_const.Data_0x33_UUID]);
    uuid = ProtocolUtil.strAfterFillZero(uuid, 32);
    let beaconListBytes = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
    beaconListBytes = beaconListBytes.concat(ProtocolUtil.long2Bytes(companyId, 2));
    beaconListBytes = beaconListBytes.concat(BytesHexStrUtil.hexStringToBytes(uuid, true));
    let listByte = [];
    let list = beaconList[Prot_const.Data_0x33_List];
    list.forEach((heartRate) => {
        const major = Convert.toInt(heartRate[Prot_const.Data_0x33_Major]);
        const minor = Convert.toInt(heartRate[Prot_const.Data_0x33_Minor]);
        const rssi_m = Convert.toByte(heartRate[Prot_const.Data_0x33_Rssi_m], 0);
        const rssi_r = Convert.toByte(heartRate[Prot_const.Data_0x33_Rssi_r], 0);
        listByte = listByte.concat(ProtocolUtil.long2Bytes(major, 2));
        listByte = listByte.concat(ProtocolUtil.long2Bytes(minor, 2));
        listByte = listByte.concat(rssi_m, rssi_r);
    });
    beaconListBytes = beaconListBytes.concat(listByte);
    return beaconListBytes;
}
function mapBeaconList2Byte2(beaconList) {
    const dateTime = Convert.toStr(beaconList[Prot_const.Data_0x33_DateTime], ProtocolUtil.DATETIME_DEFAULT);
    const companyId = Convert.toLong(beaconList[Prot_const.Data_0x33_CompanyId]);
    let beaconListBytes = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
    beaconListBytes = beaconListBytes.concat(ProtocolUtil.long2Bytes(companyId, 2));
    let listByte = [];
    let list = beaconList[Prot_const.Data_0x33_List];
    list.forEach((heartRate) => {
        let uuid = Convert.toStr(heartRate[Prot_const.Data_0x33_UUID]);
        uuid = ProtocolUtil.strAfterFillZero(uuid, 32);
        const major = Convert.toInt(heartRate[Prot_const.Data_0x33_Major]);
        const minor = Convert.toInt(heartRate[Prot_const.Data_0x33_Minor]);
        const rssi_m = Convert.toByte(heartRate[Prot_const.Data_0x33_Rssi_m], 0);
        const rssi_r = Convert.toByte(heartRate[Prot_const.Data_0x33_Rssi_r], 0);
        listByte = listByte.concat(BytesHexStrUtil.hexStringToBytes(uuid, true));
        listByte = listByte.concat(ProtocolUtil.long2Bytes(major, 2));
        listByte = listByte.concat(ProtocolUtil.long2Bytes(minor, 2));
        listByte = listByte.concat(rssi_m, rssi_r);
    });
    beaconListBytes = beaconListBytes.concat(listByte);
    return beaconListBytes;
}
function mapHeartRate2Byte(heartRateList) {
    let data_heartRate = [];
    for (let heartRate of heartRateList) {
        const dateTime = Convert.toStr(heartRate[Prot_const.Data_0x40_DateTime], ProtocolUtil.DATETIME_DEFAULT);
        const heartRateNo = Convert.toByte(heartRate[Prot_const.Data_0x40_HeartRate], 0);
        const trustLevel = Convert.toByte(heartRate[Prot_const.Data_0x40_TrustLevel], 0);
        const heartRateBytes = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
        data_heartRate = data_heartRate.concat(heartRateBytes);
        data_heartRate = data_heartRate.concat(heartRateNo, trustLevel);
    }
    return data_heartRate;
}
function mapSPO2Rate2Byte(spo2RateList) {
    let data_spo2Rate = [];
    for (let spo2Rate of spo2RateList) {
        const dateTime = Convert.toStr(spo2Rate[Prot_const.Data_0x41_DateTime], ProtocolUtil.DATETIME_DEFAULT);
        const spo2RateNo = Convert.toByte(spo2Rate[Prot_const.Data_0x41_SPO2Rate], 0);
        const trustLevel = Convert.toByte(spo2Rate[Prot_const.Data_0x41_TrustLevel], 0);
        const spo2RateBytes = ProtocolUtil.dateTime2Bytes(new Date(dateTime));
        data_spo2Rate = data_spo2Rate.concat(spo2RateBytes);
        data_spo2Rate = data_spo2Rate.concat(spo2RateNo, trustLevel);
    }
    return data_spo2Rate;
}
function getByteData(cmd_head, bodyData) {
    const headData = new Array(8);
    headData[0] = Cmd_const.CMD_Head;
    const version = cmd_head[Prot_const.CMD_Head_Version];
    const flag_ACK = cmd_head[Prot_const.CMD_Head_FlagACK] ? 1 : 0;
    const flag_ERR = cmd_head['flag_ERR'] ? 1 : 0;
    const encryption = cmd_head['encryption'];
    const properties = (encryption << 6) | (flag_ERR << 5) | (flag_ACK << 4) | version;
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
function getByteData_body(cmd_bodyData) {
    let cmd_bodyByte = [];
    const cmdType = cmd_bodyData[Prot_const.CMD_Body_CmdType];
    cmdType && cmd_bodyByte.push(cmdType);
    const cmdList = cmd_bodyData["cmdData"];
    cmdList.forEach((cmd) => {
        const cmdLength = cmd["cmdLength"];
        cmd_bodyByte.push(cmdLength);
        const cmdKey = cmd[Prot_const.CMD_Body_CmdKey];
        cmd_bodyByte.push(cmdKey);
        let cmdValue = cmd["cmdValue"] || [];
        cmd_bodyByte = cmd_bodyByte.concat(cmdValue);
    });
    return cmd_bodyByte;
}
