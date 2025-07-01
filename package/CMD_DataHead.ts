interface propertiesFace {
    version: number;
    flag_ACK: boolean;
    flag_ERR: boolean;
    encryption: number;
}
const Properties = require('./CMD_properties')
module.exports = class CMD_DataHead {
    private header?: number;
    private length?: number;
    private checkCRC?: number;
    private sequenceId?: number;
    private properties?: propertiesFace;
    getHeader(): number | void {
        return this.header;
    }

    setHeader(value: number) {
        this.header = value;
    }

    getCheckCRC(): number | void {
        return this.checkCRC;
    }

    setCheckCRC(value: number) {
        this.checkCRC = value;
    }

    getSequenceId(): number | void {
        return this.sequenceId;
    }

    setSequenceId(value: number) {
        this.sequenceId = value;
    }

    getLength(): number|void {
        return this.length;
    }

    setLength(value: number) {
        this.length = value;
    }

    getProperties(): propertiesFace | void {
        return this.properties;
    }

    setProperties(value: propertiesFace) {
        this.properties = new Properties(value);
    }
}