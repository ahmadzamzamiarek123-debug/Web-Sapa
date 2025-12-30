"use client";

import React from "react";
import {
  Presentation,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Briefcase,
  BarChart3,
  Users,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/Card";

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  category: string;
  color: string;
}

const resources: Resource[] = [
  {
    id: "pitch-deck",
    title: "Pitch Deck Template",
    description: "Template presentasi untuk proposal bisnis dan startup",
    icon: <Sparkles className="w-5 h-5" />,
    url: "https://docs.google.com/presentation/d/1nLQDYaLM7Wf9mKJWFdNfMQhE5Pu4xQDSxiMSiK5_kls/template/preview",
    category: "Bisnis",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "sidang-skripsi",
    title: "Sidang Skripsi",
    description: "Template presentasi untuk sidang tugas akhir/skripsi",
    icon: <GraduationCap className="w-5 h-5" />,
    url: "https://docs.google.com/presentation/d/1zIPrXcEJH-bHqQ8wlNe_Xy9mH-a9XHVR_sKCZXLnA2E/template/preview",
    category: "Akademik",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "laporan-magang",
    title: "Laporan Magang",
    description: "Template untuk presentasi hasil magang/KKN",
    icon: <Briefcase className="w-5 h-5" />,
    url: "https://docs.google.com/presentation/d/1-PGK5r7cIu8bI0mE-G7S1C-H4TmiRvZEPMZZUhJu2IA/template/preview",
    category: "Magang",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "proposal-kegiatan",
    title: "Proposal Kegiatan",
    description: "Template untuk proposal event organisasi",
    icon: <Users className="w-5 h-5" />,
    url: "https://docs.google.com/presentation/d/1eMgDm83Oe6bGf-F4T_h4nUYhK4mH1C7A3JqpqAq9eXw/template/preview",
    category: "Event",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "data-analysis",
    title: "Data Analysis Report",
    description: "Template presentasi hasil analisis data",
    icon: <BarChart3 className="w-5 h-5" />,
    url: "https://docs.google.com/presentation/d/1xkMDgL5V3mW7rXs9_EG5e2S3s1hN8pQA2A7sKpEZCLo/template/preview",
    category: "Data",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: "literature-review",
    title: "Literature Review",
    description: "Template untuk presentasi kajian pustaka",
    icon: <BookOpen className="w-5 h-5" />,
    url: "https://docs.google.com/presentation/d/1G9XZ7oE2m-4S9LZ8bC3dB_5C5H0u3F_D4sE7kNpZT0I/template/preview",
    category: "Riset",
    color: "bg-rose-100 text-rose-600",
  },
];

export default function ResourceGrid() {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle icon={<Presentation className="w-5 h-5 text-orange-500" />}>
          Template PPT Resources
        </CardTitle>
        <CardDescription>
          Koleksi template presentasi siap pakai untuk berbagai keperluan
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-200"
            >
              <div className={`p-2 rounded-lg ${resource.color}`}>
                {resource.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-neutral-900 text-sm truncate">
                    {resource.title}
                  </h4>
                  <ExternalLink className="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">
                  {resource.description}
                </p>
                <span className="inline-block text-xs text-neutral-400 mt-1">
                  {resource.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
