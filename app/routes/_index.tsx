import type { MetaFunction } from "@remix-run/node";
import me from "../assets/megreencenter.png";
import { external_links, tagline } from "~/config/homepage";
import { highlightLink } from "~/components/classNames";

export const meta: MetaFunction = () => {
  return [
    { title: "NG (Naomi-Grace) Panlaqui" },
    { name: "description", content: "NG's online business card." },
  ];
};

export default function Index() {
  return (
    <div>
      <section className="container print:p-0  px-6 py-10 mx-auto flex flex-col items-center justify-between text-center">
        <img
          src={me}
          alt="Headshot of NG"
          className="rounded-full w-40 h-40 ring-4 ring-primary dark:ring-white dark:ring-offset-primary ring-offset-paper ring-offset-4"
        />

        <h1 className="text-fl-3xl font-display my-6 mb-10 whitespace-break-spaces">{`Naomi-Grace\nPanlaqui`}</h1>
        <h2 className="text-fl-xl font-serif mb-10 whitespace-break-spaces md:w-3/4">
          {tagline}
        </h2>
        <div className="flex flex-row space-x-6 items-center mb-10">
          {external_links.map((external) => (
            <a
              key={external.href}
              className={`${highlightLink} hover:scale-125 transition-transform duration-300`}
              href={external.href}
            >
              {external.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
