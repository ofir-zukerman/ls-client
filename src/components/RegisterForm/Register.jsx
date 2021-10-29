import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { REGISTER_USER_API } from "../../consts";
import { useHistory } from "react-router-dom";
import localStorageService from "../../services/localStorage.service";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import FirstName from "../TextFields/FirstName";
import LastName from "../TextFields/LastName";
import Email from "../TextFields/Email";
import Password from "../TextFields/Password";
import RetypePassword from "../TextFields/RetypePassword";
import { string } from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "100%",
    marginTop: "-20px",
    border: "1px solid #f1f1f1",
    background: "white",
    padding: "60px 80px 40px 80px",
  },
  passwordTypo: {
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    width: "40%",
  },
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowRetypePassword = () =>
    setShowRetypePassword(!showRetypePassword);

  const handleMouseDownRetypePassword = () =>
    setShowRetypePassword(!showRetypePassword);

  const validatePassword = (password, retypePassword) =>
    password === retypePassword;

  const validateFirstName = (firstName) => firstName;
  const validateLastName = (lastName) => lastName;

  const history = useHistory();

  const classes = useStyles();

  const onSubmit = async (data) => {
    try {
      const hasNumber = /\d/;
      const isValidPassword = validatePassword(
        data.password,
        data.retypePassword
      );

      const isVaildFirstName = validateFirstName(data.firstName);
      if (hasNumber.test(isVaildFirstName)) {
        throw new Error("First name should have only characters");
      }

      const isVaildLastName = validateLastName(data.lastName);
      if (hasNumber.test(isVaildLastName)) {
        throw new Error("Last name should have only characters");
      }

      if (!isValidPassword) {
        throw new Error("The passwords do not match");
      }

      const { retypePassword, ...userData } = data;

      const response = await axios.post(REGISTER_USER_API, {
        data: { ...userData, role: "user" },
      });
      localStorageService.saveUser(response.data);

      history.push("/data-table");
    } catch (err) {
      props.setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.divMargin}>
          <Typography variant="h6" gutterBottom component="div">
            Personal Details
          </Typography>

          <FirstName register={register} formErrors={formErrors} />
          <LastName register={register} formErrors={formErrors} />
          <Email register={register} formErrors={formErrors} />

          <Typography
            className={classes.passwordTypo}
            variant="h6"
            gutterBottom
            component="div"
          >
            Password
          </Typography>

          <Password
            register={register}
            formErrors={formErrors}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />
          <RetypePassword
            register={register}
            formErrors={formErrors}
            showRetypePassword={showRetypePassword}
            handleClickShowRetypePassword={handleClickShowRetypePassword}
            handleMouseDownRetypePassword={handleMouseDownRetypePassword}
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
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
