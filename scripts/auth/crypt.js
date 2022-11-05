import SECRET_KEY from "./env.js";

const crypt = {
  secret: SECRET_KEY,
  encrypt: function (clear) {
    const cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    return cipher.toString();
  },
  decrypt: function (cipher) {
    const decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    return decipher.toString(CryptoJS.enc.Utf8);
  },
};

export default crypt;
