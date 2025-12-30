import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "Sapa - Chat Dosen Generator",
  description:
    "Web aplikasi untuk membantu mahasiswa membuat pesan chat ke dosen dengan cepat dan profesional.",
  keywords: [
    "mahasiswa",
    "chat dosen",
    "pesan formal",
    "generator pesan",
    "sapa",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-gray-50 dark:bg-[#050505] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
