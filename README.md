<p align="center">
Ing. Nelson Roas.
  <a href="https://expressjs.com/" target="blank"><img src="https://media.licdn.com/dms/image/v2/C4E12AQGn33c8MuVS1g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1594043887838?e=2147483647&v=beta&t=1uCnOV4ya3yTY45XGutDcoyllxeijKJUlQrPgHphkAk" width="200" alt="Express Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio con el comando
```
git clone https://github.com/roassystems/backend-nelsonroas.git
```
2. ubicarse en el directorio del proyecto backend-nelsonroas y ejecutar el comando:
```
npm install
```

3. ubicarse en el directorio del proyecto backend-nelsonroas y Copiar el archivo ```.env.template``` y renombrar la copia a ```
.env```

4. Llenar las variables de entorno definidas en el ```.env```
```
IMPORTANTE, NO MODIFICAR EL PUERTO 5439, ESTA ASOCIADO A DOCKER COMPOSE
``` 
```
DB_PASSWORD=clavedebd
DB_NAME=nombre_base_datos
DB_HOST=localhost
DB_PORT=5439
DB_USERNAME=postgres
DATABASE_URL="postgresql://postgres:clavedebd@localhost:5439/nombre_base_datos?schema=esquemaNelsonRoas"

#CONFIGURACION JWT
JWT_SECRET="MI_secreto_2025"
PORT=3000
#APLICACION FRONTEND AUTORIZADA A CONSUMIR ESTE BACKEND, POR POLITICAS CORS
#FRONTEND_URL="http://localhost:5173"
FRONTEND_URL="*"
#CONFIGURACION DE CABECERAS DE SEGURIDAD OWASP, DATOS DEL SERVIDOR DONDE SE DESPLIEGA
DOMINIO_APP_WEB=localhost
STYLE_FONT_SRC=http://localhost:3000
```
5. Levantar la base de datos postgresql
```
docker-compose up -d
```
6. estando en el directorio del proyecto backend-nelsonroas y ejecutar el comando:
```
npm run build
```

7. Ejecutar el siguiente comando, para generar la base de datos
```
npx prisma migrate dev --name init

```
8. Ejecutar la aplicación en dev:
```
npm run start
```

## Stack usado
* PostgreSQL 15.3
* Express 4.21.2
* Prisma ORM 6.3.1
* Version de Node JS: v18.20.2


# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
