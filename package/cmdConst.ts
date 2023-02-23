module.exports =class Cmd_const{
     // Head
     // Command Head
     static readonly CMD_Head:number= 0xAB
     // Command Head Encrypt
     static readonly CMD_Head_Encrypt:number= 0xA5

     // Command
     // Data Command
     static readonly CMD_Type_Data:number= 0x01
     // Configuration
     static readonly CMD_Type_Config:number= 0x02
     // Services
     static readonly CMD_Type_Service:number= 0x03
     // System Control
     static readonly CMD_Type_System:number= 0x04
     // Debug Control
     static readonly CMD_Type_Debug:number= 0x06
     // No Encryption command
     static readonly CMD_Type_NoEncryption:number= 0x09
     // Firmware Update
     static readonly CMD_Type_Update:number= 0x7E
     // Negative Response
     static readonly CMD_Type_Response:number= 0x7F

     // Data key(0x01)
     static readonly CMD_Data_IMEI:number= 0x01
     static readonly CMD_Data_AlarmCode:number= 0x02
     static readonly CMD_Data_Historical:number= 0x11
     static readonly CMD_Data_SingleLocating:number= 0x12
     static readonly CMD_Data_ContinueLocating:number= 0x13
     static readonly CMD_Data_PetWalking:number= 0x14
     static readonly CMD_Data_GPS:number= 0x20
     static readonly CMD_Data_GSM:number= 0x21
     static readonly CMD_Data_GSM2:number= 0x29
     static readonly CMD_Data_GSM3:number= 0x2B
     static readonly CMD_Data_WIFI:number= 0x22
     static readonly CMD_Data_WIFI2:number= 0x19
     static readonly CMD_Data_BLE:number= 0x23
     static readonly CMD_Data_BLE2:number= 0x26
     static readonly CMD_Data_Status:number= 0x24
     static readonly CMD_Data_CallRecords:number= 0x25
     static readonly CMD_Data_Smart:number= 0x27
     static readonly CMD_Data_Beacon:number= 0x28
     static readonly CMD_Data_Beacon2:number= 0x2C
     static readonly CMD_Data_HomeWifi:number= 0x2A
     static readonly CMD_Data_STEP:number= 0x30
     static readonly CMD_Data_Active:number= 0x31
     static readonly CMD_Data_BeaconList:number= 0x33
     static readonly CMD_Data_BeaconList2:number= 0x34
     static readonly CMD_Data_HeartRate:number= 0x40
     static readonly CMD_Data_SPO2Rate:number= 0x41
     static readonly CMD_Data_LogRecord:number= 0xF0

     // Config key(0x02)
     static readonly CMD_Config_Module:number= 0x01// Module Number
     static readonly CMD_Config_Version:number= 0x02// Firmware Version
     static readonly CMD_Config_IMEI:number= 0x03// IMEI
     static readonly CMD_Config_ICCID:number= 0x04// ICCID
     static readonly CMD_Config_MAC:number= 0x05// MAC
     static readonly CMD_Config_DATATIME:number= 0x06// Setting Time
     static readonly CMD_Config_RUNTIME:number= 0x07// Run Times
     static readonly CMD_Config_Firmware:number= 0x08// Firmware Information
     // System Setting
     static readonly CMD_Config_Mileage:number= 0x09// Initialize Mileage
     static readonly CMD_Config_WorkMode:number= 0x0A// Work Mode
     static readonly CMD_Config_AlarmClock:number= 0x0B// Alarm Clock
     static readonly CMD_Config_NoDisturb:number= 0x0C// No Disturb
     static readonly CMD_Config_Password:number= 0x0D// Password Protect
     static readonly CMD_Config_TimeZone:number= 0x0E// Time Zone
     static readonly CMD_Config_EnableControl:number= 0x0F// Enable control
     static readonly CMD_Config_RingtoneVolume:number= 0x10// Ring-Tone Volume
     static readonly CMD_Config_MicVolume:number= 0x11// Mic Volume
     static readonly CMD_Config_SpeakerVolume:number= 0x12// Speaker Volume
     static readonly CMD_Config_DeviceName:number= 0x13// Device Name
     static readonly CMD_Config_Battery:number= 0x14// Battery
     static readonly CMD_Config_BleLoc:number= 0x15// BLE loc
     static readonly CMD_Config_BleWhiteList:number= 0x16// BLE whitelist
     static readonly CMD_Config_SMSGPSURL:number= 0x17// SMS GPS URL
     static readonly CMD_Config_SMSWIFIURL:number= 0x18// SMS WIFI/LBS URL
     static readonly CMD_Config_Music:number= 0x19// Music
     static readonly CMD_Config_FWVersion:number= 0x1A// FW Version
     static readonly CMD_Config_GSMModule:number= 0x1B// GSM Module
     static readonly CMD_Config_PromptVolume:number= 0x1C// Voice prompt Volume
     static readonly CMD_Config_AGPSLoc:number= 0x1D// AGPS Location
     static readonly CMD_Config_SystemLanguage:number= 0x1F// System language(EV04 EV05 Only)
     // Button Setting
     static readonly CMD_Config_SOSButton:number= 0x20// SOS Button
     static readonly CMD_Config_Call1Button:number= 0x21// Call 1 Button
     static readonly CMD_Config_Call2Button:number= 0x22// Call 2 Button
     // Phone Settings
     static readonly CMD_Config_Number:number= 0x30// Set Authorized Number
     static readonly CMD_Config_SMSOption:number= 0x31// SMS Reply Prefix Text
     static readonly CMD_Config_SOSOption:number= 0x32// SOS Option
     static readonly CMD_Config_PhoneOption:number= 0x33// Phone Switches
     static readonly CMD_Config_NumberNamePhoto:number= 0x34// Set Authorized Number with Name and Photos（EV05）
     static readonly CMD_Config_PersonalInfo:number= 0x35// Set Personal Data Information（EV05）
     static readonly CMD_Config_WatchSettings:number= 0x36// Watch Settings (EV05 only)
     // GPRS Setting
     static readonly CMD_Config_APN:number= 0x40// APN
     static readonly CMD_Config_ApnUserName:number= 0x41// Apn user name
     static readonly CMD_Config_ApnPassword:number= 0x42// Apn password
     static readonly CMD_Config_SeverIPPort:number= 0x43// Sever IP &Port
     static readonly CMD_Config_TimeInterval:number= 0x44// Time interval
     static readonly CMD_Config_ContinueLocate:number= 0x45// Continue Locate
     static readonly CMD_Config_HeartRateInterval:number= 0x46// Heart Rate Interval
     static readonly CMD_Config_WifiList:number= 0x4A// WIFI List
     static readonly CMD_Config_CatM:number= 0x4B// Cat-M Setting
     static readonly CMD_Config_APNList:number= 0x4C// APN List(EV04 EV05 Only)
     static readonly CMD_Config_APNNow:number= 0x4D// APN Now(EV04 EV05 Only)
     static readonly CMD_Config_GSMBand:number= 0x4E// GSM band
     static readonly CMD_Config_NetworkType:number= 0x4F// Set Preferred network type(EV05/EV04 Only)
     // Alert Settings
     static readonly CMD_Config_AlertPowerLow:number= 0x50// Power Alert
     static readonly CMD_Config_AlertGEO:number= 0x51// GEO Alert
     static readonly CMD_Config_AlertMotion:number= 0x52// Motion Alert
     static readonly CMD_Config_AlertNoMotion:number= 0x53// No-motion Alert
     static readonly CMD_Config_AlertOverSpeed:number= 0x54// Over speed Alert
     static readonly CMD_Config_AlertTilt:number= 0x55// Tilt Alert
     static readonly CMD_Config_AlertFallDown:number= 0x56// Fall Down Alert
     static readonly CMD_Config_AlertWelfare:number= 0x57// Welfare Check (EC03 Only)
     static readonly CMD_Config_AlertNotification:number= 0x58// Alert Notification (EV04 only)
     static readonly CMD_Config_MotionLevel:number= 0x59// Motion level

     static readonly CMD_Config_WifiWhiteList:number= 0x62// WIFI White List
     static readonly CMD_Config_NightMode:number= 0x63// Night mode
     static readonly CMD_Config_MobileNetwork:number= 0x64// Mobile network information
     static readonly CMD_Config_IMSI:number= 0x66// IMSI
     static readonly CMD_Config_HomeWifiMatch:number= 0x67// Home WiFi match number
     static readonly CMD_Config_BeaconList:number= 0x73// Beacon location list
     static readonly CMD_Config_ExtraControl:number= 0x75// Extra Enable control

     static readonly CMD_Config_Read:number= 0xF0// Read
     // CMD_Config_Save :number= 0xFE// (0xFE)

     // Services key(0x03)
     static readonly CMD_Services_IMEI:number= 0x01// IMEI
     static readonly CMD_Services_ICCID:number= 0x04// ICCID
     static readonly CMD_Services_HeartBeat:number= 0x10// Heart beat
     static readonly CMD_Services_getAddresses:number= 0x11// Get Addresses
     static readonly CMD_Services_getTimestamp:number= 0x12// Get Timestamp
     static readonly CMD_Services_getWeather:number= 0x13// Get Weather
     static readonly CMD_Services_getWeather2:number= 0x14// Get Weather
     static readonly CMD_Services_getLocationGSM:number= 0x21// Get GSM Location
     static readonly CMD_Services_getLocationWIFI:number= 0x22// Get WIFI Location
     static readonly CMD_Services_generalData:number= 0x24// General data

     // System key(0x04)
     static readonly CMD_System_IMEI:number= 0x01// IMEI
     static readonly CMD_System_ReFactory:number= 0x11// refactory
     static readonly CMD_System_Reboot:number= 0x12// reboot
     static readonly CMD_Find_Me:number= 0x13// shutdown
     static readonly CMD_System_Shutdown:number= 0x14// shutdown
     static readonly CMD_System_ScanBLE:number= 0x16// Scan BLE
     static readonly CMD_System_ScanBeacon:number= 0x19// Scan Beacon
     static readonly CMD_System_ScanWifiAuto:number= 0x1A// Scan WiFi List auto-setting
     static readonly CMD_System_ScanWifi:number= 0x1B// Scan WiFi List
     static readonly CMD_System_upgradeURL:number= 0x30// Device the request URL
     static readonly CMD_System_Heart:number= 0x31// Heart (EV05 Only)

     // No Encryption
     static readonly CMD_NoEncryption_PasswordVerify:number= 0x0D// Password Verify


     // Firmware Update key(0x7E)
     static readonly CMD_Update_InitialData:number= 0x10// Initial Data
     static readonly CMD_Update_FirmwareData:number= 0x11// Firmware Data
     static readonly CMD_Update_Validate:number= 0x12// Validate
     static readonly CMD_Update_State:number= 0x13// Update State
     static readonly CMD_Update_PackSize:number= 0x15// Update Pack Max len
     static readonly CMD_Update_RequestData:number= 0x16// Update Pack Max len

     // Response Data key(0x7F)
     static readonly CMD_Response_Success:number= 0x00// Success
     static readonly CMD_Response_VersionError:number= 0x11// Version Invalid
     static readonly CMD_Response_EncryptError:number= 0x12// Encryption Invalid
     static readonly CMD_Response_LengthError:number= 0x13// Length error
     static readonly CMD_Response_CRCError:number= 0x14// Check CRC error
     static readonly CMD_Response_CommandError:number= 0x15// Command Invalid
     static readonly CMD_Response_KeyError:number= 0x16// Key Invalid
     static readonly CMD_Response_KeyLengthError:number= 0x17// Key length error
     static readonly CMD_Response_DataFormatError:number= 0x21// Data Format Invalid
     static readonly CMD_Response_DataSizeError:number= 0x22// Data Size Error
     static readonly CMD_Response_StateError:number= 0x23// Invalid State
     static readonly CMD_Response_ParameterError:number= 0x24// Invalid Parameter
     static readonly CMD_Response_NoMemoryError:number= 0x25// No Memory
     static readonly CMD_Response_funNoSuported:number= 0x26// functiont not suported
     static readonly CMD_Response_GPSNoLocation:number= 0x27// GPS not Location
     static readonly CMD_Response_AddressError:number= 0x28// Address resolution Error
     static readonly CMD_Response_ServiceFeeError:number= 0x30// Service default fee
     static readonly CMD_Response_ServiceNotExist:number= 0x31// Service Not Exist
     static readonly CMD_Response_NoPasswordVerify:number= 0x40// No Password Verify
     static readonly CMD_Response_LowBattery:number= 0xF0// Battery Power Low
}