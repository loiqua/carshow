/**
 * Formate un nombre en devise (EUR par défaut)
 * @param amount - Le montant à formater
 * @param currency - Le code de devise (par défaut EUR)
 * @returns La chaîne formatée
 */
export function formatCurrency(
  amount: number,
  currency: string = "EUR"
): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formate une date au format français
 * @param date - La date à formater
 * @returns La chaîne formatée
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Formate une date et heure au format français
 * @param date - La date à formater
 * @returns La chaîne formatée
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
