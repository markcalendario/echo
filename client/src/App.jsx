import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login.jsx";
import SignUpPage from "./pages/Register/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
