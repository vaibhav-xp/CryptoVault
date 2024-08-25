"use client";

import wallet from "@/assets/wallet.png";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { WalletCreationTypes } from "../types";

const LetGetStarted = ({ setStep, setIsImport }: WalletCreationTypes) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const importSecretKey = () => {
    if (setIsImport) setIsImport();
    if (setStep) setStep();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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
        padding: "2rem",
      }}
    >
      <Typography variant={"h1"}>Let&apos;s get started</Typography>
      <Typography component={"p"} marginTop={".8rem"}>
        Trusted by millions, MetaMask is a secure wallet making the world of
        web3 accessible to all.
      </Typography>
      <Box component={"p"}>
        <Box
          component={"img"}
          src={wallet.src}
          sx={{
            width: "50%",
            minWidth: "200px",
            margin: "0 auto",
          }}
        />
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          }
          label="I agree to CryptoVault"
        />
        <Button
          variant="contained"
          sx={{ width: "320px" }}
          onClick={setStep}
          disabled={!isChecked}
        >
          Create a new wallet
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "320px" }}
          disabled={!isChecked}
          onClick={importSecretKey}
        >
          Import an existing wallet
        </Button>
      </Box>
    </Paper>
  );
};

export default LetGetStarted;
