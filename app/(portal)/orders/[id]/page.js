import Link from "next/link";
import StatusPill from "@/components/StatusPill";
import { getOrder } from "@/lib/orders";
import { formatDay, STAGE_INFO } from "@/lib/stages";
import styles from "../../portal.module.css";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const order = await getOrder(id);
  return { title: `${order.poNumber} — Cynosure Customer Portal` };
}

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);
  const rejected = order.status === "Rejected";
  const current = order.stages.indexOf(order.status);
  const info = STAGE_INFO[order.status];

  return (
    <>
      <Link href="/" className={styles.back}>
        ← All orders
      </Link>
      <div className={styles.pageHead}>
        <div className={styles.titleRow}>
          <h1 className={styles.h1}>{order.poNumber}</h1>
          <StatusPill status={order.status} />
        </div>
        <p className={styles.sub}>
          {order.serviceType} · Registered {formatDay(order.createdAt)} · Updated {formatDay(order.updatedAt)}
        </p>
      </div>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Where your order is</h2>
        <p className={styles.stageText}>{info?.text}</p>
        {!rejected && (
          <ol className={styles.steps} aria-label="Order progress">
            {order.stages.map((stage, i) => {
              const state = i < current ? "done" : i === current ? "now" : "todo";
              return (
                <li key={stage} className={`${styles.step} ${styles[state]}`} aria-current={state === "now" ? "step" : undefined}>
                  <span className={styles.dot} aria-hidden="true">
                    {state === "done" ? "✓" : i + 1}
                  </span>
                  <span className={styles.stepLabel}>{STAGE_INFO[stage].label}</span>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Contact details on this order</h2>
        <dl className={styles.details}>
          <div>
            <dt>Name</dt>
            <dd>{order.contact.name}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{order.contact.phone}</dd>
          </div>
          {order.contact.location && (
            <div>
              <dt>Location</dt>
              <dd>{order.contact.location}</dd>
            </div>
          )}
          <div className={styles.full}>
            <dt>Address</dt>
            <dd>{order.contact.address}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
