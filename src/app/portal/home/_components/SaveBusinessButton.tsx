"use client";

import { useState } from "react";
import { HeartIcon } from "./HomeIcons";

type SaveBusinessButtonProps = {
  businessName: string;
  className?: string;
};

export default function SaveBusinessButton({ businessName, className }: SaveBusinessButtonProps) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      className={className}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${businessName} from saved` : `Save ${businessName}`}
      onClick={() => setSaved((current) => !current)}
    >
      <HeartIcon fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
