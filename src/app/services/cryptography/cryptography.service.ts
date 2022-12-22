import { Profile } from '@/types/profile.type';
import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { pki } from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  constructor() { }

  public encryptMessage(message: string, symmetricKey: string) {
    return AES.encrypt(message, symmetricKey).toString();
  }

  public decryptMessage(encryptedMessage: string, symmetricKey: string) {
    return AES.decrypt(encryptedMessage, symmetricKey).toString(enc.Utf8);
  }

  public encryptSymmetricKey(publicKey: string, symmetricKey: string) {
    const publicKey_ = pki.publicKeyFromPem(publicKey);
    return publicKey_.encrypt(symmetricKey);
  }

  public decryptPrivateKey(encryptedPrivateKey: string, passPhrase: string) {
    return pki.decryptRsaPrivateKey(encryptedPrivateKey, passPhrase);
  }

  public decryptSymmetricKey(encryptedSymmetricKey: string, privateKey: pki.rsa.PrivateKey) {
    return privateKey.decrypt(encryptedSymmetricKey);
  }

  public generatedRsaKeyPair(passPhrase: string) {
    const keys = pki.rsa.generateKeyPair(2048);
    const encryptedPrivateKey = pki.encryptRsaPrivateKey(
      keys.privateKey,
      passPhrase
    );
    const publicKey = pki.publicKeyToPem(keys.publicKey);
    return { encryptedPrivateKey, publicKey };
  }

  public generateSymmetricKey() {
    return this.randomString();
  }

  public randomString(bits = 256) {
    const bytes = bits / 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+~`|}{[]\:;?><,./-=';
    const rand = (max: number) => Math.floor(Math.random() * max);
    let token = '';
    for (let i = 0; i < bytes; i++) {
      token += chars[rand(chars.length)];
    }
    return token;
  }

}
