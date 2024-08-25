"use client";

import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from "bip39";
import { toast } from "react-toastify";

// Define types for the useMnemonic hook
interface UseMnemonicReturn {
  genMnemonic: () => string;
  mnemonicToSeed: (mnemonic: string) => Promise<string>;
  validateMnemonicPhrase: (mnemonicToValidate: string) => boolean;
}

/**
 * A custom hook that provides functionality for generating, validating,
 * and converting mnemonic phrases to seed.
 *
 * @returns {UseMnemonicReturn} An object containing methods to generate
 * a mnemonic, validate a mnemonic phrase, and convert a mnemonic to a seed.
 */
const useMnemonic = (): UseMnemonicReturn => {
  /**
   * Generate a new mnemonic phrase.
   *
   * @returns {string} The generated mnemonic phrase.
   */
  function genMnemonic(): string {
    const mnemonic = generateMnemonic();
    return mnemonic;
  }

  /**
   * Convert a mnemonic phrase to a seed.
   *
   * @param {string} mnemonic - The mnemonic phrase to convert.
   * @returns {Promise<string>} The seed derived from the mnemonic phrase as a hexadecimal string.
   */
  async function mnemonicToSeed(mnemonic: string): Promise<string> {
    const seed = await mnemonicToSeedSync(mnemonic);
    return seed.toString("hex");
  }

  /**
   * Validate a mnemonic phrase.
   *
   * @param {string} mnemonicToValidate - The mnemonic phrase to validate.
   * @returns {boolean} Returns true if the mnemonic is valid, otherwise false.
   */
  function validateMnemonicPhrase(mnemonicToValidate: string): boolean {
    const isValid = validateMnemonic(mnemonicToValidate);
    if (isValid) {
      toast.success("Seed Phrase verified successfully");
      return true;
    } else {
      toast.error("Seed Phrase is not valid");
      return false;
    }
  }

  return {
    genMnemonic,
    mnemonicToSeed,
    validateMnemonicPhrase,
  };
};

export default useMnemonic;
