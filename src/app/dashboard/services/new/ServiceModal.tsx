"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ModalFrame from "../../_components/ModalFrame";
import styles from "./page.module.css";

export default function ServiceModal() {
  const router = useRouter();
  const [error, setError] = useState("");

  function saveService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!String(data.get("serviceName") ?? "").trim()) {
      setError("Please enter a service name.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <ModalFrame formId="new-service-form" title="Add New Service">
      <form className={styles.serviceForm} id="new-service-form" onSubmit={saveService}>
        <label>
          <span>Service Name</span>
          <input name="serviceName" onChange={() => setError("")} placeholder="Enter service name" />
        </label>
        <label>
          <span>Description</span>
          <textarea name="description" placeholder="Enter here" />
        </label>
        <label>
          <span>Service Price</span>
          <input inputMode="decimal" name="price" placeholder="Enter amount" />
        </label>
        {error && <p role="alert">{error}</p>}
      </form>
    </ModalFrame>
  );
}
