import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Login() {
    const { messages, errors } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const [form, setForm] = useState({ email: '', password: '', remember: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/login', form);
    };

    return (
        <>
            <Head title={m('connexion')} />

            <div className="max-w-md mx-auto mt-12">
                <div className="bg-white rounded-xl shadow p-8">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">{m('connexion')}</h1>

                    {errors?.email && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{errors.email}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{m('votre_email')}</label>
                            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" checked={form.remember} onChange={e => setForm({...form, remember: e.target.checked})} className="rounded border-gray-300" />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Se souvenir de moi</label>
                        </div>
                        <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition">
                            {m('connexion')}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
