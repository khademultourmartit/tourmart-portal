"use client";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout/MainLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F2F0F9" }}>
      <MainLayout>
        {children}
      </MainLayout>
      </body>
    </html>
  );
}
