import { Head, Link, usePage } from '@inertiajs/react';
import PageHero from '../../Components/PageHero';

export default function ProfessionnelShow({ note, related }) {
    const { messages, locale, pageContents } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const isRtl = locale === 'ar';

    const typeColors = {
        note: { bg: 'bg-blue-100 text-blue-700 border-blue-200', icon: '📋', label: 'Note' },
        circulaire: { bg: 'bg-purple-100 text-purple-700 border-purple-200', icon: '🔄', label: 'Circulaire' },
        formation: { bg: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: '🎓', label: 'Formation' },
        annonce: { bg: 'bg-orange-100 text-orange-700 border-orange-200', icon: '📢', label: 'Annonce' },
    };

    const tc = typeColors[note.type] || { bg: 'bg-gray-100 text-gray-700 border-gray-200', icon: '📄', label: note.type };

    const title = isRtl && note.titre_ar ? note.titre_ar : note.titre_fr;
    const content = isRtl && note.contenu_ar ? note.contenu_ar : note.contenu_fr;

    return (
        <>
            <Head title={title} />

            <PageHero
                title={title}
                description={`${tc.icon} ${tc.label}`}
                badge={m('professionnels_sante')}
            />

            <div className="mx-auto max-w-4xl px-4 pb-16 md:pb-20">
                <div className="-mt-6 relative z-10 space-y-8">
                    {/* Back link */}
                    <Link href={route('professionnels')} className="inline-flex items-center gap-2 text-sm font-medium text-[#0F4C81] hover:text-[#0A2540] transition">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux notes professionnelles
                    </Link>

                    {/* Main card */}
                    <article className="rounded-3xl border border-[#DCE6EF] bg-white overflow-hidden shadow-[0_8px_30px_-12px_rgba(10,37,64,0.10)]">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#F7F9FB] to-white border-b border-[#DCE6EF] px-8 py-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border ${tc.bg}`}>
                                    {tc.icon} {tc.label}
                                </span>
                                <span className="text-xs text-[#8A9FB0]">
                                    {new Date(note.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-[#0A2540] md:text-[1.6rem]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                {title}
                            </h1>
                            {note.source && (
                                <p className="mt-2 text-xs text-[#8A9FB0]">
                                    Source : {note.source}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="px-8 py-8">
                            <div className="prose prose-sm max-w-none text-[#45596B] leading-relaxed whitespace-pre-line">
                                {content}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#DCE6EF] px-8 py-5 bg-[#F8FBFD] flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-xs text-[#8A9FB0]">
                                <span>Publié le {new Date(note.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                {note.updated_at !== note.created_at && (
                                    <span>· Mis à jour le {new Date(note.updated_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                )}
                            </div>
                            {note.fichier && (
                                <a href={`/storage/${note.fichier}`} target="_blank"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0A2540] shadow-md"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Télécharger le fichier
                                </a>
                            )}
                        </div>
                    </article>

                    {/* Related */}
                    {related?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-[#0A2540] mb-5" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                                Notes similaires
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {related.map((item) => {
                                    const rtc = typeColors[item.type] || { bg: 'bg-gray-100 text-gray-700 border-gray-200', icon: '📄' };
                                    return (
                                        <Link key={item.id} href={route('professionnels.show', item.id)}
                                            className="group rounded-2xl border border-[#DCE6EF] bg-white p-5 transition-all duration-300 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] hover:-translate-y-1"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-sm">{rtc.icon}</span>
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${rtc.bg}`}>{item.type}</span>
                                            </div>
                                            <h3 className="text-sm font-semibold text-[#13243A] group-hover:text-[#0F4C81] transition line-clamp-2">
                                                {isRtl && item.titre_ar ? item.titre_ar : item.titre_fr}
                                            </h3>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
