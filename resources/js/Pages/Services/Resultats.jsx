import { Head, usePage } from '@inertiajs/react';

export default function Resultats() {
    const { messages } = usePage().props;
    const m = (key) => messages?.[key] || key;

    return (
        <>
            <Head title="Résultats d'analyses" />

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Résultats d'analyses</h1>

            <div className="bg-white rounded-xl shadow p-8 max-w-2xl">
                <div className="text-4xl mb-4">📊</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Consultation des résultats d'analyses</h2>
                <p className="text-gray-600">
                    Ce service vous permet de consulter vos résultats d'analyses médicales en ligne.
                    Veuillez vous rapprocher de votre établissement de santé pour obtenir vos identifiants de connexion.
                </p>
            </div>
        </>
    );
}
