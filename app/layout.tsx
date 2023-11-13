import "@/app/ui/global.css";
import { montserrat } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
