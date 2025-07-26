
## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ProfissionalCourse-MernStack/completeShopZone.git
   cd completeShopZone
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

## �� API Endpoints

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

## �� UI Components

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

## �� Acknowledgments

- shadcn/ui for the beautiful component library
- MongoDB for the database solution
- React and Node.js communities for excellent documentation

---

⭐ **Star this repository if you found it helpful!**
