import React, { useContext } from "react";
import { Grid, styled, Box, Drawer } from "@mui/material";

import RoomList from "./RoomList";
import UserInfo from "./UserInfo";
import Divider from "./Divider";
import AppContext from "../store/AppProvider";

const SideBarStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  height: "100vh",
  overflowY: "scroll",
  boxSizing: "border-box",
  padding: 20,
  width: "100%",
}));

export default function SideBar() {
  const { isOpenDrawer, setIsOpenDrawer } = useContext(AppContext);
  const content = (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <UserInfo />
      </Grid>
      <Divider />
      <Grid item xs={12} sm={12}>
        <RoomList />
      </Grid>
    </Grid>
  );
  return (
    <SideBarStyled variant="permanent">
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        {content}
      </Box>
      <Drawer
        variant="temporary"
        sx={{
          display: { xs: "block", sm: "block", md: "none" },
        }}
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        PaperProps={{
          sx: { width: "80%", boxSizing: "border-box", padding: "20px" },
        }}
      >
        {content}
      </Drawer>
    </SideBarStyled>
  );
}
