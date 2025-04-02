import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
export const metadata = {
  title: "SwiftPlan",
  description: "AI-Powered Lesson Planning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
