import crypto from "crypto";
import { AES } from "../constants";

/**
 * Encrypts the plaintext using AES-256-GCM.
 *
 * @param {string} plaintext - The data to be encrypted.
 * @param {Buffer} iv - The initialization vector for the encryption.
 * @param {Buffer} key - The cryptographic key for the encryption.
 * @returns {string} - The encrypted data along with the authentication tag and IV, separated by "$$".
 */
function encryptData(plaintext: string, key: Buffer, iv: Buffer): string {
  // Create a cipher object using AES-256-GCM
  const cipher = crypto.createCipheriv(AES, key, iv);

  // Encrypt the plaintext
  let encryptedData = cipher.update(plaintext, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  // Generate the authentication tag
  const tag = cipher.getAuthTag();

  // Return the encrypted data, tag, and IV concatenated with "$$" separator
  return `${encryptedData}$$${tag.toString("hex")}`;
}

export default encryptData;
