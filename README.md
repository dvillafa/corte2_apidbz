# corte2_apidbz
Api de Dragon Ball Z para el corte dos de Desarrollo Web II

Visión general
Esta API está construida usando Express.js, MongoDB, y Socket.IO. Proporciona autenticación de usuario, operaciones CRUD para datos de personajes y actualizaciones en tiempo real mediante WebSockets. Este proyecto está estructurado para incluir el registro e inicio de sesión del usuario, autenticación basada en token usando JWT, y Socket.IO para la comunicación en tiempo real.

Características principales:
1.	Registro y autenticación de usuarios: Registro e inicio de sesión de usuario seguro con encriptación de contraseña (bcrypt) y manejo de sesión basado en JWT.
2.	Operaciones CRUD para Personajes: Los usuarios pueden crear, leer, actualizar y eliminar personajes de Dragon Ball Z tras autenticarse.
3.	Actualizaciones en tiempo real: La API utiliza Socket.IO para notificar a los clientes la creación, actualización y eliminación de personajes en tiempo real.
4.	Integración con MongoDB: Los datos se almacenan utilizando MongoDB con Mongoose ODM.

Instalación y configuración
Requisitos previos:
•	Node.js (v14 o superior)
•	MongoDB
•	Un archivo .env con las siguientes variables de entorno:
o	MONGODB_URI: Cadena de conexión a MongoDB.
o	PORT: Puerto del servidor (por defecto es 3000).
o	JWT_SECRET: Clave secreta para la generación de tokens JWT.

Pasos a seguir:
1.	Clonar el repositorio
2.	Instalar dependencias: npm install
3.	Crear archivo . env: Añade las siguientes variables de entorno a un archivo . env en la raíz del proyecto:
MONGODB_URI=mongodb://localhost:27017/dbz-api
PUERTO=3000
JWT_SECRET=tu_clave_secreta_aleatoria
4.	Inicie el servidor: npm start
5.	Pruebe la funcionalidad de Socket.IO: Abra el archivo index. html en su navegador para conectarse al servidor WebSocket y ver las actualizaciones.

Estructura del proyecto
•	app.js: El archivo principal de la aplicación que configura el servidor Express, la conexión MongoDB y la integración Socket.IO.
•	middleware/auth.js: Middleware para la autenticación de tokens JWT. Verifica los tokens y protege ciertas rutas.
•	models/Character.js: Modelo Mongoose para personajes de Dragon Ball Z, definiendo campos como nombre, raza, powerLevel, y transformaciones.
•	models/User.js: Modelo Mongoose para usuarios, gestiona la creación de usuarios y el cifrado de contraseñas.
•	routes/auth.js: Contiene rutas para el registro de usuarios, inicio de sesión y eliminación de cuentas. Las contraseñas se cifran con bcrypt y las sesiones se gestionan con JWT.
•	routes/characters.js: Contiene rutas para operaciones CRUD sobre datos de caracteres. Utiliza authMiddleware para garantizar que sólo los usuarios autenticados puedan crear, actualizar o eliminar caracteres.
•	index.html: Un sencillo frontend para demostrar el uso de Socket.IO para actualizaciones en tiempo real.
•	.env: Contiene variables de entorno para la conexión MongoDB, el puerto del servidor y el secreto JWT.
•	package.json: Contiene las dependencias y scripts del proyecto.

Puntos finales de la API

Rutas de autenticación (/api/auth):
•	POST /register: Registra un nuevo usuario.
o	Cuerpo de la solicitud: { «nombre de usuario»: «user», «password»: «pass» }
o	Respuesta: 201 Creado con los datos del nuevo usuario.
•	POST /login: Inicia sesión un usuario existente y recibe un token JWT.
o	Cuerpo de la petición: { «nombre de usuario»: «user», «password»: «pass» }
o	Respuesta: 200 OK con un token JWT.
•	DELETE /delete/:id: Elimina un usuario por su ID.
o	Ruta protegida, requiere autenticación JWT.

Rutas de caracteres (/api/caracteres):
•	GET /: Obtener todos los caracteres (No requiere autenticación).
•	GET / :id: Obtiene un carácter específico por ID (No requiere autenticación).
•	POST /: Crear un nuevo personaje (Requiere autenticación JWT).
o	Cuerpo de la petición: { «nombre»: «Goku», «race»: «Saiyan», «powerLevel»: 9000, «transformaciones»: [«Super Saiyan»] }
•	PUT / :id: Actualiza un personaje existente (Requiere autenticación JWT).
•	DELETE / :id: Eliminar un personaje por ID (Requiere autenticación JWT).

