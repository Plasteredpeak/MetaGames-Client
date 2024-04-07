import React from "react";

import { BrowserRouter } from "react-router-dom";

import Router from "./components/Router";
import Header from "./components/Header";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="bg-[#EAEDED]">
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
