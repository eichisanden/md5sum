'use strict';

class Content {
  constructor(buff) {
    this.bytes = new Uint8Array(buff);
    this.codeString = Encoding.codeToString(this.bytes);
  }

  getEncoding() {
    return Encoding.detect(this.bytes);
  }

  getCodeString() {
    return this.codeString;
  }

  getUnicodeCodeString() {
    return Encoding.codeToString(Encoding.convert(this.bytes, 'UNICODE', this.getEncoding()));
  }

  getMd5sum() {
    return MD5_hexhash(this.codeString);
  }

  getMd5sumLf() {
    return MD5_hexhash(this.codeString.replace(/\r\n?/g, '\n'));
  }

  getLineFeedCode() {
    if (this.codeString.indexOf('\r\n', 0) > 0) {
      return 'CRLF';
    } else if (this.codeString.indexOf('\n', 0) > 0) {
      return 'LF';
    } else {
      return 'CR';
    }
  }

}
