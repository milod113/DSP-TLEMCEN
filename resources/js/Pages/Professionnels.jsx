import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Professionnels({ notes }) {
    const { messages, pageContents, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isRtl = locale === 'ar';

    const typeColors = {
        note: { bg: 'bg-blue-100 text-blue-700 border-blue-200', icon: '📋' },
        circulaire: { bg: 'bg-purple-100 text-purple-700 border-purple-200', icon: '🔄' },
        formation: { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: '🎓' },
        annonce: { bg: 'bg-orange-100 text-orange-700 border-orange-200', icon: '📢' },
    };

    return (
        <>
            <Head title={m('professionnels_sante')} />

            <PageHero
                title={m('professionnels_sante')}
                description={pageContents?.professionnels_hero_description?.value_fr || 'Notes, circulaires et informations destinées aux professionnels de santé.'}
                badge="Espace professionnels"
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                {notes?.data?.length > 0 ? (
                    <div className="-mt-6 relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {notes.data.map((note) => {
                            const tc = typeColors[note.type] || { bg: 'bg-gray-100 text-gray-700 border-gray-200', icon: '📄' };
                            const title = isRtl && note.titre_ar ? note.titre_ar : note.titre_fr;
                            return (
                                <Link key={note.id} href={route('professionnels.show', note.id)} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 transition-all duration-300 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] hover:-translate-y-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-lg">{tc.icon}</span>
                                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${tc.bg}`}>{note.type}</span>
                                    </div>
                                    <h3 className="font-bold text-[#13243A] group-hover:text-[#0F4C81] transition">{title}</h3>
                                    <p className="text-sm text-[#5C7184] mt-2 line-clamp-3">{isRtl && note.contenu_ar ? note.contenu_ar?.substring(0, 120) : note.contenu_fr?.substring(0, 120)}...</p>
                                    {note.fichier && (
                                        <div onClick={e => e.stopPropagation()} className="mt-4">
                                            <a href={`/storage/${note.fichier}`} target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-[#F7F9FB] border border-[#DCE6EF] px-4 py-2 text-sm font-medium text-[#0F4C81] transition hover:bg-[#0F4C81] hover:text-white hover:shadow-md">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Télécharger
                                            </a>
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F9FB] text-3xl">👨‍⚕️</div>
                        <p className="text-[#5C7184]">Aucune note pour le moment.</p>
                    </div>
                )}
            </div>
        </>
    );
}
