import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
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
import Popup from "./Popup";

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

  button: {
    margin: theme.spacing(1),
    width: "28%",
  },
  divAddEmployeeButton: {
    display: "flex",
    justifyContent: "end",
    marginTop: "5%",
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

  tableHeader: {
    color: "gray",
  },
  popupTitle: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
}));

const DataTable = () => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const { reset } = useForm();

  const classes = useStyles();

  const handleLogOut = () => {
    window.location.href = "/";
  };

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedEmployee(null);
    setOpen(false);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);

    setOpen(true);

    //handleOpenPopup();
  };
  const handleRemoveEmployee = async (employeeId) => {
    try {
      const removedEmployee = await axios.post(DELETE_EMPLOYEE_API, {
        data: employeeId,
      });

      if (!removedEmployee)
        throw new Error(`${employeeId} didnt removed succesfully`);

      const newList = employees.filter((emp) => emp.id !== employeeId);

      setEmployees(newList);
    } catch (err) {
      setError(err.message);
    }
  };

  const onSubmitEmployee = async (newEmployee) => {
    try {
      setEmployees([...employees, newEmployee]);

      // update mongodb add new employee logic
      let respo = await axios.post(ADD_NEW_EMPOLOYEE_API, {
        data: newEmployee,
      });
      if (respo.status == 200) {
        let indx = employees.findIndex((i) => i.id == respo.data.id);
        if (indx) {
          employees[indx] = respo.data;
          setEmployees(employees);
        } else {
          setEmployees([...employees, respo.data]);
        }
      }
      reset({
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        role: "",
      });

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
    },
    {
      id: "firstName",
      label: "First Name",
      width: 150,
    },
    {
      id: "lastName",
      label: "Last Name",
      width: 150,
    },
    {
      id: "phone",
      label: "Phone",
      width: 150,
    },
    {
      id: "address",
      label: "Address",
      width: 220,
    },
    {
      id: "role",
      label: "Role",
      width: 220,
    },
    {
      id: "startDate",
      label: "Start Date",
      width: 150,
    },
    {
      id: "edit",
      width: 10,
    },
    {
      id: "remove",
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

            <Popup
              popupState={open}
              setPopupState={setOpen}
              onPopupClose={handleClosePopup}
              employee={selectedEmployee}
              onSubmit={onSubmitEmployee}
            />
          </div>

          <div className={classes.tableStyle}>
            <Paper sx={{ width: "100%" }}>
              <TableContainer sx={{ width: "100%" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {fields.map((field) => (
                        <TableCell style={{ color: "gray" }} key={field.id}>
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
                                      onClick={() =>
                                        handleEditEmployee(employee)
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
};

export default DataTable;
