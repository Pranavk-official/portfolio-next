"use client"

import {
    Hero,
    Services,
    Skill,
    // Project,
    Footer
} from "@sections/index";

export default function Home() {
  return (
    <>
      <Hero />
      <Skill />
      <Services />
      {/* TODO: Create Work Experience Timeline */}
      {/* TODO: Rework Projects Section */}
      {/* <Project /> */}
      <Footer />
    </>
  );
}
