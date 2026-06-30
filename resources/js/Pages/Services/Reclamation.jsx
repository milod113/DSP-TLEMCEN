import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Reclamation() {
    const { messages } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const [form, setForm] = useState({ nom: '', email: '', telephone: '', message: '', type: 'reclamation' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/api/reclamations', form, {
            onSuccess: () => setSubmitted(true),
        });
    };

    if (submitted) {
        return (
            <div className="bg-white rounded-xl shadow p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Message envoyé</h2>
                <p className="text-gray-600">Votre réclamation a été enregistrée. Vous recevrez un numéro de suivi par email.</p>
            </div>
        );
    }

    return (
        <>
            <Head title={m('reclamation')} />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{m('reclamation')}</h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{m('votre_nom')}</label>
                        <input required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{m('votre_email')}</label>
                        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{m('telephone')}</label>
                        <input value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                            <option value="reclamation">Réclamation</option>
                            <option value="information">Demande d'information</option>
                            <option value="signalement">Signalement sanitaire</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{m('votre_message')}</label>
                    <textarea required rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"></textarea>
                </div>
                <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800">
                    {m('envoyer')}
                </button>
            </form>
        </>
    );
}
