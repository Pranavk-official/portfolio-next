import Hero from "@sections/hero/HeroSection";
import Services from "@sections/services/ServicesSection";
import Skill from "@sections/skills/SkillSection";
import ProjectsSection from "@sections/projects/ProjectsSection";
import ExperienceSection from "@sections/experience/ExperienceSection";
import AchievementsSection from "@sections/achievements/AchievementsSection";
import ContactSection from "@sections/contact/ContactSection";
import Footer from "@sections/footer/FooterSection";
import { BlurFade } from "@components/ui/blur-fade";

const Project = () => {
    return <BlurFade delay={0.25 * 2} inView direction="up" > <ProjectsSection /></BlurFade >;
}

const Experience = () => {
    return <BlurFade delay={0.25 * 2} inView direction="up" > <ExperienceSection /></BlurFade >;
}

const Achievements = () => {
    return <BlurFade delay={0.25 * 2} inView direction="up" > <AchievementsSection /></BlurFade >;
}

const Contact = () => {
    return <BlurFade delay={0.25 * 2} inView direction="up" > <ContactSection /></BlurFade >;
}

export {
    Hero,
    Services,
    Skill,
    Project,
    Experience,
    // Achievements,
    Contact,
    Footer
};