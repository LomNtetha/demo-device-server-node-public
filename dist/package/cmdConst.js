"use strict";
var _a;
module.exports = (_a = class Cmd_const {
    },
    // Head
    // Command Head
    _a.CMD_Head = 0xAB,
    // Command Head Encrypt
    _a.CMD_Head_Encrypt = 0xA5,
    // Command
    // Data Command
    _a.CMD_Type_Data = 0x01,
    // Configuration
    _a.CMD_Type_Config = 0x02,
    // Services
    _a.CMD_Type_Service = 0x03,
    // System Control
    _a.CMD_Type_System = 0x04,
    // Debug Control
    _a.CMD_Type_Debug = 0x06,
    // No Encryption command
    _a.CMD_Type_NoEncryption = 0x09,
    // Firmware Update
    _a.CMD_Type_Update = 0x7E,
    // Negative Response
    _a.CMD_Type_Response = 0x7F,
    // Data key(0x01)
    _a.CMD_Data_IMEI = 0x01,
    _a.CMD_Data_AlarmCode = 0x02,
    _a.CMD_Data_Historical = 0x11,
    _a.CMD_Data_SingleLocating = 0x12,
    _a.CMD_Data_ContinueLocating = 0x13,
    _a.CMD_Data_PetWalking = 0x14,
    _a.CMD_Data_GPS = 0x20,
    _a.CMD_Data_GSM = 0x21,
    _a.CMD_Data_GSM2 = 0x29,
    _a.CMD_Data_GSM3 = 0x2B,
    _a.CMD_Data_WIFI = 0x22,
    _a.CMD_Data_WIFI2 = 0x19,
    _a.CMD_Data_BLE = 0x23,
    _a.CMD_Data_BLE2 = 0x26,
    _a.CMD_Data_Status = 0x24,
    _a.CMD_Data_CallRecords = 0x25,
    _a.CMD_Data_Smart = 0x27,
    _a.CMD_Data_Beacon = 0x28,
    _a.CMD_Data_Beacon2 = 0x2C,
    _a.CMD_Data_HomeWifi = 0x2A,
    _a.CMD_Data_STEP = 0x30,
    _a.CMD_Data_Active = 0x31,
    _a.CMD_Data_BeaconList = 0x33,
    _a.CMD_Data_BeaconList2 = 0x34,
    _a.CMD_Data_HeartRate = 0x40,
    _a.CMD_Data_SPO2Rate = 0x41,
    _a.CMD_Data_LogRecord = 0xF0,
    // Config key(0x02)
    _a.CMD_Config_Module = 0x01 // Module Number
,
    _a.CMD_Config_Version = 0x02 // Firmware Version
,
    _a.CMD_Config_IMEI = 0x03 // IMEI
,
    _a.CMD_Config_ICCID = 0x04 // ICCID
,
    _a.CMD_Config_MAC = 0x05 // MAC
,
    _a.CMD_Config_DATATIME = 0x06 // Setting Time
,
    _a.CMD_Config_RUNTIME = 0x07 // Run Times
,
    _a.CMD_Config_Firmware = 0x08 // Firmware Information
,
    // System Setting
    _a.CMD_Config_Mileage = 0x09 // Initialize Mileage
,
    _a.CMD_Config_WorkMode = 0x0A // Work Mode
,
    _a.CMD_Config_AlarmClock = 0x0B // Alarm Clock
,
    _a.CMD_Config_NoDisturb = 0x0C // No Disturb
,
    _a.CMD_Config_Password = 0x0D // Password Protect
,
    _a.CMD_Config_TimeZone = 0x0E // Time Zone
,
    _a.CMD_Config_EnableControl = 0x0F // Enable control
,
    _a.CMD_Config_RingtoneVolume = 0x10 // Ring-Tone Volume
,
    _a.CMD_Config_MicVolume = 0x11 // Mic Volume
,
    _a.CMD_Config_SpeakerVolume = 0x12 // Speaker Volume
,
    _a.CMD_Config_DeviceName = 0x13 // Device Name
,
    _a.CMD_Config_Battery = 0x14 // Battery
,
    _a.CMD_Config_BleLoc = 0x15 // BLE loc
,
    _a.CMD_Config_BleWhiteList = 0x16 // BLE whitelist
,
    _a.CMD_Config_SMSGPSURL = 0x17 // SMS GPS URL
,
    _a.CMD_Config_SMSWIFIURL = 0x18 // SMS WIFI/LBS URL
,
    _a.CMD_Config_Music = 0x19 // Music
,
    _a.CMD_Config_FWVersion = 0x1A // FW Version
,
    _a.CMD_Config_GSMModule = 0x1B // GSM Module
,
    _a.CMD_Config_PromptVolume = 0x1C // Voice prompt Volume
,
    _a.CMD_Config_AGPSLoc = 0x1D // AGPS Location
,
    _a.CMD_Config_SystemLanguage = 0x1F // System language(EV04 EV05 Only)
,
    // Button Setting
    _a.CMD_Config_SOSButton = 0x20 // SOS Button
,
    _a.CMD_Config_Call1Button = 0x21 // Call 1 Button
,
    _a.CMD_Config_Call2Button = 0x22 // Call 2 Button
,
    // Phone Settings
    _a.CMD_Config_Number = 0x30 // Set Authorized Number
,
    _a.CMD_Config_SMSOption = 0x31 // SMS Reply Prefix Text
,
    _a.CMD_Config_SOSOption = 0x32 // SOS Option
,
    _a.CMD_Config_PhoneOption = 0x33 // Phone Switches
,
    _a.CMD_Config_NumberNamePhoto = 0x34 // Set Authorized Number with Name and Photos（EV05）
,
    _a.CMD_Config_PersonalInfo = 0x35 // Set Personal Data Information（EV05）
,
    _a.CMD_Config_WatchSettings = 0x36 // Watch Settings (EV05 only)
,
    // GPRS Setting
    _a.CMD_Config_APN = 0x40 // APN
,
    _a.CMD_Config_ApnUserName = 0x41 // Apn user name
,
    _a.CMD_Config_ApnPassword = 0x42 // Apn password
,
    _a.CMD_Config_SeverIPPort = 0x43 // Sever IP &Port
,
    _a.CMD_Config_TimeInterval = 0x44 // Time interval
,
    _a.CMD_Config_ContinueLocate = 0x45 // Continue Locate
,
    _a.CMD_Config_HeartRateInterval = 0x46 // Heart Rate Interval
,
    _a.CMD_Config_WifiList = 0x4A // WIFI List
,
    _a.CMD_Config_CatM = 0x4B // Cat-M Setting
,
    _a.CMD_Config_APNList = 0x4C // APN List(EV04 EV05 Only)
,
    _a.CMD_Config_APNNow = 0x4D // APN Now(EV04 EV05 Only)
,
    _a.CMD_Config_GSMBand = 0x4E // GSM band
,
    _a.CMD_Config_NetworkType = 0x4F // Set Preferred network type(EV05/EV04 Only)
,
    // Alert Settings
    _a.CMD_Config_AlertPowerLow = 0x50 // Power Alert
,
    _a.CMD_Config_AlertGEO = 0x51 // GEO Alert
,
    _a.CMD_Config_AlertMotion = 0x52 // Motion Alert
,
    _a.CMD_Config_AlertNoMotion = 0x53 // No-motion Alert
,
    _a.CMD_Config_AlertOverSpeed = 0x54 // Over speed Alert
,
    _a.CMD_Config_AlertTilt = 0x55 // Tilt Alert
,
    _a.CMD_Config_AlertFallDown = 0x56 // Fall Down Alert
,
    _a.CMD_Config_AlertWelfare = 0x57 // Welfare Check (EC03 Only)
,
    _a.CMD_Config_AlertNotification = 0x58 // Alert Notification (EV04 only)
,
    _a.CMD_Config_MotionLevel = 0x59 // Motion level
,
    _a.CMD_Config_WifiWhiteList = 0x62 // WIFI White List
,
    _a.CMD_Config_NightMode = 0x63 // Night mode
,
    _a.CMD_Config_MobileNetwork = 0x64 // Mobile network information
,
    _a.CMD_Config_IMSI = 0x66 // IMSI
,
    _a.CMD_Config_HomeWifiMatch = 0x67 // Home WiFi match number
,
    _a.CMD_Config_BeaconList = 0x73 // Beacon location list
,
    _a.CMD_Config_ExtraControl = 0x75 // Extra Enable control
,
    _a.CMD_Config_Read = 0xF0 // Read
,
    // CMD_Config_Save :number= 0xFE// (0xFE)
    // Services key(0x03)
    _a.CMD_Services_IMEI = 0x01 // IMEI
,
    _a.CMD_Services_ICCID = 0x04 // ICCID
,
    _a.CMD_Services_HeartBeat = 0x10 // Heart beat
,
    _a.CMD_Services_getAddresses = 0x11 // Get Addresses
,
    _a.CMD_Services_getTimestamp = 0x12 // Get Timestamp
,
    _a.CMD_Services_getWeather = 0x13 // Get Weather
,
    _a.CMD_Services_getWeather2 = 0x14 // Get Weather
,
    _a.CMD_Services_getLocationGSM = 0x21 // Get GSM Location
,
    _a.CMD_Services_getLocationWIFI = 0x22 // Get WIFI Location
,
    _a.CMD_Services_generalData = 0x24 // General data
,
    // System key(0x04)
    _a.CMD_System_IMEI = 0x01 // IMEI
,
    _a.CMD_System_ReFactory = 0x11 // refactory
,
    _a.CMD_System_Reboot = 0x12 // reboot
,
    _a.CMD_Find_Me = 0x13 // shutdown
,
    _a.CMD_System_Shutdown = 0x14 // shutdown
,
    _a.CMD_System_ScanBLE = 0x16 // Scan BLE
,
    _a.CMD_System_ScanBeacon = 0x19 // Scan Beacon
,
    _a.CMD_System_ScanWifiAuto = 0x1A // Scan WiFi List auto-setting
,
    _a.CMD_System_ScanWifi = 0x1B // Scan WiFi List
,
    _a.CMD_System_upgradeURL = 0x30 // Device the request URL
,
    _a.CMD_System_Heart = 0x31 // Heart (EV05 Only)
,
    // No Encryption
    _a.CMD_NoEncryption_PasswordVerify = 0x0D // Password Verify
,
    // Firmware Update key(0x7E)
    _a.CMD_Update_InitialData = 0x10 // Initial Data
,
    _a.CMD_Update_FirmwareData = 0x11 // Firmware Data
,
    _a.CMD_Update_Validate = 0x12 // Validate
,
    _a.CMD_Update_State = 0x13 // Update State
,
    _a.CMD_Update_PackSize = 0x15 // Update Pack Max len
,
    _a.CMD_Update_RequestData = 0x16 // Update Pack Max len
,
    // Response Data key(0x7F)
    _a.CMD_Response_Success = 0x00 // Success
,
    _a.CMD_Response_VersionError = 0x11 // Version Invalid
,
    _a.CMD_Response_EncryptError = 0x12 // Encryption Invalid
,
    _a.CMD_Response_LengthError = 0x13 // Length error
,
    _a.CMD_Response_CRCError = 0x14 // Check CRC error
,
    _a.CMD_Response_CommandError = 0x15 // Command Invalid
,
    _a.CMD_Response_KeyError = 0x16 // Key Invalid
,
    _a.CMD_Response_KeyLengthError = 0x17 // Key length error
,
    _a.CMD_Response_DataFormatError = 0x21 // Data Format Invalid
,
    _a.CMD_Response_DataSizeError = 0x22 // Data Size Error
,
    _a.CMD_Response_StateError = 0x23 // Invalid State
,
    _a.CMD_Response_ParameterError = 0x24 // Invalid Parameter
,
    _a.CMD_Response_NoMemoryError = 0x25 // No Memory
,
    _a.CMD_Response_funNoSuported = 0x26 // functiont not suported
,
    _a.CMD_Response_GPSNoLocation = 0x27 // GPS not Location
,
    _a.CMD_Response_AddressError = 0x28 // Address resolution Error
,
    _a.CMD_Response_ServiceFeeError = 0x30 // Service default fee
,
    _a.CMD_Response_ServiceNotExist = 0x31 // Service Not Exist
,
    _a.CMD_Response_NoPasswordVerify = 0x40 // No Password Verify
,
    _a.CMD_Response_LowBattery = 0xF0 // Battery Power Low
,
    _a);
