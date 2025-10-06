#  Vichaar - Modern Blog Platform

A full-stack blogging platform where users can create, share, and manage their thoughts. Built with Next.js and Express.js with a focus on simplicity and user experience.

![Vichaar Banner](https://via.placeholder.com/1200x400/6B46C1/ffffff?text=Vichaar+Blog+Platform)

##  Features

- **User Authentication** - Secure signup/login with JWT tokens
- **Create & Share Posts** - Write blogs with rich text and image uploads
- **Public Feed** - Discover posts from all users
- **Personal Dashboard** - Manage your own blog posts
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Image Upload** - Support for JPEG, PNG, GIF, and WebP formats
- **Privacy Controls** - Toggle posts between public and private

##  Demo

**Live Demo:** 

[Click Here ](https://vichar-blog.vercel.app/signup)

## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Create Post
![Create Post](./screenshots/create-post.png)

### Blog Detail
![Blog Detail](./screenshots/blog-detail.png)

### My Blogs
![My Blogs](./screenshots/my-blogs.png)

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Security:** bcryptjs for password hashing

##  Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas account)
- Git

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/vichaar-blog.git
cd vichaar-blog
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

##  Project Structure

```
vichaar-blog/
├── backend/
│   ├── middleware/
│   │   ├── verifyToken.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── profile.js
│   ├── uploads/
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── CreatePostForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── UserProfileDropdown.jsx
│   │   │   └── Loader.jsx
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── my-blogs/
│   │   └── posts/[id]/
│   ├── public/
│   ├── .env.local
│   └── package.json
│
└── README.md
```

##  Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URI | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| JWT_SECRET | Secret key for JWT signing | `your_super_secret_key_12345` |
| PORT | Server port number | `5000` |

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | `http://localhost:5000` |

##  Deployment

### Backend Deployment (Render)
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables (MONGO_URI, JWT_SECRET, PORT)

### Frontend Deployment (Vercel)
1. Import project on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable: `NEXT_PUBLIC_API_URL` (your backend URL)
4. Deploy

### Update CORS After Deployment
Update `backend/index.js` with your frontend URL:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
}));
```

##  API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts/all` - Get all public posts
- `GET /api/posts` - Get user's posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (with image)
- `DELETE /api/posts/:id` - Delete post

### Profile
- `GET /api/profile` - Get user profile

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@gmail.com

##  Acknowledgments

- Tailwind CSS for the amazing utility-first CSS framework
- Next.js team for the incredible React framework
- MongoDB for the flexible NoSQL database
- All contributors and supporters

##  Support

If you have any questions or need help, please open an issue or contact me directly.

---

Made with ❤️ by [Nizam]