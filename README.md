# **API de Autenticación y Gestión de Usuarios con NestJS**

## **📌 Tecnologías Utilizadas**
- **Backend**: NestJS, Node.js  
- **Base de Datos**: MongoDB  
- **Autenticación**: JSON Web Token (JWT)  
- **Correo Electrónico**: Nodemailer  
- **Documentación**: Swagger  

---

## **📜 Descripción del Proyecto**
Este proyecto implementa un sistema de autenticación y gestión de usuarios con NestJS, permitiendo realizar las siguientes acciones:

- CRUD de usuarios con los siguientes campos:
  - Nombre Completo
  - Correo Electrónico
  - Fecha de Creación
  - Contraseña (cifrada)
  - Estado Activo (true/false)
- Inicio de sesión con validación de usuario y contraseña, generando un token JWT si el usuario está activo.
- Sistema de recuperación de contraseña con envío de correo electrónico y enlace personalizado.
- Implementación de dos controladores:
  - **AuthController**: Manejo de sesión (incluye refresh token).
  - **UsersController**: Gestión de usuarios.

---

## 📖 **Documentación con Swagger**
Este proyecto incluye documentación interactiva generada con Swagger. Puedes acceder a ella visitando la siguiente URL después de iniciar el servidor:

```
http://localhost:3000/api
```

En esta interfaz podrás probar los endpoints y visualizar la estructura de las peticiones y respuestas de la API.

---

## 📬 **Contacto**
Si tienes alguna duda o sugerencia, no dudes en contactarme. 🚀
