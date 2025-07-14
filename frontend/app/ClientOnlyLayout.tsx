"use client";
import React, { useState } from 'react';
import "@/public/css/reset.css";
import {Navbar} from "@/app/components/Navbar";

export default function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const [activeItem, setActiveItem] = useState("main-payroll");
  return (
    <div className="ClientOnlyLayout">
      <div className="Wrapper NavContainer">
          <Navbar activeItem={activeItem} setActiveItem={setActiveItem}/>
      </div>
      <main className="main-layout">
        {children}
      </main>
    
    
    </div>
  );
}
