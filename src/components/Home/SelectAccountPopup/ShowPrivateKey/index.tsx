import { Account } from "@/context/types";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCopied from "@/hooks/useCopied";

interface Props {
  acc: Account;
  closeKeys: () => void;
}

const ShowPrivateKey = ({ acc, closeKeys }: Props) => {
  const { copy } = useCopied();
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paperRef.current &&
        !paperRef.current.contains(event.target as Node)
      ) {
        closeKeys();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeKeys]);

  const copyKey = (key: string) => {
    copy(key);
  };

  return (
    <Paper
      ref={paperRef}
      sx={{
        position: "fixed",
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "68%",
        maxWidth: "350px",
        width: "100%",
        padding: "20px",
        borderRadius: "12px",
        zIndex: "9999",
      }}
      elevation={5}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        onClick={closeKeys}
      >
        <CloseIcon color="primary" />
      </IconButton>
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
        {acc.name}
      </Typography>
      <Box component="div" mt={3} sx={{ textAlign: "center" }}>
        <Typography variant="body2">
          Private Key{" "}
          <ContentCopyIcon
            sx={{
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
            onClick={() => copyKey(acc.privateKey)}
          />
        </Typography>
        <Typography
          sx={{
            wordBreak: "break-word",
            fontSize: "1.2rem",
            fontFamily: "'Roboto Mono', monospace",
            color: "#ff5252",
            backgroundColor: "#09692630",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          {acc.privateKey}
        </Typography>
      </Box>
      <Box
        component="div"
        mt={3}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          Public Key{" "}
          <ContentCopyIcon
            sx={{
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
            onClick={() => copyKey(acc.publicKey)}
          />
        </Typography>
        <Typography
          sx={{
            wordBreak: "break-word",
            fontSize: "1.2rem",
            fontFamily: "'Roboto Mono', monospace",
            backgroundColor: "#09692630",
            padding: "10px",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          {acc.publicKey}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ShowPrivateKey;
