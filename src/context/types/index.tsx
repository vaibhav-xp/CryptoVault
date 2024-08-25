import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Account {
  name: string;
  publicKey: string;
  privateKey: string;
}

export interface AccountWithBalance extends Account {
  balance: number;
}

export interface WalletContextType {
  seed: string;
  accounts: Account[] | [];
  password: string;
  currentAccount: AccountWithBalance;
  setSeed: Dispatch<SetStateAction<string>>;
  setAccounts: Dispatch<SetStateAction<Account[] | []>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setCurrentAccount: Dispatch<SetStateAction<AccountWithBalance>>;
  resetWallet: () => void;
}

export interface StorContextProviderProps {
  children: ReactNode;
}
