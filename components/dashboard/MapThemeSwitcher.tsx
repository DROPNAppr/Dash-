"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";
import { useState } from "react";
import mapboxgl from "mapbox-gl";

interface Props {
  map: mapboxgl.Map | null;
}

export default function MapThemeSwitcher({ map }: Props) {
  const [open, setOpen] = useState(false);

  const themes = [
    { name: "Dark", style: "mapbox://styles/mapbox/dark-v11" },
    { name: "Light", style: "mapbox://styles/mapbox/light-v11" },
    { name: "Streets", style: "mapbox://styles/mapbox/streets-v12" },
    { name: "Satellite", style: "mapbox://styles/mapbox/satellite-v9" },
    { name: "Outdoors", style: "mapbox://styles/mapbox/outdoors-v12" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex flex-col gap-3 mb-2"
          >
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  map?.setStyle(theme.style);
                }}
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:scale-110 transition flex items-center justify-center text-xs font-medium"
              >
                {theme.name[0]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition"
      >
        <Palette size={22} />
      </button>
    </div>
  );
}
