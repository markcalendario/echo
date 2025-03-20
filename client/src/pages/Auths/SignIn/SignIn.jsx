import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import PublicRoute from "@/route-protections/PublicRoute.jsx";
import fetchAPI from "@/utils/fetch.js";
import { showErrorToast, showSuccessToast } from "@/utils/toast.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";

export default function SignInPage() {
  return (
    <PublicRoute authorizedPath="/me">
      <SignIn />
    </PublicRoute>
  );
}

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (evt) => {
    evt.preventDefault();

    const config = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    };

    const response = await fetchAPI("/auth/sign-in", config);

    if (!response.success) return showErrorToast(response.message);
    showSuccessToast(response.message);
    navigate("/me");
  };
  return (
    <section className={styles.signIn}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.box}>
            <div className={styles.top}>
              <img
                src="/assets/logo/primary.svg"
                alt="echo"
              />
              <h1 className={styles.title}>Sign in to Echo</h1>
            </div>
            <form onSubmit={handleSignIn}>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button type="submit">Sign In</Button>
              <a
                className={styles.signUpBtn}
                href="/signup">
                Don't have an account? Sign up
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
