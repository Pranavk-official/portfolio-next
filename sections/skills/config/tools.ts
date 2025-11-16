import {
  SiGit,
  SiLinux,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiHono,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiBun,
  SiMarkdown,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaTerminal } from "react-icons/fa";
import { IconType } from "react-icons";

export interface Tool {
  name: string;
  icon: IconType;
}

export const tools: Tool[] = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Hono", icon: SiHono },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Bash", icon: FaTerminal },
  { name: "Linux", icon: SiLinux },
  { name: "Bun", icon: SiBun },
  { name: "VS Code", icon: VscVscode },
  { name: "Markdown", icon: SiMarkdown },
];
