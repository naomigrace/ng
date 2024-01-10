import { Github, Linkedin, Mail } from "lucide-react";
import { resume } from "./resume";

export const tagline = `Hello! Call me NG. I'm a web developer based in Washington, DC.`;

export const external_links = [
  {
    href: `mailto:${resume.contact.email}`,
    label: <Mail />,
  },
  {
    href: resume.contact.linkedin,
    label: <Linkedin />,
  },
  {
    href: resume.contact.github,
    label: <Github />,
  },
];
