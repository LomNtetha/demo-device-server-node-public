interface cmdDataFace {
    cmdLength: number;
    cmdKey: number;
    cmdValue:number[];
}
module.exports = class CMD_Data {
    private cmdLength: number | undefined;
    private cmdKey: number | undefined;
    private cmdValue: number[] | undefined;
    constructor({cmdLength,cmdKey,cmdValue}:cmdDataFace) {
        this.cmdLength =cmdLength;
        this.cmdKey = cmdKey;
        this.cmdValue =cmdValue;
    }

    getCmdLength(): number | undefined {
        return this.cmdLength;
    }

    setCmdLength(value: number) {
        this.cmdLength = value;
    }

    getCmdKey(): number | undefined {
        return this.cmdKey;
    }

    setCmdKey(value: number) {
        this.cmdKey = value;
    }

    getCmdValue(): number[] | undefined {
        return this.cmdValue;
    }

    setCmdValue(value: number[]) {
        this.cmdValue = value;
    }
}