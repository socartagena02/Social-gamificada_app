# Social-gamificada_app

## Requerimientos
- Python 3.9+
- Node.js 16+
- npm o yarn
- Expo CLI: `npm install -g expo-cli`

# Stack tecnologico
**Frontend**
- React Native
- TypeScript
- Expo
**Backend**
- Django REST API
- SQLite (desarrollo local)
- JWT

## Instalación

### Backend
```bash
cd backend
# Crear y activar venv
python -m venv venv
venv\Scripts\activate

# Dependencias
pip install -r requirements.txt

# Crear archivo .env
# CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8081,http://192.26.78.103:8000
# ALLOWED_HOSTS=localhost,127.0.0.1,192.26.78.103 

# Migraciones y ejecutar server
cd social_gamificada
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
### Frontend
```bash
cd frontend
npm install

# Crear archivo .env con:
# EXPO_PUBLIC_API=http://192.26.78.103:8000

npx expo start
```
**Cambiar `192.26.78.103 por la IP actual**

## Flujo de uso

1. Registro/Login funcional
2. Autenticación con JWT tokens
3. Solo usuarios logueados acceden al home