"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { useState } from "react";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <User size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl p-4 flex flex-col gap-3"
          >
            <button className="text-sm hover:opacity-70">Sign In</button>
            <button className="text-sm hover:opacity-70">Sign Up</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
