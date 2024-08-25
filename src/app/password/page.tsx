"use client";

import wallet from "@/assets/wallet.png";
import { Account } from "@/context/types";
import useSolana from "@/hooks/useSolana";
import useWallet from "@/hooks/useWallet";
import { green } from "@/theme";
import baseApi from "@/utils/baseApi";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const {
    setSeed,
    setCurrentAccount,
    setAccounts,
    setPassword: setPasswordWallet,
  } = useWallet();
  const { createAccount, getBalance } = useSolana();
  const router = useRouter();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUnlockClick = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    try {
      const cryptVault = localStorage.getItem("cryptoVault");
      if (!cryptVault) return toast.error("User is unauthorized");
      const { data } = await baseApi.post("/api/data/decrypt", {
        cipherText: cryptVault,
        password,
      });

      const seed = data?.data?.seed;
      const savedAccounts = data?.data?.accounts;

      const newAccounts: Account[] = savedAccounts.map(
        (acc: string, idx: number) => {
          const { privateKey, publicKey } = createAccount(seed, idx);
          const createdAccount = {
            privateKey,
            publicKey,
            name: acc,
          };
          setAccounts((prev: any) => [...prev, createdAccount]);
          return createdAccount;
        }
      );

      getBalance(newAccounts[0]?.publicKey).then((balance) =>
        setCurrentAccount({ ...newAccounts[0], balance })
      );
      setPasswordWallet(password);
      setSeed(seed);
      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.error ?? error?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Paper
      component={"div"}
      sx={{
        maxWidth: "500px",
        width: "90%",
        textAlign: "center",
        borderRadius: "20px",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "45%",
        left: "50%",
        padding: "2rem",
        margin: "auto",
      }}
    >
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
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "4rem",
            sm: "5rem",
          },
        }}
      >
        Welcome Back!
      </Typography>
      <Typography fontSize={"1.6rem"} marginTop={"1rem"}>
        The decentralized web awaits
      </Typography>
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "300px",
          width: "100%",
          margin: "auto",
        }}
        onSubmit={handleUnlockClick}
      >
        <TextField
          variant="standard"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          sx={{
            margin: "2rem 0",
            width: "80%",
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
          }}
          placeholder="********"
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "100%",
          }}
          disabled={loader || !password}
        >
          {loader ? "Loading..." : "Unlock"}
        </Button>

        <Link
          href="/forgot-password"
          style={{
            color: green,
            textDecoration: "none",
          }}
        >
          Forgot Password?
        </Link>
      </Box>
    </Paper>
  );
};

export default Page;
