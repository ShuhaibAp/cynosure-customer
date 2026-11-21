import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import SetPasswordForm from "./set-password-form";
import styles from "../login/login.module.css";

export const metadata = { title: "Set your password — Cynosure Customer Portal" };

async function describe(token) {
  try {
    const res = await apiFetch(`/customer-auth/invite?token=${encodeURIComponent(token)}`);
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export default async function SetPasswordPage({ searchParams }) {
  const { token } = await searchParams;
  const invite = typeof token === "string" && token ? await describe(token) : null;

  return (
    <main className={styles.page}>
      <section className={`${styles.formSide} ${styles.solo}`}>
        <div className={styles.panel}>
          <div className={`${styles.mobileBrand} ${styles.brandShown}`}>
            <Image src="/cynosure-logo.png" alt="Cynosure Recycling Private Limited" width={207} height={40} priority />
          </div>
          <span className={styles.tag}>Customer Portal</span>
          {invite ? (
            <>
              <h1 className={styles.title}>Choose your password</h1>
              <p className={styles.subtitle}>
                Hello {invite.name}. This password goes with <strong>{invite.email}</strong>.
              </p>
              <SetPasswordForm token={token} />
            </>
          ) : (
            <>
              <h1 className={styles.title}>This link has expired</h1>
              <p className={styles.subtitle}>
                The link is invalid or has already been used. Request a new one and we will email it to you.
              </p>
              <p className={styles.alt}>
                <Link href="/forgot-password">Send me a new link</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
