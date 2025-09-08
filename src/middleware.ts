import { withAuth } from "next-auth/middleware";

export default withAuth(
	function middleware() {
		// Aquí puedes agregar lógica adicional si es necesaria
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

// Especifica qué rutas deben estar protegidas
export const config = {
	matcher: [
		// Protege estas rutas - requieren autenticación
		"/profile/:path*",
		"/admin/:path*",
		"/dashboard/:path*",
	],
};
