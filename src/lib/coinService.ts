import { turso } from "@/lib/turso";
import { generateUUID } from "@/lib/uuid";

export interface UserData {
	id?: number;
	uuid: string;
	email: string;
	name?: string;
	image?: string;
	google_id?: string;
	locale?: string;
	verified_email?: boolean;
	created_at?: string;
	updated_at?: string;
	last_login?: string;
}

export class CoinService {
	/**
	 * Buscar usuario por UUID
	 */
	static async findByUuid(uuid: string): Promise<UserData | null> {
		try {
			const result = await turso.execute("SELECT * FROM users WHERE uuid = ?", [
				uuid,
			]);

			if (result.rows.length === 0) {
				return null;
			}

			const row = result.rows[0];
			return {
				id: row.id as number,
				uuid: row.uuid as string,
				email: row.email as string,
				name: (row.name as string) || undefined,
				image: (row.image as string) || undefined,
				google_id: (row.google_id as string) || undefined,
				locale: (row.locale as string) || undefined,
				verified_email: Boolean(row.verified_email),
				created_at: row.created_at as string,
				updated_at: row.updated_at as string,
				last_login: row.last_login as string,
			};
		} catch (error) {
			console.error("❌ Error buscando usuario por UUID:", error);
			return null;
		}
	}

	/**
	 * Saber si un usuario tiene la moneda guardada
	 */
	static async hasSavedCoin(userId: string, coinId: string): Promise<boolean> {
		try {
			const result = await turso.execute(
				"SELECT * FROM user_coins WHERE user_id = ? AND coin_id = ?",
				[userId, coinId]
			);

			return result.rows.length > 0;
		} catch (error) {
			console.error("❌ Error verificando moneda guardada:", error);
			return false;
		}
	}

	/**
	 * Crear o actualizar usuario
	 */
	static async upsertUser(userData: {
		email: string;
		name?: string;
		image?: string;
		google_id?: string;
		locale?: string;
		verified_email?: boolean;
	}): Promise<UserData | null> {
		try {
			// Primero buscar si el usuario ya existe
			const existingUser = await this.findByEmail(userData.email);

			if (existingUser) {
				// Usuario existe, actualizar datos y last_login
				await turso.execute(
					`UPDATE users
					 SET name = ?, image = ?, google_id = ?, locale = ?,
							 verified_email = ?, updated_at = CURRENT_TIMESTAMP,
							 last_login = CURRENT_TIMESTAMP
					 WHERE email = ?`,
					[
						userData.name || existingUser.name || null,
						userData.image || existingUser.image || null,
						userData.google_id || existingUser.google_id || null,
						userData.locale || existingUser.locale || null,
						userData.verified_email ?? existingUser.verified_email ?? false,
						userData.email,
					]
				);

				console.log("🔄 Usuario actualizado:", userData.email);
				return await this.findByEmail(userData.email);
			} else {
				// Usuario nuevo, crear con UUID
				const newUuid = generateUUID();

				// await turso.execute(
				//   `INSERT INTO users (uuid, email, name, image, google_id, locale, verified_email)
				//    VALUES (?, ?, ?, ?, ?, ?, ?)`,
				//   [
				//     newUuid,
				//     userData.email,
				//     userData.name || null,
				//     userData.image || null,
				//     userData.google_id || null,
				//     userData.locale || null,
				//     userData.verified_email || false,
				//   ]
				// );

				console.log("🆕 Nuevo usuario creado con UUID:", newUuid);
				return await this.findByEmail(userData.email);
			}
		} catch (error) {
			console.error("❌ Error creando/actualizando usuario:", error);
			return null;
		}
	}
}
