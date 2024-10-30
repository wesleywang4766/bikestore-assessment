import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Linus Analytics Bike Store',
  description:
    `For this challenge, I have built a web application for a fictional bike store.
    The application has allowed me, as the store owner, to manage bikes(Create, Read, Update, Delete) 
    and has enabled customers to browse through the available bikes.`
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
