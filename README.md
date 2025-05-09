# Techventory Frontend

**Techventory Frontend** es la aplicación web desarrollada con **Angular** que interactúa con el backend de Techventory. Proporciona una interfaz moderna y responsiva para gestionar productos, movimientos, categorías, estados, usuarios y más. Incluye autenticación JWT, protección de rutas y manejo de estados.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [Sígueme y contacta](#sígueme-y-contacta)

---

## Características

- Login y registro de usuarios con JWT.
- Gestión completa de productos, categorías, estados y movimientos.
- Panel de administración para usuarios y roles.
- Exportación de productos a Excel desde el frontend.

---

## Tecnologías Utilizadas

- Angular 17+
- TypeScript
- RxJS
- Angular Router
- Angular Forms (Reactive)
- JWT (manejo de tokens)

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/elAsksito/TechventoryFrontend.git
   ```

2. Entra al directorio del proyecto:

   ```bash
   cd TechventoryFrontend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Ejecuta la aplicación en desarrollo:

   ```bash
   ng serve
   ```

5. Abre en el navegador:

   ```
   http://localhost:4200
   ```

---

## Autenticación y Seguridad

* El token JWT se guarda en `localStorage`.
* Las rutas protegidas usan `AuthGuard` y verificación de roles.
* Los interceptores añaden el token automáticamente a cada solicitud HTTP.
* Las sesiones expiradas redirigen al login.

---

## Sígueme y contacta

[![GitHub](https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/elAsksito)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/_ask.dev/)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/r5xgVvqS3B)
