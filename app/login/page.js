import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import { STAGE_INFO } from "@/lib/stages";
import LoginForm from "./login-form";
import styles from "./login.module.css";

export const metadata = { title: "Sign in — Cynosure Customer Portal" };

const STEPS = ["Registration", "Inspection", "Quotation", "Pickup", "Operations", "Factory", "Final Reports"];

export default async function LoginPage({ searchParams }) {
  const user = await getUser();
  if (user) redirect("/");
  const { ready, email } = await searchParams;

  return (
    <main className={styles.page}>
      <section className={styles.aside}>
        <div className={styles.logoCard}>
          <Image src="/cynosure-logo.png" alt="Cynosure Recycling Private Limited" width={207} height={40} priority />
        </div>
        <div className={styles.pitch}>
          <h2 className={styles.headline}>Follow your e-waste order from pickup to final report.</h2>
          <p className={styles.lead}>
            See where each of your orders stands, and let us know when you have material ready for collection.
          </p>
          <ol className={styles.stages} aria-label="Order progress">
            {STEPS.map((stage) => (
              <li key={stage}>{STAGE_INFO[stage].label}</li>
            ))}
          </ol>
        </div>
        <p className={styles.asideFoot}>Cynosure Recycling Private Limited</p>
      </section>

      <section className={styles.formSide}>
        <div className={styles.panel}>
          <div className={styles.mobileBrand}>
            <Image src="/cynosure-logo.png" alt="Cynosure Recycling Private Limited" width={207} height={40} priority />
          </div>
          <span className={styles.tag}>Customer Portal</span>
          <h1 className={styles.title}>Welcome</h1>
          <p className={styles.subtitle}>Sign in to follow your orders.</p>
          {ready && (
            <div className={styles.notice} role="status">
              Your password is saved. Sign in to continue.
            </div>
          )}
          <LoginForm initialEmail={typeof email === "string" ? email : ""} />
          <p className={styles.alt}>
            <Link href="/forgot-password">Forgot your password?</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
