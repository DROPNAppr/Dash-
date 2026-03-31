"use client";

import { useState } from "react";

export default function HomePanel({ open }: { open: boolean }) {
  const [width, setWidth] = useState(450); // taille initiale

  if (!open) return null;

  return (
    <div
      style={{ width }}
      className="fixed top-24 left-6 bottom-6 bg-white rounded-2xl shadow-2xl z-40 flex"
    >
      {/* Resize handle */}
      <div
        onMouseDown={(e) => {
          const startX = e.clientX;
          const startWidth = width;

          const onMouseMove = (e: MouseEvent) => {
            setWidth(startWidth + (e.clientX - startX));
          };

          const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        }}
        className="w-2 cursor-ew-resize bg-gray-200"
      />

      <div className="p-6 flex-1">
        <h2 className="text-xl font-semibold mb-4">
          Dashboard Content
        </h2>
        <p>Zone pour tes charts et informations.</p>
      </div>
    </div>
  );
}
