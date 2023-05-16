# Imagen base
FROM node:16-alpine3.14

# Set de variables de entorno
ENV NODE_ENV=production \
    APP_DIR=/usr/src/app

# Crear directorio de la app y establecerlo como directorio de trabajo
WORKDIR ${APP_DIR}

# Copiar solo los archivos necesarios
COPY package.json ${APP_DIR}/
COPY package-lock.json ${APP_DIR}/

# Instalar solo las dependencias necesarias
RUN npm ci --only=production

# Copiar el resto de la aplicación
COPY . ${APP_DIR}/

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]