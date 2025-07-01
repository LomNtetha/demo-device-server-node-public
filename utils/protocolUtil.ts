// @ts-ignore
const BytesHexStrUtil = require('./bytesHexStr.ts')
const Decimal = require('decimal.js');
module.exports = class {
    public static IMEI_DEFAULT = "000000000000000";
    public static MAC_DEFAULT = "00:00:00:00:00:00";
    public static DATETIME_DEFAULT = "1970-01-01 00:00:00";
    public static DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    static getBit(data: number, beginIndex: number, endIndex: number): number {
        let num = endIndex - beginIndex;
        num = (1 << num) - 1;
        return ((data >> beginIndex) & num);
    }

    static bytes2DateTime(data: any[]): Date {
        // Supports negative numbers, earlier than 1970
        let dateTime = this.bytes2Long(data.slice(0, 4), true);
        return new Date(dateTime * 1000);
    }

    static bytes2Long(data: any[], isSign: boolean): number {
        let dataLong = 0;
        for (let i = 0; i < data.length; i++) {
            if (isSign && (i == data.length - 1)) {
                dataLong |= data[i] << (8 * i);
            } else {
                dataLong |= (data[i] & 0xFF) << (8 * i);
            }
        }
        return dataLong;
    }

    static bytes2Latlng(data: number[]): number {
        let latlng = this.bytes2Long(data, true);
        // return Double.valueOf(latlng) / 10000000;
        return latlng / 10000000;
    }

    static bytes2Mac(data: number[], isOrder: boolean): string {
        let mac = BytesHexStrUtil.bytesToHexString(data, isOrder);
        mac = mac.replaceAll(" ", ":");
        return mac;
    }

    static long2Bytes(data: number, length: number) {
        const dataByte = new Array(length);
        for (let i = 0; i < length; i++) {
            dataByte[i] = ((data >> (8 * i)) & 0xFF);
        }
        return dataByte;
    }

    static latlng2Bytes(lat: number, lng: number) {
        let latBytes = this.latlngToBytes(lat)
        let lngBytes = this.latlngToBytes(lng)
        return latBytes.concat(lngBytes)
    }

    static mac2Bytes(data: string, isOrder: boolean) {
        data = data.replaceAll(":", "").replaceAll("-", "");
        data = this.strAfterFillZero(data, 12);
        return BytesHexStrUtil.hexStringToBytes(data, isOrder);
    }
    static minusToHex(data: number, position:number) {
        const result = (Math.pow(2,position) +  data).toString(16)
        return result
    }
    static strAfterFillZero(str: string, length: number) {
        if (str.length>= length) {
            return str;
        } else {
            while (str.length < length) {
                str+="0";
            }
        }
        return str;
    }

    static latlngToBytes(data: number) {
        // Precision loss when converting double to long
        const d1 = new Decimal(data);
        const d2 = new Decimal(10000000);
        const latlng = d1.mul(d2);
        return this.long2Bytes(latlng.valueOf(), 4);
    }

    static dateTime2Bytes(date: any) {
        const dateTime = date.getTime() / 1000;
        const byte = [(dateTime & 0xFF), ((dateTime >> 8) & 0xFF),
            ((dateTime >> 16) & 0xFF), ((dateTime >> 24) & 0xFF)]
        return byte;
    }

}
