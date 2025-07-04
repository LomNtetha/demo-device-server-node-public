"use strict";
module.exports = class CMD_Data {
    constructor({ cmdLength, cmdKey, cmdValue }) {
        this.cmdLength = cmdLength;
        this.cmdKey = cmdKey;
        this.cmdValue = cmdValue;
    }
    getCmdLength() {
        return this.cmdLength;
    }
    setCmdLength(value) {
        this.cmdLength = value;
    }
    getCmdKey() {
        return this.cmdKey;
    }
    setCmdKey(value) {
        this.cmdKey = value;
    }
    getCmdValue() {
        return this.cmdValue;
    }
    setCmdValue(value) {
        this.cmdValue = value;
    }
};
