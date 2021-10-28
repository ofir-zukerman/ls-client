import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { SIGNIN_USER_API } from "../../consts";
import localStorageService from "../../services/localStorage.service";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Email from "../TextFields/Email";
import Password from "../TextFields/Password";

const useStyles = makeStyles((theme) => ({
  loginDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    maxWidth: "100%",
    marginTop: "-20px",
    border: "1px solid #f1f1f1",
    background: "white",
    padding: "60px 80px 0px 80px",
  },
  submit: {
    margin: theme.spacing(3),
    maxWidth: "40%",
    display: "flex",
    justifyContent: "center",
    marginLeft: "30%",
  },
  messageError: {
    margin: "0",
    color: "red",
  },
  forgotPassword: {
    margin: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    color: "#535395",
    textDecoration: "underline",
  },
}));

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(SIGNIN_USER_API, { data });
      localStorageService.saveUser(response.data);
      history.push("/data-table");
    } catch (err) {
      props.setError(err.message);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
      >
        <Email register={register} formErrors={formErrors} />
        <Password
          register={register}
          formErrors={formErrors}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          style={{ textTransform: "none" }}
          disabled={!isDirty || !isValid}
        >
          Sign In
        </Button>
        <Typography className={classes.forgotPassword}>
          Forgot password?
        </Typography>
      </form>
    </div>
  );
};

export default Login;
