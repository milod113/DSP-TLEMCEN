import { Head, usePage, Link } from '@inertiajs/react';

export default function RendezVous() {
    const { messages } = usePage().props;
    const m = (key) => messages?.[key] || key;

    return (
        <>
            <Head title="Prise de rendez-vous" />

            <h1 className="text-3xl font-bold text-gray-800 mb-6">Prise de rendez-vous</h1>

            <div className="bg-white rounded-xl shadow p-8 max-w-2xl">
                <div className="text-4xl mb-4">📅</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Service de prise de rendez-vous en ligne</h2>
                <p className="text-gray-600 mb-6">
                    Ce service vous permet de prendre rendez-vous dans les établissements de santé de la wilaya de Tlemcen.
                    Veuillez consulter la liste des établissements pour trouver les coordonnées et prendre rendez-vous directement.
                </p>
                <Link
                    href={route('etablissements')}
                    className="inline-block bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition"
                >
                    Voir les établissements
                </Link>
            </div>
        </>
    );
}
