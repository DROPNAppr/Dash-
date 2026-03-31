"use client";

import { Home, BarChart3, Bell, Settings } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

interface Props {
  onHomeClick: () => void;
}

export default function LeftNavbar({ onHomeClick }: Props) {
  const tabs = [
    { title: "Home", icon: Home },
    { title: "Charts", icon: BarChart3 },
    { type: "separator" as const },
    { title: "Notifications", icon: Bell },
    { title: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-4">

      {/* Logo cercle */}
      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold shadow-md">
        C
      </div>

      {/* Navbar blanche animée */}
      <ExpandableTabs
        tabs={tabs}
        className="bg-white border border-gray-200 shadow-md px-2 py-2"
        activeColor="text-black"
        onChange={(index) => {
          if (index === 0) onHomeClick();
        }}
      />
    </div>
  );
}
