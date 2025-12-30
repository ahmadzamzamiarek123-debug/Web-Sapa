"use client";

import React, { useState, useMemo } from "react";
import { MessageCircle, Copy, Send, Check, Clock } from "lucide-react";
import ReactGA from "react-ga4";
import { Button } from "@/app/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/Card";
import { Input, Select, Textarea } from "@/app/components/ui/Input";
import { chatTemplates, waktuOptions } from "@/app/lib/templates";
import {
  getTimeGreeting,
  generateWhatsAppLink,
  copyToClipboard,
} from "@/app/lib/utils";
import { useTheme } from "@/app/components/ui/ThemeProvider";

interface FormData {
  namaDosen: string;
  namaMahasiswa: string;
  nim: string;
  tone: string;
  purpose: string;
  detailAcara: string;
  waktu: string;
}

export default function ChatGenerator() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState<FormData>({
    namaDosen: "",
    namaMahasiswa: "",
    nim: "",
    tone: chatTemplates.tones[0].id,
    purpose: chatTemplates.purposes[0].id,
    detailAcara: "",
    waktu: "auto",
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const currentPurpose = useMemo(() => {
    return chatTemplates.purposes.find((p) => p.id === formData.purpose);
  }, [formData.purpose]);

  const generatedMessage = useMemo(() => {
    const waktu =
      formData.waktu === "auto" ? getTimeGreeting() : formData.waktu;

    const template =
      chatTemplates.templates[formData.tone]?.[formData.purpose] || "";

    return template
      .replace(/{nama_dosen}/g, formData.namaDosen || "[Nama Dosen]")
      .replace(/{nama_mahasiswa}/g, formData.namaMahasiswa || "[Nama Anda]")
      .replace(/{nim}/g, formData.nim || "[NIM]")
      .replace(/{waktu}/g, waktu)
      .replace(/{detail_acara}/g, formData.detailAcara || "[Detail/Keperluan]");
  }, [formData]);

  const handleCopy = async () => {
    const success = await copyToClipboard(generatedMessage);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Track copy event in Google Analytics
      const purposeLabel = currentPurpose?.label || formData.purpose;
      ReactGA.event({
        category: "User Action",
        action: "Copy Template",
        label: purposeLabel,
      });
    }
  };

  const handleSendWA = () => {
    const link = generateWhatsAppLink(generatedMessage);
    window.open(link, "_blank");
  };

  const purposeOptions = chatTemplates.purposes.map((p) => ({
    value: p.id,
    label: p.label,
  }));

  const isDark = theme === "dark";

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle icon={<MessageCircle className="w-5 h-5 text-green-500" />}>
          Chat Dosen Generator
        </CardTitle>
        <CardDescription>
          Buat pesan untuk dosen dengan berbagai gaya dan keperluan
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-4">
            {/* Tone Selector */}
            <div className="space-y-2">
              <label
                className={`block text-sm font-medium ${
                  isDark ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                Nada Bicara
              </label>
              <div
                className={`flex gap-2 p-1 rounded-xl ${
                  isDark ? "bg-neutral-900" : "bg-neutral-100"
                }`}
              >
                {chatTemplates.tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => handleChange("tone", tone.id)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      formData.tone === tone.id
                        ? `bg-green-500 text-white shadow-sm ${
                            isDark
                              ? "shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                              : ""
                          }`
                        : isDark
                        ? "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nama Dosen"
                placeholder="Pak/Bu..."
                value={formData.namaDosen}
                onChange={(e) => handleChange("namaDosen", e.target.value)}
              />
              <Select
                label="Waktu"
                options={waktuOptions}
                value={formData.waktu}
                onChange={(e) => handleChange("waktu", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nama Anda"
                placeholder="Nama lengkap"
                value={formData.namaMahasiswa}
                onChange={(e) => handleChange("namaMahasiswa", e.target.value)}
              />
              <Input
                label="NIM"
                placeholder="123456789"
                value={formData.nim}
                onChange={(e) => handleChange("nim", e.target.value)}
              />
            </div>

            <Select
              label="Keperluan"
              options={purposeOptions}
              value={formData.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
            />

            {currentPurpose?.requiresDetail && (
              <Textarea
                label={
                  formData.purpose === "izin_acara"
                    ? "Detail Acara"
                    : "Tulis Keperluan"
                }
                placeholder={
                  formData.purpose === "izin_acara"
                    ? "Jelaskan acara yang diikuti..."
                    : "Jelaskan keperluan Anda..."
                }
                rows={3}
                value={formData.detailAcara}
                onChange={(e) => handleChange("detailAcara", e.target.value)}
              />
            )}
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <div
              className={`flex items-center gap-2 text-sm ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>
                Salam otomatis: Selamat{" "}
                {formData.waktu === "auto" ? getTimeGreeting() : formData.waktu}
              </span>
            </div>

            {/* WhatsApp Preview */}
            <div
              className={`rounded-xl p-4 min-h-[200px] transition-colors duration-300 ${
                isDark ? "bg-[#0d1418]" : "bg-[#e5ddd5]"
              }`}
            >
              <div
                className={`chat-bubble whitespace-pre-wrap text-sm ${
                  isDark ? "!bg-[#1e4620] !text-[#e8f5e9]" : ""
                }`}
              >
                {generatedMessage}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant={copied ? "success" : "secondary"}
                onClick={handleCopy}
                className="flex-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="primary"
                onClick={handleSendWA}
                className={`flex-1 ${
                  isDark ? "shadow-[0_0_20px_rgba(34,197,94,0.3)]" : ""
                }`}
              >
                <Send className="w-4 h-4" />
                Kirim via WA
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
