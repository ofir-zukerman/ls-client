import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";

import {
  DATATABLE_EMPLOYEE_API,
  ADD_NEW_EMPOLOYEE_API,
  DELETE_EMPLOYEE_API,
} from "../../consts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import localStorageService from "../../services/localStorage.service";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(5),
  },
}));

const useStyles = makeStyles((theme) => ({
  bodyBorder: {
    border: "4px solid white",
    backgroundColor: "#F1F1F1",
  },
  navbar: {
    boxShadow: "none",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15%",
    width: "100%",
  },
  tableStyle: {
    height: 600,
    marginTop: "5%",
    marginBottom: "5%",
    width: "100%",
    backgroundColor: "white",
    "& .headers": {
      color: "#539595",
      display: "block",
      width: "100%",
      backgroundColor: "white",
      fontSize: "90%",
    },
  },
  divButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5%",
  },
  button: {
    margin: theme.spacing(1),
    width: "28%",
  },
  divAddEmployeeButton: {
    display: "flex",
    justifyContent: "end",
    marginTop: "5%",
  },
  popupTitle: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  userStatus: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  avatarNavbar: {
    marginRight: "40%",
  },
  iconNavbar: {
    marginTop: "5px",
  },
  messageError: {
    margin: "0",
    color: "red",
  },
}));

