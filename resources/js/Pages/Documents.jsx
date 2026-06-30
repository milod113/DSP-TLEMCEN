import { Head, usePage } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Documents() {
    const { messages, pageContents } = usePage().props;
    const m = (key) => messages?.[key] || key;

    return (
        <>
            <Head title={m('documents_utiles')} />

            <PageHero
                title={m('documents_utiles')}
                description={pageContents?.documents_hero_description?.value_fr || 'Téléchargez les documents administratifs et formulaires utiles.'}
                badge="Documents"
            />

            <div className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
                <div className="-mt-6 relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Formulaires */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] hover:-translate-y-1">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-xl">📋</div>
                            <h2 className="font-bold text-[#13243A] text-lg" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>Formulaires administratifs</h2>
                        </div>
                        <ul className="space-y-3">
                            {['Demande d\'acte', 'Attestation', 'Formulaire de renseignement'].map((doc, j) => (
                                <li key={j} className="flex items-center gap-3 rounded-xl bg-[#F7F9FB] p-3 text-sm text-[#13243A] transition hover:bg-blue-50 hover:text-[#0F4C81] cursor-pointer">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm">📄</span>
                                    <span className="font-medium">{doc}</span>
                                    <span className="ml-auto text-[#8A9FB0]">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Circulaires */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white p-6 transition-all duration-300 hover:border-purple-200 hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] hover:-translate-y-1">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 text-xl">🔄</div>
                            <h2 className="font-bold text-[#13243A] text-lg" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>Circulaires</h2>
                        </div>
                        <ul className="space-y-3">
                            {['Circulaire n°001/2024', 'Circulaire n°002/2024'].map((doc, j) => (
                                <li key={j} className="flex items-center gap-3 rounded-xl bg-[#F7F9FB] p-3 text-sm text-[#13243A] transition hover:bg-purple-50 hover:text-purple-700 cursor-pointer">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm">📄</span>
                                    <span className="font-medium">{doc}</span>
                                    <span className="ml-auto text-[#8A9FB0]">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Notes officielles */}
                    <div className="relative overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white p-6 transition-all duration-300 hover:border-emerald-200 hover:shadow-[0_8px_30px_-8px_rgba(10,37,64,0.10)] hover:-translate-y-1">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-xl">📝</div>
                            <h2 className="font-bold text-[#13243A] text-lg" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>Notes officielles</h2>
                        </div>
                        <ul className="space-y-3">
                            {['Note relative aux gardes', 'Note organisation service'].map((doc, j) => (
                                <li key={j} className="flex items-center gap-3 rounded-xl bg-[#F7F9FB] p-3 text-sm text-[#13243A] transition hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm">📄</span>
                                    <span className="font-medium">{doc}</span>
                                    <span className="ml-auto text-[#8A9FB0]">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
