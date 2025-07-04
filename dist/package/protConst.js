"use strict";
var _a;
module.exports = (_a = class Prot_const {
    },
    // Command Data(HeadBody)
    // Command Head Data
    _a.CMD_Head = "cmdHeadData",
    // Command Body Data
    _a.CMD_Body = "cmdBodyData",
    // Command Original Data
    _a.CMD_Original = "originalData",
    // Command Head sequenceId
    _a.CMD_Head_SequenceId = "sequenceId",
    // Command Head length
    _a.CMD_Head_Length = "length",
    // Command Head checkCRC
    _a.CMD_Head_CheckCRC = "checkCRC",
    // Command Head version
    _a.CMD_Head_Version = "version",
    // Command Head flagACK
    _a.CMD_Head_FlagACK = "flagACK",
    // Command Body cmdType
    _a.CMD_Body_CmdType = "cmdType",
    // Command Body cmdKey
    _a.CMD_Body_CmdKey = "cmdKey",
    _a.CMD_Body_Index = "index",
    _a.CMD_Value_NULL = "null",
    _a.CMD_Value_FLAG = "flagValue",
    _a.CMD_Key_Unsupported = "UnsupportedKeys",
    // Command Head encodeType
    _a.CMD_Head_EncodeType = "encodeType",
    // Command Head encodeType
    _a.CMD_Head_EncodeId = "encodeId",
    // Command Body Type
    // Data Command
    _a.Type_0x01 = "locationData",
    // Configuration
    _a.Type_0x02 = "configData",
    // Services
    _a.Type_0x03 = "servicesData",
    // System Control
    _a.Type_0x04 = "systemData",
    // Debug Control
    _a.Type_0x06 = "debugData",
    // Firmware Update
    _a.Type_0x7E = "updateData",
    // Negative Response
    _a.Type_0x7F = "responseData",
    // Data
    _a.Data_list = "dataList",
    _a.Log_list = "logList",
    // Data Key(0x01)
    // IMEI
    _a.Data_0x01 = "imei",
    _a.Data_0x04 = "iccId",
    // Alarm
    _a.Data_0x02 = "alarm",
    // SingleLocating
    _a.Data_0x12 = "singleLocating",
    // ContinueLocating
    _a.Data_0x13 = "continueLocating",
    // Pet walking
    _a.Data_0x14 = "petWalking",
    // GPS
    _a.Data_0x20 = "gps",
    // GSM
    _a.Data_0x21 = "gsm",
    _a.Data_0x29 = "gsm2",
    _a.Data_0x2B = "gsm3",
    // WIFI
    _a.Data_0x22 = "wifi",
    _a.Data_0x19 = "wifi2",
    // BLE
    _a.Data_0x23 = "ble",
    _a.Data_0x26 = "ble2",
    // Status
    _a.Data_0x24 = "status",
    // Smart Location
    _a.Data_0x27 = "smart",
    // Beacon
    _a.Data_0x28 = "beacon",
    _a.Data_0x2C = "beacon2",
    // HomeWifi
    _a.Data_0x2A = "homeWifi",
    // CallList
    _a.Data_0x25 = "callList",
    // StepList
    _a.Data_0x30 = "stepList",
    // ActiveList
    _a.Data_0x31 = "activeList",
    // BeaconList
    _a.Data_0x33 = "beaconList",
    _a.Data_0x34 = "beaconList2",
    // HeartList
    _a.Data_0x40 = "heartList",
    // SPO2List
    _a.Data_0x41 = "spo2List",
    // Data Alarm(0x02)
    // dateTime
    _a.Data_0x02_DateTime = "dateTime",
    // alarmFlag
    //	 Data_0x02_AlarmFlag :string= "alarmFlag"
    // alarmStatus
    _a.Data_0x02_AlarmStatus = "alarmStatus",
    _a.Data_0x02_AlarmStatusExtend = "alarmStatusExtend",
    // batteryLow
    _a.Data_0x02_BatteryLow = "batteryLow",
    // overSpeed
    _a.Data_0x02_OverSpeed = "overSpeed",
    // fallDown
    _a.Data_0x02_FallDown = "fallDown",
    // tilt
    _a.Data_0x02_Tilt = "tilt",
    // geo1
    _a.Data_0x02_Geo1 = "geo1",
    // geo2
    _a.Data_0x02_Geo2 = "geo2",
    // geo3
    _a.Data_0x02_Geo3 = "geo3",
    // geo4
    _a.Data_0x02_Geo4 = "geo4",
    // powerOff
    _a.Data_0x02_PowerOff = "powerOff",
    // powerOn
    _a.Data_0x02_PowerOn = "powerOn",
    // motion
    _a.Data_0x02_Motion = "motion",
    // noMotion
    _a.Data_0x02_NoMotion = "noMotion",
    // sosKey
    _a.Data_0x02_SosKey = "sosKey",
    // side1key
    _a.Data_0x02_Side1key = "side1key",
    // side2key
    _a.Data_0x02_Side2key = "side2key",
    // batteryCharging
    _a.Data_0x02_BatteryCharging = "batteryCharging",
    // batteryNoCharging
    _a.Data_0x02_BatteryNoCharging = "batteryNoCharging",
    // alarmEnd
    _a.Data_0x02_AlarmEnd = "alarmEnd",
    _a.Data_0x02_Amber = "amber",
    _a.Data_0x02_Welfare = "welfare",
    _a.Data_0x02_AmberEnd = "amberEnd",
    _a.Data_0x02_FallDownEnd = "fallDownEnd",
    _a.Data_0x02_WelfareEnd = "welfareEnd",
    _a.Data_0x02_Upload = "upload",
    // homeFenceOut
    _a.Data_0x02_HomeFenceOut = "homeFenceOut",
    // homeFenceIn
    _a.Data_0x02_HomeFenceIn = "homeFenceIn",
    _a.Data_0x02_Geo1_In = "geo1_in",
    _a.Data_0x02_Geo2_In = "geo2_in",
    _a.Data_0x02_Geo3_In = "geo3_in",
    _a.Data_0x02_Geo4_In = "geo4_in",
    _a.Data_0x02_BleDisConnected = "bleDisConnected",
    _a.Data_0x02_FallOff = "fallOff",
    // Data Status(0x24)
    _a.Data_0x24_DateTime = "dateTime" // DateTime
,
    _a.Data_0x24_DeviceStatus = "deviceStatus" // DeviceStatus
,
    _a.Data_0x24_StatusCode = "statusCode" // StatusCode
,
    _a.Data_0x24_DataType = "dataType" // DataType
,
    _a.Data_DataType_BLE = "BLE" // DataType BLE
,
    _a.Data_DataType_Smart = "Smart" // DataType Smart
,
    _a.Data_DataType_Beacon = "Beacon" // DataType Beacon
,
    _a.Data_DataType_HomeWifi = "HomeWifi" // DataType HomeWifi
,
    _a.Data_DataType_GPS = "GPS" // DataType GPS
,
    _a.Data_DataType_WIFIGSM = "WIFI&GSM" // DataType WIFI&GSM
,
    _a.Data_DataType_WIFI = "WIFI" // DataType WIFI
,
    _a.Data_DataType_GSM = "GSM" // DataType GSM
,
    _a.Data_0x24_IsGPS = "isGPS" // IsGPS
,
    _a.Data_0x24_IsWIFI = "isWIFI" // IsWIFI
,
    _a.Data_0x24_IsGMS = "isGMS" // IsGMS
,
    _a.Data_0x24_IsBLE = "isBLE" // IsBLE
,
    _a.Data_0x24_IsSmart = "isSmart" // IsSmart
,
    _a.Data_0x24_IsBeacon = "isBeacon" // IsBeacon
,
    _a.Data_0x24_BleConnected = "bleConnected" // BLE Connected
,
    _a.Data_0x24_FallDownStatus = "fallDownStatus" // Fall down allow on status
,
    _a.Data_0x24_IsHomeWifi = "isHomeWifi" // IsHomeWifi
,
    _a.Data_0x24_IsCharging = "isCharging" // IsCharging
,
    _a.Data_0x24_IsChargingComplete = "isChargingComplete" // ChargingComplete
,
    _a.Data_0x24_IsReboot = "isReboot" // Reboot
,
    _a.Data_0x24_IsHistoricalData = "isHistoricalData" // HistoricalData
,
    _a.Data_0x24_IsAGPS = "isAGPS" // AGPS
,
    _a.Data_0x24_IsMotion = "isMotion" // Motion
,
    _a.Data_0x24_WorkMode = "workMode" // WorkMode
,
    _a.Data_0x24_SignalSize = "signalSize" // SignalSize
,
    _a.Data_0x24_Battery = "battery" // Battery
,
    _a.Data_0x24_IsHome = "isHome" // IsHome
,
    // Data GPS(0x20)
    _a.Data_0x20_Lat = "lat" // lat
,
    _a.Data_0x20_Lng = "lng" // lng
,
    _a.Data_0x20_Speed = "speed" // speed
,
    _a.Data_0x20_Direction = "direction" // direction
,
    _a.Data_0x20_Altitude = "altitude" // altitude
,
    _a.Data_0x20_Precision = "precision" // precision
,
    _a.Data_0x20_Mileage = "mileage" // mileage
,
    _a.Data_0x20_Satellites = "satellites" // satellites
,
    // Data GSM(0x210x290x2B)
    _a.Data_0x21_GsmList = "gsmList",
    _a.Data_0x21_GsmType = "gsmType",
    _a.Data_0x21_Mcc = "mcc",
    _a.Data_0x21_Mnc = "mnc",
    _a.Data_0x21_CellId = "cellId",
    _a.Data_0x21_Lac = "lac",
    _a.Data_0x21_Signal = "signal",
    // Data Ble(0x230x26)
    _a.Data_0x23_Mac = "mac",
    _a.Data_0x23_Lat = "lat",
    _a.Data_0x23_Lng = "lng",
    _a.Data_0x23_Radius = "radius",
    _a.Data_0x23_Height = "height",
    _a.Data_0x23_Describe = "describe",
    // Data Beacon(0x28)
    //	 Data_0x28_Index :string= "index"
    _a.Data_0x28_Mac = "mac",
    _a.Data_0x28_Rssi = "rssi",
    _a.Data_0x28_Rssi_1m = "rssi_1m",
    _a.Data_0x28_Battery = "battery",
    _a.Data_0x28_IsLanLng = "isLanLng",
    _a.Data_0x28_Lat = "lat",
    _a.Data_0x28_Lng = "lng",
    _a.Data_0x28_IsDescribe = "isDescribe",
    _a.Data_0x28_Describe = "describe",
    // Data HomeWifi(0x2A)
    //	 Data_0x2A_Index :string= "index"
    _a.Data_0x2A_Mac = "mac",
    _a.Data_0x2A_Rssi = "rssi",
    _a.Data_0x2A_IsLanLng = "isLanLng",
    _a.Data_0x2A_Lat = "lat",
    _a.Data_0x2A_Lng = "lng",
    _a.Data_0x2A_IsDescribe = "isDescribe",
    _a.Data_0x2A_Describe = "describe",
    // Data WiFi(0x22)
    _a.Data_0x22_WifiList = "wifiList",
    _a.Data_0x22_Mac = "mac",
    _a.Data_0x22_Signal = "signal",
    _a.Data_0x22_Name = "name",
    // PetWalking(0x14)
    _a.Data_0x14_StartTime = "startTime",
    _a.Data_0x14_StopTime = "stopTime",
    // Data Call(0x25)
    _a.Data_0x25_DateTime = "dateTime",
    _a.Data_0x25_Number = "number",
    _a.Data_0x25_Time = "time",
    _a.Data_0x25_RetCode = "retCode",
    _a.Data_0x25_CallInOut = "callInOut",
    _a.Data_0x25_CallStatus = "callStatus",
    _a.Data_0x25_CallType = "callType",
    // Data Smart(0x27)
    _a.Data_0x27_Lat = "lat",
    _a.Data_0x27_Lng = "lng",
    _a.Data_0x27_Radius = "radius",
    _a.Data_0x27_Height = "height",
    // Data Step(0x30)
    _a.Data_0x30_DateTime = "dateTime",
    _a.Data_0x30_Step = "step",
    // Data Active(0x31)
    _a.Data_0x31_DateTime = "dateTime",
    _a.Data_0x31_Active = "active",
    // Data BeaconList(0x330x34)
    _a.Data_0x33_DateTime = "dateTime",
    _a.Data_0x33_CompanyId = "companyId",
    _a.Data_0x33_UUID = "uuid",
    _a.Data_0x33_Major = "major",
    _a.Data_0x33_Minor = "minor",
    _a.Data_0x33_Rssi_m = "rssi_m",
    _a.Data_0x33_Rssi_r = "rssi_r",
    _a.Data_0x33_List = "list",
    // Data Heart(0x40)
    _a.Data_0x40_DateTime = "dateTime",
    _a.Data_0x40_HeartRate = "heartRate",
    _a.Data_0x40_TrustLevel = "trustLevel",
    // Data SPO2(0x41)
    _a.Data_0x41_DateTime = "dateTime",
    _a.Data_0x41_SPO2Rate = "spo2Rate",
    _a.Data_0x41_TrustLevel = "trustLevel",
    // Config Key(0x02)
    _a.Config_0x01 = "module" // Module
,
    _a.Config_0x02 = "version" // Version
,
    _a.Config_0x03 = "IMEI" // IMEI
,
    _a.Config_0x04 = "ICCID" // ICCID
,
    _a.Config_0x05 = "MAC" // MAC
,
    _a.Config_0x06 = "dateTime" // DateTime
,
    _a.Config_0x07 = "runTime" // RunTime
,
    _a.Config_0x08 = "firmware" // Firmware
,
    _a.Config_0x09 = "mileage" // Mileage
,
    _a.Config_0x0A = "workMode" // WorkMode
,
    _a.Config_0x0B = "alarmClock" // AlarmClock
,
    _a.Config_0x0C = "noDisturb" // NoDisturb
,
    _a.Config_0x0D = "password" // Password
,
    _a.Config_0x0E = "timeZone" // TimeZone
,
    _a.Config_0x0F = "enableControl" // Enable Control
,
    _a.Config_0x75 = "extraControl" // Extra Enable Control
,
    _a.Config_0x10 = "ringToneVolume" // RingToneVolume
,
    _a.Config_0x11 = "micVolume" // MicVolume
,
    _a.Config_0x12 = "speakerVolume" // SpeakerVolume
,
    _a.Config_0x13 = "deviceName" // DeviceName
,
    _a.Config_0x14 = "battery" // Battery
,
    _a.Config_0x15 = "bleLoc" // BleLoc
,
    _a.Config_0x16 = "bleWhiteList" // BleWhiteList
,
    _a.Config_0x17 = "smsgpsurl" // Smsgpsurl
,
    _a.Config_0x18 = "smswifiurl" // Smswifiurl
,
    _a.Config_0x19 = "music" // Music
,
    _a.Config_0x1A = "fwVersion" // FwVersion
,
    _a.Config_0x1B = "gsmModule" // GsmModule
,
    _a.Config_0x1C = "promptVolume" // PromptVolume
,
    _a.Config_0x1D = "agpsLoc" // AgpsLoc
,
    _a.Config_0x1F = "locale" // Locale
,
    // Button Setting
    _a.Config_0x20 = "sosButton" // SOS Button
,
    _a.Config_0x21 = "call1Button" // Call 1 Button
,
    _a.Config_0x22 = "call2Button" // Call 2 Button
,
    // Phone Settings
    _a.Config_0x30 = "number" // Set Authorized Number
,
    _a.Config_0x31 = "smsOption" // SMS Reply Prefix Text
,
    _a.Config_0x32 = "sosOption" // SOS Option
,
    _a.Config_0x33 = "phoneOption" // Phone Switches
,
    _a.Config_0x34 = "numberNamePhoto" // Set Authorized Number with Name and Photos（EV05）
,
    _a.Config_0x35 = "personalInfo" // Set Personal Data Information（EV05）
,
    _a.Config_0x36 = "watch" // Watch Settings (EV05 only)
,
    // GPRS Setting
    _a.Config_0x40 = "apn" // APN
,
    _a.Config_0x41 = "apnUserName" // Apn user name
,
    _a.Config_0x42 = "apnPassword" // Apn password
,
    _a.Config_0x43 = "sever" // Sever IP &Port
,
    _a.Config_0x44 = "timeInterval" // Time interval
,
    _a.Config_0x45 = "continueLocate" // Continue Locate
,
    _a.Config_0x46 = "heartRate" // Heart Rate Interval
,
    _a.Config_0x4A = "wifiList" // WIFI List
,
    _a.Config_0x4B = "catm" // Cat-M Setting
,
    _a.Config_0x4C = "apnList" // APN List
,
    _a.Config_0x4D = "apnNow" // APN Now
,
    _a.Config_0x4E = "gsmBand" // GSM band
,
    _a.Config_0x4F = "networkType" // Network Type
,
    // Alert Settings
    _a.Config_0x50 = "powerLowAlert" // Power Alert
,
    _a.Config_0x51 = "geoAlert" // GEO Alert
,
    _a.Config_0x52 = "motionAlert" // Motion Alert
,
    _a.Config_0x53 = "noMotionAlert" // No-motion Alert
,
    _a.Config_0x54 = "overSpeedAlert" // Over speed Alert
,
    _a.Config_0x55 = "tiltAlert" // Tilt Alert
,
    _a.Config_0x56 = "fallDownAlert" // Fall Down Alert
,
    _a.Config_0x57 = "welfareAlert" // Welfare Check (EC03 Only)
,
    _a.Config_0x58 = "notificationAlert" // Alert Notification (EV04 only)
,
    _a.Config_0x59 = "motionLevel" // Motion level
,
    _a.Config_0x62 = "wifiWhiteList" // WIFI White List
,
    _a.Config_0x63 = "nightMode" // Night mode
,
    _a.Config_0x64 = "network" // Mobile network information
,
    _a.Config_0x66 = "IMSI" // IMSI
,
    _a.Config_0x67 = "homeWifiMatch" // Home WiFi match number
,
    _a.Config_0x73 = "beaconList" // Beacon location list
,
    _a.Config_0xF0 = "Read" // Read
,
    _a.Config_0x19_bit0 = "bit0",
    _a.Config_0x19_bit1 = "bit1",
    _a.Config_0x19_bit2 = "bit2",
    _a.Config_0x19_bit3 = "bit3",
    _a.Config_0x19_bit4 = "bit4",
    _a.Config_0x19_bit5 = "bit5",
    _a.Config_0x19_bit6 = "bit6",
    _a.Config_0x19_bit7 = "bit7",
    _a.Config_0x19_bit8 = "bit8",
    _a.Config_0x19_bit9 = "bit9",
    _a.Config_0x19_bit10 = "bit10",
    _a.Config_0x19_bit11 = "bit11",
    _a.Config_0x19_bit12 = "bit12",
    _a.Config_0x19_bit13 = "bit13",
    _a.Config_0x19_bit14 = "bit14",
    _a.Config_0x19_bit15 = "bit15",
    _a.Config_0x19_bit16 = "bit16",
    _a.Config_0x19_bit17 = "bit17",
    _a.Config_0x19_bit18 = "bit18",
    _a.Config_0x19_bit19 = "bit19",
    _a.Config_0x19_bit20 = "bit20",
    _a.Config_0x19_bit21 = "bit21",
    _a.Config_0x19_bit22 = "bit22",
    _a.Config_0x19_bit23 = "bit23",
    _a.Config_0x19_bit24 = "bit24",
    _a.Config_0x19_bit25 = "bit25",
    _a.Config_0x19_bit26 = "bit26",
    _a.Config_0x19_bit27 = "bit27",
    _a.Config_0x19_bit28 = "bit28",
    _a.Config_0x19_bit29 = "bit29",
    _a.Config_0x19_bit30 = "bit30",
    _a.Config_0x19_bit31 = "bit31",
    // Services key(0x03)
    _a.Services_0x01 = "imei" // IMEI
,
    _a.Services_0x10 = "heartBeat" // Heart beat
,
    _a.Services_0x11 = "addresses" // Get Addresses
,
    _a.Services_0x12 = "systemTime" // Get Timestamp
,
    _a.Services_0x13 = "weather" // Get Weather
,
    _a.Services_0x14 = "weather2" // Get Weather2
,
    _a.Services_0x21 = "location_gsm" // Get GSM Location
,
    _a.Services_0x22 = "location_wifi" // Get WIFI Location
,
    _a.Services_0x24 = "status" // General data
,
    _a.Services_0x11_lat = "lat",
    _a.Services_0x11_lng = "lng",
    _a.Services_0x11_address = "address",
    _a.Services_0x13_lat = "lat",
    _a.Services_0x13_lng = "lng",
    _a.Services_0x13_lang = "lang",
    // System key(0x04)
    _a.System_0x01 = "imei" // IMEI
,
    _a.System_0x11 = "reFactory" // ReFactory
,
    _a.System_0x12 = "reboot" // Reboot
,
    _a.System_0x13 = "findMe" // findMe
,
    _a.System_0x14 = "shutdown" // Shutdown
,
    _a.System_0x19 = "scanBeacon" // ScanBeacon
,
    _a.System_0x1A = "scanWifiAuto" // ScanWifiAuto
,
    _a.System_0x1B = "scanWifi" // ScanWifi
,
    _a.System_0x31 = "heart" // Heart (EV05 Only)
,
    _a.System_0x19_lat = "lat",
    _a.System_0x19_lng = "lng",
    _a.System_0x19_describe = "describe",
    _a.System_0x1A_lat = "lat",
    _a.System_0x1A_lng = "lng",
    _a.System_0x1A_describe = "describe",
    _a.System_0x1B_rssi = "rssi",
    _a.System_0x1B_interval = "interval",
    // Firmware Update key(0x7E)
    _a.Update_0x10 = "InitialData" // Initial Data
,
    _a.Update_0x11 = "FirmwareData" // Firmware Data
,
    _a.Update_0x12 = "Validate" // Validate
,
    _a.Update_0x13 = "State" // Update State
,
    _a.Update_0x15 = "PackSize" // Update Pack Max len
,
    _a.Update_0x16 = "RequestData" // Update Pack Max len
,
    _a.Update_address = "updateAddress",
    _a.Update_stateKey = "updateStateKey",
    _a.Update_packSize = "updatePackSize",
    _a.Update_offset = "offset",
    _a.Update_list = "list",
    _a.Update_length = "length",
    _a.Update_percent = "percent",
    // Response Data key(0x7F)
    _a.Response_ReturnStatus = "returnStatus" // returnStatus
,
    _a.Response_Ok = "ok" // Ok
,
    _a.Response_Error = "error" // Error
,
    _a.Response_Msg = "msg" // Message
,
    _a.Response_VersionError = "Version Invalid" // VersionError
,
    _a.Response_EncryptError = "Encryption Invalid" // EncryptError
,
    _a.Response_LengthError = "Length error" // LengthError
,
    _a.Response_CRCError = "Check CRC error" // CRCError
,
    _a.Response_CommandError = "Command Invalid" // CommandError
,
    _a.Response_KeyError = "Key Invalid" // KeyError
,
    _a.Response_KeyLengthError = "Key length error" // KeyLengthError
,
    _a.Response_DataFormatError = "Data Format Invalid" // DataFormatError
,
    _a.Response_DataSizeError = "Data Size Error" // DataSizeError
,
    _a.Response_StateError = "Invalid State" // StateError
,
    _a.Response_ParameterError = "Invalid Parameter" // ParameterError
,
    _a.Response_NoMemoryError = "No Memory" // NoMemoryError
,
    _a.Response_FunNoSuported = "Functiont not suported" // funNoSuported
,
    _a.Response_GPSNoLocation = "GPS not Location" // GPSNoLocation
,
    _a.Response_AddressError = "Address resolution Error" // AddressError
,
    _a.Response_NoPasswordVerify = "No Password Verify" // NoPasswordVerify
,
    _a.Response_LowBattery = "Battery Power Low" // LowBattery
,
    _a);
