import React, { useContext } from "react";

import { Box, styled, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CheckboxMode from "./CheckboxMode";
import AppContext from "../store/AppProvider";

const HeaderStyle = styled(Box)(({ theme }) => ({
  height: "40px",
  backgroundColor: theme.palette.secondary.main,
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
}));

export default function MobileHeader() {
  const { setIsOpenDrawer } = useContext(AppContext);
  return (
    <HeaderStyle
      component={"div"}
      sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
    >
      <IconButton onClick={() => setIsOpenDrawer(true)}>
        <MenuIcon color="primary" />
      </IconButton>
      <CheckboxMode />
    </HeaderStyle>
  );
}
