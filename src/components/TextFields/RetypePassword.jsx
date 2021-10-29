import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const RetypePassword = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        id="retypePassword"
        type="password"
        label="Retype Password"
        name="retypePassword"
        helperText="The passwords should be the same"
        {...props.register("retypePassword", {
          required: "This field is required.",
        })}
        type={props.showRetypePassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.handleClickShowRetypePassword}
                onMouseDown={props.handleMouseDownRetypePassword}
              >
                {props.showRetypePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
      <div>
        {props.formErrors.retypePassword && (
          <p className={classes.messageError}>
            {props.formErrors.retypePassword.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RetypePassword;
