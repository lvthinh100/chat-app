import React, { createContext, useContext, useState, useMemo } from "react";
import useFirestore from "../../hooks/useFirestore";
import authContext from "./AuthProvider";

const AppContext = createContext();
export function AppProvider(props) {
  const { user } = useContext(authContext);
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState("");
  const roomCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user?.uid,
    };
  }, [user]);
  const rooms = useFirestore("rooms", roomCondition);

  const activeRoom = useMemo(() => {
    return rooms.find((room) => room.id === activeRoomId) || {};
  }, [rooms, activeRoomId]);

  const userCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: activeRoom?.members,
    };
  }, [activeRoom]);

  const members = useFirestore("user", userCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoom,
        setIsAddRoom,
        activeRoomId,
        setActiveRoomId,
        activeRoom,
        members,
        isInvite,
        setIsInvite,
        isOpenDrawer,
        setIsOpenDrawer,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
