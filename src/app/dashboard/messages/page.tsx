import BackLink from "../_components/BackLink";
import dashboardStyles from "../dashboard.module.css";
import MessagesClient from "./MessagesClient";
import styles from "./page.module.css";

export default function MessagesPage() {
  return (
    <main className={`${dashboardStyles.standardPage} ${styles.messagesPage}`}>
      <div className={styles.heading}>
        <BackLink />
        <h1 className={dashboardStyles.pageTitle}>Messages</h1>
      </div>
      <MessagesClient />
    </main>
  );
}
