import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pakapop Khiawkhum | Full Stack Developer",
  description:
    "Portfolio of Pakapop Khiawkhum — Full Stack Developer and Software Engineer building web applications, APIs, automation workflows, and connected systems.",
  keywords: [
    "Pakapop Khiawkhum",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "Go",
    "FastAPI",
    "PostgreSQL",
    "Thailand",
  ],
  openGraph: {
    title: "Pakapop Khiawkhum | Full Stack Developer",
    description:
      "Production-ready web applications, APIs, automation workflows, and connected systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
