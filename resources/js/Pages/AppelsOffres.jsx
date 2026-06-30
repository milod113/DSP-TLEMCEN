import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function AppelsOffres({ items }) {
    const { messages, pageContents } = usePage().props;
    const m = (key) => messages?.[key] || key;

    const now = new Date();
    const getStatus = (item) => {
        if (!item.date_limite) return { label: 'Permanent', color: 'blue', icon: '🔄', classes: 'bg-blue-100 text-blue-700 border-blue-200' };
        const expired = new Date(item.date_limite) < now;
        const daysLeft = Math.ceil((new Date(item.date_limite) - now) / (1000 * 60 * 60 * 24));
        if (expired) return { label: 'Expiré', color: 'red', icon: '⏰', classes: 'bg-red-100 text-red-700 border-red-200' };
        if (daysLeft <= 7) return { label: `Urgent • ${daysLeft}j`, color: 'orange', icon: '⚡', classes: 'bg-orange-100 text-orange-700 border-orange-200' };
        if (daysLeft <= 30) return { label: `${daysLeft} jours`, color: 'yellow', icon: '📅', classes: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
        return { label: 'Ouvert', color: 'green', icon: '✅', classes: 'bg-green-100 text-green-700 border-green-200' };
    };

    const activeItems = items?.data?.filter(i => !i.date_limite || new Date(i.date_limite) >= now) || [];

    return (
        <>
            <Head title={m('appels_offres')} />

            <PageHero
                title={m('appels_offres')}
                description={pageContents?.appels_offres_hero_description?.value_fr || 'Consultez tous les appels d\'offres et marchés publics de la DSP Tlemcen'}
                badge="Marchés publics"
                stats={items?.total ? [
                    `Total: ${items.total}`,
                    ...(activeItems.length > 0 ? [`Actifs: ${activeItems.length}`] : []),
                ] : null}
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                {/* Filters */}
                <div className="-mt-6 relative z-10 mb-8">
                    <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 shadow-[0_4px_20px_-8px_rgba(10,37,64,0.08)] border border-[#DCE6EF]">
                        <button className="rounded-xl bg-[#0F4C81] px-4 py-2 text-sm font-medium text-white shadow-sm">Tous</button>
                        <button className="rounded-xl border border-[#DCE6EF] bg-white px-4 py-2 text-sm font-medium text-[#13243A] hover:border-[#0F4C81] transition">Actifs</button>
                        <button className="rounded-xl border border-[#DCE6EF] bg-white px-4 py-2 text-sm font-medium text-[#13243A] hover:border-[#0F4C81] transition">Expirés</button>
                    </div>
                </div>

                {items?.data?.length > 0 ? (
                    <div className="space-y-4">
                        {items.data.map((item) => {
                            const status = getStatus(item);
                            const expired = status.color === 'red';
                            return (
                                <div key={item.id} className={`group relative overflow-hidden rounded-2xl border ${expired ? 'border-red-100 opacity-75' : 'border-[#DCE6EF]'} bg-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)] hover:border-[#B7CCDE] ${!expired && 'hover:-translate-y-0.5'}`}>
                                    <div className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${expired ? 'bg-red-400' : 'bg-[#0F4C81]'}`} />
                                    <div className="pl-4">
                                        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <Link href={route('appels-offres.show', item.id)} className={`text-lg font-semibold ${expired ? 'text-gray-500' : 'text-[#13243A]'} transition group-hover:text-[#0F4C81]`} style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                                                        {item.titre_fr}
                                                    </Link>
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-medium ${status.classes}`}>
                                                        {status.icon} {status.label}
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#5C7184]">
                                                    <span className="flex items-center gap-1.5">
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {new Date(item.date_publication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                    {item.date_limite && (
                                                        <span className={`flex items-center gap-1.5 ${expired ? 'text-red-500' : ''}`}>
                                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {new Date(item.date_limite).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {item.fichier && (
                                                <a href={`/storage/${item.fichier}`} target="_blank" className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition shadow-sm ${expired ? 'bg-gray-100 text-gray-500' : 'bg-[#0F4C81] text-white hover:bg-[#0A2540] hover:shadow-md'}`}>
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Télécharger
                                                </a>
                                            )}
                                        </div>
                                        {item.description_fr && (
                                            <p className={`mt-3 text-sm leading-relaxed ${expired ? 'text-gray-400' : 'text-[#5C7184]'} line-clamp-2`}>
                                                {item.description_fr}
                                            </p>
                                        )}
                                        <div className="mt-4">
                                            <Link href={route('appels-offres.show', item.id)} className="inline-flex items-center gap-2 text-sm font-medium text-[#0F4C81] transition hover:text-[#0A2540]">
                                                Voir details
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F9FB] text-4xl">📋</div>
                        <h3 className="text-lg font-semibold text-[#13243A]">Aucun appel d'offres</h3>
                        <p className="mt-2 text-[#5C7184]">Revenez plus tard pour les nouvelles opportunités.</p>
                        <Link href={route('home')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0A2540] shadow-md">Retour à l'accueil</Link>
                    </div>
                )}
            </div>
        </>
    );
}
