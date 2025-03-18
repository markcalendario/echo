import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auths/SignIn/SignIn.jsx";
import SignUpPage from "./pages/Auths/SignUp/SignUp.jsx";

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
