import React from "react";
import { Divider as ReactDivider, styled } from "@mui/material";

const DividerStyle = styled(ReactDivider)(({ theme }) => ({
  width: "100%",
  fontWeigh: 900,
  background: theme.palette.secondary.dark,
  margin: "20px 0",
}));

export default function Divider() {
  return <DividerStyle variant="middle" sx={{ borderBottomWidth: 2 }} />;
}
