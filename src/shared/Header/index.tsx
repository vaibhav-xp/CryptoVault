import { green } from "@/theme";
import { Box } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      component="header"
      padding="2rem 0"
      sx={{
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "space-between",
        },
      }}
    >
      <Link
        href={"/"}
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "24px",
          color: green,
          marginBottom: "1rem",
        }}
      >
        Crypto Vault
      </Link>
    </Box>
  );
};

export default Header;
