import { Head, usePage } from '@inertiajs/react';

export default function Signalement() {
    const { messages } = usePage().props;
    const m = (key) => messages?.[key] || key;

    return (
        <>
            <Head title={m('signalement')} />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{m('signalement')}</h1>
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-600 mb-4">Utilisez ce formulaire pour signaler un problème sanitaire dans votre région.</p>
                <p className="text-sm text-gray-500">Formulaire de signalement sanitaire (à implémenter).</p>
            </div>
        </>
    );
}
