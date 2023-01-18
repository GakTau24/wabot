const qrcode = require('qrcode-terminal')

const qrListener = (qr) => {
    qrcode.generate(qr, { small: true });
  };

module.exports = {
    qrListener
}