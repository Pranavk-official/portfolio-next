import { IconType } from "react-icons";
import { FaGithub, FaTwitter, FaEnvelope, FaLinkedin, FaPenNib, FaFileAlt } from "react-icons/fa";

export interface DockItem {
  id: string;
  icon: IconType;
  label: string;
  href: string;
  external?: boolean;
}

export const dockItems: DockItem[] = [
  {
    id: "blog",
    icon: FaPenNib,
    label: "Blog",
    href: "/blog",
  },
  {
    id: "resume",
    icon: FaFileAlt,
    label: "Resume",
    href: "/resume.pdf",
    external: true,
  },
  {
    id: "separator",
    icon: () => null,
    label: "separator",
    href: "#",
  },
  {
    id: "github",
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Pranavk-Official",
    external: true,
  },
  {
    id: "twitter",
    icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com",
    external: true,
  },
  {
    id: "email",
    icon: FaEnvelope,
    label: "Email",
    href: "mailto:pranavkcse@gmail.com",
    external: true,
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/pranav-k-cse",
    external: true,
  },
];
