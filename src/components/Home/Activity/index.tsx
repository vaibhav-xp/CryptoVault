"use client";
import React, { useEffect, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import SingleTransaction from "./SingleTransaction";
import useSolana from "@/hooks/useSolana";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import useWallet from "@/hooks/useWallet";
import TransactionDetails from "./TransactionDetails";

const Activity = () => {
  const [transaction, setTransaction] = useState<any>(null);
  const { currentAccount } = useWallet();
  const { getTransactions } = useSolana();
  const [transactions, setTransactions] = useState<ParsedTransactionWithMeta[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (currentAccount?.publicKey) {
        const fetchedTransactions = await getTransactions(
          currentAccount.publicKey
        );
        setTransactions(fetchedTransactions);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentAccount?.publicKey]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {transaction && (
        <TransactionDetails
          setOpen={setTransaction}
          transaction={transaction}
        />
      )}
      <Stack divider={<Divider orientation="horizontal" />} spacing={1}>
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <SingleTransaction
              key={index}
              tx={tx}
              selectedTransaction={transaction}
              setOpen={() => setTransaction(tx)}
            />
          ))
        ) : (
          <Typography>No transactions found.</Typography>
        )}
      </Stack>
    </>
  );
};

export default Activity;
