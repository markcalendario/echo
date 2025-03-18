import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auths/SignIn/SignIn.jsx";
import SignUpPage from "./pages/Auths/SignUp/SignUp.jsx";
import Me from "./pages/Me/Me.jsx";

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
        <Route
          path="/me"
          element={<Me />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
