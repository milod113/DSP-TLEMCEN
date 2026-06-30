import { Head, Link, usePage } from '@inertiajs/react';
import Map from '../Components/Map';
import PageHero from '../Components/PageHero';

export default function Etablissements({ etablissements, types, filters }) {
    const { messages, pageContents, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;

    const typeColors = {
        'CHU': 'bg-red-100 text-red-800 border-red-200',
        'EPH': 'bg-orange-100 text-orange-800 border-orange-200',
        'EPSP': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'Polyclinique': 'bg-emerald-100 text-emerald-800 border-emerald-200',
        'Salle de soins': 'bg-blue-100 text-blue-800 border-blue-200',
        'Maternité': 'bg-pink-100 text-pink-800 border-pink-200',
        'Urgence': 'bg-purple-100 text-purple-800 border-purple-200',
        'Privé': 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
        <>
            <Head title={m('etablissements_sante')} />
            
            <PageHero
                title={m('etablissements_sante')}
                description={pageContents?.etablissements_hero_description?.value_fr || 'Retrouvez tous les établissements de santé de la wilaya de Tlemcen'}
                badge="Carte sanitaire"
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                {/* Filters */}
                <div className="-mt-8 relative z-10 mb-8 rounded-2xl bg-white p-6 shadow-[0_8px_40px_-12px_rgba(10,37,64,0.12)]">
                    <form method="GET" action={route('etablissements')} className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#5C7184] mb-1.5">{m('rechercher')}</label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A9FB0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input type="text" name="search" defaultValue={filters?.search} placeholder={m('rechercher')} className="w-full border border-[#DCE6EF] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#5C7184] mb-1.5">Type</label>
                            <select name="type" defaultValue={filters?.type} className="border border-[#DCE6EF] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition">
                                <option value="">Tous les types</option>
                                {types?.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="bg-[#0F4C81] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0A2540] transition shadow-md">
                            Filtrer
                        </button>
                    </form>
                </div>

                {/* Map */}
                <div className="mb-8 overflow-hidden rounded-2xl shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)]">
                    <Map etablissements={etablissements} height="400px" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {etablissements?.map((etab) => {
                        const colorClasses = typeColors[etab.type] || 'bg-gray-100 text-gray-800 border-gray-200';
                        return (
                            <Link key={etab.id} href={route('etablissements.show', etab.id)} className="group relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white p-5 transition-all duration-300 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.12)] hover:-translate-y-1">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-[#13243A] group-hover:text-[#0F4C81] transition">{etab.nom_fr}</h3>
                                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${colorClasses} whitespace-nowrap`}>
                                        {etab.type}
                                    </span>
                                </div>
                                <p className="text-sm text-[#5C7184] mb-3 line-clamp-2">{etab.adresse_fr}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-[#8A9FB0]">
                                    {etab.telephone && <span className="flex items-center gap-1.5">📞 {etab.telephone}</span>}
                                    {etab.horaires && <span className="flex items-center gap-1.5">🕐 {etab.horaires}</span>}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {etablissements?.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F9FB] text-3xl">🏥</div>
                        <p className="text-[#5C7184]">Aucun établissement trouvé.</p>
                    </div>
                )}
            </div>
        </>
    );
}
