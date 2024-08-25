"use client";

import tada from "@/assets/tada.png";
import { Account } from "@/context/types";
import useMnemonic from "@/hooks/useMnemonic";
import useSolana from "@/hooks/useSolana";
import useWallet from "@/hooks/useWallet";
import baseApi from "@/utils/baseApi";
import { Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateAccount } from "../../components/Welcome/types";
import CustomStepper from "../CustomStepper";

const WalletCreationSuccessful = ({
  data,
  stepper,
  isImport,
}: {
  data: CreateAccount;
  stepper: string[];
  isImport: boolean;
}) => {
  const router = useRouter();
  const { setSeed, accounts, setAccounts, setPassword, setCurrentAccount } =
    useWallet();
  const { mnemonicToSeed } = useMnemonic();
  const { createAccount, getBalance } = useSolana();
  const [isError, setError] = useState(true);

  const saveData = async () => {
    try {
      const seed: string = await mnemonicToSeed(data.mnemonic);
      const account = createAccount(seed);
      if (!account) return toast.error("Unable to create an account");
      const newData = {
        password: data.password,
        seed,
        accounts: ["Account 1"],
      };

      const response = await baseApi.post("/api/data/encrypt", newData);
      localStorage.setItem("cryptoVault", response?.data?.data?.encryptedData);
      setSeed(seed);
      const newAccount: Account = {
        privateKey: account.privateKey,
        publicKey: account.publicKey,
        name: `Accounts ${accounts.length + 1}`,
      };
      setAccounts((prev) => [...prev, newAccount]);
      getBalance(newAccount.publicKey).then((balance) =>
        setCurrentAccount({ ...newAccount, balance })
      );
      setPassword(data.password);
      setError(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    saveData();
  }, []);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Paper
      component={"div"}
      sx={{
        maxWidth: "500px",
        width: "100%",
        textAlign: "center",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      {isImport ? (
        <CustomStepper activeStep={!isError ? 3 : 2} steps={stepper} />
      ) : (
        <CustomStepper activeStep={!isError ? 4 : 3} />
      )}
      {!isError && <Image src={tada} alt="image" />}
      <Typography variant={"h1"}>
        {!isError ? "Wallet Creation Successful" : "Creating Wallet..."}
      </Typography>
      {!isError && (
        <Typography component={"p"} marginTop={".8rem"}>
          You&apos;ve successfully protected your wallet. Keep your Secret
          Recovery Phrase safe and secret -- it&apos;s your responsibility!
        </Typography>
      )}
      {!isError && (
        <Button
          variant={"contained"}
          sx={{ marginTop: "1rem" }}
          onClick={handleClick}
        >
          Got it
        </Button>
      )}
    </Paper>
  );
};

export default WalletCreationSuccessful;
