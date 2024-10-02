"use client";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#F2F0F9" }}>
        <Container maxWidth="xl">
          <Header />
          <div className="layout">
            <Sidebar />
            <main className="content">{children}</main>
          </div>
          <style jsx>{`
            .layout {
              display: flex;
            }
            .content {
              padding: 0px 0px 0px 20px;
              flex-grow: 1;
              // min-height: 100vh;
            }
          `}</style>
        </Container>
      </body>
    </html>
  );
}
