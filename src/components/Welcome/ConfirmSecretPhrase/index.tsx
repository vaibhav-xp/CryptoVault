"use client";

import useMnemonic from "@/hooks/useMnemonic";
import { Box, Button, Grid, Input, Paper, Typography } from "@mui/material";
import { useState } from "react";
import CustomStepper from "../../../shared/CustomStepper";
import { WalletCreationTypesWithData } from "../types";

const ConfirmSecretPhrase = ({
  setStep,
  data,
}: WalletCreationTypesWithData) => {
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const { validateMnemonicPhrase } = useMnemonic();

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...userInputs];
    updatedInputs[index] = value;
    setUserInputs(updatedInputs);
  };

  const handleConfirm = () => {
    const combinedMnemonic = data.mnemonic
      .split(" ")
      .map((s, idx) => {
        if (idx !== 0 && idx !== 5 && idx !== 10) {
          return s;
        } else {
          return userInputs[idx];
        }
      })
      .join(" ");

    if (validateMnemonicPhrase(combinedMnemonic)) {
      setStep();
    }
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
      <CustomStepper activeStep={2} />
      <Typography variant={"h1"}>Confirm Secret Recovery Phrase</Typography>
      <Typography component={"p"} marginTop={".8rem"}>
        Confirm Secret Recovery Phrase
      </Typography>

      <Paper
        component={"div"}
        elevation={4}
        sx={{
          padding: ".5rem 1rem",
          margin: "1rem 0",
          minHeight: 195,
          position: "relative",
          overflow: "hidden",
          marginTop: "2rem",
        }}
      >
        <Grid container margin={"1rem auto"} sx={{ userSelect: "none" }}>
          {data.mnemonic.split(" ").map((s, index) => (
            <Grid item xs={6} sm={4} key={index} sx={{ padding: ".5rem" }}>
              {index !== 0 && index !== 5 && index !== 10 ? (
                <Box
                  component={"div"}
                  sx={{
                    padding: ".5rem",
                    borderWidth: "1px",
                    borderColor: (theme) => theme.palette.primary.main,
                    borderStyle: "solid",
                    borderRadius: "10px",
                  }}
                >
                  <Typography component={"span"}>{s}</Typography>
                </Box>
              ) : (
                <Input
                  sx={{
                    ".MuiInputBase-input": {
                      textAlign: "center",
                    },
                  }}
                  value={userInputs[index] || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Button
        variant="contained"
        sx={{
          width: "320px",
          marginTop: "1rem",
        }}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </Paper>
  );
};

export default ConfirmSecretPhrase;
