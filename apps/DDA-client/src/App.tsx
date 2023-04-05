import { Route, Routes } from "react-router-dom";
import AuthPage from "./Components/Pages/AuthPage";
import AllUsers from "./Components/Pages/Test";
import Dashboard from "./Components/Pages/Dashboard";

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
