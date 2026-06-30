import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import PageHero from '../Components/PageHero';

export default function Contact() {
    const { messages, pageContents, locale } = usePage().props;
    const m = (key) => messages?.[key] || key;
    const pc = (key) => {
        const c = pageContents?.[key];
        if (!c) return null;
        return locale === 'ar' && c.value_ar ? c.value_ar : c.value_fr;
    };
    const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/api/contacts', form, {
            onSuccess: () => setSubmitted(true),
        });
    };

    if (submitted) {
        return (
            <>
                <Head title={m('contactez_nous')} />
                <div className="mx-auto max-w-lg px-4 py-16 text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                        <svg className="h-12 w-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Fraunces', serif" }}>Message envoyé</h2>
                    <p className="text-gray-500 mt-3">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={m('contactez_nous')} />

            <PageHero
                title={m('contactez_nous')}
                description={pc('contact_hero_description') || 'Utilisez le formulaire ci-dessous pour nous envoyer un message.'}
                badge="Contact"
            />

            <div className="mx-auto max-w-3xl px-4 pb-16 md:pb-20">
                <div className="-mt-8 relative z-10 bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(10,37,64,0.12)] p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{m('votre_nom')} *</label>
                                <input required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} className="w-full border border-[#DCE6EF] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition" placeholder="Votre nom" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{m('votre_email')} *</label>
                                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-[#DCE6EF] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{m('telephone')}</label>
                                <input value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} className="w-full border border-[#DCE6EF] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition" placeholder="0555 XX XX XX" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{m('sujet')}</label>
                                <input value={form.sujet} onChange={e => setForm({...form, sujet: e.target.value})} className="w-full border border-[#DCE6EF] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition" placeholder="Sujet de votre message" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">{m('votre_message')} *</label>
                            <textarea required rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border border-[#DCE6EF] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition" placeholder="Votre message..." />
                        </div>
                        <button type="submit" className="bg-[#0F4C81] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0A2540] transition shadow-md">
                            {m('envoyer')}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
