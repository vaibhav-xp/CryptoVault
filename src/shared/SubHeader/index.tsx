import useWallet from "@/hooks/useWallet";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import SelectAnAccount from "@/components/Home/SelectAccountPopup";
import useCopied from "@/hooks/useCopied";
import useFormatPublicKey from "@/hooks/useFormatPublicKey";
import { useRouter } from "next/navigation";

const SubHeader = () => {
  const router = useRouter();
  const { formatPublicKey } = useFormatPublicKey();
  const { isCopied, copy } = useCopied();
  const [toggleAccounts, setToggleAccounts] = useState(false);
  const { currentAccount, resetWallet } = useWallet();

  const handleLogout = () => {
    localStorage.removeItem("cryptoVault");
    resetWallet();
    router.push("/welcome");
  };

  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        gap: "1rem",
        borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
        background: "linear-gradient(45deg, #275c21, #3a6073)",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        color: "white",
      }}
    >
      {/* See Accounts */}
      <SelectAnAccount open={toggleAccounts} setOpen={setToggleAccounts} />

      <Button
        variant="contained"
        sx={{
          color: "white",
          display: {
            xs: "none",
            md: "block",
          },
          alignItems: "center",
          gap: "5px",
          padding: "0.5rem 1.5rem",
          background: grey[800],
          "&:hover": {
            background: grey[700],
          },
        }}
        disabled
      >
        Devnet
      </Button>

      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {currentAccount?.name && (
          <Button
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "0.5rem 1.5rem",
              marginBottom: ".5rem",
            }}
            onClick={() => setToggleAccounts(true)}
          >
            <Box
              component={"p"}
              sx={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                overflow: "hidden",
                marginRight: "8px",
              }}
            >
              <Box
                component={"img"}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIsJL3zRgUrkD3yE3lD7LK0wZWSiRyY1GVg&s"
                alt="coin-logo"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            {currentAccount?.name}
            <KeyboardArrowDownIcon />
          </Button>
        )}

        {currentAccount?.publicKey && (
          <Tooltip
            title={isCopied ? "Copied!" : "Copy"}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => copy(currentAccount?.publicKey)}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {formatPublicKey(currentAccount?.publicKey)}
              <ContentCopyIcon fontSize="small" />
            </Typography>
          </Tooltip>
        )}
      </Box>

      <Button
        variant="contained"
        color="error"
        sx={{
          color: "white",
          padding: "0.5rem 1.5rem",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Paper>
  );
};

export default SubHeader;
