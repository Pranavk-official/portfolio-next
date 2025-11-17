import Hero from "@sections/hero/HeroSection";
import Services from "@sections/services/ServicesSection";
import Skill from "@sections/skills/SkillSection";
import ProjectsSection from "@sections/projects/ProjectsSection";
import Footer from "@sections/footer/FooterSection";
import { BlurFade } from "@components/ui/blur-fade";

const Project = () => {
    return <BlurFade delay={0.25 * 3} inView direction="up" > <ProjectsSection /></BlurFade >;
}


export {
    Hero,
    Services,
    Skill,
    Project,
    Footer
};