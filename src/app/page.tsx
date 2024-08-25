"use client";

import Activity from "@/components/Home/Activity";
import useAuth from "@/hooks/useAuth";
import useWallet from "@/hooks/useWallet";
import SubHeader from "@/shared/SubHeader";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { TabContext } from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  IconButton,
  Paper,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const CustomTabPanel = styled(TabPanel)((theme) => ({
  padding: "1rem",
}));

const Page = () => {
  useAuth();
  const router = useRouter();
  const [value, setValue] = useState("activity");
  const { currentAccount } = useWallet();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper
      component={"section"}
      sx={{
        padding: "0",
        borderRadius: "15px",
        overflow: "hidden",
        marginBottom: "2rem",
      }}
    >
      <SubHeader />
      <Box component={"div"} paddingX={"1rem"} paddingTop={"3rem"}>
        <Typography variant="h4" textAlign={"center"}>
          {currentAccount?.balance} Sol
        </Typography>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            margin: "2rem 0",
          }}
        >
          <IconButton
            sx={{
              color: (theme) => theme.palette.primary.main,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            }}
            onClick={() => router.push("/send")}
          >
            <CallMadeIcon fontSize="small" />
          </IconButton>
          Send
        </Box>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab value="activity" label="Activity" />
            {/* <Tab value="nft" label="NFT" /> */}
          </Tabs>
          <CustomTabPanel value="activity">
            <Activity />
          </CustomTabPanel>
          <CustomTabPanel value="nft">Coming Soon...</CustomTabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
};

export default Page;
