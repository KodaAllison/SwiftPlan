import "./globals.css";
import Providers from "../../components/Providers";
import '@mantine/core/styles.css';
import TopNav from "../../components/TopNav";


export const metadata = {
  title: "SwiftPlan",
  description: "AI-Powered Lesson Planning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
