import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { Typography, Avatar, styled, Button } from "@mui/material";
import authContext from "../store/AuthProvider";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 55,
}));

export default function UserInfo() {
  const authCtx = React.useContext(authContext);
  const navigate = useNavigate();
  const { user } = authCtx;
  return (
    <Wrapper>
      <Link component={RouterLink} underline="none" to="/">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={user?.displayName} src={user?.photoURL}>
            {user?.displayName[0]}
          </Avatar>
          <Typography style={{ marginLeft: 10 }}>
            {user?.displayName}
          </Typography>
        </div>
      </Link>
      <Button
        variant="contained"
        onClick={() => {
          authCtx.logout();
          navigate("/");
        }}
      >
        Đăng xuất
      </Button>
    </Wrapper>
  );
}