Middleware
authMiddleware:
Este middleware se utiliza para proteger ciertas rutas verificando los tokens JWT pasados en la cabecera Authorization. Si se proporciona un token válido, permite que la solicitud continúe. En caso contrario, devuelve un mensaje 401 Unauthorized o 400 Bad Request si el token no es válido o no se ha proporcionado.

Funciones en tiempo real con Socket.IO
Este proyecto integra actualizaciones en tiempo real usando Socket.IO. Cada vez que se crea, actualiza o elimina un nuevo carácter, se emite un evento a todos los clientes conectados:
•	nuevoCaracter: Se emite cuando se crea un nuevo personaje.
•	updatedCharacter: Se emite cuando se actualiza un carácter.
•	deletedCharacter: Se emite cuando se borra un carácter.
Para probar estos eventos, abra el archivo index.html en un navegador, que mostrará mensajes en tiempo real cuando se produzcan estos eventos tanto en su interfaz como en la consola del  navegador.

Dependencias
•	Express.js: Framework web rápido y minimalista para Node.js.
•	Mongoose: Elegante modelado de objetos MongoDB para Node.js.
•	bcryptjs: Biblioteca para hash de contraseñas.
•	jsonwebtoken: Librería para generar y verificar tokens JWT.
•	Socket.IO: Librería para comunicación web socket en tiempo real.



Ejemplos para probar las rutas:

Ejemplos para probar las rutas de autenticación en ARC
1. Registrar un usuario
•	Método: POST
•	URL: http://localhost:3000/api/auth/register
•	Headers: Content-Type: application/json
•	Body: Proporciona un nombre de usuario y contraseña.
•	Ejemplo de body:
json
{
  "username": "usuario1",
  "password": "contrasena123"
}

2. Iniciar sesión
•	Método: POST
•	URL: http://localhost:3000/api/auth/login
•	Headers: Content-Type: application/json
•	Body: Proporciona el mismo nombre de usuario y contraseña.
•	Ejemplo de body:
json
{
  "username": "usuario1",
  "password": "contrasena123"
}
•	Respuesta: Al iniciar sesión correctamente, recibirás un token JWT en la respuesta que debes usar para las solicitudes que requieren autenticación (p. ej., creación, actualización o eliminación de personajes).

3. Eliminar un usuario
•	Método: DELETE
•	URL: http://localhost:3000/api/auth/delete/:id (Reemplaza :id por el ID del usuario a eliminar, que puedes obtener al registrarlo o al listar los usuarios).
•	Headers:
o	Authorization: Incluye el token JWT en el formato Bearer <tu_token_jwt> (El token lo obtienes al iniciar sesión).
•	Body: Ninguno

Ejemplos para probar las rutas en ARC
1. POST /api/characters/ (Crear un nuevo personaje)
•	Método: POST
•	URL: http://localhost:3000/api/characters/
•	Headers:
o	Content-Type: application/json
o	Authorization: Bearer <tu_token_jwt>
•	Body:
json
{
  "name": "Goku",
  "race": "Saiyan",
  "powerLevel": 9000,
  "transformations": ["Super Saiyan", "Super Saiyan 2"]
}

2. GET /api/characters/ (Obtener todos los personajes)
•	Método: GET
•	URL: http://localhost:3000/api/characters/
•	Headers: Ninguno
•	Body: Ninguno

3. GET /api/characters/:id (Obtener un personaje por ID)
•	Método: GET
•	URL: http://localhost:3000/api/characters/614c1b2e5d1f7f09d8b0e8c3
•	Headers: Ninguno
•	Body: Ninguno

4. PUT /api/characters/:id (Actualizar un personaje por ID)
•	Método: PUT
•	URL: http://localhost:3000/api/characters/<id-del-personaje> 
•	Headers:
o	Content-Type: application/json
o	Authorization: Bearer <tu_token_jwt>
•	Body:
json
{
  "powerLevel": 9500,
  "transformations": ["Super Saiyan", "Super Saiyan 2", "Super Saiyan 3"]
}

5. DELETE /api/characters/:id (Eliminar un personaje por ID)
•	Método: DELETE
•	URL: http://localhost:3000/api/characters/614c1b2e5d1f7f09d8b0e8c3
•	Headers:
o	Authorization: Bearer <tu_token_jwt>
•	Body: Ninguno






