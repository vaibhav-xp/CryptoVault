import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  ParsedTransactionWithMeta,
} from "@solana/web3.js";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import useWallet from "./useWallet";
import { toast } from "react-toastify";

interface Account {
  publicKey: string;
  privateKey: string;
}

interface UseSolanaReturn {
  createAccount: (seed: string) => Account;
  getBalance: (publicKeyStr: string) => Promise<number>;
  isValidSolanaPublicKey: (publicKeyStr: string) => boolean;
  sendTransaction: (
    recipient: string,
    amount: number,
    privateKey: string
  ) => Promise<string>;
  getTransactions: (
    publicKeyStr: string
  ) => Promise<ParsedTransactionWithMeta[]>;
}

const useSolana = (): UseSolanaReturn => {
  // Initialize the connection to the Solana Devnet
  const connection = new Connection("https://api.devnet.solana.com");
  const { accounts } = useWallet();

  /**
   * Create a new Solana account based on a seed phrase.
   * @param {string} seed - The seed phrase to derive the account from.
   * @param {number} [acc_no=0] - Optional account number to use in derivation path.
   * @returns {Account} - An object containing the public and private keys of the new account.
   */
  const createAccount = (seed: string, acc_no: number = 0): Account => {
    // Derive the path for the account based on the seed and optional account number
    const path = `m/44'/501'/${accounts.length || acc_no}'/0'`;
    const derivedSeed = derivePath(path, seed).key;
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // Encode the public and private keys to base58
    const publicKey = bs58.encode(Buffer.from(keyPair.publicKey));
    const privateKey = bs58.encode(Buffer.from(keyPair.secretKey));

    return { publicKey, privateKey };
  };

  /**
   * Get the balance of a Solana account.
   * @param {string} publicKeyStr - The public key of the account.
   * @returns {Promise<number>} - The balance in SOL, converted from lamports.
   */
  const getBalance = async (publicKeyStr: string): Promise<number> => {
    try {
      if (!publicKeyStr) return 0;
      const publicKey = new PublicKey(publicKeyStr);
      const balance = await connection.getBalance(publicKey);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
      return 0;
    }
  };

  /**
   * Validate if a given string is a valid Solana public key.
   * @param {string} pubKeyString - The public key string to validate.
   * @returns {boolean} - True if the public key is valid, otherwise false.
   */
  function isValidSolanaPublicKey(pubKeyString: string): boolean {
    try {
      const pubKey = new PublicKey(pubKeyString);
      return PublicKey.isOnCurve(pubKey.toBuffer());
    } catch (e) {
      return false;
    }
  }

  /**
   * Send a transaction to transfer SOL from one account to another.
   * @param {string} recipient - The public key of the recipient account.
   * @param {number} amount - The amount of SOL to transfer.
   * @param {string} privateKey - The private key of the sender account.
   * @returns {Promise<string>} - The transaction ID if successful.
   */
  const sendTransaction = async (
    recipient: string,
    amount: number,
    privateKey: string
  ): Promise<string> => {
    try {
      // Create a key pair from the private key
      const sender = nacl.sign.keyPair.fromSecretKey(bs58.decode(privateKey));
      const senderPublicKey = new PublicKey(sender.publicKey);

      // Create and configure the transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: new PublicKey(recipient),
          lamports: amount * 1e9, // Convert SOL to lamports
        })
      );

      // Get the latest blockhash and set the transaction's recentBlockhash and feePayer
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderPublicKey;

      // Sign the transaction and serialize it
      const signature = nacl.sign.detached(
        transaction.serializeMessage(),
        sender.secretKey
      );
      transaction.addSignature(senderPublicKey, Buffer.from(signature));

      const serializedTransaction = transaction.serialize();
      const transactionId = await connection.sendRawTransaction(
        serializedTransaction
      );
      await connection.confirmTransaction(transactionId);

      toast.success("Transaction successful!");
      return transactionId;
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
      return "";
    }
  };

  /**
   * Fetch transactions associated with a given public key.
   * @param {string} publicKeyStr - The public key to fetch transactions for.
   * @returns {Promise<ParsedTransactionWithMeta[]>} - List of parsed transactions.
   */
  const getTransactions = async (
    publicKeyStr: string
  ): Promise<ParsedTransactionWithMeta[]> => {
    try {
      if (!publicKeyStr) return [];

      const publicKey = new PublicKey(publicKeyStr);

      // Fetch transaction signatures for the public key
      const signatures = await connection.getSignaturesForAddress(publicKey);

      // Fetch detailed transaction information using the signatures
      const transactions = await Promise.all(
        signatures.map(async (signature) => {
          const transactionDetails = await connection.getParsedTransaction(
            signature.signature
          );
          return transactionDetails;
        })
      );

      return transactions.filter(
        (tx) => tx !== null
      ) as ParsedTransactionWithMeta[];
    } catch (error) {
      const typedError = error as Error;
      toast.error(typedError.message);
      return [];
    }
  };

  // Return the functions for use in components
  return {
    createAccount,
    getBalance,
    isValidSolanaPublicKey,
    sendTransaction,
    getTransactions,
  };
};

export default useSolana;
