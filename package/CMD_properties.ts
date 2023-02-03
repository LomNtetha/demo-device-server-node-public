interface CMD_PropertiesFace{
     version: number;
     flag_ACK: boolean;
     flag_ERR: boolean;
     encryption: number;
}
module.exports = class CMD_Properties{
    private version: number;
    private flag_ACK: boolean;
    private flag_ERR: boolean;
    private encryption: number;
    constructor(data:CMD_PropertiesFace) {
        this.version=data?.version
        this.flag_ACK=Boolean(data?.flag_ACK)
        this.flag_ERR=Boolean(data?.flag_ERR)
        this.encryption=data?.encryption
    }
    getEncryption(): number {
        return this.encryption;
    }

    setEncryption(value: number) {
        this.encryption = value;
    }
    getFlag_ERR(): boolean {
        return Boolean(this.flag_ERR);
    }

    setFlag_ERR(value: boolean) {
        this.flag_ERR = value;
    }
    getFlag_ACK(): boolean {
        return Boolean(this.flag_ACK);
    }

    setFlag_ACK(value: boolean) {
        this.flag_ACK = value;
    }
    getVersion(): number {
        return this.version;
    }

    setVersion(value: number) {
        this.version = value;
    }

}