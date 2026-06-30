import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * FacilityMap — carte Leaflet interactive des établissements de santé.
 *
 * IMPORTANT — à faire une seule fois côté projet :
 *   npm install leaflet react-leaflet
 *   import 'leaflet/dist/leaflet.css';  (dans app.jsx / layout principal)
 *
 * Props attendues :
 *   facilities: [{ id, name, type, commune, lat, lng, href }]
 *   Si non fourni, des exemples de communes de la wilaya de Tlemcen sont utilisés —
 *   à remplacer par les vraies coordonnées GPS de vos établissements (table `etablissements`).
 */

// Centre approximatif de la wilaya de Tlemcen
const TLEMCEN_CENTER = [34.8783, -1.3150];

const DEFAULT_FACILITIES = [
    { id: 1, name: 'EHU Tlemcen', type: 'Hôpital', commune: 'Tlemcen', lat: 34.8828, lng: -1.3169 },
    { id: 2, name: 'Polyclinique Maghnia', type: 'Polyclinique', commune: 'Maghnia', lat: 34.8443, lng: -1.7150 },
    { id: 3, name: 'Polyclinique Remchi', type: 'Polyclinique', commune: 'Remchi', lat: 35.0444, lng: -1.4133 },
    { id: 4, name: 'Salle de soins Nedroma', type: 'Salle de soins', commune: 'Nedroma', lat: 35.0117, lng: -1.7503 },
    { id: 5, name: 'Polyclinique Ghazaouet', type: 'Polyclinique', commune: 'Ghazaouet', lat: 35.0972, lng: -1.8631 },
    { id: 6, name: 'Polyclinique Sebdou', type: 'Polyclinique', commune: 'Sebdou', lat: 34.6494, lng: -1.3392 },
    { id: 7, name: 'Salle de soins Sidi Bel Abbès Rd', type: 'Salle de soins', commune: 'Bensekrane', lat: 34.9939, lng: -1.1539 },
    { id: 8, name: 'Polyclinique Sebra', type: 'Polyclinique', commune: 'El Aricha', lat: 34.3097, lng: -1.2697 },
];

const typeStyles = {
    'Hôpital': { ring: '#0F4C81', fill: '#E6F1FB' },
    'Polyclinique': { ring: '#2F8F6F', fill: '#EAF3DE' },
    'Salle de soins': { ring: '#BA7517', fill: '#FAEEDA' },
};

function makeDivIcon(color) {
    return L.divIcon({
        className: '',
        html: `<span style="display:block;width:14px;height:14px;border-radius:50%;background:${color.fill};border:2.5px solid ${color.ring};box-shadow:0 1px 4px rgba(10,37,64,0.35)"></span>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -10],
    });
}

function FlyToFacility({ facility }) {
    const map = useMap();
    if (facility) {
        map.flyTo([facility.lat, facility.lng], 11, { duration: 0.6 });
    }
    return null;
}

export default function FacilityMap({ facilities, isAr, etablissementsRoute }) {
    const data = facilities && facilities.length > 0 ? facilities : DEFAULT_FACILITIES;
    const [activeId, setActiveId] = useState(null);
    const [filterType, setFilterType] = useState('all');

    const types = useMemo(() => ['all', ...new Set(data.map((f) => f.type))], [data]);
    const filtered = useMemo(
        () => (filterType === 'all' ? data : data.filter((f) => f.type === filterType)),
        [data, filterType]
    );
    const activeFacility = data.find((f) => f.id === activeId) || null;

    const t = {
        title: isAr ? 'الخريطة الصحية' : 'Carte sanitaire',
        subtitle: isAr ? 'مؤسسات الصحة في ولاية تلمسان' : 'Établissements de santé dans la wilaya de Tlemcen',
        all: isAr ? 'الكل' : 'Tous',
        viewAll: isAr ? 'عرض كل المؤسسات' : 'Voir tous les établissements',
    };

    const typeLabel = (type) => {
        if (type === 'all') return t.all;
        return type;
    };

    return (
        <div className="overflow-hidden rounded-3xl border border-[#DCE6EF] bg-white shadow-[0_10px_30px_-18px_rgba(10,37,64,0.18)]">
            <div className="flex flex-col gap-4 border-b border-[#DCE6EF] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#0F4C81]">{t.title}</p>
                    <h3 className="mt-1 text-lg font-semibold text-[#0A2540]" style={{ fontFamily: "'Fraunces', serif" }}>
                        {t.subtitle}
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setFilterType(type)}
                            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                                filterType === type
                                    ? 'border-[#0F4C81] bg-[#0F4C81] text-white'
                                    : 'border-[#DCE6EF] bg-white text-[#45596B] hover:border-[#B7CCDE]'
                            }`}
                        >
                            {typeLabel(type)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-[380px] w-full">
                <MapContainer
                    center={TLEMCEN_CENTER}
                    zoom={9}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {activeFacility && <FlyToFacility facility={activeFacility} />}
                    {filtered.map((facility) => (
                        <Marker
                            key={facility.id}
                            position={[facility.lat, facility.lng]}
                            icon={makeDivIcon(typeStyles[facility.type] || typeStyles['Polyclinique'])}
                            eventHandlers={{ click: () => setActiveId(facility.id) }}
                        >
                            <Popup>
                                <div style={{ fontFamily: "'Inter', sans-serif", minWidth: 160 }}>
                                    <div style={{ fontWeight: 600, color: '#0A2540', marginBottom: 2 }}>{facility.name}</div>
                                    <div style={{ fontSize: 12, color: '#5C7184' }}>{facility.type} · {facility.commune}</div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE6EF] p-5">
                <div className="flex flex-wrap gap-4">
                    {Object.entries(typeStyles).map(([type, color]) => (
                        <div key={type} className="flex items-center gap-2 text-[12.5px] text-[#5C7184]">
                            <span
                                className="inline-block h-3 w-3 rounded-full"
                                style={{ background: color.fill, border: `2px solid ${color.ring}` }}
                            />
                            {type}
                        </div>
                    ))}
                </div>
                {etablissementsRoute && (
                    <a href={etablissementsRoute} className="text-sm font-medium text-[#0F4C81] hover:text-[#0A2540]">
                        {t.viewAll} →
                    </a>
                )}
            </div>
        </div>
    );
}
