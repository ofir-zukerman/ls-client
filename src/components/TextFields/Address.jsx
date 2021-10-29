import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const Address = (props) => {
  const classes = useStyles(props);
  return (
    <div>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        id="address"
        type="address"
        label="Address"
        name="address"
        autoComplete="address"
        {...props.register("address", {
          required: "This field is required.",
        })}
      ></TextField>
      <div>
        {props.formErrors.address && (
          <span className={classes.messageError}>
            {props.formErrors.address.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Address;
