import { UserService } from "@/lib/userService";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	pages: {
		signIn: "/auth/signin",
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			// Este callback se ejecuta cuando el usuario intenta hacer login
			console.log("🔐 Usuario intentando hacer login:", {
				email: user.email,
				provider: account?.provider,
			});

			try {
				// Crear o actualizar usuario en la base de datos y obtener UUID
				const dbUser = await UserService.upsertUser({
					email: user.email!,
					name: user.name || undefined,
					image: user.image || undefined,
					google_id: user.id,
					locale: profile?.locale,
					verified_email: profile?.verified_email,
				});

				if (dbUser) {
					// Agregar el UUID al objeto user para que esté disponible en jwt callback
					user.uuid = dbUser.uuid;
					console.log("✅ Usuario procesado con UUID:", dbUser.uuid);
				} else {
					console.error("❌ Error procesando usuario en la base de datos");
					return false; // Denegar login si hay error en la base de datos
				}
			} catch (error) {
				console.error("❌ Error en signIn callback:", error);
				return false;
			}

			// Retorna true para permitir el login, false para denegarlo
			return true;
		},

		async jwt({ token, user, profile }) {
			// Este callback se ejecuta cuando se crea o actualiza el JWT
			if (user) {
				// Primera vez que el usuario hace login
				console.log("🎯 Primer login del usuario:", {
					email: user.email,
					uuid: user.uuid,
				});

				// Agregar datos adicionales al token
				token.userId = user.id;
				token.uuid = user.uuid; // UUID generado en signIn
				token.email = user.email;
				token.name = user.name;
				token.picture = user.image;

				// Si tienes datos del perfil de Google
				if (profile) {
					token.locale = profile.locale;
					token.verified_email = profile.verified_email;
				}
			} else {
				// Token refresh - verificar que el usuario aún existe en la DB
				if (token.email) {
					try {
						const dbUser = await UserService.findByEmail(token.email as string);
						if (!dbUser) {
							console.log("⚠️ Usuario no encontrado en DB, invalidando token");
							return {};
						}
						// Actualizar último login
						await UserService.updateLastLogin(token.email as string);
					} catch (error) {
						console.error(
							"❌ Error verificando usuario en token refresh:",
							error
						);
					}
				}
			}

			return token;
		},

		async session({ session, token }) {
			// Este callback se ejecuta cada vez que se accede a la sesión
			if (token && session.user) {
				// Pasar datos del token a la sesión
				session.user.id = token.userId as string;
				session.user.uuid = token.uuid as string; // UUID disponible en la sesión
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.user.image = token.picture as string;

				// Agregar datos adicionales a la sesión
				session.user.locale = token.locale as string;
				session.user.verified_email = token.verified_email as boolean;
			}

			if (session.user?.email) {
				console.log("📱 Sesión actualizada para:", {
					email: session.user.email,
					uuid: session.user.uuid,
				});
			}
			return session;
		},

		async redirect({ url, baseUrl }) {
			// Este callback controla a dónde redirigir después del login/logout
			console.log("🔄 Redirigiendo:", { url, baseUrl });

			// Si la URL es relativa, usar baseUrl
			if (url.startsWith("/")) return `${baseUrl}${url}`;

			// Si la URL pertenece al mismo dominio, permitirla
			if (new URL(url).origin === baseUrl) return url;

			// Por defecto, redirigir al baseUrl
			return baseUrl;
		},
	},

	events: {
		async signIn({ user, account, isNewUser }) {
			// Este evento se dispara después de un login exitoso
			console.log("✅ Login exitoso:", {
				email: user.email,
				name: user.name,
				uuid: user.uuid,
				provider: account?.provider,
				isNewUser,
			});

			// Aquí puedes ejecutar acciones adicionales después del login, como:
			// - Enviar emails de bienvenida
			// - Registrar analytics
			// - Sincronizar con sistemas externos
			if (isNewUser) {
				console.log("🎉 Nuevo usuario registrado con UUID:", user.uuid);
			}
		},

		async signOut({ session }) {
			// Este evento se dispara cuando el usuario hace logout
			console.log("👋 Usuario cerró sesión:", {
				email: session?.user?.email,
				uuid: session?.user?.uuid,
			});
		},

		async createUser({ user }) {
			// Este evento se dispara cuando se crea un nuevo usuario
			console.log("🆕 Nuevo usuario creado:", {
				email: user.email,
				uuid: user.uuid,
			});
		},
	},
};
