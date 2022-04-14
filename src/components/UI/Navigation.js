import { useContext } from "react";
import { Avatar, Button, styled, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import authContext from "../store/AuthProvider";
const NavigationWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.main,
  padding: "5px 10px",
  height: 80,
  ".navigation": {
    "&__logo": {
      display: "flex",
      alignItems: "center",
      marginRight: 40,
    },
    "&__auth": {
      display: "flex",
      padding: 0,
      alignItems: "center",
      marginLeft: "auto",
      li: {
        marginLeft: 20,
      },
      "& .avatar": {
        display: "flex",
        alignItems: "center",
      },
    },
  },
}));

const Navigation = function () {
  const authCtx = useContext(authContext);
  const { user } = authCtx;
  return (
    <NavigationWrapper>
      <Link
        component={RouterLink}
        to="/"
        className="navigation__logo"
        underline="none"
      >
        <ChatRoundedIcon color="primary" style={{ fontSize: 40 }} />
        <Typography variant="h4" color="primary">
          FunChat
        </Typography>
      </Link>
      <ul className="navigation__auth">
        {authCtx.user && (
          <li className="avatar">
            <Typography style={{ marginRight: 10 }}>
              {user.displayName}
            </Typography>
            <Avatar alt={user.displayName} src={user.photoURL}>
              {user.displayName[0]}
            </Avatar>
          </li>
        )}
        {!authCtx.user && (
          <li className="sign">
            <Link component={RouterLink} to="/auth">
              <Button
                className="sign"
                variant="contained"
                color="primary"
                style={{ borderRadius: "20px" }}
              >
                Sign In
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </NavigationWrapper>
  );
};

export default Navigation;
