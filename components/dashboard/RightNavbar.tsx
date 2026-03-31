"use client"

import { useState } from "react"
import { Home, BarChart3, Bell, Settings, Search } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  onHomeClick: () => void
  onSearchClick: () => void
}

export default function RightNavbar({ onHomeClick, onSearchClick }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const items = [
    { name: "Home", icon: Home, action: onHomeClick },
    { name: "Charts", icon: BarChart3 },
    { name: "Notifications", icon: Bell },
    { name: "Settings", icon: Settings },
  ]

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-full shadow-xl">

        {/* Logo Circle */}
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-black">
          C
        </div>

        {/* Icons */}
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <button
                onClick={item.action}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <Icon size={20} />
              </button>

              {hovered === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md"
                >
                  {item.name}
                </motion.div>
              )}
            </div>
          )
        })}

        {/* Search Icon */}
        <button
          onClick={onSearchClick}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <Search size={20} />
        </button>

        {/* Profile Circle */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
