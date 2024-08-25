"use client";

import useMnemonic from "@/hooks/useMnemonic";
import { tips } from "@/utils/constants";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useCopied from "@/hooks/useCopied";
import CustomStepper from "../../../shared/CustomStepper";
import { WalletCreationTypes } from "../types";

const CreateSecretPhrase = ({ setStep, setData }: WalletCreationTypes) => {
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const { genMnemonic } = useMnemonic();
  const [isSeedPhraseVisible, setIsSeedPhraseVisible] =
    useState<boolean>(false);
  const { copy } = useCopied();

  useEffect(() => {
    const mnemonic = genMnemonic();
    setSeedPhrase(mnemonic.split(" "));
    setData((prev) => ({ ...prev, mnemonic }));
  }, []);

  const handleCopy = () => {
    copy(seedPhrase);
  };

  const handleVisibilityToggle = () => {
    setIsSeedPhraseVisible(!isSeedPhraseVisible);
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
      <CustomStepper activeStep={1} />
      <Typography variant="h1">
        Write down your Secret <br /> Recovery Phrase
      </Typography>
      <Typography component={"p"} marginTop={"2rem"}>
        Write down this 12-word Secret Recovery Phrase and save it in a place
        that you trust and only you can access.
      </Typography>
      <Box
        component={"div"}
        sx={{
          maxWidth: "32rem",
          width: "100%",
          marginX: "auto",
          marginTop: "2rem",
        }}
      >
        <Typography
          component={"p"}
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "0",
            textAlign: "start",
          }}
        >
          Tips:
        </Typography>
        <List sx={{ padding: 0 }}>
          {tips.map((t) => (
            <ListItem key={t.id} sx={{ padding: "0", position: "relative" }}>
              <ListItemText
                primary={t.text}
                sx={{
                  marginLeft: "1.5rem",
                  "&::before": {
                    content: '"•"',
                    position: "absolute",
                    left: 0,
                    color: "text.primary",
                    fontSize: "1.5rem",
                    lineHeight: "1.5rem",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Paper
        component={"div"}
        elevation={4}
        sx={{
          padding: ".5rem 1rem",
          margin: "1rem 0",
          minHeight: 195,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!isSeedPhraseVisible && (
          <Box
            component={"div"}
            sx={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(3px)",
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              display: "grid",
              gap: 2,
              placeContent: "center",
            }}
          >
            <VisibilityOffIcon sx={{ margin: "0 auto" }} fontSize="large" />
            <Typography>Make sure nobody is looking</Typography>
          </Box>
        )}
        <Button
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            display: !isSeedPhraseVisible ? "none" : "block",
            borderRadius: 0,
          }}
          onClick={() => copy(seedPhrase)}
        />

        <Grid container margin={"1rem auto"}>
          {seedPhrase.map((s, index) => (
            <Grid item xs={6} sm={4} key={index} sx={{ padding: "1rem" }}>
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
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Typography
          component="p"
          onClick={handleCopy}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".5rem",
            cursor: "pointer",
          }}
        >
          Copy <ContentCopyIcon fontSize="small" />
        </Typography>
        <Typography
          component="p"
          onClick={handleVisibilityToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".5rem",
            cursor: "pointer",
            width: "8rem",
          }}
        >
          {isSeedPhraseVisible ? "Hide" : "Reveal"}{" "}
          <VisibilityOffIcon fontSize="medium" />
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
          marginX: "auto",
          display: "flex",
          alignItems: "center",
          width: "320px",
        }}
        onClick={() => setStep()}
      >
        Next
      </Button>
    </Paper>
  );
};

export default CreateSecretPhrase;
