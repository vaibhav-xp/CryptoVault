import crypto from "crypto";
import { INITIAL_VECTOR_SALT, PASSWORD_SALT } from "../constants";

/**
 * Derives a cryptographic key and initialization vector (IV) from a password using PBKDF2.
 *
 * @param {string} password - The password from which to derive the key and IV.
 * @returns {Promise<{ key: Buffer; iv: Buffer }>} - A promise that resolves to an object containing the derived key and IV.
 */
const deriveKeyAndIv = async (
  password: string
): Promise<{ key: Buffer; iv: Buffer }> => {
  try {
    // Derive the key using PBKDF2
    const key = await new Promise<Buffer>((resolve, reject) => {
      crypto.pbkdf2(
        password,
        PASSWORD_SALT,
        100000,
        32,
        "sha256",
        (err, derivedKey) => {
          if (err)
            return reject(new Error(`Error deriving key: ${err.message}`));
          resolve(derivedKey);
        }
      );
    });

    // Derive the IV using PBKDF2
    const iv = await new Promise<Buffer>((resolve, reject) => {
      crypto.pbkdf2(
        password,
        INITIAL_VECTOR_SALT,
        100000,
        12,
        "sha256",
        (err, derivedIv) => {
          if (err)
            return reject(new Error(`Error deriving IV: ${err.message}`));
          resolve(derivedIv);
        }
      );
    });

    return { key, iv };
  } catch (error) {
    throw new Error(
      `Failed to derive key and IV: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export default deriveKeyAndIv;
