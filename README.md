# Money Viora 🏦

Money Viora is a modern, full-stack loan management system built with Next.js. It features a comprehensive customer dashboard for applying and tracking loans, alongside a powerful administrative portal for staff to manage customers, process applications, and oversee loan lifecycles.

## 🌟 Key Features

- **Customer Dashboard**: Users can submit loan applications, track application status, view active loans, and upload necessary documents.
- **Admin Portal**: A protected administration area to review applications, update statuses, manage user roles, and monitor system activity.
- **Role-Based Authentication**: Secure access control utilizing NextAuth with distinct roles (`CLIENT`, `ADMIN`, `SUPER_ADMIN`, `STAFF`).
- **Dynamic Loan Products**: Easily configurable loan products (Home Loan, Personal Loan, etc.) with customizable parameters (interest rates, tenure).
- **Responsive Design**: A sleek, modern, and fully responsive user interface built with Tailwind CSS.
- **Robust Database**: Relational data modeling handled seamlessly with Prisma and PostgreSQL (Neon).

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js (v5)](https://authjs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: React Hook Form + Zod

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm
- A PostgreSQL database URL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Intruder9211/kal-ka-loan.git
   cd kal-ka-loan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   AUTH_SECRET="your-nextauth-secret-key"
   ```

4. **Initialize the Database:**
   Push the Prisma schema to your database and generate the Prisma Client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).
The `postinstall` script automatically runs `prisma generate` to ensure type definitions are correctly generated during the cloud build process.

## 📄 License

This project is licensed under the MIT License.