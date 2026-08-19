"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ModalFrame from "../../_components/ModalFrame";
import styles from "./page.module.css";

const initialImages = Array.from({ length: 9 }, (_, index) => `/dashboard/gallery/image-${index + 1}.png`);

export default function GalleryModal() {
  const router = useRouter();
  const [images, setImages] = useState(initialImages);
  const objectUrls = useRef<string[]>([]);

  useEffect(() => {
    const urls = objectUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function addImages(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const newImages = files.map((file) => URL.createObjectURL(file));
    objectUrls.current.push(...newImages);
    setImages((current) => [...current, ...newImages]);
    event.target.value = "";
  }

  function removeImage(src: string) {
    if (src.startsWith("blob:")) URL.revokeObjectURL(src);
    setImages((current) => current.filter((image) => image !== src));
  }

  return (
    <ModalFrame title="Gallery" onSave={() => router.push("/dashboard")}>
      <div className={styles.galleryToolbar}>
        <div>
          <strong>Business Photos</strong>
          <span>{images.length} photos</span>
        </div>
        <label>
          <span aria-hidden="true">＋</span> Add Photos
          <input accept="image/*" multiple onChange={addImages} type="file" />
        </label>
      </div>
      <div className={styles.galleryGrid}>
        {images.map((src) => (
          <figure key={src}>
            <Image src={src} alt="Business gallery item" width={703} height={600} />
            <button aria-label="Remove image" onClick={() => removeImage(src)} type="button">×</button>
          </figure>
        ))}
        {!images.length && <p className={styles.empty}>Your gallery is empty.</p>}
      </div>
    </ModalFrame>
  );
}
