import "../../styles/global.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { ToastProvider } from "@/providers/TostProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import TanstackQuery from "@/providers/TanstackQuery";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "soleStride authentication",
  description: "soleStride description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center  antialiased max-w-[85rem] mx-auto px-2.5">
        <TanstackQuery>
          <ReduxProvider>
            <ToastProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </ToastProvider>
          </ReduxProvider>
        </TanstackQuery>
      </body>
    </html>
  );
}
