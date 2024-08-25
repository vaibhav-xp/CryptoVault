import useSolana from "@/hooks/useSolana";
import useWallet from "@/hooks/useWallet";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const MakeTransaction = ({
  selectedAcc,
  setSelectedAcc,
}: {
  selectedAcc: string;
  setSelectedAcc: () => void;
}) => {
  const { currentAccount, setCurrentAccount } = useWallet();
  const { sendTransaction, getBalance } = useSolana();
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setProcessing] = useState<boolean>(false);

  const balance = currentAccount?.balance ?? 0;
  const isAmountValid = parseFloat(amount) <= balance;

  const handleSend = async () => {
    if (!isAmountValid || !currentAccount?.privateKey) return;

    try {
      setProcessing(true);
      const transactionId = await sendTransaction(
        selectedAcc,
        parseFloat(amount),
        currentAccount.privateKey
      );
      if (transactionId) {
        toast.success(`Transaction successful with ID: ${transactionId}`);

        // Fetch the updated balance
        const updatedBalance = await getBalance(currentAccount.publicKey);

        // Update the current account's balance
        setCurrentAccount((prev) => ({
          ...prev,
          balance: updatedBalance,
        }));

        setProcessing(false);
        setSelectedAcc();
      }
    } catch (error: any) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed");
      setProcessing(false);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Send SOL
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={selectedAcc}
        disabled={true}
        label="Recipient Public Key"
        sx={{
          "& .MuiOutlinedInput-input": {
            fontSize: "1.2rem",
          },
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderColor: isAmountValid ? "green" : "red",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isAmountValid ? "green" : "red",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: isAmountValid ? "green" : "red",
            },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "1.4rem",
          },
        }}
      />
      <Typography variant="body1" sx={{ marginTop: "0.5rem", width: "100%" }}>
        <b>From:</b> {currentAccount?.name || "Unknown Account"} <br />
        <b>Balance:</b> {balance} SOL
      </Typography>
      <Box
        component={"div"}
        display={"flex"}
        gap={"1rem"}
        sx={{ width: "100%" }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setSelectedAcc()}
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button
          fullWidth
          variant="contained"
          disabled={!isAmountValid || isProcessing}
          onClick={handleSend}
        >
          {isProcessing ? "Processing..." : "Next"}
        </Button>
      </Box>
    </>
  );
};

export default MakeTransaction;
