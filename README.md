# Jewelry Website (geer.in)

A modern, responsive jewelry e-commerce website built with Next.js and React. Features an elegant homepage with image carousel, product categories, customer testimonials, and a fully responsive navigation system.

## 🚀 How to Run the Project

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishwasvk35/geer-intern-assignment.git
   cd geer-intern-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the website.

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library with hooks
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Lucide React** - Modern icon library

### External Services
- **Unsplash API** - Product and hero images
- **Cloudinary** - Image optimization and delivery
- **Google Fonts** - Typography (Dancing Script)

## 📝 Notes and Assumptions

### Image Assets
- Hero images sourced from Unsplash (free stock photos)
- Product images from Cloudinary CDN
- Images are optimized for different screen sizes and pixel densities

### State Management
- Local component state using React hooks
- No external state management library (Redux, Zustand) needed for current scope
- Context API can be added for global state if needed

### API Endpoints (Assumed)
- `/api/products` - Product listing
- `/api/categories` - Category listing
- `/api/products/[id]` - Product details

### Future Enhancements
- Shopping cart functionality
- User authentication
- Product search and filtering
- Payment integration
- Admin dashboard
- Product reviews and ratings
- Wishlist functionality

## 🐛 Known Issues

- Hero image carousel may briefly show loading state on initial load
- Some images may take time to load on slower connections
