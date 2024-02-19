import { Github, Linkedin, Mail } from "lucide-react";
import { resume } from "./resume";

export const tagline = `Call me NG. I'm your next full-stack Javascript developer with 5+ years of experience building scalable and accessible applications front-to-back.`;

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
