import { Button, styled } from "@mui/material";
import {
  FacebookAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";
const provider = new FacebookAuthProvider();

const ButtonAuth = styled(Button)(({ theme }) => ({
  width: "40%",
  marginBottom: 10,
}));

const Auth = function () {
  const handleFacebookLogin = async function () {
    const data = await signInWithPopup(auth, provider);
    const { user } = data;
    const additionalUserInfo = getAdditionalUserInfo(data);
    if (additionalUserInfo.isNewUser) {
      addDocument("user", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: data.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ButtonAuth variant="contained" onClick={handleFacebookLogin}>
        Sign in with Facebook
      </ButtonAuth>
      <ButtonAuth variant="contained">Sign in with Google</ButtonAuth>
    </div>
  );
};

export default Auth;
