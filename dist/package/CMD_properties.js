"use strict";
module.exports = class CMD_Properties {
    constructor(data) {
        this.version = data === null || data === void 0 ? void 0 : data.version;
        this.flag_ACK = Boolean(data === null || data === void 0 ? void 0 : data.flag_ACK);
        this.flag_ERR = Boolean(data === null || data === void 0 ? void 0 : data.flag_ERR);
        this.encryption = data === null || data === void 0 ? void 0 : data.encryption;
    }
    getEncryption() {
        return this.encryption;
    }
    setEncryption(value) {
        this.encryption = value;
    }
    getFlag_ERR() {
        return Boolean(this.flag_ERR);
    }
    setFlag_ERR(value) {
        this.flag_ERR = value;
    }
    getFlag_ACK() {
        return Boolean(this.flag_ACK);
    }
    setFlag_ACK(value) {
        this.flag_ACK = value;
    }
    getVersion() {
        return this.version;
    }
    setVersion(value) {
        this.version = value;
    }
};
