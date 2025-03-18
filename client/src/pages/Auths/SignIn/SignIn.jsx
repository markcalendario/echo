import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input.jsx";
import styles from "./SignIn.module.scss";

export default function SignInPage() {
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
