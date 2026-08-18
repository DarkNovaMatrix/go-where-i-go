import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

export interface MapPoint {
  id: string;
  title: string;
  slug: string;
  country?: string | null;
  location?: string | null;
  difficulty?: string | null;
  rating?: number | null;
  imageUrl?: string | null;
  latitude: number;
  longitude: number;
}

const createPinIcon = (active: boolean) =>
  L.divIcon({
    className: "",
    html: `<span style="
      display:block;width:${active ? 20 : 14}px;height:${active ? 20 : 14}px;border-radius:9999px;
      background:hsl(38 65% 58%);box-shadow:0 0 0 4px hsla(38,65%,58%,0.25),0 4px 12px rgba(0,0,0,.5);
      border:2px solid hsl(40 20% 6%);"></span>`,
    iconSize: [active ? 20 : 14, active ? 20 : 14],
    iconAnchor: [active ? 10 : 7, active ? 10 : 7],
  });

const MapFocus = ({ target }: { target: MapPoint | null }) => {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.latitude, target.longitude], 9, { duration: 1.2 });
  }, [target, map]);
  return null;
};

const UserLocation = ({ request, onDone }: { request: number; onDone: () => void }) => {
  const map = useMap();
  useEffect(() => {
    if (!request || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        map.flyTo([coords.latitude, coords.longitude], 8, { duration: 1.2 });
        L.circleMarker([coords.latitude, coords.longitude], {
          radius: 8,
          color: "hsl(150 35% 45%)",
          fillColor: "hsl(150 35% 45%)",
          fillOpacity: 0.6,
        })
          .addTo(map)
          .bindPopup("You are here");
        onDone();
      },
      () => onDone(),
    );
  }, [request, map, onDone]);
  return null;
};

interface WorldMapProps {
  points: MapPoint[];
  focused: MapPoint | null;
  locateRequest?: number;
  onLocateDone?: () => void;
  className?: string;
}

const WorldMap = ({ points, focused, locateRequest = 0, onLocateDone, className }: WorldMapProps) => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);
  const center = useMemo<[number, number]>(
    () => (points.length ? [points[0].latitude, points[0].longitude] : [27.98, 86.92]),
    [points],
  );

  return (
    <MapContainer
      center={center}
      zoom={2}
      minZoom={2}
      worldCopyJump
      scrollWheelZoom
      zoomControl={false}
      className={className}
      style={{ background: "hsl(var(--muted))" }}
    >
      <ZoomControl position="bottomright" />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Terrain">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
            url="https://a.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri, Maxar, Earthstar Geographics"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Street">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <MapFocus target={focused} />
      {onLocateDone && <UserLocation request={locateRequest} onDone={onLocateDone} />}

      {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.latitude, point.longitude]}
          icon={createPinIcon(activeId === point.id || focused?.id === point.id)}
          eventHandlers={{ click: () => setActiveId(point.id) }}
        >
          <Popup>
            <div className="w-52">
              {point.imageUrl && (
                <img src={point.imageUrl} alt={point.title} className="w-full h-24 object-cover rounded-md mb-2" />
              )}
              <p className="font-semibold text-sm mb-0.5">{point.title}</p>
              <p className="text-xs opacity-70 mb-1">{point.location || point.country}</p>
              <div className="flex items-center gap-2 text-xs mb-2">
                {typeof point.rating === "number" && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="w-3 h-3" /> {point.rating.toFixed(1)}
                  </span>
                )}
                {point.difficulty && <span className="opacity-70">{point.difficulty}</span>}
              </div>
              <button
                onClick={() => navigate(`/destination/${point.slug}`)}
                className="inline-flex items-center gap-1 text-xs font-semibold underline"
              >
                View expedition <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;
