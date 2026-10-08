import { stageLabel } from "@/lib/stages";
import styles from "./StatusPill.module.css";

// Early stages read as neutral/blue, commercial stages as amber, field work as brand orange, wrap-up as green.
const TONE = {
  Registration: "info",
  Inspection: "info",
  Quotation: "warn",
  "Client Response": "warn",
  Pickup: "brand",
  Operations: "brand",
  Factory: "brand",
  Weighment: "brand",
  AOR: "good",
  "Final Reports": "good",
  Rejected: "bad",
};

export default function StatusPill({ status }) {
  return (
    <span className={`${styles.pill} ${styles[TONE[status] ?? "neutral"]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {stageLabel(status)}
    </span>
  );
}
