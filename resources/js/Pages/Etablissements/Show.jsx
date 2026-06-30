import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function EtablissementShow({ etablissement }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const hasCoords = etablissement.latitude && etablissement.longitude;

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current || !hasCoords) return;
        const lat = parseFloat(etablissement.latitude);
        const lng = parseFloat(etablissement.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

        const map = L.map(mapRef.current, { center: [lat, lng], zoom: 15, zoomControl: true });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 18,
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<strong>${etablissement.nom_fr}</strong><br/>${etablissement.adresse_fr || ''}`)
            .openPopup();

        mapInstanceRef.current = map;
        return () => { map.remove(); mapInstanceRef.current = null; };
    }, [hasCoords]);

    return (
        <>
            <Head title={etablissement.nom_fr} />

            <div className="mx-auto max-w-5xl px-4 py-8">
                {/* Back link */}
                <Link href={route('etablissements')} className="inline-flex items-center gap-2 text-sm font-medium text-[#0F4C81] hover:text-[#0A2540] transition mb-6">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux établissements
                </Link>

                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A2540] to-[#0F4C81] p-8 mb-8">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1A5A8C_0%,_transparent_60%)] opacity-30" />
                    <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[11px] font-semibold bg-white/20 text-white px-3 py-1 rounded-full">{etablissement.type}</span>
                                {etablissement.is_active && <span className="text-[11px] text-emerald-300">● Actif</span>}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                {etablissement.nom_fr}
                            </h1>
                            {etablissement.nom_ar && (
                                <p className="text-xl text-blue-200 mt-1" dir="rtl">{etablissement.nom_ar}</p>
                            )}
                        </div>
                        {etablissement.responsable && (
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center md:text-right">
                                <p className="text-[11px] text-blue-200 uppercase tracking-wider">Responsable</p>
                                <p className="text-sm font-semibold text-white">{etablissement.responsable}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Address */}
                    <div className="bg-white rounded-2xl border border-[#DCE6EF] p-6 transition hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.08)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F1F8] text-[#0F4C81]">📍</div>
                            <h3 className="font-semibold text-[#13243A]">{m('adresse')}</h3>
                        </div>
                        <p className="text-sm text-[#5C7184]">{etablissement.adresse_fr}</p>
                        {etablissement.adresse_ar && <p className="text-sm text-[#5C7184] mt-1" dir="rtl">{etablissement.adresse_ar}</p>}
                    </div>

                    {/* Contact */}
                    <div className="bg-white rounded-2xl border border-[#DCE6EF] p-6 transition hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.08)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F1F8] text-[#0F4C81]">📞</div>
                            <h3 className="font-semibold text-[#13243A]">Contact</h3>
                        </div>
                        <div className="space-y-2 text-sm text-[#5C7184]">
                            <p><span className="font-medium text-[#13243A]">{m('telephone')} :</span> {etablissement.telephone || 'Non renseigné'}</p>
                            {etablissement.email && <p><span className="font-medium text-[#13243A]">{m('email')} :</span> {etablissement.email}</p>}
                            {etablissement.horaires && <p><span className="font-medium text-[#13243A]">Horaires :</span> {etablissement.horaires}</p>}
                        </div>
                    </div>

                    {/* Specialités */}
                    {etablissement.specialites_fr && (
                        <div className="md:col-span-2 bg-white rounded-2xl border border-[#DCE6EF] p-6 transition hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.08)]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F1F8] text-[#0F4C81]">🩺</div>
                                <h3 className="font-semibold text-[#13243A]">Spécialités</h3>
                            </div>
                            <p className="text-sm text-[#5C7184]">{etablissement.specialites_fr}</p>
                        </div>
                    )}
                </div>

                {/* Map */}
                {hasCoords && (
                    <div className="rounded-2xl overflow-hidden border border-[#DCE6EF] shadow-[0_8px_30px_-8px_rgba(10,37,64,0.08)]">
                        <div className="bg-gradient-to-r from-[#0A2540] to-[#0F4C81] px-6 py-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                Localisation
                            </h3>
                            <a href={`https://www.google.com/maps?q=${etablissement.latitude},${etablissement.longitude}`} target="_blank" className="text-xs text-blue-200 hover:text-white transition">
                                Google Maps ↗
                            </a>
                        </div>
                        <div ref={mapRef} style={{ height: '350px' }} />
                    </div>
                )}
            </div>
        </>
    );
}
