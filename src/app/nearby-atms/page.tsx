"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

interface Location {
  name: string;
  type: string;
  address: string;
  distance: number;
  location: [number, number];
  services: string[];
  is_open: boolean;
  cash_availability: boolean;
  working_hours: string;
  phone: string | null;
}

interface ApiResponse {
  locations: Location[];
  total_found: number;
  nearest_location: Location;
  search_radius: number;
  current_location: [number, number];
}

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const GOOGLE_MAPS_API_KEY = "AIzaSyB4qFW-doyxadUYpDUDuccATHW4uljsuH4";

const userIcon = {
  path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  fillColor: "#4285F4",
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: "#ffffff",
  scale: 2,
};

export default function ServicesPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            fetchData(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const fetchData = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.post(
          "https://bopar-304959215088.asia-south1.run.app/api/find-nearby-atm-branch",
          {
            latitude,
            longitude,
            search_radius: 2000,
            atm_only: false,
            branch_only: false,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserLocation();
  }, []);

  const onMapClick = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const Loader = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#8B2B03] to-[#FF6B35]">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-white">{message}</p>
    </div>
  );

  if (loadError)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <p className="text-2xl font-semibold">❌ Error Loading Maps</p>
        <p className="text-gray-600 mt-2">Please try refreshing the page.</p>
      </div>
    );
  if (!isLoaded) return <Loader message="Loading maps..." />;
  if (!data) return <Loader message="Fetching data..." />;

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[#8B2B03] to-[#FF6B35]">
      <h1 className="text-2xl font-bold mb-4 text-white">Bank Services Map</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={
          userLocation || {
            lat: data.current_location[0],
            lng: data.current_location[1],
          }
        }
        zoom={14}
        onClick={onMapClick}
      >
        {userLocation && <Marker position={userLocation} icon={userIcon} />}
        {data.locations.map((location) => (
          <Marker
            key={location.name}
            position={{ lat: location.location[0], lng: location.location[1] }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.location[0],
              lng: selectedLocation.location[1],
            }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2 className="font-bold">{selectedLocation.name}</h2>
              <p>{selectedLocation.address}</p>
              <p>Type: {selectedLocation.type}</p>
              <p>Distance: {selectedLocation.distance.toFixed(2)} m</p>
              <p>Open: {selectedLocation.is_open ? "Yes" : "No"}</p>
              <p>
                Cash Available:{" "}
                {selectedLocation.cash_availability ? "Yes" : "No"}
              </p>
              <p>Working Hours: {selectedLocation.working_hours}</p>
              {selectedLocation.phone && <p>Phone: {selectedLocation.phone}</p>}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
