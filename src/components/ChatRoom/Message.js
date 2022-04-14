import React from "react";

import { useContext } from "react";

import { styled, Avatar } from "@mui/material";
import authContext from "../store/AuthProvider";
import moment from "moment";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  marginTop: 20,
  "& .message": {
    textAlign: "left",
    marginLeft: 10,
    "&__wrapper": {
      backgroundColor: theme.palette.secondary.main,
      padding: "5px 10px",
    },
    "&__name": {
      fontWeight: "bold",
      color: theme.palette.text.custom.main,
      fontSize: 13,
    },
    "&__content": {
      color: theme.palette.text.custom.main,
      margin: 0,
      fontWeight: 500,
    },
    "&__date": {
      fontSize: 10,
      color: theme.palette.text.custom.light,
    },
  },
  "&.mine": {
    marginLeft: "auto",
    flexDirection: "row-reverse",
    "& .message": {
      textAlign: "right",
      marginRight: 10,
      "&__wrapper": {
        backgroundColor: theme.palette.primary.main,
      },
      "&__name": {
        fontWeight: "bold",
        color: theme.palette.text.custom.main,
        fontSize: 13,
      },
      "&__content": {
        color: theme.palette.text.custom.white,
        margin: 0,
        fontWeight: 500,
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-all",
      },
      "&__date": {
        fontSize: 10,
        color: theme.palette.text.custom.date,
      },
    },
  },
}));

export default function Message({
  displayName,
  createdAt,
  photoURL,
  message,
  uid,
}) {
  const { user } = useContext(authContext);
  const isMyMessage = uid === user?.uid;
  return (
    <Wrapper
      className={isMyMessage ? "mine" : ""}
      initial={{
        y: 30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      duration={0.8}
    >
      <Avatar sx={{ width: 30, height: 30 }} src={photoURL}>
        {displayName[0]}
      </Avatar>
      <div className="message">
        <span className="message__name">{displayName}</span>
        <div className="message__wrapper">
          <span className="message__date">
            {moment(createdAt?.seconds * 1000).calendar()}
          </span>
          <p className="message__content">{message}</p>
        </div>
      </div>
    </Wrapper>
  );
}
