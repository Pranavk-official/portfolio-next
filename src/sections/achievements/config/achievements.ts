import { Trophy, Code, Zap, Rocket } from "lucide-react";

export interface Achievement {
    id: string;
    slug: string;
    number: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    gradientFrom: string;
    gradientTo: string;
    date: string;
    location?: string;
    highlights: string[];
}

export const achievements: Achievement[] = [
    {
        id: "young-innovators",
        slug: "young-innovators-programme",
        number: "01",
        title: "Young Innovators Programme",
        shortDescription: "Got shortlisted for the second phase of the prestigious Young Innovators Programme.",
        fullDescription: "The Young Innovators Programme is a competitive initiative designed to identify and nurture young talent in technology and innovation. Being shortlisted for the second phase was a significant milestone, recognizing the potential and innovative thinking demonstrated through the initial submission. This programme provided exposure to industry mentors and fellow innovators from across the region.",
        icon: Trophy,
        accentColor: "from-amber-500 to-orange-600",
        gradientFrom: "amber-500",
        gradientTo: "orange-600",
        date: "2024",
        highlights: [
            "Selected from hundreds of applicants across the region",
            "Demonstrated innovative problem-solving approach",
            "Received mentorship from industry experts",
            "Networked with fellow young innovators",
        ],
    },
    {
        id: "technical-events",
        slug: "technical-events-participation",
        number: "02",
        title: "Technical Events",
        shortDescription: "Participated in several technical events from different colleges across the region.",
        fullDescription: "Active participation in various technical events organized by different colleges has been instrumental in expanding technical knowledge and networking with peers. These events ranged from coding competitions to technical symposiums, each providing unique learning opportunities and exposure to diverse problem-solving approaches.",
        icon: Code,
        accentColor: "from-blue-500 to-cyan-600",
        gradientFrom: "blue-500",
        gradientTo: "cyan-600",
        date: "2023-2024",
        location: "Various Colleges",
        highlights: [
            "Participated in coding competitions and hackathons",
            "Attended technical workshops and seminars",
            "Collaborated with students from diverse backgrounds",
            "Gained exposure to latest technology trends",
        ],
    },
    {
        id: "icefoss-hackathon",
        slug: "icefoss-hackathon-fisat",
        number: "03",
        title: "ICEFOSS Hackathon @ FISAT",
        shortDescription: "Attended a 36-hour intensive hackathon conducted by ICEFOSS at FISAT.",
        fullDescription: "ICEFOSS (International Conference on Free and Open Source Software) organized an intensive 36-hour hackathon at FISAT (Federal Institute of Science and Technology). This marathon coding event pushed the limits of endurance and creativity, requiring participants to develop innovative solutions under time pressure while collaborating effectively with team members.",
        icon: Zap,
        accentColor: "from-purple-500 to-pink-600",
        gradientFrom: "purple-500",
        gradientTo: "pink-600",
        date: "2024",
        location: "FISAT, Kerala",
        highlights: [
            "36 hours of continuous coding and innovation",
            "Worked on open-source focused solutions",
            "Collaborated with diverse team members",
            "Developed practical solutions under time constraints",
        ],
    },
    {
        id: "scet-hackathon",
        slug: "scet-hackathon",
        number: "04",
        title: "SCET Hackathon",
        shortDescription: "Attended a 24-hour coding marathon hackathon conducted at SCET.",
        fullDescription: "The SCET Hackathon was an intensive 24-hour coding marathon that brought together talented developers to solve real-world problems. This event provided an excellent platform to test rapid development skills, work under pressure, and deliver functional prototypes within strict deadlines.",
        icon: Rocket,
        accentColor: "from-emerald-500 to-teal-600",
        gradientFrom: "emerald-500",
        gradientTo: "teal-600",
        date: "2024",
        location: "SCET, Kerala",
        highlights: [
            "24-hour intensive coding marathon",
            "Built functional prototype from scratch",
            "Applied agile development practices",
            "Presented solution to panel of judges",
        ],
    },
];
