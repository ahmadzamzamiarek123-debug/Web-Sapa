import chatTemplatesData from "./chat-templates.json";

export interface ToneOption {
  id: string;
  label: string;
}

export interface PurposeOption {
  id: string;
  label: string;
  requiresDetail: boolean;
}

export interface ChatTemplatesData {
  tones: ToneOption[];
  purposes: PurposeOption[];
  templates: {
    [tone: string]: {
      [purpose: string]: string;
    };
  };
}

export const chatTemplates = chatTemplatesData as ChatTemplatesData;

export const waktuOptions = [
  { value: "auto", label: "Deteksi Otomatis" },
  { value: "Pagi", label: "Pagi" },
  { value: "Siang", label: "Siang" },
  { value: "Sore", label: "Sore" },
  { value: "Malam", label: "Malam" },
];
