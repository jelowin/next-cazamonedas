# Guía para GitHub Copilot en este proyecto

## Descripción del proyecto

- Web para coleccionistas que lista todas las monedas conmemorativas de 2 euros de la Unión Europea.
- Los usuarios pueden iniciar sesión, marcar qué monedas tienen y cuáles les faltan.
- Tecnologías:
  - **Next** como framework principal.
  - **next-auth** para autenticación y sesiones.
  - **Tailwind** para estilos.
  - **Radix UI** para componentes accesibles.
  - **Turso** como base de datos.
  - **Cloudinary** para gestión de imágenes.
- El frontend debe ser **rápido, accesible y ligero**.

## Buenas prácticas que Copilot debe seguir

- Usar **TypeScript** siempre que sea posible.
- Seguir **clean code**: funciones pequeñas, nombres descriptivos, evitar duplicación.
- Validar inputs (especialmente en rutas y formularios).
- Consultas a base de datos con seguridad (evitar SQL injection).
- Usar **async/await** y manejo de errores (`try/catch`) correcto.
- Seguir principios de **seguridad**: nunca exponer tokens o credenciales en el frontend.
- Componentes deben ser **reutilizables y desacoplados**.
- Usar convenciones consistentes:
  - `camelCase` en JS/TS.
  - `PascalCase` en componentes.
  - Estructura clara de carpetas (ej: `components/`, `db/`, `lib/`, `routes/`).
- Mantener **accesibilidad** en el HTML (labels, alt en imágenes, etc).

## Estilo y herramientas

- TailwindCSS para estilos.
- Radix UI para componentes accesibles.
- Priorizar rendimiento y experiencia de usuario.
- Preferir componentes pequeños de UI antes que monolíticos.
- Para listas grandes, usar paginación o virtualización.
- Documentar funciones con JSDoc/TSdoc.
