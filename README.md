
# 🔐 Advanced Authentication System

An advanced authentication system built with features like email verification, OTP handling, password reset, protected routes, and a clean frontend UI.

## 🚀 Features

- 🔐 **User Signup with Email Verification**
- 📧 **Welcome Email on Signup**
- ✅ **Email OTP Verification**
- 🔑 **Secure Login System**
- 🔒 **Protected Routes**
- 📤 **Forgot and Reset Password**
- 🚪 **Logout Functionality**
- 🏠 **User Dashboard Access**
- 📄 **Reusable Email Templates**
- 🌐 **Frontend Integration with Auth APIs**

## 📁 Project Structure

```
advanced-auth/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── services/
│   ├── middlewares/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── index.html
│
└── README.md
```

## ⚙️ Backend Endpoints

| Method | Endpoint                   | Description                          |
|--------|----------------------------|--------------------------------------|
| POST   | `/api/auth/signup`         | Register a new user and send OTP     |
| POST   | `/api/auth/verify-email`   | Verify user's email using OTP        |
| POST   | `/api/auth/login`          | Login with email and password        |
| POST   | `/api/auth/logout`         | Logout the current user              |
| POST   | `/api/auth/forgot-password`| Send password reset link/email       |
| POST   | `/api/auth/reset-password` | Reset password using token or OTP    |
| GET    | `/api/auth/check-auth`     | Check if the user is authenticated   |

## 🎨 Frontend Pages

- 📋 **Signup Page**
- 🔓 **Login Page**
- ✅ **Email Verification Page**
- 🔄 **Forgot Password Page**
- 🔁 **Reset Password Page**
- 🏠 **Dashboard Page**

## 🛠️ Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- Nodemailer
- JWT

### Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router

## 📬 Email Templates

- 🎉 Welcome Email
- ✅ OTP Verification Email
- 🔄 Password Reset Email

All templates are clean, responsive, and customizable.

## 🔐 Route Protection

- Auth tokens are stored securely.
- Middleware to protect backend routes.
- Conditional frontend rendering based on auth state.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/advanced-auth.git
cd advanced-auth

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup
cd ../frontend
npm install
npm start
```

## 📄 Environment Variables

Create a `.env` file in the `backend/` directory with:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

## ✨ Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Contact

For any queries or suggestions:

- Email: [iamshehbaz01@gmail.com](mailto:iamshehbaz01@gmail.com)
- GitHub: [@Shehbaz456](https://github.com/Shehbaz456)
- LinkedIn: [Shehbaz](https://www.linkedin.com/in/shehbazlovedev/)
