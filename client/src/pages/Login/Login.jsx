import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import styles from "./Login.module.scss";

export default function LoginPage() {
  return (
    <section className={styles.login}>
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
            <form>
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
              <Button>Sign In</Button>
              <a
                className={styles.signUpBtn}
                href="/register">
                Don't have an account? Sign up
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
