#!/usr/bin/env node

// Importar crypto directamente para el test
import { randomBytes } from "crypto";

function generateUUID() {
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

function isValidUUID(uuid) {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(uuid);
}

console.log("🧪 Probando generación de UUID...");

// Generar algunos UUIDs
for (let i = 0; i < 5; i++) {
	const uuid = generateUUID();
	const isValid = isValidUUID(uuid);

	console.log(
		`UUID ${i + 1}: ${uuid} - ${isValid ? "✅ Válido" : "❌ Inválido"}`
	);
}

// Probar validación con UUIDs inválidos
console.log("\n🧪 Probando validación...");
const testCases = [
	"f47ac10b-58cc-4372-a567-0e02b2c3d479", // Válido
	"not-a-uuid", // Inválido
	"12345678-1234-1234-1234-123456789abc", // Inválido (no es v4)
	"", // Inválido
];

testCases.forEach((test, i) => {
	const isValid = isValidUUID(test);
	console.log(
		`Test ${i + 1}: "${test}" - ${isValid ? "✅ Válido" : "❌ Inválido"}`
	);
});

console.log("\n✅ Todas las pruebas completadas!");
