import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Span } from "~/components/Span";
import { H3Display } from "~/components/typography";
import { resume } from "~/config/resume";

export const meta: MetaFunction = () => {
  return [
    { title: resume.name },
    { name: "description", content: resume.summary },
  ];
};

export default function Index() {
  return (
    <div className="container print:p-0 py-10 mx-auto">
      <Link to="/">
        <h1 className="text-fl-4xl font-display mb-2 hover:underline rounded-sm">
          {resume.name}
        </h1>
      </Link>
      <h2 className="text-fl-xl font-serif my-10 whitespace-break-spaces md:w-3/4">
        {resume.summary}
      </h2>
      <div className="grid grid-cols-3 gap-10">
        <section className="col-span-3 lg:col-span-2">
          <H3Display>Experience</H3Display>
          {resume.experience.map((experience) => (
            <div key={experience.pos} className="mb-6">
              <h4 className="font-serif text-fl-lg mb-1">{experience.title}</h4>
              <h5 className=" text-fl-base mb-1">
                <span className="font-bold">{experience.company}</span>{" "}
                {experience.contract ? (
                  <span>- {experience.contract}</span>
                ) : null}
              </h5>
              <time className="font-light">{experience.date}</time>

              <ul className="list-disc list-outside mt-2 ml-4">
                {experience.description.map((point) => (
                  <li key={point} className="text-fl-xs">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="col-span-3 lg:col-span-1 flex flex-col">
          <H3Display>Contact</H3Display>
          <div className="flex flex-col">
            <a href={`mailto:${resume.contact.email}`}>
              {resume.contact.email}
            </a>
            <a href={`tel:${resume.contact.phone}`}>{resume.contact.phone}</a>
            <a href={resume.contact.github}>Github</a>
            <a href={resume.contact.linkedin}>LinkedIn</a>
          </div>

          <H3Display>Skills</H3Display>
          {Object.keys(resume.skills).map((skillType) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const skills = (resume.skills as any)[skillType];
            return (
              <div key={skillType} className="mb-4">
                <h4 className="font-serif text-2xl">{skillType}</h4>
                {skills.map((skill: string) => (
                  <Span key={skill}>{skill}</Span>
                ))}
              </div>
            );
          })}

          <H3Display>Education</H3Display>

          {resume.education.map((education) => (
            <div key={education.name}>
              {education.name} - {education.attained}
            </div>
          ))}

          <H3Display>Certifications</H3Display>
          {resume.certifications.map((cert) => (
            <div key={cert.name}>{cert.name}</div>
          ))}

          <H3Display>Interests</H3Display>
          <div>
            {resume.interests.map((interest) => (
              <Span key={interest}>{interest}</Span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
