import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import PublicRoute from "@/route-protections/PublicRoute.jsx";
import fetchAPI from "@/utils/fetch.js";
import { showErrorToast, showSuccessToast } from "@/utils/toast.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.scss";

export default function SignUpPage() {
  return (
    <PublicRoute authorizedPath="/me">
      <SignUp />
    </PublicRoute>
  );
}

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (evt) => {
    evt.preventDefault();

    const config = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    };

    const response = await fetchAPI("/auth/sign-up", config);

    if (!response.success) return showErrorToast(response.message);
    showSuccessToast(response.message);
    navigate("/");
  };

  return (
    <section className={styles.signUp}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.box}>
            <div className={styles.top}>
              <img
                src="/assets/logo/primary.svg"
                alt="echo"
              />
              <h1 className={styles.title}>Join Echo today</h1>
            </div>

            <form onSubmit={handleSignUp}>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <Input
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
              <p>
                By clicking Sign Up, you are agreeing to Echo's Terms of Service
                and are acknowledging our Privacy Notice applies.
              </p>
              <Button type="submit">Sign Up</Button>
              <a
                className={styles.signInBtn}
                href="/">
                Have an account? Sign in
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
