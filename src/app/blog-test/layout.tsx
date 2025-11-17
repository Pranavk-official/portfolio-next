import { Metadata } from "next";
import Container from "./_components/container";

export const metadata: Metadata = {
  title: "Blog | Portfolio",
  description: "Read my latest thoughts, tutorials, and insights on web development, design, and technology.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            {children}
        </Container>
    );
}