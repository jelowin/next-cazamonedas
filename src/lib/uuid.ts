import { randomBytes } from "crypto";

/**
 * Genera un UUID v4 usando crypto nativo de Node.js
 * Compatible con Next.js y sin dependencias externas
 */
export function generateUUID(): string {
	const bytes = randomBytes(16);

	// Set version (4) and variant bits
	bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
	bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10

	// Convert to hex string with dashes
	const hex = bytes.toString("hex");

	return [
		hex.substring(0, 8),
		hex.substring(8, 12),
		hex.substring(12, 16),
		hex.substring(16, 20),
		hex.substring(20, 32),
	].join("-");
}

/**
 * Valida si una cadena es un UUID válido
 */
export function isValidUUID(uuid: string): boolean {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(uuid);
}
