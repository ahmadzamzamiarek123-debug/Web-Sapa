/**
 * Get time-based greeting (Pagi/Siang/Sore/Malam)
 */
export function getTimeGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return "Pagi";
  if (hour >= 11 && hour < 15) return "Siang";
  if (hour >= 15 && hour < 18) return "Sore";
  return "Malam";
}

/**
 * Generate WhatsApp link with encoded message
 */
export function generateWhatsAppLink(
  message: string,
  phoneNumber?: string
): string {
  const encodedMessage = encodeURIComponent(message);

  if (phoneNumber) {
    // Remove non-numeric characters and ensure country code
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  }

  return `https://wa.me/?text=${encodedMessage}`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

/**
 * Format date to Indonesian format
 */
export function formatDateIndonesian(date: Date): string {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Class name helper
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
