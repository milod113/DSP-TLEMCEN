import { Head, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Recrutements({ items }) {
    const { messages, pageContents } = usePage().props;
    const m = (key) => messages?.[key] || key;

    const typeColors = {
        recrutement: 'bg-blue-100 text-blue-700 border-blue-200',
        concours: 'bg-purple-100 text-purple-700 border-purple-200',
        resultat: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };

    return (
        <>
            <Head title={m('recrutements')} />

            <PageHero
                title={`${m('recrutements')} & ${m('concours')}`}
                description="Consultez les offres de recrutement et les résultats des concours de la DSP Tlemcen."
                badge="Recrutement"
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                {items?.data?.length > 0 ? (
                    <div className="-mt-6 relative z-10 space-y-4">
                        {items.data.map((item) => (
                            <div key={item.id} className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 transition-all duration-300 hover:border-[#B7CCDE] hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] hover:-translate-y-0.5">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${typeColors[item.type] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                                {item.type}
                                            </span>
                                            <span className="text-xs text-[#8A9FB0]">{new Date(item.date_publication).toLocaleDateString('fr-FR')}</span>
                                        </div>
                                        <h3 className="font-bold text-[#13243A] group-hover:text-[#0F4C81] transition">{item.titre_fr}</h3>
                                        <p className="text-sm text-[#5C7184] mt-2">{item.description_fr}</p>
                                    </div>
                                    {item.fichier && (
                                        <a href={`/storage/${item.fichier}`} target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-[#F7F9FB] border border-[#DCE6EF] px-4 py-2 text-sm font-medium text-[#0F4C81] transition hover:bg-[#0F4C81] hover:text-white hover:shadow-md shrink-0">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Télécharger
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F9FB] text-4xl">💼</div>
                        <p className="text-[#5C7184]">Aucune offre de recrutement pour le moment.</p>
                    </div>
                )}
            </div>
        </>
    );
}
