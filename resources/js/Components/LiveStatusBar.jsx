import { useEffect, useState } from 'react';

/**
 * LiveStatusBar — bande d'indicateurs "temps réel".
 *
 * BRANCHEMENT BACKEND (à faire plus tard) :
 * Remplacer les valeurs par défaut par un fetch vers un endpoint, par ex.:
 *   GET /api/live-status -> { openNow, avgWaitMinutes, lastUpdated }
 * et passer `liveStatus` en prop depuis le contrôleur Inertia, ou faire un
 * polling côté client (voir useEffect commenté plus bas).
 */
export default function LiveStatusBar({ liveStatus, isAr }) {
    const data = {
        openNow: liveStatus?.openNow ?? 42,
        totalFacilities: liveStatus?.totalFacilities ?? 58,
        avgWaitMinutes: liveStatus?.avgWaitMinutes ?? 12,
        lastUpdated: liveStatus?.lastUpdated ?? null,
    };

    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(interval);
        // BRANCHEMENT FUTUR : remplacer ce timer par un polling réel, ex.
        // const interval = setInterval(() => {
        //     fetch('/api/live-status').then(r => r.json()).then(setLiveData);
        // }, 60000);
    }, []);

    const formattedTime = (data.lastUpdated ? new Date(data.lastUpdated) : now).toLocaleTimeString(
        isAr ? 'ar-DZ' : 'fr-FR',
        { hour: '2-digit', minute: '2-digit' }
    );

    const items = [
        {
            label: isAr ? 'مؤسسات مفتوحة الآن' : 'Établissements ouverts',
            value: `${data.openNow}/${data.totalFacilities}`,
            dot: 'bg-emerald-400',
        },
        {
            label: isAr ? 'متوسط وقت الانتظار' : "Temps d'attente moyen",
            value: isAr ? `${data.avgWaitMinutes} د` : `${data.avgWaitMinutes} min`,
            dot: 'bg-amber-400',
        },
        {
            label: isAr ? 'آخر تحديث' : 'Dernière mise à jour',
            value: formattedTime,
            dot: 'bg-[#5A8FC4]',
        },
    ];

    return (
        <div
            className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 backdrop-blur-sm md:justify-between"
            role="status"
            aria-live="polite"
        >
            {items.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-[13px] text-[#C9DDEE]">
                    <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${item.dot} animate-pulse`} aria-hidden="true" />
                    <span className="text-[#8DB6DA]">{item.label}</span>
                    <span className="font-semibold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
