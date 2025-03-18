import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import styles from "./SignUp.module.scss";

export default function SignUpPage() {
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
            <form>
              <Input
                id="username"
                name="username"
                placeholder="Username"
              />
              <Input
                id="email"
                name="email"
                placeholder="Email"
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <p>
                By clicking Sign Up, you are agreeing to Echo's Terms of Service
                and are acknowledging our Privacy Notice applies.
              </p>
              <Button>Sign Up</Button>
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
