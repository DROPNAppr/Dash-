"use client";


import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
//import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

import LeftNavbar from "@/components/dashboard/LeftNavbar";
import HomePanel from "@/components/dashboard/HomePanel";
import SearchOverlay from "@/components/dashboard/SearchOverlay";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [homeOpen, setHomeOpen] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    if (!mapboxgl.supported()) {
      console.error("WebGL non supporté par ce navigateur/environnement.");
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-73.5673, 45.5017],
      zoom: 14,
      pitch: 60,
      bearing: -17.6,
      antialias: true,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "bottom-right"
    );

    map.on("load", () => {
      const layers = map.getStyle().layers;

      const labelLayerId = layers?.find(
        (layer) => layer.type === "symbol" && layer.layout?.["text-field"]
      )?.id;

      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
    });

    //const geocoder = new MapboxGeocoder({
    //  accessToken: mapboxgl.accessToken || "",
    //  mapboxgl: mapboxgl as any,
    //});

    //geocoder.on("result", (e) => {
    //  const coordinates = e.result.geometry.coordinates as [number, number];

    //  map.flyTo({
    //    center: coordinates,
    //    zoom: 17,
    //    pitch: 70,
    //    bearing: 45,
    //    duration: 3000,
    //  });
    //});

    //map.addControl(geocoder);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        ref={mapContainer}
        style={{ width: "100vw", height: "100vh" }}
      />

      <LeftNavbar onHomeClick={() => setHomeOpen(!homeOpen)} />
      <HomePanel open={homeOpen} />
      <div className="fixed top-6 right-6 flex items-center gap-3 z-50">
      <SearchOverlay map={mapRef.current} />
      <AccountMenu />
      </div>
      <MapThemeSwitcher map={mapRef.current} />
    </>
  );
}
import MapThemeSwitcher from "@/components/dashboard/MapThemeSwitcher";
import AccountMenu from "@/components/dashboard/AccountMenu";
