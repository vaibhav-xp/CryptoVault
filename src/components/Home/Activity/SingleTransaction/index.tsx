"use client";
import { Box, Typography } from "@mui/material";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { green, red } from "@mui/material/colors";
import styled from "styled-components";
import useWallet from "@/hooks/useWallet";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useFormatPublicKey from "@/hooks/useFormatPublicKey";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCopied from "@/hooks/useCopied";
import { MouseEventHandler } from "react";

const Item = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    background:
      "linear-gradient(45deg, rgb(39, 92, 33, 0.2), rgba(58, 96, 115, 0.2))",
  },
}));
interface TransactionProps {
  tx: any;
  setOpen: (tx: any) => void;
  selectedTransaction: any;
}

const SingleTransaction: React.FC<TransactionProps> = ({
  tx,
  selectedTransaction,
  setOpen,
}) => {
  const { currentAccount } = useWallet();
  const { copy } = useCopied();
  const { formatPublicKey } = useFormatPublicKey();
  const transaction = tx?.transaction;
  const message = transaction?.message;
  const meta = tx?.meta;

  const instructionInfo = message?.instructions?.[0]?.parsed?.info;
  const source = instructionInfo?.source?.toString();
  const destination = instructionInfo?.destination?.toString();
  const lamports = instructionInfo?.lamports;

  const type =
    currentAccount?.publicKey?.toString() === destination ? "receive" : "send";
  const amount = lamports ? lamports / 1e9 : 0;
  const balanceChange = meta?.postBalances?.[0] - meta?.preBalances?.[0];
  const balanceAfter = balanceChange / 1e9;
  const displayBalanceAfter =
    type === "receive" ? Math.abs(balanceAfter) : balanceAfter;
  const date = tx?.blockTime
    ? new Date(tx.blockTime * 1000).toLocaleString()
    : "N/A";
  const status = meta?.err ? "Failed" : "Success";
  const signature = transaction?.signatures?.[0] || "N/A";

  const handlePopup: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setOpen(tx);
  };

  const handleCopy =
    (signature: string) => (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      copy(signature);
    };

  return (
    <Item
      onClick={handlePopup}
      sx={{
        background:
          selectedTransaction?.blockTime === tx?.blockTime
            ? "linear-gradient(45deg, rgb(39, 92, 33, 0.2), rgba(58, 96, 115, 0.2))"
            : "",
      }}
    >
      <Box>
        <Typography component="span" fontSize="1.2rem" fontWeight="bold">
          {date}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            margin: ".5rem 0",
            alignItems: "center",
          }}
        >
          <Box
            component="span"
            sx={{
              width: "3rem",
              height: "3rem",
              display: "grid",
              placeContent: "center",
              borderRadius: "100%",
              backgroundColor: type === "receive" ? green[900] : red[900],
            }}
          >
            {type === "receive" ? (
              <CallReceivedIcon color="primary" />
            ) : (
              <ArrowOutwardIcon sx={{ color: "white" }} />
            )}
          </Box>
          <Box component="div">
            <Typography component="p" fontWeight="bold">
              {type === "receive" ? "Receive" : "Send"}
            </Typography>
            <Typography component="p" color="primary" fontSize="1.2rem">
              {status}
            </Typography>
          </Box>
        </Box>
        <Typography
          component="p"
          fontSize="1.2rem"
          color="textSecondary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Signature: {formatPublicKey(signature)}
          <ContentCopyIcon
            sx={{ fontSize: "1.2rem", marginLeft: ".5rem", cursor: "pointer" }}
            onClick={handleCopy(signature)}
          />
        </Typography>
      </Box>
      <Box component="div" textAlign="end" marginTop={"3rem"}>
        <Typography
          component="p"
          fontWeight="bold"
          fontSize="1.5rem"
          paddingTop="1rem"
        >
          {amount} SOL
        </Typography>
        <Typography component="p" fontSize="1.2rem">
          {displayBalanceAfter} SOL
        </Typography>
        <Typography
          component="a"
          href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: green[500],
            textDecoration: "none",
            fontSize: "1.2rem",
            marginTop: ".5rem",
            display: "inline-block",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          See on Solana Explorer...
        </Typography>
      </Box>
    </Item>
  );
};

export default SingleTransaction;
