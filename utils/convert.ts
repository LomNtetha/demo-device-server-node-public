module.exports = class {
   /**
 * Convert to string<br>
 * If the given value is null or the conversion fails, return the default value<br>
 * Conversion failure will not throw an error
 * @param value        The value to be converted
 * @param defaultValue The default value to return if conversion fails
 * @return Result
 */

    public static toStr(value: Object, defaultValue: String) {
        if (null == value) {
            return defaultValue;
        }
        if (typeof value==='string') {
            return String(value);
        }
        return value.toString();
    }

    public static toInt(value: object, defaultValue: number) {
        if (value == null) {
            return defaultValue;
        }
        if (typeof value==='number') {
            return parseInt(value);
        }
        const valueStr = this.toStr(value, "");
        if (!valueStr) {
            return defaultValue;
        }
    }

    public static toByte(value: any, defaultValue: number) {
        if (value == null) {
            return defaultValue;
        }
        if (typeof value==='number') {
            return Number(value);
        }
        let valueStr = this.toStr(value, "");
        if (!valueStr) {
            return defaultValue;
        }
    }

    public static toDouble(value: any, defaultValue: number) {
        if (value == null || value == void 0) {
            return defaultValue;
        }
        if (typeof value==='number') {
            // @ts-ignore
            return parseFloat(value);
        }
        const valueStr = this.toStr(value, "");
        if (!valueStr) {
            return defaultValue;
        }
    }

    public static toLong(value: any, defaultValue: number) {
        if (value == null) {
            return defaultValue;
        }
        // if (value instanceof Long) {
        //     return (Long) value;
        // }
        if (typeof value==='number') {
            return Number(value);
        }
        const valueStr = this.toStr(value, "");
        if (!valueStr) {
            return defaultValue;
        }
    }
}

