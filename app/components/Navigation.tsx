import { internal_links } from "~/config/nav";
import { Logo } from "./Logo";
import { Link, useLocation } from "@remix-run/react";
import { highlightLink } from "./classNames";

export function Navigation() {
  const location = useLocation();
  return (
    <nav className="flex flex-wrap justify-between gap-4 sm:flex-nowrap md:gap-8 px-6 lg:p-0">
      <Logo />
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 mb-10">
        {internal_links.map((internal) => (
          <Link
            key={internal.label}
            to={internal.to}
            className={`${highlightLink} ${
              location.pathname === internal.to
                ? "bg-highlighter dark:bg-accent"
                : ""
            }`}
          >
            {internal.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
