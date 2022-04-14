import React, { useContext, useMemo, useState } from "react";

import { db } from "../../firebase/config";
import {
  collection,
  where,
  orderBy,
  limit,
  getDocs,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import AppContext from "../store/AppProvider";
import { Avatar, Button, Typography } from "@mui/material";
import { debounce } from "lodash";
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

const DebounceSelect = function ({
  fetchOptions,
  debounceTimeout = 300,
  curMember,
  ...props
}) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setLoading(true);
      fetchOptions(value, curMember).then((newOptions) => {
        const optionInId = [...newOptions].map((option) => option.value);
        const selectedOptions = [...props.value]
          .filter((val) => !optionInId.includes(val.value))
          .map((opt) => {
            return {
              ...opt,
              isSelected: true,
            };
          });
        setOptions([...newOptions, ...selectedOptions]);
        setLoading(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMember, props.value]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Autocomplete
      {...props}
      options={options}
      loading={loading}
      onInputChange={(e, newValue) => {
        if (e.type === "change") {
          debounceFetcher(newValue);
        }
      }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Invite Friend"
          placeholder="Enter your friend's name here"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          style={option.isSelected ? { display: "none" } : null}
        >
          <Avatar sx={{ width: 30, height: 30 }} src={option.photoURL}>
            {option.label}
          </Avatar>
          <Typography sx={{ marginLeft: 1 }}>{option.label}</Typography>
        </Box>
      )}
      isOptionEqualToValue={(option, value) => {
        return option.value === value.value;
      }}
    />
  );
};

const fetchUserList = async function (value, curMember) {
  const collectionRef = collection(db, "user");
  const q = query(
    collectionRef,
    where("keywords", "array-contains", value),
    orderBy("displayName"),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  let options = [];
  querySnapshot.forEach((doc) => {
    options.push({
      value: doc.data().uid,
      label: doc.data().displayName,
      photoURL: doc.data().photoURL,
    });
  });
  const filteredOptions = options.filter(
    (opt) => !curMember.includes(opt.value)
  );
  return filteredOptions;
};

export default function InviteModal() {
  const { isInvite, setIsInvite, activeRoomId, activeRoom } =
    useContext(AppContext);
  const [value, setValue] = useState([]);
  const handleClose = function () {
    setValue([]);
    setIsInvite(false);
  };
  const handleInvite = function () {
    console.log(value);
    const roomRef = doc(db, "rooms", activeRoomId);
    updateDoc(roomRef, {
      members: [...activeRoom.members, ...value.map((val) => val.value)],
    });
    setValue([]);
    setIsInvite(false);
  };
  return (
    <Modal open={isInvite} onClose={handleClose} keepMounted>
      <Box component="div" noValidate sx={style}>
        <DebounceSelect
          multiple
          id="tags-standard"
          noOptionsText="No Friend Found"
          defaultValue={[]}
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          filterOptions={(x) => x}
          fetchOptions={fetchUserList}
          curMember={activeRoom.members ? activeRoom.members : []}
        />

        <Button
          variant="outlined"
          sx={{ display: "block", marginLeft: "auto", marginTop: 3 }}
          onClick={handleInvite}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
}
