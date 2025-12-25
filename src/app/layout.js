import "./globals.css";
import AmbientEffects from "@/components/AmbientEffects";

export const metadata = {
  title: "A Special Confession",
  description: "This website was made with love to express something truly special. Dive in and feel every moment made just for you 💖",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <AmbientEffects />
        {children}
      </body>
    </html>
  );
}
