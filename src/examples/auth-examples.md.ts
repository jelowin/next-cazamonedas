/**
 * Ejemplos prácticos de cómo obtener el ID de usuario en el servidor
 */

// 1. En API Routes
// src/app/api/save-coin/route.ts
/*
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-helpers";
import { turso } from "@/lib/turso";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { coinId } = await request.json();

    await turso.execute(
      "INSERT INTO user_coins (user_id, coin_id) VALUES (?, ?)",
      [user.uuid, coinId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
*/

// 2. En Server Components (páginas)
// src/app/profile/page.tsx
/*
import { getCurrentUser } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1>Perfil de {user.name}</h1>
      <p>UUID: {user.uuid}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
*/

// 3. En Server Actions
// src/app/actions.ts
/*
"use server";

import { requireAuth } from "@/lib/auth-helpers";
import { turso } from "@/lib/turso";

export async function addCoinToCollection(coinId: string) {
  const user = await requireAuth(); // Lanza error si no está autenticado

  await turso.execute(
    "INSERT INTO user_coins (user_id, coin_id) VALUES (?, ?) ON CONFLICT DO NOTHING",
    [user.uuid, coinId]
  );

  return { success: true };
}
*/

// 4. Ejemplo completo con manejo de errores
// src/app/api/user-stats/route.ts
/*
import { NextResponse } from "next/server";
import { getCurrentUserUuid } from "@/lib/auth-helpers";
import { turso } from "@/lib/turso";

export async function GET() {
  try {
    const userUuid = await getCurrentUserUuid();

    if (!userUuid) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Obtener estadísticas del usuario
    const coinCount = await turso.execute(
      "SELECT COUNT(*) as count FROM user_coins WHERE user_id = ?",
      [userUuid]
    );

    return NextResponse.json({
      userUuid,
      totalCoins: coinCount.rows[0].count,
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
*/

export {}; // Para que TypeScript trate esto como un módulo
