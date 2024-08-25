"use client";

import useSolana from "@/hooks/useSolana";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  setSelectedAcc: Dispatch<SetStateAction<string>>;
}

const SelectAccount = ({ setSelectedAcc }: Props) => {
  const [isValid, setValid] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { isValidSolanaPublicKey } = useSolana();
  const router = useRouter();

  useEffect(() => {
    setValid(isValidSolanaPublicKey(search));
  }, [search, isValidSolanaPublicKey]);

  const selected = () => {
    setSelectedAcc(search);
  };

  return (
    <>
      <Typography variant="h6">Send to</Typography>
      <TextField
        variant="outlined"
        placeholder="Enter Solana Public Key..."
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        error={!isValid && search.trim() !== ""}
        helperText={
          !isValid && search.trim() !== "" ? "Invalid Solana Public Key" : ""
        }
      />

      <Box
        component={"div"}
        display={"flex"}
        gap={"1rem"}
        sx={{ width: "100%" }}
      >
        <Button fullWidth variant="outlined" onClick={() => router.push("/")}>
          Reject
        </Button>
        <Button
          fullWidth
          variant="contained"
          disabled={!isValid}
          onClick={selected}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default SelectAccount;
