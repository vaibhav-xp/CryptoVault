import Head from "next/head";
import WalletContextProvider from "@/context/WalletContext";
import Header from "@/shared/Header";
import theme from "@/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Crypto Vault",
  description:
    "Securely manage and safeguard your digital assets with Crypto Vault. Our application provides an intuitive and encrypted solution for handling your cryptocurrencies, ensuring your assets are protected and accessible with ease.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <WalletContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
              <ToastContainer position="bottom-right" />
              <Header />
              {children}
            </Container>
          </ThemeProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
