"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/app/actions/auth";
import styles from "../login/login.module.css";

export default function ForgotForm() {
  const [state, action, pending] = useActionState(forgotPassword, undefined);

  if (state?.sent) {
    return (
      <p className={styles.sent} role="status">
        If <strong>{state.email}</strong> has a customer account, a reset link is on its way. It stays valid for 7 days.
      </p>
    );
  }

  return (
    <form action={action} className={styles.form} noValidate>
      {state?.error && (
        <div className={styles.error} role="alert">
          {state.error}
        </div>
      )}
      <label className={styles.field}>
        <span className={styles.label}>Email address</span>
        <input
          className={styles.input}
          name="email"
          type="email"
          autoComplete="username"
          placeholder="you@company.com"
          defaultValue={state?.email ?? ""}
          autoFocus
          required
        />
      </label>
      <button className={styles.button} type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
