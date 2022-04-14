import { styled, Typography, Grid } from "@mui/material";
import Auth from "../components/Auth";
import Layout from "../components/UI/Layout";
import AuthImg from "../assets/AuthPic.png";
const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  backgroundColor: theme.palette.background.main,
  "& .logo": {
    color: "blue",
  },
}));

const Authenticate = function () {
  return (
    <Layout>
      <Wrapper>
        <Grid container>
          <Grid item sm={12}>
            <img alt="auth" src={AuthImg} style={{ width: "45%" }} />
          </Grid>
          <Grid item sm={12}>
            <Typography style={{ margin: 0 }} variant="h1">
              Authentication
            </Typography>
            <Auth />
          </Grid>
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default Authenticate;
