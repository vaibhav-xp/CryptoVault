"use client";

import useMnemonic from "@/hooks/useMnemonic";
import { tips } from "@/utils/constants";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import useCopied from "@/hooks/useCopied";
import CustomStepper from "../../../shared/CustomStepper";
import { WalletCreationTypes } from "../types";

const CreateSecretPhrase = ({ setStep, setData }: WalletCreationTypes) => {
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const { genMnemonic } = useMnemonic();
  const [toggleSeedPhrase, setToggleSeedPhrase] = useState<boolean>(true);
  const [spinnerLoading, setSpinnerLoading] = useState<boolean>(false);
  const timerRef = useRef<any>(null);
  const { copy } = useCopied();

  const handleMouseDown = () => {
    if (toggleSeedPhrase) {
      setSpinnerLoading(true);
      timerRef.current = setTimeout(() => {
        setSpinnerLoading(false);
        setToggleSeedPhrase((prev) => !prev);
      }, 3000);
    } else {
      setStep();
    }
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSpinnerLoading(false);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSpinnerLoading(false);
  };

  useEffect(() => {
    const mnemonic = genMnemonic();
    setSeedPhrase(mnemonic.split(" "));
    setData((prev) => ({ ...prev, mnemonic }));
  }, []);

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
          transition: "height 0.5s ease",
        }}
      >
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
            display: toggleSeedPhrase ? "grid" : "none",
            gap: 2,
            placeContent: "center",
            transition: "opacity 0.5s ease",
            opacity: toggleSeedPhrase ? 1 : 0,
          }}
        >
          <VisibilityOffIcon sx={{ margin: "0 auto" }} fontSize="large" />
          <Typography>Make sure nobody is looking</Typography>
        </Box>

        <Button
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            display: toggleSeedPhrase ? "none" : "block",
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

      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
          marginX: "auto",
          display: "flex",
          alignItems: "center",
          width: "320px",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {spinnerLoading ? (
          <>
            <CircularProgress size={24} sx={{ marginRight: "8px" }} />
            Holding for 3s...
          </>
        ) : toggleSeedPhrase ? (
          "Reveal Secret Recovery Phrase"
        ) : (
          "Next"
        )}
      </Button>
    </Paper>
  );
};

export default CreateSecretPhrase;
