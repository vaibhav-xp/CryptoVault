"use client";

import ConfirmSecretPhrase from "@/components/Welcome/ConfirmSecretPhrase";
import CreatePassword from "@/components/Welcome/CreatePassword";
import CreateSecretPhrase from "@/components/Welcome/CreateSecretPhrase";
import LetGetStarted from "@/components/Welcome/LetGetStarted";
import { CreateAccount } from "@/components/Welcome/types";
import CustomStepper from "@/shared/CustomStepper";
import EnterSecretPhrase from "@/shared/EnterSecretPhrase";
import WalletCreationSuccessful from "@/shared/WalletCreationSuccessful";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

const MainContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2rem",
}));

const Page = () => {
  const [step, setStep] = useState(0);
  const [isImport, setIsImport] = useState(false);
  const stepper = [
    "Create Password",
    "Enter Secret Phrase",
    "Wallet Created Successfully.",
  ];
  const [data, setData] = useState<CreateAccount>({
    mnemonic: "",
    password: "",
  });

  return (
    <MainContainer component={"section"}>
      {step === 0 && (
        <LetGetStarted
          setData={setData}
          setStep={() => setStep(1)}
          setIsImport={() => setIsImport(true)}
        />
      )}
      {step === 1 && !isImport && (
        <CreatePassword setData={setData} setStep={() => setStep(2)} />
      )}
      {step === 1 && isImport && (
        <CreatePassword
          stepper={stepper}
          setData={setData}
          setStep={() => setStep(2)}
        />
      )}
      {step === 2 && !isImport && (
        <CreateSecretPhrase setData={setData} setStep={() => setStep(3)} />
      )}
      {step === 2 && isImport && (
        <EnterSecretPhrase
          stepper={stepper}
          setData={setData}
          setStep={() => setStep(4)}
        >
          <CustomStepper activeStep={1} steps={stepper} />
          <Typography variant="h1" margin={"1rem 0"}>
            Access your wallet with your Secret Recovery Phrase
          </Typography>
          <Typography variant="body2" margin={"1rem 0"}>
            MetaMask cannot recover your password. We will use your Secret
            Recovery Phrase to validate your ownership, restore your wallet, and
            set up a new password. First, enter the Secret Recovery Phrase that
            you were given when you created your wallet.
          </Typography>
        </EnterSecretPhrase>
      )}

      {step === 3 && !isImport && (
        <ConfirmSecretPhrase
          data={data}
          setData={setData}
          setStep={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <WalletCreationSuccessful
          stepper={stepper}
          isImport={isImport}
          data={data}
        />
      )}
    </MainContainer>
  );
};

export default Page;
