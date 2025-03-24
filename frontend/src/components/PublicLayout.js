// src/components/PublicLayout.js
import React from "react";
import Header from "./Header";

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}

export default PublicLayout;
