import { Metadata } from "next";
import {
  Hero,
  Services,
  Skill,
  Experience,
  // Project,
  Footer
} from "@sections/index";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Skill />
      <Services />
      {/* CHORE: Review and Rewrite the contents of Experience Section */}
      <Experience />
      {/* TODO: Rework Projects Section (UI improvements and fix content)*/}
      {/* <Project /> */}
      <Footer />
    </>
  );
}
