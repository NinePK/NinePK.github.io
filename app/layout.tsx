import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pakapop Khiawkhum | Full Stack Developer & Software Engineer",
  description:
    "Portfolio of Pakapop Khiawkhum — Full Stack Developer with end-to-end SDLC experience, building production web apps, APIs, automation workflows, and AI-integrated systems.",
  keywords: [
    "Pakapop Khiawkhum",
    "ภคภพ เขียวขำ",
    "Full Stack Developer",
    "Software Engineer",
    "SDLC",
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
      "Dev ที่ผ่านกระบวนการ SDLC จริง — ตั้งแต่วิเคราะห์ความต้องการ ออกแบบระบบ พัฒนา ทดสอบ จนถึง Deploy ใช้งานจริง",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Thai:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
