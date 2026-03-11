export interface WorkExperience {
  id: string;
  company: string;
  location: string;
  position: string;
  employmentType: "Full-time" | "Part-time" | "Internship" | "Contract";
  startDate: string; // Format: "YYYY-MM" or "YYYY-MM-DD" (full date hides entry until that date is reached)
  endDate: string | "Present"; // Format: "YYYY-MM" or "Present"
  achievements: string[];
  technologies: string[];
  companyUrl?: string; // Optional
  logo?: string; // Optional path to company logo
}

export const workExperiences: WorkExperience[] = [
  {
    id: "parinaamaa-ai",
    company: "Parinaamaa.ai Pvt Ltd",
    location: "Kadavanthra, Kochi, Kerala",
    position: "Developer — Platform Engineering Team",
    employmentType: "Full-time",
    startDate: "2026-03-10",
    endDate: "Present",
    achievements: [
      // "Developing and deploying scalable AI platform components for Naamaa.in — a digital commerce solution empowering SMEs to go online within hours",
      // "Taking end-to-end ownership of modules from planning to production, ensuring secure, maintainable, and high-performance coding standards",
      // "Evaluating and implementing modern AI/ML algorithms, models, and tools to drive the product roadmap with innovative technical insights",
      // "Collaborating with cross-functional teams including product managers, data scientists, and designers through code reviews, design discussions, and daily stand-ups",
      // "Providing mentorship and support to interns while maintaining a research-driven approach to solving complex technical problems",
    ],
    technologies: [
      "AI/ML",
      "Next.js",
      "Node.js",
      "React",
      "TypeScript",
    ],
    companyUrl: "https://parinaamaa.ai",
  },
  {
    id: "kerala-it-mission",
    company: "Kerala State IT Mission",
    location: "Thiruvananthapuram, Kerala",
    position: "Graduate Software Developer Intern",
    employmentType: "Internship",
    startDate: "2025-09-10",
    endDate: "2026-03-09",
    achievements: [
      "Created and developed an in-house document signing solution utilizing Aadhar eSign, as provided by CDAC",
      "Designed data models for an in-house project aimed at assigning government email IDs to government officials",
    ],
    technologies: [
      "Aadhar eSign",
      "CDAC Integration",
      "Fast API",
      "Next.js",
      "PostgreSQL",
      "Python",
      "React",
    ],
    companyUrl: "https://itmission.kerala.gov.in",
  },
  {
    id: "cofount-labs",
    company: "Cofount Labs",
    location: "Kozhikode, India",
    position: "Backend Developer",
    employmentType: "Full-time",
    startDate: "2024-10",
    endDate: "2025-09",
    achievements: [
      "Designed, developed, and deployed multiple web applications tailored to client needs using the MERN stack",
      "Delivered end-to-end technical solutions for startups and established businesses, ensuring high performance and scalability",
      "Conducted comprehensive testing, debugging, and performance tuning, ensuring high-quality deliverables with minimal downtime",
      "Integrated payment systems, authentication modules, and database solutions to support business workflows",
      "Managed client communications, project requirements, and technical delivery to achieve customer satisfaction",
    ],
    technologies: [
      "Authentication",
      "Bun.js",
      "MongoDB",
      "Next.js",
      "Payment Integration",
      "PostgreSQL",
      "React.js",
      "TypeScript",
    ],
    companyUrl: "https://cofount.com",
  },
  {
    id: "brototype",
    company: "Brototype",
    location: "Payyannur, India",
    position: "Intern",
    employmentType: "Internship",
    startDate: "2023-08",
    endDate: "2024-10",
    achievements: [
      "Contributed to the development of full-stack web applications using the MERN stack, ensuring scalability, maintainability, and efficiency",
      "Assisted senior developers in designing modular and reusable codebases that improved development speed and reduced errors",
      "Actively participated in peer code reviews to identify bugs, suggest improvements, and uphold coding standards",
      "Debugged, optimized, and enhanced application performance, resulting in smoother user interactions and reduced load times",
      "Collaborated closely with team members in an agile environment, consistently meeting project timelines",
    ],
    technologies: [
      "Agile Development",
      "Express.js",
      "JavaScript",
      "MongoDB",
      "Node.js",
      "React.js",
    ],
    companyUrl: "https://www.brototype.com",
  },
];
