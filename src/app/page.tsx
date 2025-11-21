"use client"

import {
  Hero,
  Services,
  Skill,
  Experience,
  // Project,
  Footer
} from "@sections/index";

export default function Home() {
  return (
    <>
      <Hero />
      <Skill />
      <Services />
      {/* TODO: Review and Rewrite the contents of Experience Section */}
      <Experience />
      {/* TODO: Rework Projects Section (UI improvements and fix content)*/}
      {/* <Project /> */}
      <Footer />
    </>
  );
}
