# 🏢 RITM VMS - Visitor Management System

> **A modern, real-time visitor management system built for Rameshwaram Institute of Technology & Management**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 Demo](#-demo)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🗄️ Database Setup](#️-database-setup)
- [🏃‍♂️ Running the Application](#️-running-the-application)
- [👥 User Roles](#-user-roles)
- [📱 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🔐 **Authentication & Security**
- **Role-based Access Control** - Admin and Staff roles with different permissions
- **Secure Authentication** - Powered by Supabase Auth with row-level security
- **Session Management** - Automatic logout and session timeout controls

### 👥 **Visitor Management**
- **Quick Registration** - Streamlined visitor check-in with department selection
- **Real-time Tracking** - Live status updates (INSIDE/OUTSIDE)
- **Smart Check-out** - Easy visitor departure with remarks system
- **Advanced Search** - Filter visitors by name, purpose, department, or phone

### 📊 **Analytics & Reporting**
- **Interactive Charts** - Daily trends, hourly distribution, and purpose analytics
- **Live Statistics** - Real-time visitor counts and duration tracking
- **Export Functionality** - Download visitor data in JSON format
- **Performance Insights** - Peak hours, busiest days, and completion rates

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** - Beautiful modern interface with animated elements
- **Mobile Responsive** - Perfect experience on all devices
- **Dark Theme** - Elegant purple/blue gradient design
- **Real-time Notifications** - Toast notifications for visitor activities

### ⚡ **Real-time Features**
- **Live Updates** - Automatic data synchronization across all clients
- **Instant Notifications** - Real-time alerts for check-ins and check-outs
- **Dynamic Dashboards** - Auto-refreshing statistics and visitor lists

### 🔧 **Admin Features**
- **Settings Management** - Configurable system preferences
- **Visitor Logs** - Complete history with filtering and search
- **Analytics Dashboard** - Comprehensive reports and insights
- **Data Export** - Backup and reporting capabilities

## 🎯 Demo

### Login Credentials
```
Admin Account:
Email: admin@ritm.edu.in
Password: password123

Staff Account:
Email: staff@ritm.edu.in
Password: password123
```

### Live Demo Features
- ✅ **Visitor Registration** - Complete form with department dropdown
- ✅ **Real-time Dashboard** - Live visitor counts and statistics
- ✅ **Check-in/Check-out** - Full visitor lifecycle management
- ✅ **Analytics** - Interactive charts with sample data
- ✅ **Search & Filter** - Advanced filtering capabilities
- ✅ **Mobile Support** - Responsive design for all devices

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/ritm-vms.git
cd ritm-vms

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start managing visitors!

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[Recharts](https://recharts.org/)** - Interactive data visualization

### **Backend & Database**
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
  - PostgreSQL database with real-time subscriptions
  - Authentication and authorization
  - Row Level Security (RLS)
  - Real-time data synchronization

### **Additional Libraries**
- **[React Hot Toast](https://react-hot-toast.com/)** - Beautiful notifications
- **[Lucide React](https://lucide.dev/)** - Modern icon system
- **[Date-fns](https://date-fns.org/)** - Date manipulation utilities

## 📁 Project Structure

```
ritm-vms/
├── app/                          # Next.js App Router
│   ├── admin-dashboard/         # Admin-specific pages
│   │   ├── analytics/          # Analytics dashboard
│   │   ├── settings/           # System settings
│   │   └── visitor-log/        # Complete visitor history
│   ├── staff-dashboard/        # Staff-specific pages
│   │   ├── active/            # Active visitors monitoring
│   │   ├── history/           # Visit history
│   │   └── register/          # Visitor registration
│   ├── api/                   # API routes
│   │   ├── export/           # Data export endpoints
│   │   └── settings/         # Settings management
│   ├── auth/                 # Authentication actions
│   └── globals.css           # Global styles
├── components/               # Reusable UI components
│   ├── ui/                  # Base UI components (Shadcn)
│   ├── notifications/       # Toast notification system
│   ├── checkout-dialog.tsx  # Visitor checkout modal
│   └── visitor-form.tsx     # Visitor registration form
├── lib/                     # Utility libraries
│   ├── supabase/           # Supabase client configuration
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── setup.sql              # Complete database setup script
└── README.md              # This file
```

## 🔧 Installation

### Prerequisites
- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **Supabase** account (free tier available)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/ritm-vms.git
cd ritm-vms
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Setup
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## ⚙️ Configuration

### Supabase Setup
1. **Create a new Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Project Settings → API
3. **Add them to your** `.env.local` file

### Environment Variables
```env
# Required - Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional - Additional Configuration
NEXT_PUBLIC_APP_NAME=RITM VMS
NEXT_PUBLIC_ORGANIZATION=Rameshwaram Institute of Technology & Management
```

## 🗄️ Database Setup

### One-Click Setup
1. **Open your Supabase dashboard**
2. **Go to SQL Editor**
3. **Copy and paste the entire content** from `setup.sql`
4. **Click "Run"**

That's it! The script will:
- ✅ Create all required tables with proper relationships
- ✅ Set up Row Level Security policies
- ✅ Create admin and staff user accounts
- ✅ Insert sample data for testing
- ✅ Configure real-time subscriptions
- ✅ Add performance indexes

### What Gets Created
- **Tables**: `profiles`, `visits`, `settings`, `departments`
- **Users**: Admin and Staff accounts with login credentials
- **Sample Data**: 5 sample visitors and 7 departments
- **Security**: RLS policies for data protection
- **Indexes**: Performance optimization for queries

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Testing the Application
1. **Login as Admin**: `admin@ritm.edu.in` / `password123`
2. **Login as Staff**: `staff@ritm.edu.in` / `password123`
3. **Register a visitor** to test the complete workflow
4. **Check out visitors** to see status updates
5. **View analytics** to see data visualization

## 👥 User Roles

### 🔐 **Admin Role**
**Access**: Complete system control
- ✅ **Visitor Analytics** - Comprehensive reports and charts
- ✅ **Visitor Logs** - Complete history with advanced filtering
- ✅ **Settings Management** - System configuration and preferences
- ✅ **Data Export** - Download visitor and system data
- ✅ **Real-time Dashboard** - Live statistics and recent activity

### 👤 **Staff Role**
**Access**: Visitor management operations
- ✅ **Visitor Registration** - Add new visitors with department selection
- ✅ **Active Visitors** - Monitor visitors currently inside
- ✅ **Visitor Check-out** - Process visitor departures with remarks
- ✅ **Visit History** - View and search complete visit records
- ✅ **Real-time Updates** - Live notifications and data synchronization

## 📱 Screenshots

### 🎨 **Login Page**
- Beautiful animated gradient background
- Glassmorphism login card with floating particles
- Feature highlights with hover effects
- Responsive design for all devices

### 📊 **Admin Dashboard**
- Real-time statistics with live data
- Recent activity feed with visitor movements
- Quick action cards for navigation
- Modern card-based layout with animations

### 📋 **Visitor Registration**
- Complete form with department dropdown
- Real-time validation and error handling
- Modern input design with icons
- Success notifications upon completion

### 📈 **Analytics Dashboard**
- Interactive charts using Recharts
- Daily trends, hourly distribution, purpose analytics
- Real-time data with auto-refresh
- Export functionality for reports

### 🔧 **Settings Management**
- Categorized settings (General, Security, Notifications, etc.)
- Dynamic form controls with real-time saving
- Admin-only access with proper security
- Modern toggle switches and input fields

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 **Bug Reports**
- Use the GitHub Issues tab
- Include detailed reproduction steps
- Provide browser and environment information

### ✨ **Feature Requests**
- Open an issue with the "enhancement" label
- Describe the feature and its use case
- Include mockups or examples if possible

### 🔧 **Development**
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our coding standards
4. **Test thoroughly** with the provided test accounts
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### 📝 **Coding Standards**
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

### **Netlify**
```bash
npm run build
# Upload dist folder to Netlify
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security

- **Row Level Security** enforced on all database tables
- **Role-based access control** with proper permission checking
- **Input validation** on all forms and API endpoints
- **SQL injection protection** through parameterized queries
- **XSS protection** via React's built-in sanitization

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Supabase](https://supabase.com/)** for the amazing backend infrastructure
- **[Vercel](https://vercel.com/)** for seamless deployment platform
- **[Shadcn/UI](https://ui.shadcn.com/)** for beautiful, accessible components
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first styling approach

---

<div align="center">

**Built with ❤️ for modern visitor management**

[⭐ Star this repository](https://github.com/yourusername/ritm-vms) • [🐛 Report Bug](https://github.com/yourusername/ritm-vms/issues) • [✨ Request Feature](https://github.com/yourusername/ritm-vms/issues)

**Made by [Your Name](https://github.com/yourusername) • [Portfolio](https://yourportfolio.com) • [LinkedIn](https://linkedin.com/in/yourprofile)**

</div>
