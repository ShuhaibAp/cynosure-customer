"use client";

import { useActionState } from "react";
import { setPassword } from "@/app/actions/auth";
import styles from "../login/login.module.css";

export default function SetPasswordForm({ token }) {
  const [state, action, pending] = useActionState(setPassword.bind(null, token), undefined);

  return (
    <form action={action} className={styles.form} noValidate>
      {state?.error && (
        <div className={styles.error} role="alert">
          {state.error}
        </div>
      )}
      <label className={styles.field}>
        <span className={styles.label}>New password</span>
        <input
          className={styles.input}
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          minLength={8}
          autoFocus
          required
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Confirm password</span>
        <input
          className={styles.input}
          name="confirm"
          type="password"
          autoComplete="new-password"
          placeholder="Type it again"
          required
        />
      </label>
      <button className={styles.button} type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save password"}
      </button>
    </form>
  );
}
