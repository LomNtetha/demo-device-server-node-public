const CMD_Data = require('./CMD_Data')
interface cmdDataFace{
    cmdKey:number;
    cmdLength:number;
    cmdValue:Array<number>;
}
module.exports = class CMD_DataBody {
    private cmdType: number | undefined;
    private errorMsg?:  number | undefined;
    private cmdData: Array<cmdDataFace>=[];

    getCmdType(): number | undefined {
        return this.cmdType;
    }

    setCmdType(value: number) {
        this.cmdType = value;
    }

    getCmdData(): Array<cmdDataFace> | undefined {
        return this.cmdData;
    }

    /*setCmdData(cmdKey:number,cmdValue:number[]) {
        const length=cmdValue.length
        const cmdLength = length>0 ? length + 1 : 1;
        this.cmdData?.push(new CMD_Data(cmdLength,cmdKey,cmdValue));
    }*/
    setCmdData(cmdKey:number,cmdValue:number[]) {
        const cmdLength = (cmdValue != null) ? cmdValue.length + 1 : 1;
        this.cmdData.push(new CMD_Data({cmdLength,cmdKey,cmdValue}));
    }
    getErrorMsg(): number | undefined {
        return this.errorMsg;
    }

    setErrorMsg(value: number) {
        this.errorMsg = value;
    }
}