export interface WorkExperience {
  id: string;
  company: string;
  location: string;
  position: string;
  employmentType: "Full-time" | "Part-time" | "Internship" | "Contract";
  startDate: string; // Format: "YYYY-MM"
  endDate: string | "Present"; // Format: "YYYY-MM" or "Present"
  achievements: string[];
  technologies: string[];
  companyUrl?: string; // Optional
  logo?: string; // Optional path to company logo
}

export const workExperiences: WorkExperience[] = [
  {
    id: "kerala-it-mission",
    company: "Kerala State IT Mission",
    location: "Thiruvananthapuram, Kerala",
    position: "Graduate Software Developer Intern",
    employmentType: "Internship",
    startDate: "2025-09",
    endDate: "Present",
    achievements: [
      "Created and developed an in-house document signing solution utilizing Aadhar eSign, as provided by CDAC",
      "Designed data models for an in-house project aimed at assigning government email IDs to government officials",
    ],
    technologies: [
      "Next.js",
      "Python",
      "Fast API",
      "PostgreSQL",
      "React",
      "Aadhar eSign",
      "CDAC Integration",
    ],
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
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "TypeScript",
      "Payment Integration",
      "Authentication",
    ],
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
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JavaScript",
      "Agile Development",
    ],
  },
];
