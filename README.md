# 🛍️ ShopZone - Full-Stack E-commerce Platform

A complete MERN stack e-commerce platform with modern UI, comprehensive CRUD operations, and role-based authentication.

## 🚀 Features

### Backend Features
- **Node.js/Express API** with RESTful endpoints
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with role-based access control
- **Complete CRUD Operations** for all entities
- **Input Validation** and error handling
- **Password Reset** functionality with email
- **File Upload** capabilities

### Frontend Features
- **React** with modern hooks and functional components
- **Redux Toolkit** for state management
- **shadcn/ui** components for beautiful UI
- **Responsive Design** that works on all devices
- **Data Tables** with search, sort, and pagination
- **Modal Forms** for add/edit operations
- **Form Validation** with Zod schemas
- **Real-time Updates** with optimistic UI

### Core Entities
- 👥 **Users** - Customer and admin management
- 📦 **Products** - Product catalog with categories
- 🏷️ **Categories** - Product categorization
- 🛒 **Orders** - Order management and tracking
- 📋 **Order Items** - Detailed order line items

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **nodemailer** - Email functionality
- **multer** - File upload handling

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icon library

## 📁 Project Structure

```
ShopZoneApi/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleWares/        # Authentication & validation
│   ├── models/             # MongoDB schemas
│   ├── Routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── validators/         # Input validation
│   └── server.js           # Express server
└── shopzoneUi/             # React frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   ├── views/          # Feature-specific views
    │   ├── redux/          # Redux store & API
    │   ├── hooks/          # Custom React hooks
    │   └── lib/            # Utility functions
    ├── public/             # Static assets
    └── package.json        # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ProfissionalCourse-MernStack/ShopZoneApi.git
   cd ShopZoneApi
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../shopzoneUi
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in `backend/` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   PORT=5000
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   cd shopzoneUi
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (Admin)
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Order Items
- `GET /api/orderitems` - Get all order items (Admin)
- `POST /api/orderitems` - Create order item (Admin)
- `GET /api/orderitems/:id` - Get order item by ID
- `PUT /api/orderitems/:id` - Update order item (Admin)
- `DELETE /api/orderitems/:id` - Delete order item (Admin)

## 🔐 Authentication & Authorization

### User Roles
- **User** - Can view products, place orders, manage profile
- **Admin** - Full access to all features and data

### Protected Routes
- All admin routes require admin role
- User-specific routes require authentication
- JWT tokens are used for session management

## 🎨 UI Components

The frontend uses shadcn/ui components for a consistent and modern design:
- Data tables with sorting and filtering
- Modal forms for data entry
- Responsive navigation
- Loading states and error handling
- Toast notifications

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Configure MongoDB Atlas for database

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**ProfissionalCourse-MernStack**
- GitHub: [@ProfissionalCourse-MernStack](https://github.com/ProfissionalCourse-MernStack)

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- MongoDB for the database solution
- React and Node.js communities for excellent documentation

---

⭐ **Star this repository if you found it helpful!**
