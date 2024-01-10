import type { MetaFunction } from "@remix-run/node";
import { Link as LinkIcon } from "lucide-react";
import { selected_works } from "~/config/portfolio";

export const meta: MetaFunction = () => {
  return [
    { title: "NG (Naomi-Grace) Panlaqui" },
    { name: "description", content: "NG's portfolio" },
  ];
};

export default function Index() {
  return (
    <div>
      <section>
        <div className="container pb-20 mx-auto flex flex-col">
          <h2 className="font-display text-fl-3xl my-10">Favorite Works</h2>

          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {selected_works.map((work) => (
              // <Link
              //   to={`/portfolio/${work.slug}`}
              //   key={work.slug}
              //   className="rounded-sm hover:bg-primary/10 dark:hover:bg-paper/10"
              // >
              <div
                key={work.slug}
                className="border-2 border-primary p-6 rounded-sm dark:border-paper h-full "
              >
                <div className="justify-between flex flex-col h-full">
                  <div>
                    <img
                      src={work.image}
                      alt={work.alt}
                      className="aspect-video w-full object-cover rounded-sm border-2 border-primary dark:border-paper"
                    />
                    <div>
                      <h3 className="font-serif text-fl-2xl mt-6 my-3">
                        {work.name}
                      </h3>
                      <p className="mb-6">{work.teaser}</p>
                    </div>
                  </div>
                  <div>
                    <a
                      href={work.live}
                      className="flex flex-row opacity-70 hover:opacity-100 rounded-sm"
                    >
                      <LinkIcon className="w-4 mr-2" /> {work.live}
                    </a>
                  </div>
                </div>
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
