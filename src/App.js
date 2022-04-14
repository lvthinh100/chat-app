import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AddRoomModal from "./components/UI/AddRoomModal";
import InviteModal from "./components/UI/InviteModal";
import NotFound from "./pages/NotFound";
import { Fragment, useContext } from "react";
import authContext from "./components/store/AuthProvider";
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Authenticate = lazy(() => import("./pages/Authenticate"));
const ChatRoom = lazy(() => import("./pages/ChatRoom"));

function App() {
  const authCtx = useContext(authContext);
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Suspense fallback={<p>Loading content...</p>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth"
            element={
              <Fragment>
                {!authCtx.user && <Authenticate />}
                {authCtx.user && <Navigate to="/" />}
              </Fragment>
            }
          />
          <Route
            path="/chat"
            element={
              <Fragment>
                {authCtx.user && <ChatRoom />}
                {!authCtx.user && <Navigate to="/auth" />}
              </Fragment>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <AddRoomModal />
      <InviteModal />
    </div>
  );
}

export default App;
