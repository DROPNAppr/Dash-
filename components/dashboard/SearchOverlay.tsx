"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import mapboxgl from "mapbox-gl";

interface Props {
  map: mapboxgl.Map | null;
}

export default function SearchOverlay({ map }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchLocation = async () => {
    if (!query) return;

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    );

    const data = await res.json();
    const result = data.features?.[0];

    if (!result) return;

    const coordinates = result.center;

    map?.flyTo({
      center: coordinates,
      zoom: 17,
      pitch: 70,
      bearing: 30,
      duration: 2500,
    });
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: open ? 300 : 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="overflow-hidden"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchLocation()}
          placeholder="Search destination..."
          className="h-12 px-4 rounded-full bg-white shadow-lg outline-none"
        />
      </motion.div>

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <Search size={20} />
      </button>
    </div>
  );
}
