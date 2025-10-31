# 🛒 E-commerce Backend - Sistema de Autenticación y Carritos

Proyecto desarrollado como parte del curso de Backend II en Coderhouse. Implementa un sistema completo de autenticación con JWT y gestión de carritos de compras. 1era entrega

## 👩‍💻 Desarrolladora

**Maia Paraje**  
Comisión: 77155

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Passport JWT** - Autenticación con tokens
- **Handlebars** - Motor de plantillas
- **bcrypt** - Encriptación de contraseñas
- **cookie-parser** - Manejo de cookies

## ✨ Funcionalidades

### Autenticación
- ✅ Registro de usuarios con validaciones
- ✅ Inicio de sesión con JWT
- ✅ Recuperación de contraseña
- ✅ Cierre de sesión seguro

### Sistema de Carritos
- ✅ Creación automática de carrito al registrarse
- ✅ Asociación de carrito a usuario
- ✅ Visualización de ID de carrito en perfil
- ✅ Preparado para gestión de productos

### Seguridad
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Validación de formato de email
- ✅ Validación de longitud de contraseña

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/mparaje/Proyecto_Backend2.git
cd Proyecto_Backend2
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto:
```env
PORT = 8080
MONGO_URL = mongodb+srv://maiaparaje_db_user:Paraje25@ecommerce.cstd689.mongodb.net/
JWT_SECRET = 12PK4F11R7J13P
```

4. Ejecutar el proyecto:
```bash
npm start
```
```

### Login
- Validación de formato de email
- Mensajes de error personalizados
- Mensaje de éxito al registrarse

### Perfil de Usuario
- Información del usuario
- ID de carrito asociado
- Contador de productos (preparado)

## 🛠️ Próximas Funcionalidades

- [ ] Sistema completo de productos
- [ ] Agregar/eliminar productos del carrito
- [ ] Visualización detallada del carrito
- [ ] Checkout y proceso de compra

Este proyecto es parte del curso de Backend en Coderhouse - Comisión 77155

---

Desarrollado con 💜 por **Maia Paraje**