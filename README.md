# ATK Gaming - E-commerce Website

A modern e-commerce platform for gaming peripherals built with Next.js 13, featuring a glassmorphic design and seamless user experience.

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd rattrapagedigi1
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory with:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
STRIPE_SECRET_KEY=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-webhook-secret
```

## Running the Project

1. Start the development server
```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- 🛍️ Full e-commerce functionality
- 🔐 User authentication
- 🛒 Shopping cart system
- 💳 Secure payment integration
- 📱 Responsive design
- 🎨 Modern glassmorphic UI
- 👤 User account management
- 📦 Order tracking
- 🔍 Product search and filtering

## Tech Stack

- Next.js 13
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- Stripe Integration

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
