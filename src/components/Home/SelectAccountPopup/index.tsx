// src/components/Home/SelectAccountPopup/index.tsx
import { Account } from "@/context/types";
import useSolana from "@/hooks/useSolana";
import useWallet from "@/hooks/useWallet";
import baseApi from "@/utils/baseApi";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SingleAccount from "./SingleAccount";
import ShowPrivateKey from "./ShowPrivateKey";

interface NewData {
  password: string;
  seed: string;
  accounts: string[];
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SelectAnAccount = ({ open, setOpen }: Props) => {
  const paperRef = useRef<HTMLDivElement>(null);
  const [showKeys, setShowKeys] = useState<Account | null>(null);
  const {
    accounts,
    setAccounts,
    seed,
    password,
    setCurrentAccount,
    setPassword,
  } = useWallet();
  const { createAccount, getBalance } = useSolana();

  const saveData = async () => {
    try {
      const account = createAccount(seed);
      if (!account) return toast.error("Unable to create an account");

      const newData: NewData = {
        password,
        seed,
        accounts: [],
      };
      newData.accounts = accounts.map((acc) => acc.name);
      newData.accounts.push(`Account ${accounts.length + 1}`);

      const response = await baseApi.post("/api/data/encrypt", newData);
      localStorage.setItem("cryptoVault", response?.data?.data?.encryptedData);

      const newAccount: Account = {
        privateKey: account.privateKey,
        publicKey: account.publicKey,
        name: `Account ${accounts.length + 1}`,
      };
      setAccounts((prev) => [...prev, newAccount]);
      getBalance(newAccount.publicKey).then((balance) =>
        setCurrentAccount({ ...newAccount, balance })
      );
      setPassword(password);
      toast.success("Account created successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paperRef.current &&
        !paperRef.current.contains(event.target as Node) &&
        !showKeys
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, showKeys, setOpen]);

  return (
    <Paper
      ref={paperRef}
      sx={{
        display: open ? "block" : "none",
        width: {
          xs: "92%",
          sm: "400px",
        },
        boxShadow: "20",
        position: "fixed",
        padding: "1rem 0",
        zIndex: "9999",
        transform: "translateX(-50%)",
        top: "9%",
        left: "50%",
        borderRadius: "15px",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 3,
          right: 3,
        }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon color="primary" />
      </IconButton>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        textAlign={"center"}
        sx={{ margin: "1rem 0" }}
      >
        Select an account
      </Typography>
      <Stack divider={<Divider orientation="horizontal" />}>
        {accounts.map((acc) => (
          <SingleAccount
            key={acc.publicKey}
            acc={acc}
            setOpen={setOpen}
            setShowKeys={() => setShowKeys(acc)}
          />
        ))}
      </Stack>

      {showKeys && (
        <ShowPrivateKey acc={showKeys} closeKeys={() => setShowKeys(null)} />
      )}
      <Box component={"div"} display={"grid"} justifyContent={"center"}>
        <Button
          sx={{ margin: "1rem auto" }}
          variant="contained"
          onClick={saveData}
        >
          + Add account
        </Button>
      </Box>
    </Paper>
  );
};

export default SelectAnAccount;
