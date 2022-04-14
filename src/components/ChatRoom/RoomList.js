import React, { useContext } from "react";

import {
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import AppContext from "../store/AppProvider";

const AccordionStyle = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  ".MuiAccordionSummary-content": {},
}));

const AccordionDetailsStyle = styled(AccordionDetails)(({ theme }) => ({
  padding: 0,
  "&:hover": {
    borderTop: `2px solid ${theme.palette.highlight.main}`,
  },
}));

const AccordionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  transition: "background-color 0.3s ease",
  justifyContent: "left",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default function RoomList() {
  const { rooms, setIsAddRoom, setActiveRoomId } = useContext(AppContext);

  return (
    <div>
      <AccordionStyle>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ fontSize: "2rem" }} />}
        >
          <Typography variant="h4" style={{ fontSize: 20 }}>
            Groups Chat
          </Typography>
        </AccordionSummary>
        {rooms.map((room) => {
          return (
            <AccordionDetailsStyle key={room.id}>
              <AccordionButton onClick={() => setActiveRoomId(room.id)}>
                {room.name}
              </AccordionButton>
            </AccordionDetailsStyle>
          );
        })}
        <AccordionDetailsStyle>
          <AccordionButton
            startIcon={<AddIcon />}
            style={{ justifyContent: "center" }}
            onClick={() => {
              setIsAddRoom(true);
            }}
          >
            Add
          </AccordionButton>
        </AccordionDetailsStyle>
      </AccordionStyle>
    </div>
  );
}
