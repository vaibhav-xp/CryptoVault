import { WalletContextType } from "@/context/types";
import { WalletContext } from "@/context/WalletContext";
import { useContext } from "react";

/**
 * Custom hook to access the wallet context.
 * @returns {WalletContextType} - The wallet context object containing wallet-related information and functions.
 * @throws {Error} - Throws an error if the hook is used outside of a WalletContextProvider.
 */
const useWallet = (): WalletContextType => {
  // Use the useContext hook to access the wallet context
  const context = useContext(WalletContext);

  // Throw an error if the context is null, indicating the hook is used outside of its provider
  if (context === null) {
    throw new Error("useWallet must be used within a WalletContextProvider");
  }

  // Return the context object
  return context;
};

export default useWallet;
