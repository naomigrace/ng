import { Link } from "@remix-run/react";

export function Logo() {
  return (
    <Link
      to="/"
      className="drop-shadow-lg hover:scale-110 transition-all duration-300 dark:bg-highlighter dark:text-primary bg-primary text-highlighter  h-7 w-7 flex items-center justify-center rounded-sm text-fl-xs"
    >
      <span className="font-sans">NG</span>
    </Link>
  );
}
