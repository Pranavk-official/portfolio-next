import { IconType } from "react-icons";
import { FaGithub, FaEnvelope, FaLinkedin, FaPenNib, FaFileAlt, FaHome } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export interface DockItem {
  id: string;
  icon: IconType;
  label: string;
  href: string;
  external?: boolean;
  showOnlyWhenNotHome?: boolean;
}

export const dockItems: DockItem[] = [
  {
    id: "home",
    icon: FaHome,
    label: "Home",
    href: "/",
    showOnlyWhenNotHome: true,
  },
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
    icon: FaSquareXTwitter,
    label: "Twitter",
    href: "https://x.com/@Arch_Lad_",
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
  // TODO: Create a Link Tree Page
];
