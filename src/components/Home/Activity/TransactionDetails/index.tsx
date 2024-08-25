"use client";

import { Box, IconButton, Paper, Typography, Link } from "@mui/material";
import React, { Dispatch, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useCopied from "@/hooks/useCopied";
import useFormatPublicKey from "@/hooks/useFormatPublicKey";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface Props {
  transaction: any;
  setOpen: Dispatch<any>;
}

const TransactionDetails = ({ transaction, setOpen }: Props) => {
  const { transaction: tx, meta } = transaction;
  const { copy } = useCopied();
  const { formatPublicKey } = useFormatPublicKey();
  const message = tx?.message;

  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <Paper
      ref={popupRef}
      sx={{
        maxWidth: "400px",
        width: "100%",
        position: "fixed",
        padding: "1rem",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "10",
      }}
      elevation={5}
    >
      <Typography variant="h6" color={"primary"} sx={{ position: "relative" }}>
        Transaction Details
        <IconButton
          sx={{
            position: "absolute",
            top: -8,
            right: -8,
          }}
          onClick={() => setOpen(null)}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"span"}>Date:</Typography>
        {tx?.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : "N/A"}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"span"}>Status:</Typography>
        {meta?.err ? "Failed" : "Success"}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"span"}>Source:</Typography>
        <Box component={"div"} sx={{ display: "flex", alignItems: "center" }}>
          {formatPublicKey(message?.accountKeys[0].pubkey.toString())}
          <ContentCopyIcon
            sx={{ fontSize: "1.2rem", marginLeft: ".5rem", cursor: "pointer" }}
            onClick={() => copy(message?.accountKeys[0].pubkey.toString())}
          />
        </Box>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"span"}>Destination:</Typography>
        <Box component={"div"} sx={{ display: "flex", alignItems: "center" }}>
          {formatPublicKey(message?.accountKeys[1].pubkey.toString())}
          <ContentCopyIcon
            sx={{ fontSize: "1.2rem", marginLeft: ".5rem", cursor: "pointer" }}
            onClick={() => copy(message?.accountKeys[1].pubkey.toString())}
          />
        </Box>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"span"}>Amount:</Typography>
        {message?.instructions?.[0]?.parsed?.info?.lamports / 1e9} SOL
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"span"}>Fee:</Typography>
        {meta?.fee ? meta.fee / 1e9 : "N/A"} SOL
      </Typography>

      <Typography
        variant="body2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component={"span"}>Signature:</Typography>
        <Box component={"div"} sx={{ display: "flex", alignItems: "center" }}>
          {formatPublicKey(tx?.signatures?.[0])}
          <ContentCopyIcon
            sx={{ fontSize: "1.2rem", marginLeft: ".5rem", cursor: "pointer" }}
            onClick={() => copy(tx?.signatures?.[0])}
          />
        </Box>
      </Typography>

      <Link
        href={`https://explorer.solana.com/tx/${tx?.signatures?.[0]}?cluster=devnet`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          marginTop: "1rem",
          fontSize: "1.3rem",
          display: "block",
          textAlign: "center",
          color: "primary.main",
          textDecoration: "none",
        }}
      >
        View on Solana Explorer
      </Link>
    </Paper>
  );
};

export default TransactionDetails;
