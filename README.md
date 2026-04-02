# Kinuit Global Website

**Global Reach. Zero Latency.**

Kinuit is a modern, high-performance agency website designed with a focus on immersive aesthetics and fluid 3D interactions. The application encompasses a public-facing marketing platform and a robust, secure admin dashboard for internal data management.

## 🌟 Key Features

### Advanced UI & Interaction
- **Dark Mode First**: A sleek, premium dark-themed design featuring glowing accents, glassmorphic panels, and modern typography.
- **3D Integrations**: Immersive interactive globe elements powered by `react-globe.gl` and `cobe` alongside `Three.js`.
- **Micro-Animations**: Extensive use of `framer-motion` for smooth layout transitions, staggering effects, and interactions.
- **Fully Responsive**: Flawless experience across mobile, tablet, and ultra-wide XL monitors.

### Architecture & Routing
- **App Router**: Leveraging Next.js 16 App Router for optimized Server and Client Components.
- **Route Groups**: Cleanly separated logic with `app/(marketing)` for public pages and `app/admin/(panel)` for secured dashboard routes.
- **Modular Components**: Highly reusable UI components, such as a responsive Data Table that seamlessly transforms into a card layout on mobile.

### Kinuit Admin Dashboard
- **Responsive Sidebar**: State-aware navigation that acts as a mobile drawer, a desktop mini-sidebar with tooltips, and a full-expanded menu.
- **Testimonial Management**: Dedicated pipeline to view public submissions, manage attachments, and securely delete records from the backend.
- **Authentication Gateway**: Protected layout enforcing administrative login before accessing the central dashboard.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.1](https://nextjs.org/) (Turbopack Enabled)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with `tailwind-merge` and `clsx`
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: `three`, `@react-three/fiber`, `@react-three/drei`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Parsing**: `date-fns`
- **Email/Communications**: [Resend](https://resend.com/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### Installation

1. **Clone the repository** (if applicable) and navigate to the root directory:
   ```bash
   cd kinuit-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory based on `.env` (if provided) and populate it with your administrative credentials and any required Resend API keys.
   ```env
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_password
   RESEND_API_KEY=re_...
   ```

### Running the Development Server

Start the Turbopack-powered development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site, or navigate to `/admin/login` to access the dashboard.

### Building for Production

Compile the optimized static and dynamic route payloads:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```

---

## 🗂️ Project Structure

```text
kinuit-website/
├── app/
│   ├── (marketing)/       # Public pages (Home, About, Services, Submit Testimonial)
│   ├── actions/           # Server actions (e.g., Auth logic)
│   ├── admin/             # Admin login and secure (panel) route groups
│   └── api/               # API handlers (e.g., attachment downloads)
├── components/            # Shared UI elements
├── lib/                   # Utilities, constants, and the JSON testimonial store
├── data/                  # Local JSON data storage for admin modules
├── public/                # Static assets (images, fonts, etc.)
└── README.md
```

---

*Designed and developed for Kinuit Global.*
