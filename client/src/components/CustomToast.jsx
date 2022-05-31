import React, { useState } from "react";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomToast = (props) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const vertical="bottom";
  const horizontal="center";
  return (
    <>
      <Button display="none" onClick={handleClick}></Button>
      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.msgType} sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomToast;
