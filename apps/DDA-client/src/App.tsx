import { Route, Routes } from "react-router-dom";
import { AuthPage, Dashboard } from "./Pages";


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
