"use client";

import React from "react";

export default function StickyNavigationMobile() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Example: Logo and menu icon, replace with your actual nav items */}
        <div className="font-bold text-black text-lg">RoyalMaker</div>
        <button className="text-black bg-white/60 rounded-full p-2 shadow hover:bg-white/80 transition">
          <span className="sr-only">Open menu</span>
          {/* Hamburger icon */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
    </nav>
  );
}
