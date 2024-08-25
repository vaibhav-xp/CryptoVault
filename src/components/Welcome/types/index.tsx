import { Dispatch, ReactNode, SetStateAction } from "react";

export interface CreateAccount {
  mnemonic: string;
  password: string;
}

export interface WalletCreationTypes {
  setStep: () => void;
  setData: Dispatch<SetStateAction<CreateAccount>>;
  stepper?: string[];
  setIsImport?: () => void;
}

export interface WalletCreationTypesWithData extends WalletCreationTypes {
  data: CreateAccount;
}
