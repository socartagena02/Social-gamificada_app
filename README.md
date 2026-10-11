# Redgeon - Social-gamificada_app
Redgeon es un proyecto de aplicación móvil desarrollado en equipo, que busca ofrecer una experiencia gamificada. El proyecto cuenta con una estructura frontend-backend, con una API desarrollada en Django.
Actualmente, la aplicación puede ejecutarse en dispositivos móviles mediante **[Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share)** durante el desarrollo.

## Tecnologías utilizadas
### Backend
- Python 3.12 
- Django 4.2 
- SQLite para desarrollo local.
- Modelado de datos y definición de relaciones entre entidades.
- Implementación de funcionalidades de registro e inicio de sesión.

### Frontend
- React Native 
- [Expo](https://expo.dev/go) SDK 57
- TypeScript

El diseño visual, mockup y los recursos gráficos corresponden a otras tareas del equipo.

## Contribuciones al proyecto
El proyecto se desarrolla en grupo, con responsabilidades distribuidas entre los integrantes:
- **Sofía Cartagena - Backend**: Desarrollo del backend con Django, modelado de datos, definición de relaciones entre entidades y persistencia con SQLite.
- **Danitsa Chandia - Frontend y Mockup**: Desarrollo del frontend de la aplicación móvil y elaboración del mockup.
- **Daniel Tepano - Recursos gráficos**: Elaboración y gestión de los recursos gráficos del proyecto.

## Estructura del proyecto
El repositorio está organizado en las siguientes áreas principales:
- `frontend/`: Código de la aplicación móvil.
- `backend/`: Código del servidor y la lógica desarrollada con Django. 
- `assets/`: Recursos gráficos del proyecto.

## Requisitos previos
Antes de ejecutar el proyecto, se necesita tener instalado:
- Python y pip.
- Node y npm.
- Expo Go en un dispositivo Android y/o iOS.
- Git para clonar el repositorio.

## Instalación y ejecución
### 1. Clona el repositorio
```bash
git clone https://github.com/socartagena02/Social-gamificada_app.git
cd Social-gamificada_app
```

### 2. Configurar el backend
Desde la raíz del repositorio, accede al directorio del backend:
```bash
cd backend
```
Crea y activa un entorno virtual
#### Windows
```bash
python -m venv venv
venv\Scripts\activate
```
#### macOS / Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```
### Instalar las dependencias, aplicar migraciones e iniciar el servidor:
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
### 3. Configurar el frontend
Abre una segunda terminal y accede al directorio del frontend desde la raíz del proyecto:
```bash
cd frontend
npm install
npx expo start 
```
Escanea el código QR con Expo Go en tu dispositivo Android, siguiendo las instrucciones que muestra Expo.

### 4. Configurar la conexión con el backend
Si ejecutas la aplicación en un dispositivo físico, configura la URL de la API para utilizar la dirección IP local de tu computador, en lugar de `localhost`.

Por ejemplo:
```text
http://192.168.1.100:8000
```
Reemplaza la dirección de ejemplo por la IP del equipo y utiliza el puerto en el que se ejecuta Django. Importante: los dos dispositivos deben poder comunicarse a través de la misma red.

**Nota:** Configura la URL base de la API en el archivo o la variable correspondiente del frontend. No incluyas credenciales ni información sensible en el repositorio.

## Base de datos
Durante el desarrollo se utiliza SQLite para almacenar la información gestionada por Django. Los modelos y sus relaciones definen la estructura de los datos de la aplicación.

## Estado del proyecto
El proyecto se desarrolla de forma colaborativa. La aplicación puede ejecutarse en Android mediante Expo Go en el entorno de desarrollo.

El alcance funcional corresponde al estado actual de desarrollo.

## Próximas mejoras
- Ampliar y validar las funciones de la API.
- Incorporar pruebas automatizadas para el backend.
- Mejorar el manejo de errores y la validación de datos.
- Documentar los endpoints disponibles.
- Evaluar mejoras de seguridad y configuración para un despliegue futuro.

## Repositorio
[Social-gamificada_app en GitHub](https://github.com/socartagena02/Social-gamificada_app.git)
