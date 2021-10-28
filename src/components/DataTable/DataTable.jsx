import React, { useEffect, useState } from "react";
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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import localStorageService from "../../services/localStorage.service";
import Avatar from "@material-ui/core/Avatar";
import Popup from "./Popup";
import TableComponent from "./Table/TableComponent";

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
}));

const DataTable = () => {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

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

  const onSubmitEmployee = async (newEmployee) => {
    try {
      setEmployees([...employees, newEmployee]);

      // update mongodb add new employee logic
      let respo = await axios.post(ADD_NEW_EMPOLOYEE_API, {
        data: newEmployee,
      });
      if (respo.status == 200) {
        const indx = employees.findIndex((i) => i.id == respo.data.id);
        console.log(`test ${indx}`);
        if (indx > -1) {
          console.log(`true ${indx}`);
          employees[indx] = respo.data;
          setEmployees(employees);
        } else {
          console.log(`false ${indx}`);
          setEmployees([...employees, respo.data]);
        }
      }
      setSelectedEmployee("");
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
            <Typography component="h1" variant="inherit">
              Managing Employees
            </Typography>

            <Button
              onClick={handleOpenPopup}
              style={{
                textTransform: "none",
                backgroundColor: "#656EFF",
                color: "white",
                padding: "2px 15px 2px 15px",
              }}
            >
              <AddIcon style={{ width: "15" }} />
              Add Employee
            </Button>
          </div>
          <Popup
            popupState={open}
            setPopupState={setOpen}
            onPopupClose={handleClosePopup}
            employee={selectedEmployee}
            onSubmit={onSubmitEmployee}
          />
          <TableComponent
            employees={employees}
            setSelectedEmployee={setSelectedEmployee}
            setOpen={setOpen}
            setEmployees={setEmployees}
            setError={setError}
          />
        </div>
      </Container>
    </div>
  );
};

export default DataTable;
