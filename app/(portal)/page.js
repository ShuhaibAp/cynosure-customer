import Link from "next/link";
import OrderRequestCard from "@/components/OrderRequestCard";
import StatusPill from "@/components/StatusPill";
import { listOrders, listRequests } from "@/lib/orders";
import { formatDay } from "@/lib/stages";
import styles from "./portal.module.css";

export const metadata = { title: "My orders — Cynosure Customer Portal" };

export default async function OrdersPage() {
  const [{ items }, requests] = await Promise.all([listOrders(), listRequests()]);
  const waiting = requests.find((r) => r.status === "New") ?? null;

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>My orders</h1>
        <p className={styles.sub}>Follow each order as it moves from registration to the final reports.</p>
      </div>

      <OrderRequestCard waiting={waiting} />

      <section className={styles.card} aria-labelledby="orders-title">
        <h2 id="orders-title" className={styles.cardTitle}>
          Orders
        </h2>
        {items.length === 0 ? (
          <p className={styles.empty}>
            You have no orders yet. Once we register an order for you, it will appear here.
          </p>
        ) : (
          <ul className={styles.orderList}>
            {items.map((o) => (
              <li key={o.id}>
                <Link href={`/orders/${o.id}`} className={styles.orderRow}>
                  <span className={styles.orderMain}>
                    <span className={styles.poNumber}>{o.poNumber}</span>
                    <span className={styles.orderMeta}>
                      {o.serviceType} · Registered {formatDay(o.createdAt)}
                    </span>
                  </span>
                  <StatusPill status={o.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
