module.exports = class {
    // Convert bytes to string
    public static bytesToHexString(byteArray: any[], isOrder: boolean): string {
        let str = ""
        if (byteArray == null || byteArray.length <= 0) {
            return "";
        }
        if (isOrder) {
            for (let i = 0; i < byteArray.length; i++) {
                str += byteArray[i].toString(16).toLocaleUpperCase()+" "
            }
        } else {
            for (let i = byteArray.length - 1; i >= 0; i--) {
                // str = `%02X${byteArray[i]} `
                str += byteArray[i].toString(16).toLocaleUpperCase()+" "
            }
        }
        return str.trim();
    }
    public static toHexString(cmdData: any[]):string{
        let str = ""
        if(!cmdData||cmdData.length<=0)return str
        cmdData.forEach((item) => {
            // @ts-ignore
            if (item === void 0 || item === null) return
            str += ('0' + item.toString(16).toLocaleUpperCase()).slice(-2) + " ";
        })
        return str.trim();
    }
    //
    public static bytes2StringByASCII(data: number[]) {
        let sbu: string = ""
        data.forEach((item) => {
            sbu += String.fromCharCode(item & 0xFF)
        })
        return sbu;
    }

    public static charToByte(str: string) {
        let result = "0123456789ABCDEF".indexOf(str);
        return result;
    }

    public static string2BytesByUTF_8(data: string) {
        let encoder=new TextEncoder();
        let result=encoder.encode(data)
        return result
    }
    public static bytes2StringByUTF_8(data: String) {
        // return
    }

    // Convert hexadecimal to a single byte array
    public static hexStringToBytes(hexString: string, isOrder: boolean): any {
        if (!hexString) return
        hexString = hexString.replaceAll(" ", "");
        hexString = hexString.toUpperCase();
        const length = hexString.length / 2;
        const hexChars = hexString.split("");
        const result = new Array(length)
        if (isOrder) {
            for (let i = 0; i < length; i++) {
                let pos = i * 2;
                result[i] = (this.charToByte(hexChars[pos]) << 4 | this.charToByte(hexChars[pos + 1]));
            }
        } else {
            for (let i = 0; i < length; i++) {
                let pos = (length - 1 - i) * 2;
                result[i] = (this.charToByte(hexChars[pos]) << 4 | this.charToByte(hexChars[pos + 1]));
            }
        }
        return result;
    }

    public static string2BytesByASCII(data: string) {
        return data.split("").map((item)=>{
            // @ts-ignore
            return item.charCodeAt()
        })
    }

}

