import React from "react";
import Alert from "@material-ui/lab/Alert";

const AlertError = (props) => {
  return (
    <div>
      {props.error && (
        <Alert
          style={{ marginTop: "20%" }}
          severity="error"
          onClose={() => props.setError(false)}
        >
          {props.error}
        </Alert>
      )}
    </div>
  );
};

export default AlertError;
