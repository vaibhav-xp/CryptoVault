import { Account } from "@/context/types";
import useSolana from "@/hooks/useSolana";
import useWallet from "@/hooks/useWallet";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, IconButton, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import useFormatPublicKey from "../../../../hooks/useFormatPublicKey";
import ShowPrivateKey from "../ShowPrivateKey";

const Item = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  padding: "1.5rem 2rem",
  position: "relative",
  background: "rgba(0, 255, 0, 0.02)",
}));

const SingleAccount = ({
  acc,
  setOpen,
  setShowKeys,
}: {
  acc: Account;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setShowKeys: () => void;
}) => {
  const { currentAccount, setCurrentAccount } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const { getBalance } = useSolana();
  const { formatPublicKey } = useFormatPublicKey();

  useEffect(() => {
    if (acc?.publicKey) {
      getBalance(acc.publicKey).then((sol) => setBalance(sol));
    }
  }, [acc, getBalance]);

  const selectAccount = () => {
    setCurrentAccount({ ...acc, balance });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowKeys();
  };

  return (
    <Item onClick={selectAccount}>
      <Box
        component={"span"}
        sx={{
          position: "absolute",
          width: "2px",
          height: "100%",
          left: "1rem",
          top: 0,
          display:
            currentAccount?.publicKey === acc.publicKey ? "block" : "none",
          background: (theme) =>
            currentAccount?.publicKey === acc.publicKey
              ? theme.palette.primary.main
              : "",
        }}
      />
      <Box component={"div"}>
        <Typography variant="body1">{acc?.name}</Typography>
        <Typography variant="body2">
          {formatPublicKey(acc?.publicKey)}
        </Typography>
      </Box>
      <Box
        component={"div"}
        sx={{
          alignSelf: "start",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Typography variant="body1">{balance} Sol</Typography>
        <IconButton onClick={handleButtonClick}>
          <VisibilityOffIcon />
        </IconButton>
      </Box>
    </Item>
  );
};

export default SingleAccount;
