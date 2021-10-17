import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import DataTable from "../components/DataTable/DataTable";
import { Switch, Route } from "react-router-dom";

function AppPages() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <LoginForm {...props} />} />
      <Route
        exact
        path="/register"
        render={(props) => <RegisterForm {...props} />}
      />
      <Route
        exact
        path="/data-table"
        render={(props) => <DataTable {...props} />}
      />
    </Switch>
  );
}

export default AppPages;
