import React, { useContext, useRef } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import AppContext from "../store/AppProvider";
import { addDocument } from "../../firebase/service";
import authContext from "../store/AuthProvider";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddRoomModal() {
  const { isAddRoom, setIsAddRoom } = useContext(AppContext);
  const formRef = useRef();

  const { user } = useContext(authContext);
  const handleClose = function () {
    formRef.current.reset();
    setIsAddRoom(false);
  };

  const handleSubmitForm = function (e) {
    e.preventDefault();
    const dataEntries = [...new FormData(e.target)];
    const data = Object.fromEntries(dataEntries);
    addDocument("rooms", { ...data, members: [user?.uid] });
    e.target.reset();
    setIsAddRoom(false);
  };

  return (
    <Modal open={isAddRoom} onClose={handleClose} keepMounted>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={style}
        ref={formRef}
        onSubmit={handleSubmitForm}
      >
        <TextField
          fullWidth
          label="Enter room's name"
          name="name"
          size="small"
          required
        />
        <TextField
          fullWidth
          label="Enter room's description"
          name="description"
          margin="normal"
          size="small"
          required
        />
        <div style={{ marginTop: 10, textAlign: "right" }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" sx={{ marginLeft: 2 }}>
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
