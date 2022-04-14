import { Typography, styled, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import LandingPicture from "../assets/LandingPicture.png";
import Layout from "../components/UI/Layout";
import "@fontsource/roboto";
const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  height: "100vh",
  textAlign: "center",
}));

const LandingPage = function () {
  return (
    <Layout>
      <Wrapper>
        <Typography variant="h2" style={{ fontWeight: 900 }}>
          Connect, Grow and <br />
          Inspired.
        </Typography>
        <Typography variant="subtitle1">
          Contact with your friend from everywhere
        </Typography>
        <Link component={RouterLink} to="/chat" underline="none">
          <Button
            variant="contained"
            style={{
              borderRadius: 20,
              margin: "20px 0",
              padding: "10px 15px",
              fontWeight: 700,
            }}
          >
            Chat Now
          </Button>
        </Link>
        <br />
        <img alt="Landing" src={LandingPicture} style={{ width: "35%" }} />
      </Wrapper>
    </Layout>
  );
};

export default LandingPage;
