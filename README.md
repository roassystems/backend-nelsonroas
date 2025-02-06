<p align="center">
Ing. Nelson Roas.
  <a href="https://expressjs.com/" target="blank"><img src="https://media.licdn.com/dms/image/v2/C4E12AQGn33c8MuVS1g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1594043887838?e=2147483647&v=beta&t=1uCnOV4ya3yTY45XGutDcoyllxeijKJUlQrPgHphkAk" width="200" alt="Express Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Clonar el archivo ```.env.template``` y renombrar la copia a ```
.env```

4. Llenar las variables de entorno definidas en el ```.env```
5. Levantar la base de datos postgresql
```
docker-compose up -d
```


6. Ejecutar el siguiente comando, para generar la base de
```datos
npx prisma migrate dev --name init

```
7. Ejecutar la aplicación en dev:
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
