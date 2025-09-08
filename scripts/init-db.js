import "dotenv/config";
import { turso } from "../src/lib/turso.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
	try {
		console.log("🚀 Inicializando base de datos...");

		// Verificar variables de entorno
		if (!process.env.TURSO_DATABASE_URL) {
			console.error("❌ Error: TURSO_DATABASE_URL no está configurada");
			console.log("💡 Asegúrate de tener un archivo .env.local con:");
			console.log("   TURSO_DATABASE_URL=tu-url-de-turso");
			console.log("   TURSO_AUTH_TOKEN=tu-token-de-turso");
			process.exit(1);
		}

		if (!process.env.TURSO_AUTH_TOKEN) {
			console.error("❌ Error: TURSO_AUTH_TOKEN no está configurada");
			console.log("💡 Asegúrate de tener un archivo .env.local con:");
			console.log("   TURSO_DATABASE_URL=tu-url-de-turso");
			console.log("   TURSO_AUTH_TOKEN=tu-token-de-turso");
			process.exit(1);
		}

		console.log("✅ Variables de entorno configuradas correctamente");
		console.log("🔗 Conectando a:", process.env.TURSO_DATABASE_URL);

		// Leer el archivo schema.sql
		const schemaPath = path.join(__dirname, "..", "schema.sql");
		const schema = fs.readFileSync(schemaPath, "utf8");

		// Dividir las sentencias SQL
		const statements = schema
			.split(";")
			.map((stmt) => stmt.trim())
			.filter((stmt) => stmt.length > 0);

		console.log(`📋 Ejecutando ${statements.length} sentencias SQL...`);

		// Ejecutar cada sentencia
		for (const statement of statements) {
			const firstLine = statement.split("\n")[0].substring(0, 50);
			console.log("📝 Ejecutando:", firstLine + "...");
			await turso.execute(statement);
		}

		console.log("✅ Base de datos inicializada correctamente");

		// Verificar que las tablas se crearon
		const tables = ["users", "coins", "user_coins"];

		for (const tableName of tables) {
			const result = await turso.execute(
				`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
			);

			if (result.rows.length > 0) {
				console.log(`✅ Tabla '${tableName}' creada exitosamente`);
			} else {
				console.log(
					`⚠️  Tabla '${tableName}' no encontrada (puede ser normal si no está en el schema)`
				);
			}
		}

		process.exit(0);
	} catch (error) {
		console.error("❌ Error inicializando base de datos:", error);
		console.log("\n💡 Posibles soluciones:");
		console.log(
			"1. Verifica que tu archivo .env.local existe y tiene las variables correctas"
		);
		console.log("2. Verifica que tu URL y token de Turso son válidos");
		console.log("3. Verifica que tienes conexión a internet");
		process.exit(1);
	}
}

initializeDatabase();
