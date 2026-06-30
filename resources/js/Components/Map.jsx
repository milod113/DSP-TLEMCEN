import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map({ etablissements, height = '500px' }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const [selectedId, setSelectedId] = useState(null);

    const hasCoords = etablissements?.some(e => e.latitude && e.longitude);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current || !hasCoords) return;

        const map = L.map(mapRef.current, {
            center: [34.8833, -1.3167],
            zoom: 11,
            zoomControl: true,
            fadeAnimation: true,
            zoomAnimation: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18,
        }).addTo(map);

        const bounds = [];
        const markers = [];

        etablissements.forEach(e => {
            if (!e.latitude || !e.longitude) return;

            const lat = parseFloat(e.latitude);
            const lng = parseFloat(e.longitude);
            if (isNaN(lat) || isNaN(lng)) return;

            const marker = L.marker([lat, lng], {
                riseOnHover: true,
            }).addTo(map);

            marker.bindPopup(`
                <div style="font-family: system-ui, sans-serif; min-width: 220px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                        <strong style="font-size:14px;color:#0A2540;">${e.nom_fr}</strong>
                        <span style="font-size:11px;background:#E8F1F8;color:#0F4C81;padding:2px 8px;border-radius:6px;font-weight:600;">${e.type}</span>
                    </div>
                    <p style="font-size:12px;color:#5C7184;margin:0 0 4px;">📍 ${e.adresse_fr || ''}</p>
                    ${e.telephone ? `<p style="font-size:12px;color:#5C7184;margin:0 0 4px;">📞 ${e.telephone}</p>` : ''}
                    ${e.horaires ? `<p style="font-size:12px;color:#5C7184;margin:0;">🕐 ${e.horaires}</p>` : ''}
                    <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" style="display:inline-block;margin-top:8px;font-size:12px;color:#0F4C81;font-weight:500;text-decoration:none;">
                        Voir sur Google Maps →
                    </a>
                </div>
            `);

            marker.on('click', () => {
                setSelectedId(e.id);
            });

            bounds.push([lat, lng]);
            markers.push({ id: e.id, marker, lat, lng, data: e });
        });

        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        markersRef.current = markers;
        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
            markersRef.current = [];
        };
    }, [etablissements, hasCoords]);

    const focusMarker = (id) => {
        const found = markersRef.current.find(m => m.id === id);
        if (found) {
            mapInstanceRef.current?.flyTo([found.lat, found.lng], 15, { duration: 0.6 });
            found.marker.openPopup();
            setSelectedId(id);
        }
    };

    // --- NO COORDINATES FALLBACK ---
    if (!hasCoords) {
        return (
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] overflow-hidden" style={{ height }}>
                <div className="bg-gradient-to-r from-[#0A2540] to-[#0F4C81] px-6 py-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Carte des établissements
                    </h3>
                </div>
                <div className="p-6 text-center flex flex-col items-center justify-center" style={{ height: `calc(${height} - 60px)` }}>
                    <div className="text-5xl mb-4 opacity-30">🗺️</div>
                    <p className="text-[#5C7184] font-medium mb-1">Carte interactive non disponible</p>
                    <p className="text-sm text-[#8A9FB0]">
                        {etablissements?.length || 0} établissement{(etablissements?.length || 0) > 1 ? 's' : ''} répertorié{(etablissements?.length || 0) > 1 ? 's' : ''}
                    </p>
                    <div className="mt-6 w-full max-h-64 overflow-y-auto space-y-3 text-left max-w-md">
                        {etablissements?.map(e => (
                            <div key={e.id} className="bg-[#F7F9FB] rounded-xl p-4 border border-[#DCE6EF]">
                                <div className="flex items-center justify-between mb-1">
                                    <strong className="text-sm text-[#13243A]">{e.nom_fr}</strong>
                                    <span className="text-[11px] bg-[#E8F1F8] text-[#0F4C81] px-2 py-0.5 rounded font-semibold">{e.type}</span>
                                </div>
                                <p className="text-xs text-[#5C7184]">{e.adresse_fr}</p>
                                {e.telephone && <p className="text-xs text-[#8A9FB0] mt-1">📞 {e.telephone}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- INTERACTIVE MAP ---
    return (
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0A2540] to-[#0F4C81] px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Carte interactive des établissements
                </h3>
                <span className="text-xs text-blue-200 bg-white/10 px-3 py-1 rounded-full">
                    {etablissements.filter(e => e.latitude && e.longitude).length} établissements
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Map */}
                <div className="lg:col-span-2 relative" style={{ height }} ref={mapRef} />

                {/* Sidebar list */}
                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-[#DCE6EF] bg-[#FAFBFC]">
                    <div className="p-3 border-b border-[#DCE6EF] bg-white">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A9FB0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full border border-[#DCE6EF] rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition"
                                onInput={(e) => {
                                    const q = e.target.value.toLowerCase();
                                    document.querySelectorAll('.etab-list-item').forEach(el => {
                                        const txt = el.textContent.toLowerCase();
                                        el.style.display = txt.includes(q) ? '' : 'none';
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto" style={{ height: `calc(${height} - 57px)` }}>
                        {etablissements.map(e => (
                            <div
                                key={e.id}
                                className={`etab-list-item p-4 border-b border-[#DCE6EF] cursor-pointer transition-all ${
                                    selectedId === e.id ? 'bg-blue-50 border-l-4 border-l-[#0F4C81]' : 'hover:bg-white border-l-4 border-l-transparent'
                                }`}
                                onClick={() => focusMarker(e.id)}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h4 className={`text-sm font-semibold truncate ${selectedId === e.id ? 'text-[#0F4C81]' : 'text-[#13243A]'}`}>
                                            {e.nom_fr}
                                        </h4>
                                        <p className="text-xs text-[#5C7184] mt-0.5 line-clamp-1">{e.adresse_fr}</p>
                                        <div className="flex flex-wrap gap-2 mt-1.5">
                                            <span className="text-[10px] bg-[#E8F1F8] text-[#0F4C81] px-2 py-0.5 rounded font-semibold">{e.type}</span>
                                            {e.telephone && <span className="text-[10px] text-[#8A9FB0]">📞 {e.telephone}</span>}
                                        </div>
                                    </div>
                                    <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full ${
                                        e.latitude && e.longitude
                                            ? 'bg-[#E8F1F8] text-[#0F4C81]'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
