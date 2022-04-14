import { useContext, useState } from "react";
import { Tooltip, Checkbox } from "@mui/material";
import AcUnitSharpIcon from "@mui/icons-material/AcUnitSharp";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThemeContext from "../store/ThemeProvider";

const CheckboxMode = function (props) {
  const { toggleMode, theme } = useContext(ThemeContext);
  const mode = theme.palette.mode;
  const [checked, setChecked] = useState(false);

  return (
    <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
      <Checkbox
        {...props}
        checked={checked || mode === "dark"}
        onChange={(e) => {
          setChecked(e.target.checked);
          toggleMode();
        }}
        checkedIcon={<AcUnitSharpIcon color="primary" />}
        icon={<WbSunnyIcon color="primary" />}
      />
    </Tooltip>
  );
};

export default CheckboxMode;
