import { Metadata } from "next";
import { siteConfig } from "@config/site";
import {
  Hero,
  // AboutMe,
  Services,
  Skill,
  Experience,
  Project,
  LatestArticles,
  Achievements,
  Contact,
  Footer,
} from "@sections/index";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      {/* <AboutMe /> */}
      <Skill />
      <Services />
      <Project />
      <Experience />
      <LatestArticles />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}
