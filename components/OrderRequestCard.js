"use client";

import { useActionState } from "react";
import { requestOrder } from "@/app/actions/requests";
import { formatDay } from "@/lib/stages";
import styles from "@/app/(portal)/portal.module.css";

/** "I have an order ready for pickup": tells the Cynosure team, who then register the order. */
export default function OrderRequestCard({ waiting }) {
  const [state, action, pending] = useActionState(requestOrder, undefined);

  if (waiting || state?.sent) {
    return (
      <section className={`${styles.card} ${styles.requestSent}`} role="status">
        <h2 className={styles.cardTitle}>Request received</h2>
        <p className={styles.stageText}>
          We know you have material ready{waiting ? ` (sent ${formatDay(waiting.createdAt)})` : ""}. Our team will contact
          you shortly to confirm the details and register your order.
        </p>
        {waiting?.note && <p className={styles.note}>Your note: {waiting.note}</p>}
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Have material ready for pickup?</h2>
      <p className={styles.stageText}>Let us know and our team will get in touch to arrange it.</p>
      <form action={action} className={styles.requestForm}>
        {state?.error && (
          <div className={styles.error} role="alert">
            {state.error}
          </div>
        )}
        <label className={styles.label} htmlFor="note">
          Note <span className={styles.opt}>(optional)</span>
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          maxLength={1000}
          className={styles.textarea}
          placeholder="e.g. roughly what material and how much"
        />
        <button type="submit" className={styles.primary} disabled={pending}>
          {pending ? "Sending…" : "I have an order ready"}
        </button>
      </form>
    </section>
  );
}
