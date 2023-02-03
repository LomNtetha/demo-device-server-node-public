module.exports = class Prot_const{
    // Command Data(HeadBody)
    // Command Head Data
     static readonly CMD_Head:string= "cmdHeadData"
    // Command Body Data
     static readonly CMD_Body:string= "cmdBodyData"
    // Command Original Data
     static readonly CMD_Original:string= "originalData"
    // Command Head sequenceId
     static readonly CMD_Head_SequenceId:string= "sequenceId"
    // Command Head length
     static readonly CMD_Head_Length:string= "length"
    // Command Head checkCRC
     static readonly CMD_Head_CheckCRC:string= "checkCRC"
    // Command Head version
     static readonly CMD_Head_Version:string= "version"
    // Command Head flagACK
     static readonly CMD_Head_FlagACK:string= "flagACK"
    // Command Body cmdType
     static readonly CMD_Body_CmdType:string= "cmdType"
    // Command Body cmdKey
     static readonly CMD_Body_CmdKey:string= "cmdKey"
     static readonly CMD_Body_Index:string= "index"
     static readonly CMD_Value_NULL:string= "null"
     static readonly CMD_Value_FLAG:string= "flagValue"
     static readonly CMD_Key_Unsupported:string= "UnsupportedKeys"

    // Command Head encodeType
     static readonly CMD_Head_EncodeType:string= "encodeType"
    // Command Head encodeType
     static readonly CMD_Head_EncodeId:string= "encodeId"

    // Command Body Type
    // Data Command
     static readonly Type_0x01:string= "locationData"
    // Configuration
     static readonly Type_0x02:string= "configData"
    // Services
     static readonly Type_0x03:string= "servicesData"
    // System Control
     static readonly Type_0x04:string= "systemData"
    // Debug Control
     static readonly Type_0x06:string= "debugData"
    // Firmware Update
     static readonly Type_0x7E:string= "updateData"
    // Negative Response
     static readonly Type_0x7F:string= "responseData"
    // Data
     static readonly Data_list:string= "dataList"

     static readonly Log_list:string= "logList"

    // Data Key(0x01)
    // IMEI
     static readonly Data_0x01:string= "imei"
     static readonly Data_0x04:string= "iccId"
     // Alarm
     static readonly Data_0x02:string= "alarm"
    // SingleLocating
     static readonly Data_0x12:string= "singleLocating"
    // ContinueLocating
     static readonly Data_0x13:string= "continueLocating"
    // Pet walking
     static readonly Data_0x14:string= "petWalking"
    // GPS
     static readonly Data_0x20:string= "gps"
    // GSM
     static readonly Data_0x21:string= "gsm"
     static readonly Data_0x29:string= "gsm2"
     static readonly Data_0x2B:string= "gsm3"
    // WIFI
     static readonly Data_0x22:string= "wifi"
     static readonly Data_0x19:string= "wifi2"
    // BLE
     static readonly Data_0x23:string= "ble"
     static readonly Data_0x26:string= "ble2"
    // Status
     static readonly Data_0x24:string= "status"
    // Smart Location
     static readonly Data_0x27:string= "smart"
    // Beacon
     static readonly Data_0x28:string= "beacon"
     static readonly Data_0x2C:string= "beacon2"
    // HomeWifi
     static readonly Data_0x2A:string= "homeWifi"
    // CallList
     static readonly Data_0x25:string= "callList"
    // StepList
     static readonly Data_0x30:string= "stepList"
    // ActiveList
     static readonly Data_0x31:string= "activeList"
    // BeaconList
     static readonly Data_0x33:string= "beaconList"
     static readonly Data_0x34:string= "beaconList2"
    // HeartList
     static readonly Data_0x40:string= "heartList"
    // SPO2List
     static readonly Data_0x41:string= "spo2List"

    // Data Alarm(0x02)
    // dateTime
     static readonly Data_0x02_DateTime:string= "dateTime"
    // alarmFlag
//	 Data_0x02_AlarmFlag :string= "alarmFlag"
    // alarmStatus
     static readonly Data_0x02_AlarmStatus:string= "alarmStatus"
     static readonly Data_0x02_AlarmStatusExtend:string= "alarmStatusExtend"
    // batteryLow
     static readonly Data_0x02_BatteryLow:string= "batteryLow"
    // overSpeed
     static readonly Data_0x02_OverSpeed:string= "overSpeed"
    // fallDown
     static readonly Data_0x02_FallDown:string= "fallDown"
    // tilt
     static readonly Data_0x02_Tilt:string= "tilt"
    // geo1
     static readonly Data_0x02_Geo1:string= "geo1"
    // geo2
     static readonly Data_0x02_Geo2:string= "geo2"
    // geo3
     static readonly Data_0x02_Geo3:string= "geo3"
    // geo4
     static readonly Data_0x02_Geo4:string= "geo4"
    // powerOff
     static readonly Data_0x02_PowerOff:string= "powerOff"
    // powerOn
     static readonly Data_0x02_PowerOn:string= "powerOn"
    // motion
     static readonly Data_0x02_Motion:string= "motion"
    // noMotion
     static readonly Data_0x02_NoMotion:string= "noMotion"
    // sosKey
     static readonly Data_0x02_SosKey:string= "sosKey"
    // side1key
     static readonly Data_0x02_Side1key:string= "side1key"
    // side2key
     static readonly Data_0x02_Side2key:string= "side2key"
    // batteryCharging
     static readonly Data_0x02_BatteryCharging:string= "batteryCharging"
    // batteryNoCharging
     static readonly Data_0x02_BatteryNoCharging:string= "batteryNoCharging"
    // alarmEnd
     static readonly Data_0x02_AlarmEnd:string= "alarmEnd"
     static readonly Data_0x02_Amber:string= "amber"
     static readonly Data_0x02_Welfare:string= "welfare"
     static readonly Data_0x02_AmberEnd:string= "amberEnd"
     static readonly Data_0x02_FallDownEnd:string= "fallDownEnd"
     static readonly Data_0x02_WelfareEnd:string= "welfareEnd"
     static readonly Data_0x02_Upload:string= "upload"
    // homeFenceOut
     static readonly Data_0x02_HomeFenceOut:string= "homeFenceOut"
    // homeFenceIn
     static readonly Data_0x02_HomeFenceIn:string= "homeFenceIn"
     static readonly Data_0x02_Geo1_In:string= "geo1_in"
     static readonly Data_0x02_Geo2_In:string= "geo2_in"
     static readonly Data_0x02_Geo3_In:string= "geo3_in"
     static readonly Data_0x02_Geo4_In:string= "geo4_in"
     static readonly Data_0x02_BleDisConnected:string= "bleDisConnected"
     static readonly Data_0x02_FallOff:string= "fallOff"

    // Data Status(0x24)
     static readonly Data_0x24_DateTime:string= "dateTime"// DateTime
     static readonly Data_0x24_DeviceStatus:string= "deviceStatus"// DeviceStatus
     static readonly Data_0x24_StatusCode:string= "statusCode"// StatusCode
     static readonly Data_0x24_DataType:string= "dataType"// DataType
     static readonly Data_DataType_BLE:string= "BLE"// DataType BLE
     static readonly Data_DataType_Smart:string= "Smart"// DataType Smart
     static readonly Data_DataType_Beacon:string= "Beacon"// DataType Beacon
     static readonly Data_DataType_HomeWifi:string= "HomeWifi"// DataType HomeWifi
     static readonly Data_DataType_GPS:string= "GPS"// DataType GPS
     static readonly Data_DataType_WIFIGSM:string= "WIFI&GSM"// DataType WIFI&GSM
     static readonly Data_DataType_WIFI:string= "WIFI"// DataType WIFI
     static readonly Data_DataType_GSM:string= "GSM"// DataType GSM
     static readonly Data_0x24_IsGPS:string= "isGPS"// IsGPS
     static readonly Data_0x24_IsWIFI:string= "isWIFI"// IsWIFI
     static readonly Data_0x24_IsGMS:string= "isGMS"// IsGMS
     static readonly Data_0x24_IsBLE:string= "isBLE"// IsBLE
     static readonly Data_0x24_IsSmart:string= "isSmart"// IsSmart
     static readonly Data_0x24_IsBeacon:string= "isBeacon"// IsBeacon
     static readonly Data_0x24_BleConnected:string= "bleConnected"// BLE Connected
     static readonly Data_0x24_FallDownStatus:string= "fallDownStatus"// Fall down allow on status
     static readonly Data_0x24_IsHomeWifi:string= "isHomeWifi"// IsHomeWifi
     static readonly Data_0x24_IsCharging:string= "isCharging"// IsCharging
     static readonly Data_0x24_IsChargingComplete:string= "isChargingComplete"// ChargingComplete
     static readonly Data_0x24_IsReboot:string= "isReboot"// Reboot
     static readonly Data_0x24_IsHistoricalData:string= "isHistoricalData"// HistoricalData
     static readonly Data_0x24_IsAGPS:string= "isAGPS"// AGPS
     static readonly Data_0x24_IsMotion:string= "isMotion"// Motion
     static readonly Data_0x24_WorkMode:string= "workMode"// WorkMode
     static readonly Data_0x24_SignalSize:string= "signalSize"// SignalSize
     static readonly Data_0x24_Battery:string= "battery"// Battery
     static readonly Data_0x24_IsHome:string= "isHome"// IsHome

    // Data GPS(0x20)
     static readonly Data_0x20_Lat:string= "lat"// lat
     static readonly Data_0x20_Lng:string= "lng"// lng
     static readonly Data_0x20_Speed:string= "speed"// speed
     static readonly Data_0x20_Direction:string= "direction"// direction
     static readonly Data_0x20_Altitude:string= "altitude"// altitude
     static readonly Data_0x20_Precision:string= "precision"// precision
     static readonly Data_0x20_Mileage:string= "mileage"// mileage
     static readonly Data_0x20_Satellites:string= "satellites"// satellites

    // Data GSM(0x210x290x2B)
     static readonly Data_0x21_GsmList:string= "gsmList"
     static readonly Data_0x21_GsmType:string= "gsmType"
     static readonly Data_0x21_Mcc:string= "mcc"
     static readonly Data_0x21_Mnc:string= "mnc"
     static readonly Data_0x21_CellId:string= "cellId"
     static readonly Data_0x21_Lac:string= "lac"
     static readonly Data_0x21_Signal:string= "signal"

    // Data Ble(0x230x26)
     static readonly Data_0x23_Mac:string= "mac"
     static readonly Data_0x23_Lat:string= "lat"
     static readonly Data_0x23_Lng:string= "lng"
     static readonly Data_0x23_Radius:string= "radius"
     static readonly Data_0x23_Height:string= "height"
     static readonly Data_0x23_Describe:string= "describe"

    // Data Beacon(0x28)
//	 Data_0x28_Index :string= "index"
     static readonly Data_0x28_Mac:string= "mac"
     static readonly Data_0x28_Rssi:string= "rssi"
     static readonly Data_0x28_Rssi_1m:string= "rssi_1m"
     static readonly Data_0x28_Battery:string= "battery"
     static readonly Data_0x28_IsLanLng:string= "isLanLng"
     static readonly Data_0x28_Lat:string= "lat"
     static readonly Data_0x28_Lng:string= "lng"
     static readonly Data_0x28_IsDescribe:string= "isDescribe"
     static readonly Data_0x28_Describe:string= "describe"

    // Data HomeWifi(0x2A)
//	 Data_0x2A_Index :string= "index"
     static readonly Data_0x2A_Mac:string= "mac"
     static readonly Data_0x2A_Rssi:string= "rssi"
     static readonly Data_0x2A_IsLanLng:string= "isLanLng"
     static readonly Data_0x2A_Lat:string= "lat"
     static readonly Data_0x2A_Lng:string= "lng"
     static readonly Data_0x2A_IsDescribe:string= "isDescribe"
     static readonly Data_0x2A_Describe:string= "describe"

    // Data WiFi(0x22)
     static readonly Data_0x22_WifiList:string= "wifiList"
     static readonly Data_0x22_Mac:string= "mac"
     static readonly Data_0x22_Signal:string= "signal"
     static readonly Data_0x22_Name:string= "name"

    // PetWalking(0x14)
     static readonly Data_0x14_StartTime:string= "startTime"
     static readonly Data_0x14_StopTime:string= "stopTime"

    // Data Call(0x25)
     static readonly Data_0x25_DateTime:string= "dateTime"
     static readonly Data_0x25_Number:string= "number"
     static readonly Data_0x25_Time:string= "time"
     static readonly Data_0x25_RetCode:string= "retCode"
     static readonly Data_0x25_CallInOut:string= "callInOut"
     static readonly Data_0x25_CallStatus:string= "callStatus"
     static readonly Data_0x25_CallType:string= "callType"

    // Data Smart(0x27)
     static readonly Data_0x27_Lat:string= "lat"
     static readonly Data_0x27_Lng:string= "lng"
     static readonly Data_0x27_Radius:string= "radius"
     static readonly Data_0x27_Height:string= "height"

    // Data Step(0x30)
     static readonly Data_0x30_DateTime:string= "dateTime"
     static readonly Data_0x30_Step:string= "step"

    // Data Active(0x31)
     static readonly Data_0x31_DateTime:string= "dateTime"
     static readonly Data_0x31_Active:string= "active"

    // Data BeaconList(0x330x34)
     static readonly Data_0x33_DateTime:string= "dateTime"
     static readonly Data_0x33_CompanyId:string= "companyId"
     static readonly Data_0x33_UUID:string= "uuid"
     static readonly Data_0x33_Major:string= "major"
     static readonly Data_0x33_Minor:string= "minor"
     static readonly Data_0x33_Rssi_m:string= "rssi_m"
     static readonly Data_0x33_Rssi_r:string= "rssi_r"
     static readonly Data_0x33_List:string= "list"

    // Data Heart(0x40)
     static readonly Data_0x40_DateTime:string= "dateTime"
     static readonly Data_0x40_HeartRate:string= "heartRate"
     static readonly Data_0x40_TrustLevel:string= "trustLevel"

    // Data SPO2(0x41)
     static readonly Data_0x41_DateTime:string= "dateTime"
     static readonly Data_0x41_SPO2Rate:string= "spo2Rate"
     static readonly Data_0x41_TrustLevel:string= "trustLevel"

    // Config Key(0x02)
     static readonly Config_0x01:string= "module"// Module
     static readonly Config_0x02:string= "version"// Version
     static readonly Config_0x03:string= "IMEI"// IMEI
     static readonly Config_0x04:string= "ICCID"// ICCID
     static readonly Config_0x05:string= "MAC"// MAC
     static readonly Config_0x06:string= "dateTime"// DateTime
     static readonly Config_0x07:string= "runTime"// RunTime
     static readonly Config_0x08:string= "firmware"// Firmware
     static readonly Config_0x09:string= "mileage"// Mileage
     static readonly Config_0x0A:string= "workMode"// WorkMode
     static readonly Config_0x0B:string= "alarmClock"// AlarmClock
     static readonly Config_0x0C:string= "noDisturb"// NoDisturb
     static readonly Config_0x0D:string= "password"// Password
     static readonly Config_0x0E:string= "timeZone"// TimeZone
     static readonly Config_0x0F:string= "enableControl"// Enable Control
     static readonly Config_0x75:string= "extraControl"// Extra Enable Control
     static readonly Config_0x10:string= "ringToneVolume"// RingToneVolume
     static readonly Config_0x11:string= "micVolume"// MicVolume
     static readonly Config_0x12:string= "speakerVolume"// SpeakerVolume
     static readonly Config_0x13:string= "deviceName"// DeviceName
     static readonly Config_0x14:string= "battery"// Battery
     static readonly Config_0x15:string= "bleLoc"// BleLoc
     static readonly Config_0x16:string= "bleWhiteList"// BleWhiteList
     static readonly Config_0x17:string= "smsgpsurl"// Smsgpsurl
     static readonly Config_0x18:string= "smswifiurl"// Smswifiurl
     static readonly Config_0x19:string= "music"// Music
     static readonly Config_0x1A:string= "fwVersion"// FwVersion
     static readonly Config_0x1B:string= "gsmModule"// GsmModule
     static readonly Config_0x1C:string= "promptVolume"// PromptVolume
     static readonly Config_0x1D:string= "agpsLoc"// AgpsLoc
     static readonly Config_0x1F:string= "locale"// Locale
    // Button Setting
     static readonly Config_0x20:string= "sosButton"// SOS Button
     static readonly Config_0x21:string= "call1Button"// Call 1 Button
     static readonly Config_0x22:string= "call2Button"// Call 2 Button
    // Phone Settings
     static readonly Config_0x30:string= "number"// Set Authorized Number
     static readonly Config_0x31:string= "smsOption"// SMS Reply Prefix Text
     static readonly Config_0x32:string= "sosOption"// SOS Option
     static readonly Config_0x33:string= "phoneOption"// Phone Switches
     static readonly Config_0x34:string= "numberNamePhoto"// Set Authorized Number with Name and Photos（EV05）
     static readonly Config_0x35:string= "personalInfo"// Set Personal Data Information（EV05）
     static readonly Config_0x36:string= "watch"// Watch Settings (EV05 only)
    // GPRS Setting
     static readonly Config_0x40:string= "apn"// APN
     static readonly Config_0x41:string= "apnUserName"// Apn user name
     static readonly Config_0x42:string= "apnPassword"// Apn password
     static readonly Config_0x43:string= "sever"// Sever IP &Port
     static readonly Config_0x44:string= "timeInterval"// Time interval
     static readonly Config_0x45:string= "continueLocate"// Continue Locate
     static readonly Config_0x46:string= "heartRate"// Heart Rate Interval
     static readonly Config_0x4A:string= "wifiList"// WIFI List
     static readonly Config_0x4B:string= "catm"// Cat-M Setting
     static readonly Config_0x4C:string= "apnList"// APN List
     static readonly Config_0x4D:string= "apnNow"// APN Now
     static readonly Config_0x4E:string= "gsmBand"// GSM band
     static readonly Config_0x4F:string= "networkType"// Network Type
    // Alert Settings
     static readonly Config_0x50:string= "powerLowAlert"// Power Alert
     static readonly Config_0x51:string= "geoAlert"// GEO Alert
     static readonly Config_0x52:string= "motionAlert"// Motion Alert
     static readonly Config_0x53:string= "noMotionAlert"// No-motion Alert
     static readonly Config_0x54:string= "overSpeedAlert"// Over speed Alert
     static readonly Config_0x55:string= "tiltAlert"// Tilt Alert
     static readonly Config_0x56:string= "fallDownAlert"// Fall Down Alert
     static readonly Config_0x57:string= "welfareAlert"// Welfare Check (EC03 Only)
     static readonly Config_0x58:string= "notificationAlert"// Alert Notification (EV04 only)
     static readonly Config_0x59:string= "motionLevel"// Motion level

     static readonly Config_0x62:string= "wifiWhiteList"// WIFI White List
     static readonly Config_0x63:string= "nightMode"// Night mode
     static readonly Config_0x64:string= "network"// Mobile network information
     static readonly Config_0x66:string= "IMSI"// IMSI
     static readonly Config_0x67:string= "homeWifiMatch"// Home WiFi match number
     static readonly Config_0x73:string= "beaconList"// Beacon location list

     static readonly Config_0xF0:string= "Read"// Read

     static readonly Config_0x19_bit0:string= "bit0"
     static readonly Config_0x19_bit1:string= "bit1"
     static readonly Config_0x19_bit2:string= "bit2"
     static readonly Config_0x19_bit3:string= "bit3"
     static readonly Config_0x19_bit4:string= "bit4"
     static readonly Config_0x19_bit5:string= "bit5"
     static readonly Config_0x19_bit6:string= "bit6"
     static readonly Config_0x19_bit7:string= "bit7"
     static readonly Config_0x19_bit8:string= "bit8"
     static readonly Config_0x19_bit9:string= "bit9"
     static readonly Config_0x19_bit10:string= "bit10"
     static readonly Config_0x19_bit11:string= "bit11"
     static readonly Config_0x19_bit12:string= "bit12"
     static readonly Config_0x19_bit13:string= "bit13"
     static readonly Config_0x19_bit14:string= "bit14"
     static readonly Config_0x19_bit15:string= "bit15"
     static readonly Config_0x19_bit16:string= "bit16"
     static readonly Config_0x19_bit17:string= "bit17"
     static readonly Config_0x19_bit18:string= "bit18"
     static readonly Config_0x19_bit19:string= "bit19"
     static readonly Config_0x19_bit20:string= "bit20"
     static readonly Config_0x19_bit21:string= "bit21"
     static readonly Config_0x19_bit22:string= "bit22"
     static readonly Config_0x19_bit23:string= "bit23"
     static readonly Config_0x19_bit24:string= "bit24"
     static readonly Config_0x19_bit25:string= "bit25"
     static readonly Config_0x19_bit26:string= "bit26"
     static readonly Config_0x19_bit27:string= "bit27"
     static readonly Config_0x19_bit28:string= "bit28"
     static readonly Config_0x19_bit29:string= "bit29"
     static readonly Config_0x19_bit30:string= "bit30"
     static readonly Config_0x19_bit31:string= "bit31"
    // Services key(0x03)
     static readonly Services_0x01:string= "imei"// IMEI
     static readonly Services_0x10:string= "heartBeat"// Heart beat
     static readonly Services_0x11:string= "addresses"// Get Addresses
     static readonly Services_0x12:string= "systemTime"// Get Timestamp
     static readonly Services_0x13:string= "weather"// Get Weather
     static readonly Services_0x14:string= "weather2"// Get Weather2
     static readonly Services_0x21:string= "location_gsm"// Get GSM Location
     static readonly Services_0x22:string= "location_wifi"// Get WIFI Location
     static readonly Services_0x24:string= "status"// General data

     static readonly Services_0x11_lat:string= "lat"
     static readonly Services_0x11_lng:string= "lng"
     static readonly Services_0x11_address:string= "address"

     static readonly Services_0x13_lat:string= "lat"
     static readonly Services_0x13_lng:string= "lng"
     static readonly Services_0x13_lang:string= "lang"

    // System key(0x04)
     static readonly System_0x01:string= "imei"// IMEI
     static readonly System_0x11:string= "reFactory"// ReFactory
     static readonly System_0x12:string= "reboot"// Reboot
     static readonly System_0x14:string= "shutdown"// Shutdown
     static readonly System_0x19:string= "scanBeacon"// ScanBeacon
     static readonly System_0x1A:string= "scanWifiAuto"// ScanWifiAuto
     static readonly System_0x1B:string= "scanWifi"// ScanWifi
     static readonly System_0x31:string= "heart"// Heart (EV05 Only)

     static readonly System_0x19_lat:string= "lat"
     static readonly System_0x19_lng:string= "lng"
     static readonly System_0x19_describe:string= "describe"

     static readonly System_0x1A_lat:string= "lat"
     static readonly System_0x1A_lng:string= "lng"
     static readonly System_0x1A_describe:string= "describe"

     static readonly System_0x1B_rssi:string= "rssi"
     static readonly System_0x1B_interval:string= "interval"

    // Firmware Update key(0x7E)
     static readonly Update_0x10:string= "InitialData"// Initial Data
     static readonly Update_0x11:string= "FirmwareData"// Firmware Data
     static readonly Update_0x12:string= "Validate"// Validate
     static readonly Update_0x13:string= "State"// Update State
     static readonly Update_0x15:string= "PackSize"// Update Pack Max len
     static readonly Update_0x16:string= "RequestData"// Update Pack Max len

     static readonly Update_address:string= "updateAddress"
     static readonly Update_stateKey:string= "updateStateKey"
     static readonly Update_packSize:string= "updatePackSize"
     static readonly Update_offset:string= "offset"
     static readonly Update_list:string= "list"
     static readonly Update_length:string= "length"
     static readonly Update_percent:string= "percent"

    // Response Data key(0x7F)
     static readonly Response_ReturnStatus:string= "returnStatus"// returnStatus
     static readonly Response_Ok:string= "ok"// Ok
     static readonly Response_Error:string= "error"// Error
     static readonly Response_Msg:string= "msg"// Message
     static readonly Response_VersionError:string= "Version Invalid"// VersionError
     static readonly Response_EncryptError:string= "Encryption Invalid"// EncryptError
     static readonly Response_LengthError:string= "Length error"// LengthError
     static readonly Response_CRCError:string= "Check CRC error"// CRCError
     static readonly Response_CommandError:string= "Command Invalid"// CommandError
     static readonly Response_KeyError:string= "Key Invalid"// KeyError
     static readonly Response_KeyLengthError:string= "Key length error"// KeyLengthError
     static readonly Response_DataFormatError:string= "Data Format Invalid"// DataFormatError
     static readonly Response_DataSizeError:string= "Data Size Error"// DataSizeError
     static readonly Response_StateError:string= "Invalid State"// StateError
     static readonly Response_ParameterError:string= "Invalid Parameter"// ParameterError
     static readonly Response_NoMemoryError:string= "No Memory"// NoMemoryError
     static readonly Response_FunNoSuported:string= "Functiont not suported"// funNoSuported
     static readonly Response_GPSNoLocation:string= "GPS not Location"// GPSNoLocation
     static readonly Response_AddressError:string= "Address resolution Error"// AddressError
     static readonly Response_NoPasswordVerify:string= "No Password Verify"// NoPasswordVerify
     static readonly Response_LowBattery:string= "Battery Power Low"// LowBattery

}