import React, { Fragment, useContext, useMemo, useState } from "react";
import {
  styled,
  Button,
  AvatarGroup,
  Avatar,
  Tooltip,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Divider from "./Divider";
import Message from "./Message";
import CheckboxMode from "./CheckboxMode";

import AppContext from "../store/AppProvider";
import { addDocument } from "../../firebase/service";
import authContext from "../store/AuthProvider";
import useFirestore from "../../hooks/useFirestore";
import MobileHeader from "./MobileHeader";
const WrapperStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  padding: "20px 20px 5px",
  boxSizing: "border-box",
}));

const HeaderStyle = styled("div")(({ theme }) => ({
  height: "55px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "left",
  "& .header": {
    "&__title": {
      fontWeight: "bold",
      color: theme.palette.text.custom.main,
      margin: "5px 0",
    },
    "&__info": {
      fontWeigh: 500,
      color: theme.palette.text.custom.light,
    },
  },
}));
const AvatarGroupStyle = styled(AvatarGroup)(({ theme }) => ({
  marginLeft: 30,
  ".MuiAvatar-root": {
    width: 30,
    height: 30,
    fontSize: 15,
  },
}));

const ChatContentStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "calc(100% - 105px)",
}));
const MessageListStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  height: "100%",
  minHeight: "0",
  overflowY: "auto",
  boxSizing: "border-box",
  padding: "20px 5px",
  border: `2px solid ${theme.palette.secondary.main}`,
}));
const FormStyle = styled("div")(({ theme }) => ({
  marginTop: 10,
  "& form": {
    display: "flex",
    alignItems: "center",
  },
  "& .MuiButton-root": {
    marginLeft: 15,
  },
}));
export default function ChatWindow() {
  const { activeRoom, members, setIsInvite } = useContext(AppContext);
  const { user } = useContext(authContext);
  const [messageInput, setMessageInput] = useState("");

  const handleSubmitMessage = function (e) {
    e.preventDefault();
    if (messageInput === "") return;
    addDocument("messages", {
      message: messageInput,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
      uid: user?.uid,
      roomId: activeRoom.id,
    });
    setMessageInput("");
  };

  const condition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: activeRoom.id,
    };
  }, [activeRoom]);

  const messages = useFirestore("messages", condition);

  return (
    <Fragment>
      <MobileHeader />
      <WrapperStyle
        component={"div"}
        sx={{
          height: {
            xs: "calc(100vh - 40px)",
            sm: "calc(100vh - 40px)",
            md: "100vh",
          },
        }}
      >
        {!activeRoom.id ? (
          <Alert severity="info">
            Select a room and start chatting — check it out!
          </Alert>
        ) : (
          <Fragment>
            <HeaderStyle className="header">
              <div>
                <p className="header__title">{activeRoom?.name}</p>
                <span className="header__info">{activeRoom?.description}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CheckboxMode
                  sx={{
                    marginRight: 2,
                    display: { xs: "none", sm: "none", md: "block" },
                  }}
                />

                <Button
                  startIcon={<PersonAddIcon />}
                  variant="contained"
                  onClick={() => setIsInvite(true)}
                >
                  Invite
                </Button>
                <AvatarGroupStyle max={3}>
                  {members.map((member) => (
                    <Tooltip key={member.uid} title={member.displayName}>
                      <Avatar src={member.photoURL}>
                        {member.displayName[0]}
                      </Avatar>
                    </Tooltip>
                  ))}
                </AvatarGroupStyle>
              </div>
            </HeaderStyle>
            <Divider />
            <ChatContentStyle component={"div"}>
              <MessageListStyle>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {messages.map((msg) => {
                    return (
                      <Message
                        key={msg.id}
                        displayName={msg.displayName}
                        photoURL={msg.photoURL}
                        message={msg.message}
                        createdAt={msg.createdAt}
                        uid={msg.uid}
                      />
                    );
                  })}
                </div>
              </MessageListStyle>

              <FormStyle>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmitMessage}
                >
                  <TextField
                    fullWidth
                    required
                    label="Type your message here"
                    id="fullWidth"
                    size="small"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    type="submit"
                    disabled={messageInput === "" ? true : false}
                  >
                    Send
                  </Button>
                </Box>
              </FormStyle>
            </ChatContentStyle>
          </Fragment>
        )}
      </WrapperStyle>
    </Fragment>
  );
}
