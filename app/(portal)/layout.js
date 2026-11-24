import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { logout } from "@/app/actions/auth";
import { verifySession } from "@/lib/dal";
import styles from "./portal.module.css";

export default async function PortalLayout({ children }) {
  const user = await verifySession();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label={brand.brandAriaLabel}>
            <Image src={brand.logoSrc} alt={brand.companyShort} width={brand.headerLogoWidth} height={brand.headerLogoHeight} priority />
          </Link>
          <div className={styles.user}>
            <span className={styles.name}>{user.name}</span>
            <form action={logout}>
              <button type="submit" className={styles.signOut}>
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
