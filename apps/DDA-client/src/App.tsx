import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import AllUsers from "./Pages/Test";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
