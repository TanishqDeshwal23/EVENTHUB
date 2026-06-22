# 🎉 EventHub - Event Management & Ticket Booking Platform

EventHub is a full-stack MERN application that allows users to discover, book, and manage events seamlessly. Organizers can create and manage events, track bookings, monitor revenue, and analyze event performance through an interactive dashboard.

## 🚀 Features

### 👤 User Features

* User Registration & Login with JWT Authentication
* Secure Role-Based Access Control
* Browse Upcoming Events
* Search Events
* View Detailed Event Information
* Event Countdown Timer
* Book Multiple Tickets
* Dynamic Ticket Price Calculation
* Download PDF Tickets
* QR Code-Based Ticket Generation
* View Booking History
* Cancel Bookings

### 🎯 Organizer Features

* Create New Events
* Upload Event Banner Images
* Edit Existing Events
* Delete Events
* View Event-Specific Bookings
* Dashboard Analytics
* Revenue Tracking
* Booking Statistics
* Revenue Visualization Charts
* Featured Events Management

### 📊 Analytics Dashboard

* Total Events Created
* Total Bookings Received
* Total Revenue Generated
* Revenue Charts
* Recent Bookings Table
* Event Performance Monitoring

### 🎨 UI/UX Features

* Modern Responsive Design
* Interactive Home Page
* Hero Image Carousel
* Featured Events Section
* Toast Notifications
* Professional Dashboard Layout
* Booking Cards & Event Cards
* Responsive Navigation Bar
* Footer with Quick Links

### 🎟 Ticketing System

* QR Code Generation
* PDF Ticket Download
* Booking Confirmation
* Event Details Embedded in Tickets

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast
* React Icons
* Recharts
* jsPDF
* QRCode

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Cloudinary
* Nodemailer

### Database

* MongoDB

---

## 📂 Project Structure

```bash
EventHub/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── config/
│
└── README.md
```

## 🔐 Authentication

* JWT-Based Authentication
* Protected Routes
* Organizer Authorization
* User Session Management

---

## 📈 Dashboard Insights

Organizers can monitor:

* Total Events
* Total Revenue
* Total Bookings
* Event Performance
* Booking Analytics

---

## 📸 Image Uploads

Event banners are uploaded and stored using Cloudinary integration.

---

## 🎫 Ticket Generation

Each booking generates:

* Unique Booking ID
* PDF Ticket
* QR Code
* Event Information
* Booking Details

---

## 🚀 Future Enhancements

* Razorpay Payment Gateway Integration
* Email Ticket Confirmation
* Event Status Automation
* Mobile App Version
* AI-Based Event Recommendations
* Real-Time Notifications

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/EventHub.git
```

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

### Run Application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

## 👨‍💻 Author

**Tanishq Deshwal**

B.Tech Computer Science Engineering

Full Stack MERN Developer

---

## ⭐ If you like this project

Give this repository a Star ⭐ and support the project.
