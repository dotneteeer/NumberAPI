import { secretKey } from "./secrets.js";
export function EncryptDecrypt(input) {
    let output = '';

    for (let i = 0; i < input.length; i++) {
      output += String.fromCharCode(input.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length));
    }
    return output;
  }

