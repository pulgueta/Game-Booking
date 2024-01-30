# Reserva de eventos

Esta aplicación es un monolito hecho con Next.js en su última versión a día de redacción de este README (30 de enero de 2024).

Aquí se podrán agendar eventos en ciertos centros comerciales de Colombia, proporcionando una descripción del mismo y la cantidad de participantes que habrán en él además de la fecha en la que se realizará.

## Utilizar en local

> [!IMPORTANT]
> Se requieren cuentas en [Neon](https://neon.tech/) y [Pusher](https://pusher.com/)

### Pasos:

1. Instalar [Node.js](https://nodejs.org/) v18 o superior.

2. Clonar el repositorio de la siguiente manera:

```sh
git clone https://github.com/pulgueta/Game-Booking <carpeta>
```

3. Entrar al directorio e instalar las dependencias con npm, yarn o pnpm:

```sh
cd <carpeta>

pnpm install

# O también

pnpm i
```

4. Luego de registrarse en los servicios mencionados al inicio, pegar las variables de entorno en el archivo [.env.local](./.env.local) como se muestra en el [.env.example](./.env.example)

5. Correr de forma local la aplicación:

```sh
pnpm run dev

# O también

pnpm dev
```

> [!WARNING]
> Si no se proporcionan las variables de entorno correctas, la aplicación fallará al correr.

¡Listo! Ya puedes usar la aplicación en local. A continuación, se mostrarán unas breves demostraciones de cómo puede funcionar la app. Para un mayor detalle, utilizar la aplicación en local

## Agenda básica de evento

![](/public/basicdemo.gif)

## Eliminar evento

![](/public/deletedemo.gif)

## Calificar evento

![](/public/ratingdemo.gif)
