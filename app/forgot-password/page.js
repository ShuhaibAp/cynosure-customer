import Image from "next/image";
import Link from "next/link";
import ForgotForm from "./forgot-form";
import styles from "../login/login.module.css";

export const metadata = { title: "Forgot password — Customer Portal" };

export default function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.formSide} ${styles.solo}`}>
        <div className={styles.panel}>
          <div className={`${styles.mobileBrand} ${styles.brandShown}`}>
            <Image src="/brand-logo.png" alt="Reviens Tech" width={207} height={56} priority />
          </div>
          <span className={styles.tag}>Customer Portal</span>
          <h1 className={styles.title}>Reset your password</h1>
          <p className={styles.subtitle}>Enter your email and we will send you a link to choose a new password.</p>
          <ForgotForm />
          <p className={styles.alt}>
            <Link href="/login">Back to sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
