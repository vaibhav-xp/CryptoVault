"use client";

import { createContext, useState } from "react";
import {
  Account,
  AccountWithBalance,
  StorContextProviderProps,
  WalletContextType,
} from "./types";

export const WalletContext = createContext<WalletContextType | null>(null);

/**
 * A context provider component for managing store-related state.
 * @param {Object} param0
 * @param {React.ReactNode} param0.children
 * @returns {React.ReactNode}
 */
const WalletContextProvider = ({
  children,
}: StorContextProviderProps): React.ReactNode => {
  const [seed, setSeed] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[] | []>([]);
  const [password, setPassword] = useState<string>("");
  const [currentAccount, setCurrentAccount] = useState<AccountWithBalance>({
    name: "",
    publicKey: "",
    privateKey: "",
    balance: 0,
  });

  const resetWallet = () => {
    setSeed("");
    setAccounts([]);
    setPassword("");
    setCurrentAccount({
      name: "",
      publicKey: "",
      privateKey: "",
      balance: 0,
    });
  };

  return (
    <WalletContext.Provider
      value={{
        seed,
        setSeed,
        accounts,
        setAccounts,
        password,
        setPassword,
        currentAccount,
        setCurrentAccount,
        resetWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
