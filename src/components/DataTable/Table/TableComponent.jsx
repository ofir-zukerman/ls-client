import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Edit from "./Edit";
import Remove from "./Remove";
import axios from "axios";
import { DELETE_EMPLOYEE_API } from "../../../consts";
import FirstNameIcon from "./FirstNameIcon";

const useStyles = makeStyles((theme) => ({
  tableStyle: {
    marginTop: "5%",
    marginBottom: "5%",
    width: "100%",
    backgroundColor: "white",
  },
}));

const TableComponent = (props) => {
  const classes = useStyles();

  const handleEditEmployee = (employee) => {
    props.setSelectedEmployee(employee);

    props.setOpen(true);
  };

  const handleRemoveEmployee = async (employeeId) => {
    try {
      const removedEmployee = await axios.post(DELETE_EMPLOYEE_API, {
        data: employeeId,
      });

      if (!removedEmployee)
        throw new Error(`${employeeId} didnt removed succesfully`);

      const newList = props.employees.filter((emp) => emp.id !== employeeId);

      props.setEmployees(newList);
    } catch (err) {
      props.setError(err.message);
    }
  };

  const fields = [
    {
      id: "avatar",
    },
    {
      id: "firstName",
      label: "First Name",
    },
    {
      id: "lastName",
      label: "Last Name",
    },
    {
      id: "phone",
      label: "Phone",
    },
    {
      id: "address",
      label: "Address",
    },
    {
      id: "role",
      label: "Role",
    },
    {
      id: "startDate",
      label: "Start Date",
    },
    {
      id: "edit",
    },
    {
      id: "remove",
    },
  ];
  return (
    <div className={classes.tableStyle}>
      <Paper className={classes.paper}>
        <TableContainer sx={{ width: "100%" }}>
          <Table>
            <Header fields={fields} />
            <TableBody>
              {props.employees.map((employee) => {
                const { id: employeeId } = employee;

                return (
                  <TableRow hover key={employeeId}>
                    {fields.map(({ id: fieldName }) => {
                      const value = employee[fieldName];

                      if (fieldName === "edit") {
                        return (
                          <Edit
                            fieldName={fieldName}
                            employee={employee}
                            handleEditEmployee={handleEditEmployee}
                          />
                        );
                      } else if (fieldName === "remove") {
                        return (
                          <Remove
                            handleRemoveEmployee={handleRemoveEmployee}
                            fieldName={fieldName}
                            employeeId={employeeId}
                          />
                        );
                      } else if (fieldName === "avatar") {
                        return (
                          <FirstNameIcon
                            fieldName={fieldName}
                            employeeFirstName={employee.firstName}
                          />
                        );
                      } else {
                        return <TableCell key={fieldName}>{value}</TableCell>;
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
  );
};

export default TableComponent;
