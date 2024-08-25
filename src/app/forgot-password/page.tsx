"use client";

import NewPassword from "@/components/ForgotPassword/NewPassword";
import { CreateAccount } from "@/components/Welcome/types";
import CustomStepper from "@/shared/CustomStepper";
import EnterSecretPhrase from "@/shared/EnterSecretPhrase";
import WalletCreationSuccessful from "@/shared/WalletCreationSuccessful";
import { Box, styled, Typography } from "@mui/material";
import { useState } from "react";

const MainContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2rem",
}));

const Page = () => {
  const [data, setData] = useState<CreateAccount>({
    mnemonic: "",
    password: "",
  });
  const [step, setStep] = useState(0);

  const stepper = [
    "Enter Secret Phrase",
    "New Password",
    "Password Reset Successfully",
  ];

  return (
    <MainContainer component={"section"}>
      {step === 0 && (
        <EnterSecretPhrase setData={setData} setStep={() => setStep(1)}>
          <CustomStepper activeStep={1} steps={stepper} />
          <Typography variant="h1" margin={"1rem 0"}>
            Reset wallet
          </Typography>
          <Typography variant="body2" margin={"1rem 0"}>
            Crypto Vault doesn&apos;t store passwords. To unlock your account,
            reset your wallet with your Secret Recovery Phrase. This will delete
            your current wallet and accounts. Ensure you use the correct phrase,
            as this action is irreversible.
          </Typography>
        </EnterSecretPhrase>
      )}
      {step === 1 && (
        <NewPassword
          setData={setData}
          setStep={() => setStep(2)}
          stepper={stepper}
        />
      )}
      {step === 2 && (
        <WalletCreationSuccessful
          data={data}
          isImport={true}
          stepper={stepper}
        />
      )}
    </MainContainer>
  );
};

export default Page;
