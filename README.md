# Echo - RealTime Chat Application

A full-stack real-time chat application built with MERN stack (MongoDB, Express.js, React.js, Node.js), Tailwind CSS and Socket.io.

## Features

- 🔐 User authentication (Signup, Login, Logout)
- 👤 User profile with avatar support
- 💬 Real-time messaging
- 🟢 Online user status
- 🌙 Multiple themes support
- 📱 Responsive design
- 🖼️ Image sharing in chats
- 😊 Emoji support

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- DaisyUI
- Socket.io-client
- Zustand for state management
- Axios
- React Hot Toast
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage

### Setup .env file

```js
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```