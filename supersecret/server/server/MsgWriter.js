class MsgWriter {
    constructor() {
        this.data = []
        this.offset = 0;
    }
    writeUInt8(num) {
        let a = new DataView(new ArrayBuffer(1))
        a.setUint8(0, num)
        a = new Uint8Array(a.buffer)
        this.data.push(a[0])
    }
    writeUInt16(num) {
        let a = new DataView(new ArrayBuffer(2))
        a.setUint16(0, num)
        a = new Uint8Array(a.buffer)
        this.data.push(a[0])
        this.data.push(a[1])

    }
    writeUInt32(num) {
        let a = new DataView(new ArrayBuffer(4))
        a.setUint32(0, num)
        a = new Uint8Array(a.buffer)
        this.data.push(a[0])
        this.data.push(a[1])
        this.data.push(a[2])
        this.data.push(a[3])
    }

    writeString(string) {
        let encode = unescape(encodeURIComponent(string))
        let length = encode.length + 1
        this.writeUInt16(length)
        for (i = 0; i < length; i++) {
            this.writeUInt8(encode.charCodeAt(i))
        }

    }
}


module.exports = MsgWriter;