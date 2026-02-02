import { Metadata } from "next";
import { siteConfig } from "@config/site";
import {
  Hero,
  Services,
  Skill,
  Experience,
  Project,
  Achievements,
  Contact,
  Footer
} from "@sections/index";

export const metadata: Metadata = {
  title: "Home",
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
      <Skill />
      <Services />
      <Project />
      <Experience />
      {/* <Achievements /> */}
      <Contact />
      <Footer />
    </>
  );
}
