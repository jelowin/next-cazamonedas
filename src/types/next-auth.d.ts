import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			uuid: string;
			locale?: string;
			verified_email?: boolean;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		id: string;
		uuid?: string;
	}

	interface Profile {
		locale?: string;
		verified_email?: boolean;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		userId?: string;
		uuid?: string;
		locale?: string;
		verified_email?: boolean;
	}
}
