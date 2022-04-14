import { Grid } from "@mui/material";
import ChatWindow from "../components/ChatRoom/ChatWindow";
import SideBar from "../components/ChatRoom/SideBar";

const ChatRoom = function () {
  console.log("chat visit");
  return (
    <Grid container style={{ overflowY: "scroll" }}>
      <Grid
        item
        md={4} //PC
        sm={0} //laptop
        xs={0} //Mobile
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <SideBar />
      </Grid>
      <Grid item md={8} sm={12} xs={12}>
        <ChatWindow />
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
