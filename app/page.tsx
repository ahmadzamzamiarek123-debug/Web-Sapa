"use client";

import { Sparkles, MessageCircle, FileText, Presentation } from "lucide-react";
import ChatGenerator from "@/app/components/features/ChatGenerator";
import DocBuilder from "@/app/components/features/DocBuilder";
import ResourceGrid from "@/app/components/features/ResourceGrid";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";
import { DisabledCard } from "@/app/components/ui/DisabledCard";
import { useTheme } from "@/app/components/ui/ThemeProvider";

export default function Home() {
  const { theme } = useTheme();

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#050505] text-white"
          : "bg-gray-50 text-neutral-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
          theme === "dark"
            ? "bg-[#050505]/90 border-green-900/20"
            : "bg-white/80 border-neutral-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl ${
                  theme === "dark"
                    ? "shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    : ""
                }`}
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                Sapa
              </span>
            </div>
            <div className="flex items-center gap-4">
              <nav
                className={`hidden md:flex items-center gap-6 text-sm ${
                  theme === "dark" ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                <a
                  href="#chat"
                  className="flex items-center gap-1.5 text-green-600 dark:text-green-400 hover:text-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </a>
                <span
                  className={`flex items-center gap-1.5 cursor-not-allowed ${
                    theme === "dark" ? "text-neutral-600" : "text-neutral-400"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Surat
                </span>
                <span
                  className={`flex items-center gap-1.5 cursor-not-allowed ${
                    theme === "dark" ? "text-neutral-600" : "text-neutral-400"
                  }`}
                >
                  <Presentation className="w-4 h-4" />
                  PPT
                </span>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
              theme === "dark"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-green-50 text-green-600"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Chat Dosen Generator
          </div>
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-neutral-900"
            }`}
          >
            Bikin Chat ke Dosen
            <br />
            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              Jadi Lebih Mudah
            </span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Buat pesan chat ke dosen dalam hitungan detik. Pilih gaya formal,
            semi-formal, atau santai sesuai kebutuhan.
          </p>
        </div>
      </section>

      {/* Feature Grid - New Layout */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Chat Generator - Full Width */}
            <div id="chat">
              <ChatGenerator />
            </div>

            {/* Disabled Modules Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Doc Builder - Disabled */}
              <div id="surat">
                <DisabledCard>
                  <DocBuilder />
                </DisabledCard>
              </div>

              {/* Resource Grid - Disabled */}
              <div id="ppt">
                <DisabledCard>
                  <ResourceGrid />
                </DisabledCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-6 px-4 transition-colors duration-300 ${
          theme === "dark" ? "border-green-900/20" : "border-neutral-200"
        }`}
      >
        <div
          className={`max-w-6xl mx-auto text-center text-sm ${
            theme === "dark" ? "text-neutral-500" : "text-neutral-500"
          }`}
        >
          <p>
            Made with ❤️ for Indonesian Students •
            <span className="font-medium text-green-600"> Sapa</span> ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