export default function DataTable() {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const roles = ["HR", "Devops", "Software Engineer", "QA"];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const classes = useStyles();

  const handleLogOut = () => {
    window.location.href = "/";
  };

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };

  const handleEditEmployee = async (employeeId) => {
    handleOpenPopup();
  };

  const handleRemoveEmployee = async (employeeId) => {
    try {
      const removedEmployee = await axios.post(DELETE_EMPLOYEE_API, {
        data: employeeId,
      });

      if (!removedEmployee)
        throw new Error(`${employeeId} didnt removed succesfully`);

      const newList = employees.filter((id) => id !== employeeId);

      setEmployees([...newList]);
    } catch (err) {
      setError(err.message);
    }
  };

  const onSubmitNewEmployee = async (newEmployee) => {
    try {
      setLoading(true);

      newEmployee.startDate = new Date().toDateString();
      newEmployee.id = uuidv4();

      setEmployees([...employees, newEmployee]);

      // update mongodb add new employee logic
      await axios.post(ADD_NEW_EMPOLOYEE_API, { data: newEmployee });

      reset({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        role: "",
      });

      setLoading(false);
      setOpen(!open);
    } catch (err) {
      setError(err.message);
    }
  };

  const getEmployees = async () => {
    try {
      setLoading(true);

      const userData = localStorageService.getUser();
      const { data } = await axios.get(DATATABLE_EMPLOYEE_API);

      setEmployees(data);
      setUser(userData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Get Data From Server Error!</div>;

  if (!user) window.location.href = "/";

  const fields = [
    {
      id: "avatar",
      headerClassName: "headers",
    },
    {
      id: "firstName",
      label: "First Name",
      headerClassName: "headers",
      width: 150,
    },
    {
      id: "lastName",
      label: "Last Name",
      headerClassName: "headers",
      width: 150,
    },
    {
      id: "phone",
      label: "Phone",
      headerClassName: "headers",
      width: 150,
    },
    {
      id: "address",
      label: "Address",
      headerClassName: "headers",
      width: 220,
    },
    {
      id: "role",
      label: "Role",
      headerClassName: "headers",
      width: 220,
    },
    {
      id: "startDate",
      label: "Start Date",
      headerClassName: "headers",
      width: 150,
    },
    {
      id: "edit",
      headerClassName: "headers",
      width: 10,
    },
    {
      id: "remove",
      headerClassName: "headers",
      width: 10,
    },
  ];

  return (
    <div className={classes.bodyBorder}>
      <AppBar position="fixed" style={{ boxShadow: "none" }}>
        <Toolbar variant="dense" className={classes.navbar}>
          <img
            height="50px"
            alt="LS-Technology"
            src="https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.6435-9/67440699_447990479132665_1473312299518263296_n.png?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tIyTSALWSRUAX-_gdL8&_nc_ht=scontent.ftlv6-1.fna&oh=6f4c9d34b7b322faa31693cb4ede52a6&oe=61818903"
          />
          <div className={classes.userStatus}>
            <div className={classes.avatarNavbar}>
              <Avatar>{user.firstName}</Avatar>
            </div>
            <div>
              <LogoutIcon
                onClick={handleLogOut}
                style={{ color: "black", marginTop: "7px" }}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg">
        <div>
          <div className={classes.header}>
            <Typography
              className={classes.topic}
              component="h1"
              variant="inherit"
            >
              Managing Employees
            </Typography>

            <div>
              <div className={classes.divAddEmployeeButton}>
                <Button
                  variant="outlined"
                  onClick={handleOpenPopup}
                  style={{
                    textTransform: "none",
                    backgroundColor: "#656EFF",
                    color: "white",
                    paddingInline: "20px",
                  }}
                >
                  <AddIcon style={{ width: "15" }} />
                  Add Employee
                </Button>
              </div>
            </div>
            <BootstrapDialog
              onClose={handleClosePopup}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogContent dividers>
                <Container maxWidth="sm">
                  <form onSubmit={handleSubmit(onSubmitNewEmployee)} noValidate>
                    <Container maxWidth="sm">
                      <div className={classes.popupTitle}>
                        <Typography variant="h6" gutterBottom component="div">
                          Add Employee
                        </Typography>
                        <IconButton>
                          <CloseIcon onClick={handleClosePopup} />
                        </IconButton>
                      </div>

                      <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="firstName"
                        type="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        {...register("firstName", {
                          required: "This field is required.",
                        })}
                      ></TextField>
                      {formErrors.firstName && (
                        <span className={classes.messageError}>
                          {formErrors.firstName.message}
                        </span>
                      )}
                      <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="lastName"
                        type="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        {...register("lastName", {
                          required: "This field is required.",
                        })}
                      ></TextField>
                      {formErrors.lastName && (
                        <span className={classes.messageError}>
                          {formErrors.lastName.message}
                        </span>
                      )}
                      <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="phone"
                        type="number"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                        {...register("phone", {
                          required: "This field is required.",
                        })}
                      ></TextField>
                      {formErrors.phone && (
                        <span className={classes.messageError}>
                          {formErrors.phone.message}
                        </span>
                      )}
                      <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="address"
                        type="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                        {...register("address", {
                          required: "This field is required.",
                        })}
                      ></TextField>
                      {formErrors.address && (
                        <span className={classes.messageError}>
                          {formErrors.address.message}
                        </span>
                      )}
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          defaultValue={role}
                          onChange={handleSelectChange}
                          label="Role"
                          {...register("role", {
                            required: "This field is required.",
                          })}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {roles.map((roleSelect) => (
                            <MenuItem value={roleSelect}>{roleSelect}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {formErrors.role && (
                        <span className={classes.messageError}>
                          {formErrors.role.message}
                        </span>
                      )}
                      <div className={classes.divButton}>
                        <Button
                          className={classes.button}
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ textTransform: "none" }}
                          disabled={!isDirty || !isValid}
                        >
                          Add
                        </Button>
                      </div>
                    </Container>
                  </form>
                </Container>
              </DialogContent>
            </BootstrapDialog>
          </div>

          <div className={classes.tableStyle}>
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {fields.map((field) => (
                        <TableCell
                          key={field.id}
                          style={{ top: 57, minWidth: field.minWidth }}
                        >
                          {field.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((employee) => {
                      const { id: employeeId } = employee;

                      return (
                        <TableRow hover key={employeeId}>
                          {fields.map(({ id: fieldName }) => {
                            const value = employee[fieldName];

                            if (fieldName === "edit") {
                              return (
                                <TableCell key={fieldName}>
                                  <IconButton>
                                    <EditOutlinedIcon
                                      onClick={async () =>
                                        await handleEditEmployee(employeeId)
                                      }
                                    />
                                  </IconButton>
                                </TableCell>
                              );
                            } else if (fieldName === "remove") {
                              return (
                                <TableCell key={fieldName}>
                                  <IconButton>
                                    <DeleteForeverOutlinedIcon
                                      onClick={async () =>
                                        await handleRemoveEmployee(employeeId)
                                      }
                                    />
                                  </IconButton>
                                </TableCell>
                              );
                            } else if (fieldName === "avatar") {
                              return (
                                <TableCell key={fieldName}>
                                  <Avatar />
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={fieldName}>{value}</TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </Container>
    </div>
  );
}
