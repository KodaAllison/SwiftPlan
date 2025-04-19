'use client';

import TopNav from "../../../components/TopNav";

export default function LessonLayout({ children }) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  );
}
