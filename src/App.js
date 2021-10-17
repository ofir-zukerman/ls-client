import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AppPages from "./routes/AppPages";

function App() {
  return (
    <Router>
      <div className="App">
        <AppPages />
      </div>
    </Router>
  );
}

export default App;
