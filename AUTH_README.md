# 🔐 Sistema de Autenticación con UUID

Este proyecto implementa un sistema completo de autenticación con NextAuth.js que genera un UUID único para cada usuario y lo almacena en una base de datos Turso (SQLite).

## 🚀 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
```

Completa las variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado-aqui

# Google OAuth
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# Turso Database
TURSO_DATABASE_URL=tu-turso-database-url
TURSO_AUTH_TOKEN=tu-turso-auth-token
```

### 2. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Habilita Google+ API
4. Crea credenciales OAuth 2.0
5. Añade `http://localhost:3000/api/auth/callback/google` como URI de redirección

### 3. Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 4. Configurar Turso Database

1. Crea una cuenta en [Turso](https://turso.tech/)
2. Crea una nueva base de datos
3. Obtén la URL y el token de autenticación

### 5. Inicializar la Base de Datos

```bash
npm run init-db
```

### 6. Probar UUID (Opcional)

```bash
npm run test-uuid
```

Este comando ejecutará el script `schema.sql` y creará la tabla `users` con todos los índices necesarios.

## 📋 Esquema de la Base de Datos

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL,          -- UUID v4 único generado automáticamente
    email TEXT UNIQUE NOT NULL,         -- Email del usuario (de Google)
    name TEXT,                          -- Nombre del usuario
    image TEXT,                         -- URL del avatar
    google_id TEXT,                     -- ID de Google del usuario
    locale TEXT,                        -- Idioma preferido
    verified_email BOOLEAN DEFAULT FALSE, -- Si el email está verificado
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Cómo Funciona

### 1. Flujo de Autenticación

1. **Usuario hace login** → Se ejecuta `signIn` callback
2. **Se crea/actualiza usuario** en la base de datos con UUID único
3. **Se genera JWT** con el UUID y otros datos
4. **Se crea sesión** con todos los datos del usuario incluído el UUID

### 2. Callbacks Implementados

- **`signIn`**: Crea o actualiza usuario en la DB, genera UUID
- **`jwt`**: Agrega UUID y datos del usuario al token
- **`session`**: Pasa UUID y datos del token a la sesión
- **`redirect`**: Controla redirecciones después del login/logout

### 3. Events Implementados

- **`signIn`**: Se dispara después de login exitoso
- **`signOut`**: Se dispara cuando el usuario cierra sesión
- **`createUser`**: Se dispara cuando se crea un nuevo usuario

## 🎯 Uso del UUID

### En Componentes Cliente

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
	const { userUuid, userId, userEmail, isAuthenticated } = useAuth();

	if (!isAuthenticated) return <div>No autenticado</div>;

	return (
		<div>
			<p>UUID: {userUuid}</p>
			<p>Email: {userEmail}</p>
		</div>
	);
}
```

### En Páginas de Servidor

```tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";

export default async function ServerPage() {
	const session = await getServerSession(authOptions);

	if (!session) redirect("/api/auth/signin");

	const userUuid = session.user.uuid;

	return <div>Usuario UUID: {userUuid}</div>;
}
```

### Interacción con Base de Datos

```tsx
import { UserService } from "@/lib/userService";

// Buscar usuario por UUID
const user = await UserService.findByUuid(userUuid);

// Buscar usuario por email
const user = await UserService.findByEmail(email);

// Actualizar último login
await UserService.updateLastLogin(email);
```

## 🛠️ Servicios Disponibles

### UserService

- `findByEmail(email)` - Buscar usuario por email
- `findByUuid(uuid)` - Buscar usuario por UUID
- `upsertUser(userData)` - Crear o actualizar usuario
- `updateLastLogin(email)` - Actualizar último login

## 📱 Componentes Disponibles

### UserProfile

Muestra todos los datos del usuario incluído el UUID.

### UserActions

Ejemplos de cómo usar el UUID para interactuar con la base de datos.

### LoginButton

Botón de login/logout con UI mejorada usando Avatar.

## 🔒 Rutas Protegidas

El middleware protege automáticamente estas rutas:

- `/profile/*` - Página de perfil de usuario
- `/admin/*` - Rutas de administración
- `/dashboard/*` - Panel de usuario

## 💡 Ventajas del UUID

1. **Seguridad**: No expone información sensible como IDs secuenciales
2. **Únicos**: Garantiza unicidad incluso entre sistemas distribuidos
3. **Inmutables**: No cambian, perfectos para URLs y referencias
4. **Estándard**: UUID v4 es un estándard ampliamente adoptado

## 🚦 Estados de Autenticación

El hook `useAuth` proporciona:

```tsx
const {
	user, // Objeto completo del usuario
	userUuid, // UUID único del usuario
	userId, // ID de Google
	userEmail, // Email del usuario
	userName, // Nombre del usuario
	userImage, // Avatar del usuario
	userLocale, // Idioma preferido
	userVerified, // Si el email está verificado
	isAuthenticated, // Si está autenticado
	isLoading, // Si está cargando
	login, // Función para hacer login
	logout, // Función para hacer logout
	refreshSession, // Función para actualizar sesión
} = useAuth();
```

## 🔧 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build para producción
npm run start      # Servidor de producción
npm run lint       # Linter
npm run init-db    # Inicializar base de datos
npm run test-uuid  # Probar generación de UUID
```

## 📦 Dependencias

- **NextAuth.js 4.x** - Sistema de autenticación
- **Turso** - Base de datos SQLite distribuida
- **Crypto (Node.js)** - Generación de UUID nativa (sin dependencias externas)
- **Next.js 15.x** - Framework React

## 🆔 Generación de UUID

Este proyecto usa **crypto nativo de Node.js** para generar UUIDs v4, sin dependencias externas como `uuid` para evitar problemas de compatibilidad con Next.js.

## 🐛 Debugging

Los callbacks incluyen logs detallados para debugging:

- 🔐 Login attempts
- 🎯 First login
- 📱 Session updates
- 🔄 Redirects
- ✅ Successful logins
- 👋 Logouts
- 🆕 New user creation

Revisa la consola del navegador y del servidor para ver el flujo completo.
