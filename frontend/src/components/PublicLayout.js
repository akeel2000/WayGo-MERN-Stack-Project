import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
