import crypto from "crypto";
import { AES } from "../constants";

/**
 * Decrypts the ciphertext using AES-256-GCM.
 *
 * @param {string} ciphertext - The encrypted data along with the authentication tag, separated by "$$".
 * @param {Buffer} iv - The initialization vector used for encryption.
 * @param {Buffer} key - The cryptographic key used for encryption.
 * @returns {Promise<string>} - A promise that resolves to the decrypted data.
 */
async function decryptData(
  ciphertext: string,
  iv: Buffer,
  key: Buffer
): Promise<string> {
  try {
    // Split the ciphertext into its components
    const [encryptedData, tagHex] = ciphertext.split("$$");

    // Check if encryptedData and tagHex are defined
    if (!encryptedData || !tagHex) {
      throw new Error(
        "Invalid ciphertext format. Encrypted data or tag is missing."
      );
    }

    // Convert tag from hex to Buffer
    const tag = Buffer.from(tagHex, "hex");

    // Ensure encryptedData is a valid hex string
    if (!/^[0-9a-fA-F]+$/.test(encryptedData)) {
      throw new Error("Encrypted data is not a valid hex string");
    }

    // Create a decipher object using AES-256-GCM
    const decipher = crypto.createDecipheriv(AES, key, iv);

    // Set the authentication tag
    decipher.setAuthTag(tag);

    // Decrypt the data
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");

    return decryptedData;
  } catch (error) {
    throw new Error(
      `Decryption failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export default decryptData;
