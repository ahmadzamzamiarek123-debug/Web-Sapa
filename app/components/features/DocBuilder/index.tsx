"use client";

import React, { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/Card";
import { Input, Select, Textarea } from "@/app/components/ui/Input";
import { formatDateIndonesian } from "@/app/lib/utils";

interface FormData {
  jenisSurat: string;
  noSurat: string;
  perihal: string;
  tanggal: string;
  namaKetua: string;
  namaOrganisasi: string;
  tujuanSurat: string;
  isiSurat: string;
}

const jenisSuratOptions = [
  { value: "permohonan", label: "Surat Permohonan" },
  { value: "undangan", label: "Surat Undangan" },
  { value: "pemberitahuan", label: "Surat Pemberitahuan" },
  { value: "keterangan", label: "Surat Keterangan" },
];

export default function DocBuilder() {
  const [formData, setFormData] = useState<FormData>({
    jenisSurat: "permohonan",
    noSurat: "",
    perihal: "",
    tanggal: new Date().toISOString().split("T")[0],
    namaKetua: "",
    namaOrganisasi: "",
    tujuanSurat: "",
    isiSurat: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      // Dynamic imports for client-side only
      const {
        Document,
        Paragraph,
        TextRun,
        AlignmentType,
        Packer,
        HeadingLevel,
      } = await import("docx");
      const { saveAs } = await import("file-saver");

      const tanggalFormatted = formatDateIndonesian(new Date(formData.tanggal));
      const jenisSuratLabel =
        jenisSuratOptions.find((o) => o.value === formData.jenisSurat)?.label ||
        "Surat";

      // Create document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Header Organisasi
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: formData.namaOrganisasi || "[NAMA ORGANISASI]",
                    bold: true,
                    size: 32,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Sekretariat: [Alamat Sekretariat]",
                    size: 20,
                  }),
                ],
              }),
              // Garis
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                children: [
                  new TextRun({
                    text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                    size: 20,
                  }),
                ],
              }),
              // Nomor dan Perihal
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({ text: "Nomor\t: ", size: 24 }),
                  new TextRun({
                    text: formData.noSurat || "___/___/___",
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [new TextRun({ text: "Lampiran\t: -", size: 24 })],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [
                  new TextRun({ text: "Perihal\t: ", size: 24 }),
                  new TextRun({
                    text: formData.perihal || jenisSuratLabel,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              // Tujuan
              new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: "Kepada Yth.", size: 24 })],
              }),
              new Paragraph({
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: formData.tujuanSurat || "[Tujuan Surat]",
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: "di Tempat", size: 24 })],
              }),
              // Salam Pembuka
              new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: "Dengan hormat,", size: 24 })],
              }),
              // Isi Surat
              new Paragraph({
                spacing: { after: 200 },
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text:
                      formData.isiSurat || "[Isi surat akan ditulis disini...]",
                    size: 24,
                  }),
                ],
              }),
              // Penutup
              new Paragraph({
                spacing: { after: 400 },
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text: "Demikian surat ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.",
                    size: 24,
                  }),
                ],
              }),
              // Tanda Tangan
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `Gresik, ${tanggalFormatted}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 100 },
                children: [
                  new TextRun({
                    text: `Ketua ${formData.namaOrganisasi || "[Organisasi]"}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 600, after: 100 },
                children: [
                  new TextRun({
                    text: formData.namaKetua || "[Nama Ketua]",
                    bold: true,
                    underline: {},
                    size: 24,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      // Generate and download
      const blob = await Packer.toBlob(doc);
      const fileName = `${formData.jenisSurat}-${
        formData.noSurat || "draft"
      }.docx`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generating document:", error);
      alert("Gagal generate dokumen. Silakan coba lagi.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle icon={<FileText className="w-5 h-5 text-blue-500" />}>
          Surat Organisasi Builder
        </CardTitle>
        <CardDescription>
          Generate surat organisasi profesional dalam format .docx
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Jenis Surat"
              options={jenisSuratOptions}
              value={formData.jenisSurat}
              onChange={(e) => handleChange("jenisSurat", e.target.value)}
            />
            <Input
              label="Nomor Surat"
              placeholder="001/ORG/XII/2024"
              value={formData.noSurat}
              onChange={(e) => handleChange("noSurat", e.target.value)}
            />
          </div>

          <Input
            label="Perihal"
            placeholder="Permohonan Izin Kegiatan"
            value={formData.perihal}
            onChange={(e) => handleChange("perihal", e.target.value)}
          />

          <Input
            label="Tujuan Surat"
            placeholder="Dekan Fakultas..."
            value={formData.tujuanSurat}
            onChange={(e) => handleChange("tujuanSurat", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Tanggal"
              type="date"
              value={formData.tanggal}
              onChange={(e) => handleChange("tanggal", e.target.value)}
            />
            <Input
              label="Nama Organisasi"
              placeholder="Nama organisasi/UKM"
              value={formData.namaOrganisasi}
              onChange={(e) => handleChange("namaOrganisasi", e.target.value)}
            />
          </div>

          <Input
            label="Nama Ketua"
            placeholder="Nama lengkap ketua"
            value={formData.namaKetua}
            onChange={(e) => handleChange("namaKetua", e.target.value)}
          />

          <Textarea
            label="Isi Surat"
            placeholder="Tuliskan isi surat atau keperluan..."
            rows={4}
            value={formData.isiSurat}
            onChange={(e) => handleChange("isiSurat", e.target.value)}
          />

          <Button
            variant="primary"
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download .docx
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
