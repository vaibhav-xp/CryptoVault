"use client";

import MakeTransaction from "@/components/Send/MakeTransaction";
import SelectAccount from "@/components/Send/SelectAccount";
import useAuth from "@/hooks/useAuth";
import SubHeader from "@/shared/SubHeader";
import { Paper } from "@mui/material";
import { useState } from "react";

const Page = () => {
  useAuth();
  const [selectedAcc, setSelectedAcc] = useState<string>("");

  return (
    <>
      <SubHeader />
      <Paper
        component={"section"}
        sx={{
          padding: "2rem 1rem",
          overflow: "hidden",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {!selectedAcc ? (
          <SelectAccount setSelectedAcc={setSelectedAcc} />
        ) : (
          <MakeTransaction
            selectedAcc={selectedAcc}
            setSelectedAcc={() => setSelectedAcc("")}
          />
        )}
      </Paper>
    </>
  );
};

export default Page;
