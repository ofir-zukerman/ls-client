import React from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Remove = (props) => {
  return (
    <TableCell key={props.fieldName}>
      <IconButton>
        <DeleteForeverOutlinedIcon
          onClick={async () =>
            await props.handleRemoveEmployee(props.employeeId)
          }
        />
      </IconButton>
    </TableCell>
  );
};

export default Remove;
