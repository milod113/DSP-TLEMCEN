import { Head, Link, usePage } from '@inertiajs/react';

export default function PageContentsIndex({ pages }) {
    const { messages, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;

    const pageLabels = {
        home: 'Accueil',
        direction: 'Direction',
        etablissements: 'Établissements',
        actualites: 'Actualités',
        prevention: 'Prévention',
        services: 'Services',
        professionnels: 'Professionnels',
        appels_offres: 'Appels d\'offres',
        documents: 'Documents',
    };

    return (
        <>
            <Head title="Contenu des pages" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Contenu des pages</h1>
                <p className="text-gray-500 text-sm mt-1">Modifiez les textes affichés sur les pages publiques du site.</p>
            </div>

            {Object.entries(pages).map(([pageKey, contents]) => (
                <div key={pageKey} className="mb-8 bg-white rounded-xl shadow overflow-hidden">
                    <div className="bg-blue-900 text-white px-6 py-3 font-semibold text-lg">
                        {pageLabels[pageKey] || pageKey}
                    </div>
                    <div className="divide-y divide-gray-100">
                        {contents.map((item) => (
                            <div key={item.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-800 text-sm">
                                        {locale === 'ar' && item.label_ar ? item.label_ar : item.label_fr || item.key}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5 font-mono">{item.key}</p>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {locale === 'ar' && item.value_ar ? item.value_ar : item.value_fr || '—'}
                                    </p>
                                </div>
                                <Link
                                    href={route('admin.page-contents.edit', item.id)}
                                    className="flex-shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Modifier
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
