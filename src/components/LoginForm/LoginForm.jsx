import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { SIGNIN_USER_API } from "../../consts";
import localStorageService from "../../services/localStorage.service";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  bodyBorder: {
    border: "4px solid white",
    backgroundColor: "#F1F1F1",
  },
  topic: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15%",
  },
  loginDiv: {
    marginTop: theme.spacing(15),
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
  forgotPassword: {
    margin: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    color: "#535395",
    textDecoration: "underline",
  },
  signUpLink: {
    margin: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    fontSize: "17px",
  },
  terms: {
    margin: theme.spacing(15),
  },
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const LoginForm = () => {
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(SIGNIN_USER_API, { data });
      localStorageService.saveUser(response.data);
      history.push("/data-table");
    } catch (err) {
      setError(err.message);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.bodyBorder}>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <div>
          {error && (
            <Alert
              style={{ marginTop: "20%" }}
              severity="error"
              onClose={() => setError(false)}
            >
              You have entered invalid data, please try again.
            </Alert>
          )}
        </div>
        <Typography className={classes.topic} component="h1" variant="inherit">
          Sign In
        </Typography>

        <div className={classes.loginDiv}>
          <Avatar src="https://cdn2.iconfinder.com/data/icons/unilite-shift-human-vol-2/60/011_086_avatar_friend_add_like-512.png"></Avatar>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
            noValidate
          >
            <TextField
              variant="standard"
              margin="normal"
              fullWidth="true"
              id="email"
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              {...register("email", { required: "This field is required." })}
            ></TextField>
            {formErrors.email && (
              <span className={classes.messageError}>
                {formErrors.email.message}
              </span>
            )}
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Password"
              name="password"
              autoComplete="password"
              {...register("password", { required: "This field is required." })}
            ></TextField>
            {formErrors.password && (
              <span className={classes.messageError}>
                {formErrors.password.message}
              </span>
            )}
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

          <Grid container className={classes.signUpLink}>
            <Grid item>
              {"Don't have an account? "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Typography
            className={classes.terms}
            variant="caption"
            display="block"
            gutterBottom
          >
            <u>
              <b>Our Terms of Use and Privacy Policy</b>
            </u>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
