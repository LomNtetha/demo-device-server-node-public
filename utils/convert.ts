module.exports = class {
    /**
     * 转换为字符串<br>
     * 如果给定的值为null，或者转换失败，返回默认值<br>
     * 转换失败不会报错
     * @param value        被转换的值
     * @param defaultValue 转换错误时的默认值
     * @return 结果
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

