class MsgReader {
    constructor(data) {
        this.data = new DataView(data)
        this.offset = 0;
    }

    readUInt8() {
        let d = this.data.getUint8(this.offset)
        this.offset++;
        return d;
    }
    readUInt16() {
        let d = this.data.getUint16(this.offset)
        this.offset += 2;
        return d;
    }
    readUInt32() {
        let d = this.data.getUint32(this.offset)
        this.offset += 4;
        return d;
    }

    readString() {
        let s = ""
        let length = this.readUInt16()
        for (i = 0; i < length; i++) {
            let a = this.readUInt8()
            s += String.fromCharCode(a)
        }
        return decodeURIComponent(escape(s));
    }

}

module.exports = MsgReader;