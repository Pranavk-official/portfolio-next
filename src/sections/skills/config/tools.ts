import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiPassport,
  SiJsonwebtokens,
  SiSocketdotio,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiAmazonec2,
  SiNginx,
  SiVercel,
  SiRender,
  SiOpenai,
  SiGooglegemini,
  SiGithub,
  SiPostman,
  SiCanva,
} from "react-icons/si";
import { TbApi, TbHexagons, TbSeo, TbNetwork } from "react-icons/tb";
import { VscServerProcess, VscSymbolStructure } from "react-icons/vsc";
import { FaCode, FaCubes, FaLayerGroup, FaProjectDiagram, FaSitemap } from "react-icons/fa";
import { LuWorkflow, LuDatabase, LuBrainCircuit, LuWand } from "react-icons/lu";
import { BiGitBranch } from "react-icons/bi";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import { MdOutlineArchitecture } from "react-icons/md";
import type { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: IconType;
  accentColor: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: FaCode,
    accentColor: "from-blue-500 to-cyan-500",
    skills: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "SCSS", icon: SiSass },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      // { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Redux", icon: SiRedux },
      { name: "Zustand", icon: FaCubes },
      { name: "EJS", icon: FaCode },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: VscServerProcess,
    accentColor: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST API", icon: TbApi },
      { name: "gRPC", icon: TbNetwork },
      { name: "Microservices", icon: TbHexagons },
      { name: "Passport", icon: SiPassport },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "WebSockets", icon: SiSocketdotio },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: LuDatabase,
    accentColor: "from-orange-500 to-amber-500",
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    icon: LuWorkflow,
    accentColor: "from-purple-500 to-pink-500",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "AWS EC2", icon: SiAmazonec2 },
      { name: "Nginx", icon: SiNginx },
      { name: "CI/CD", icon: BiGitBranch },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
      { name: "Buf", icon: HiOutlineCubeTransparent },
    ],
  },
  {
    id: "genai",
    name: "Gen AI & Tools",
    icon: LuBrainCircuit,
    accentColor: "from-violet-500 to-indigo-500",
    skills: [
      { name: "OpenAI", icon: SiOpenai },
      { name: "Gemini", icon: SiGooglegemini },
      { name: "Antigravity", icon: LuWand },
      { name: "Cursor", icon: FaCode },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "Hoppscotch", icon: TbApi },
      { name: "Canva", icon: SiCanva },
    ],
  },
  {
    id: "architecture",
    name: "Architecture & Design",
    icon: MdOutlineArchitecture,
    accentColor: "from-rose-500 to-red-500",
    skills: [
      { name: "DSA", icon: VscSymbolStructure },
      { name: "OOP", icon: FaCubes },
      { name: "System Design", icon: FaProjectDiagram },
      { name: "MVC", icon: FaLayerGroup },
      { name: "Clean Architecture", icon: MdOutlineArchitecture },
      { name: "SOLID", icon: FaSitemap },
      { name: "Hexagonal", icon: TbHexagons },
      { name: "Repository Pattern", icon: LuDatabase },
      { name: "SEO", icon: TbSeo },
    ],
  },
];

// Flat list for backward compatibility (if needed elsewhere)
export const tools = skillCategories.flatMap((cat) => cat.skills);
