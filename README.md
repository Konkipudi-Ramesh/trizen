# MarketNest – Mini Fashion Marketplace

MarketNest is a **full-stack MERN marketplace application** where **brands (sellers)** can manage their products and **customers** can browse and explore products in an online marketplace.

The project demonstrates **authentication, role-based access control, product management, image uploads, and pagination** using modern web technologies.

---

# Live Demo

### Frontend

[https://trizen-git-main-rameshs-projects-3580b5a9.vercel.app/](https://trizen-git-main-rameshs-projects-3580b5a9.vercel.app/)

### Backend API

[https://trizen-fhme.onrender.com](https://trizen-fhme.onrender.com)

---

# Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Image Storage

* Cloudinary

### Authentication

* JWT Access Tokens
* Refresh Tokens stored in database
* httpOnly cookies for refresh tokens

---

# Architecture Explanation

MarketNest follows a **MERN architecture** separating frontend and backend services.

### Frontend Layer

The frontend is built with **React using Vite** and communicates with the backend using **Axios API requests**. It provides user interfaces for browsing products, authentication, and managing products.

### Backend Layer

The backend is built using **Node.js and Express.js**. It exposes REST APIs to handle authentication, product management, and marketplace browsing.

### Database Layer

MongoDB stores:

* User information
* Product information
* Refresh tokens

### Media Storage

Product images are uploaded to **Cloudinary** and stored as secure URLs inside the database.

---

# Authentication Flow

The application implements **JWT-based authentication with refresh tokens**.

### Signup

1. User signs up with:

   * Name
   * Email
   * Password
   * Role (Brand or Customer)

2. Password is hashed using **bcrypt**.

3. User data is stored in MongoDB.

---

### Login

1. User logs in using email and password.
2. Password is verified using bcrypt.
3. Two tokens are generated:

**Access Token**

* Contains user id and role
* Valid for **15 minutes**
* Used for protected API requests

**Refresh Token**

* Stored in database
* Sent in **httpOnly cookies**
* Used to generate a new access token when expired

---

### Protected Routes

Middleware verifies:

* JWT token validity
* User role permissions

Example:

* Only **brand users** can create or manage products.
* Customers can only browse products.

---

# Core Features

### Authentication

* User signup
* Login
* JWT authentication
* Refresh token handling
* Logout

---

### Brand (Seller) Features

After login, brand users can:

* Access brand dashboard
* Create products
* Upload multiple product images
* Edit their own products
* Soft delete products
* View product statistics:

  * Total products
  * Published products
  * Draft products
  * Archived products

---

### Customer Features

Customers can:

* Browse the marketplace
* View product details
* Search products by name
* Filter products by category
* View paginated results
* Add products to cart

Customers **cannot edit or delete products**.

---

# Folder Structure

## Backend

```
marketnest-server
 ├ config
 │   └ cloudinary.js
 │
 ├ controllers
 │   ├ auth.controller.js
 │   └ product.controller.js
 │
 ├ middlewares
 │   ├ auth.middleware.js
 │   ├ role.middleware.js
 │   └ upload.middleware.js
 │
 ├ models
 │   ├ user.model.js
 │   └ product.model.js
 │
 ├ routes
 │   ├ auth.routes.js
 │   └ product.routes.js
 │
 ├ app.js
 └ server.js
```

---

## Frontend

```
marketnest-client
 ├ components
 │   ├ Navbar.jsx
 │   └ ProtectedRoute.jsx
 │
 ├ pages
 │   ├ Marketplace.jsx
 │   ├ ProductDetails.jsx
 │   ├ CreateProduct.jsx
 │   ├ MyProducts.jsx
 │   ├ Dashboard.jsx
 │   ├ Login.jsx
 │   ├ Signup.jsx
 │   └ Cart.jsx
 │
 ├ services
 │   └ api.js
 │
 ├ constants
 │   └ categories.js
 │
 └ App.jsx
```

---

# Security Decisions

Several security measures were implemented in this project:

### Password Security

Passwords are hashed using **bcrypt** before storing in the database.

### JWT Authentication

Secure access tokens ensure protected API routes cannot be accessed without authentication.

### Refresh Token System

Refresh tokens allow session continuation without storing sensitive tokens in local storage.

### Role-Based Authorization

Middleware ensures users can only access routes allowed for their role.

Example:

* Brand → create/edit products
* Customer → browse marketplace only

### Ownership Validation

Brands can only modify **their own products**.

### Environment Variables

Sensitive data such as:

* MongoDB connection strings
* JWT secrets
* Cloudinary credentials

are stored securely using **environment variables**.

---

# Deployment

### Backend Deployment

Backend is deployed on **Render**.

Steps:

1. Push backend code to GitHub
2. Create a Render Web Service
3. Configure environment variables
4. Set start command

---

### Frontend Deployment

Frontend is deployed on **Vercel**.

Steps:

1. Import GitHub repository into Vercel
2. Set root directory to `marketnest-client`
3. Configure build command (`npm run build`)
4. Deploy automatically

---

# AI Tools Usage

AI tools (ChatGPT) were used for:

* debugging deployment issues
* improving UI structure
* optimizing backend logic
* generating documentation guidance

All integration, debugging, and implementation decisions were manually performed by the developer.

---

# Future Improvements

Possible future enhancements include:

* Order management system
* Payment gateway integration
* Wishlist functionality
* Product reviews and ratings
* Admin moderation panel
* Performance optimizations

---

# Author

Ramesh Konkipudi
Full Stack Developer (MERN)

GitHub Repository
[https://github.com/Konkipudi-Ramesh/trizen](https://github.com/Konkipudi-Ramesh/trizen)
