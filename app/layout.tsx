import "../styles/globals.css";

export const metadata = {
  title: "Game App",
  description: "A responsive game app with a video game look and feel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
